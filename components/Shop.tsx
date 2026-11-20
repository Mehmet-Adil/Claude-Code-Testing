"use client";

import { useState } from "react";
import { PRODUCTS, money, type Product, type Roast } from "@/lib/products";
import { useCart } from "./CartProvider";

const FILTERS: { value: Roast | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "light", label: "Light" },
  { value: "medium", label: "Medium" },
  { value: "dark", label: "Dark" },
];

function ProductCard({ product: p, index }: { product: Product; index: number }) {
  const { addToCart } = useCart();

  return (
    <article className="product" style={{ animationDelay: `${index * 60}ms` }}>
      <div className="product-img" style={{ background: `${p.color}22` }}>
        {p.badge && <span className="badge">{p.badge}</span>}
        <div className="bag" style={{ background: p.color }}>
          <div className="bag-label">{p.name}</div>
        </div>
      </div>
      <div className="product-body">
        <span className="product-meta">
          {p.origin} · {p.roast} roast
        </span>
        <h3>{p.name}</h3>
        <div className="roast-level" title={`Roast level ${p.level}/5`}>
          {[1, 2, 3, 4, 5].map((n) => (
            <i key={n} className={n <= p.level ? "on" : ""} />
          ))}
        </div>
        <p className="notes">{p.notes}</p>
        <div className="product-foot">
          <span className="price">{money(p.price)}</span>
          <button className="btn btn-primary add-btn" onClick={() => addToCart(p.id)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Shop() {
  const [filter, setFilter] = useState<Roast | "all">("all");
  const list = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.roast === filter);

  return (
    <section className="shop" id="shop">
      <div className="container">
        <div className="section-head">
          <h2>Our Coffees</h2>
          <div className="filters">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className={`filter${filter === f.value ? " active" : ""}`}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        {/* key on filter replays the fade-in animation when switching */}
        <div className="product-grid" key={filter}>
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
