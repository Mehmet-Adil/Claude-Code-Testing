"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

const LINKS = [
  { href: "#shop", label: "Shop" },
  { href: "#story", label: "Our Story" },
  { href: "#subscribe", label: "Subscribe" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalQty, bumpKey, openCart } = useCart();

  return (
    <header className="site-header">
      <div className="container nav">
        <a href="#" className="logo">
          Ember <span>&amp;</span> Bean
        </a>
        <nav className={`nav-links${menuOpen ? " open" : ""}`}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="cart-btn" onClick={openCart} aria-label="Open cart">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {/* key change re-mounts the badge, replaying the bump animation */}
            <span key={bumpKey} className={`cart-count${bumpKey ? " bump" : ""}`}>
              {totalQty}
            </span>
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
