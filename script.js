// ===== Product catalog (fictional) =====
const PRODUCTS = [
  { id: 1, name: "Ethiopia Yirgacheffe", origin: "Ethiopia", roast: "light", level: 1, price: 18, notes: "Blueberry, jasmine, lemon zest", color: "#d98c5f", badge: "Bestseller" },
  { id: 2, name: "Colombia Huila", origin: "Colombia", roast: "medium", level: 3, price: 16, notes: "Caramel, red apple, milk chocolate", color: "#b5651d" },
  { id: 3, name: "Midnight Ember", origin: "House Blend", roast: "dark", level: 5, price: 15, notes: "Dark chocolate, molasses, smoke", color: "#3b2418", badge: "Espresso" },
  { id: 4, name: "Kenya Nyeri AA", origin: "Kenya", roast: "light", level: 2, price: 20, notes: "Blackcurrant, grapefruit, brown sugar", color: "#c0563b" },
  { id: 5, name: "Guatemala Antigua", origin: "Guatemala", roast: "medium", level: 3, price: 17, notes: "Cocoa, toffee, orange peel", color: "#8a5a3c" },
  { id: 6, name: "Sumatra Mandheling", origin: "Indonesia", roast: "dark", level: 4, price: 17, notes: "Cedar, earthy spice, dark cherry", color: "#55392a" },
  { id: 7, name: "Morning Glow", origin: "House Blend", roast: "medium", level: 2, price: 14, notes: "Honey, almond, stone fruit", color: "#d4a15a", badge: "New" },
  { id: 8, name: "Decaf Brazil", origin: "Brazil", roast: "medium", level: 3, price: 16, notes: "Hazelnut, cocoa, smooth body", color: "#6b8f71" },
];

const FREE_SHIPPING_MIN = 35;
const SHIPPING_COST = 5.99;

// ===== State =====
let cart = JSON.parse(localStorage.getItem("eb-cart") || "{}"); // { productId: qty }

// ===== Helpers =====
const $ = (sel) => document.querySelector(sel);
const money = (n) => `$${n.toFixed(2)}`;
const findProduct = (id) => PRODUCTS.find((p) => p.id === Number(id));

function saveCart() {
  localStorage.setItem("eb-cart", JSON.stringify(cart));
}

function showToast(msg) {
  const toast = $("#toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ===== Render products =====
function renderProducts(filter = "all") {
  const grid = $("#productGrid");
  const list = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.roast === filter);

  grid.innerHTML = list
    .map(
      (p, i) => `
      <article class="product" style="animation-delay:${i * 60}ms">
        <div class="product-img" style="background:${p.color}22">
          ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
          <div class="bag" style="background:${p.color}">
            <div class="bag-label">${p.name}</div>
          </div>
        </div>
        <div class="product-body">
          <span class="product-meta">${p.origin} · ${p.roast} roast</span>
          <h3>${p.name}</h3>
          <div class="roast-level" title="Roast level ${p.level}/5">
            ${[1, 2, 3, 4, 5].map((n) => `<i class="${n <= p.level ? "on" : ""}"></i>`).join("")}
          </div>
          <p class="notes">${p.notes}</p>
          <div class="product-foot">
            <span class="price">${money(p.price)}</span>
            <button class="btn btn-primary add-btn" data-id="${p.id}">Add to cart</button>
          </div>
        </div>
      </article>`
    )
    .join("");
}

// ===== Cart logic =====
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  renderCart();
  const count = $("#cartCount");
  count.classList.remove("bump");
  void count.offsetWidth; // restart animation
  count.classList.add("bump");
  showToast(`☕ ${findProduct(id).name} added to cart`);
}

function changeQty(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  saveCart();
  renderCart();
}

function renderCart() {
  const items = Object.entries(cart);
  const totalQty = items.reduce((sum, [, q]) => sum + q, 0);
  const subtotal = items.reduce((sum, [id, q]) => sum + findProduct(id).price * q, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_COST;

  $("#cartCount").textContent = totalQty;
  $("#cartSubtotal").textContent = money(subtotal);
  $("#cartShipping").textContent =
    subtotal === 0 ? "—" : shipping === 0 ? "Free" : `${money(shipping)} (free over $${FREE_SHIPPING_MIN})`;
  $("#cartTotal").textContent = money(subtotal + shipping);

  $("#cartItems").innerHTML = items.length
    ? items
        .map(([id, q]) => {
          const p = findProduct(id);
          return `
          <div class="cart-item">
            <div class="cart-swatch" style="background:${p.color}"></div>
            <div>
              <h4>${p.name}</h4>
              <small>${money(p.price)} · 12oz bag</small>
              <div class="qty">
                <button data-action="dec" data-id="${id}" aria-label="Decrease">−</button>
                <span>${q}</span>
                <button data-action="inc" data-id="${id}" aria-label="Increase">+</button>
              </div>
            </div>
            <div style="text-align:right">
              <strong>${money(p.price * q)}</strong><br />
              <button class="remove" data-action="remove" data-id="${id}">Remove</button>
            </div>
          </div>`;
        })
        .join("")
    : `<div class="cart-empty"><p style="font-size:2.5rem">☕</p><p>Your cart is empty.</p></div>`;
}

function openCart() {
  $("#cartDrawer").classList.add("open");
  $("#overlay").classList.add("show");
}
function closeCart() {
  $("#cartDrawer").classList.remove("open");
  $("#overlay").classList.remove("show");
}

// ===== Event listeners =====
$("#productGrid").addEventListener("click", (e) => {
  const btn = e.target.closest(".add-btn");
  if (btn) addToCart(btn.dataset.id);
});

$("#filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  document.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderProducts(btn.dataset.filter);
});

$("#cartItems").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  const { action, id } = btn.dataset;
  if (action === "inc") changeQty(id, 1);
  if (action === "dec") changeQty(id, -1);
  if (action === "remove") changeQty(id, -cart[id]);
});

$("#cartBtn").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#overlay").addEventListener("click", closeCart);
document.addEventListener("keydown", (e) => e.key === "Escape" && closeCart());

$("#checkoutBtn").addEventListener("click", () => {
  if (!Object.keys(cart).length) return showToast("Your cart is empty!");
  cart = {};
  saveCart();
  renderCart();
  closeCart();
  showToast("🎉 Order placed! (Just kidding — this is a demo store.)");
});

$("#menuToggle").addEventListener("click", () => $("#navLinks").classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach((a) =>
  a.addEventListener("click", () => $("#navLinks").classList.remove("open"))
);

$("#subscribeForm").addEventListener("submit", (e) => {
  e.preventDefault();
  $("#formMsg").textContent = "Thanks for joining! Check your inbox for 15% off. ☕";
  e.target.reset();
});

$("#year").textContent = new Date().getFullYear();

// ===== Init =====
renderProducts();
renderCart();
