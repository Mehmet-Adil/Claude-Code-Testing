"use client";

import { FREE_SHIPPING_MIN, SHIPPING_COST, findProduct, money } from "@/lib/products";
import { useCart } from "./CartProvider";

export default function CartDrawer() {
  const { cart, isOpen, closeCart, changeQty, removeItem, clearCart, showToast } = useCart();

  const items = Object.entries(cart).flatMap(([id, qty]) => {
    const product = findProduct(Number(id));
    return product ? [{ product, qty }] : [];
  });
  const subtotal = items.reduce((sum, { product, qty }) => sum + product.price * qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_COST;

  function checkout() {
    if (!items.length) return showToast("Your cart is empty!");
    clearCart();
    closeCart();
    showToast("🎉 Order placed! (Just kidding — this is a demo store.)");
  }

  return (
    <>
      <div className={`overlay${isOpen ? " show" : ""}`} onClick={closeCart} />
      <aside className={`cart-drawer${isOpen ? " open" : ""}`} aria-label="Shopping cart" aria-hidden={!isOpen}>
        <div className="cart-head">
          <h3>Your Cart</h3>
          <button className="close-btn" onClick={closeCart} aria-label="Close cart">✕</button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p style={{ fontSize: "2.5rem" }}>☕</p>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            items.map(({ product: p, qty }) => (
              <div key={p.id} className="cart-item">
                <div className="cart-swatch" style={{ background: p.color }} />
                <div>
                  <h4>{p.name}</h4>
                  <small>{money(p.price)} · 12oz bag</small>
                  <div className="qty">
                    <button onClick={() => changeQty(p.id, -1)} aria-label="Decrease">−</button>
                    <span>{qty}</span>
                    <button onClick={() => changeQty(p.id, 1)} aria-label="Increase">+</button>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <strong>{money(p.price * qty)}</strong>
                  <br />
                  <button className="remove" onClick={() => removeItem(p.id)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-foot">
          <div className="cart-row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
          <div className="cart-row muted">
            <span>Shipping</span>
            <span>
              {subtotal === 0 ? "—" : shipping === 0 ? "Free" : `${money(shipping)} (free over $${FREE_SHIPPING_MIN})`}
            </span>
          </div>
          <div className="cart-row total"><span>Total</span><span>{money(subtotal + shipping)}</span></div>
          <button className="btn btn-primary btn-block" onClick={checkout}>Checkout</button>
        </div>
      </aside>
    </>
  );
}
