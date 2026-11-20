"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { findProduct } from "@/lib/products";

type Cart = Record<number, number>; // productId -> quantity

type CartContextValue = {
  cart: Cart;
  isOpen: boolean;
  totalQty: number;
  bumpKey: number;
  addToCart: (id: number) => void;
  changeQty: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  showToast: (msg: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "eb-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({});
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [bumpKey, setBumpKey] = useState(0);
  const [toast, setToast] = useState({ msg: "", show: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Load saved cart after mount (localStorage isn't available on the server)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") as Cart;
      // Drop any ids that no longer exist in the catalog
      const valid = Object.fromEntries(
        Object.entries(saved).filter(([id, q]) => findProduct(Number(id)) && q > 0)
      );
      setCart(valid);
    } catch {
      /* ignore corrupted storage */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart, loaded]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast({ msg, show: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2200);
  }, []);

  const changeQty = useCallback((id: number, delta: number) => {
    setCart((prev) => {
      const next = { ...prev, [id]: (prev[id] || 0) + delta };
      if (next[id] <= 0) delete next[id];
      return next;
    });
  }, []);

  const addToCart = useCallback(
    (id: number) => {
      changeQty(id, 1);
      setBumpKey((k) => k + 1);
      showToast(`☕ ${findProduct(id)?.name} added to cart`);
    },
    [changeQty, showToast]
  );

  const removeItem = useCallback((id: number) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const totalQty = Object.values(cart).reduce((sum, q) => sum + q, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        totalQty,
        bumpKey,
        addToCart,
        changeQty,
        removeItem,
        clearCart: () => setCart({}),
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        showToast,
      }}
    >
      {children}
      <div className={`toast${toast.show ? " show" : ""}`} role="status">
        {toast.msg}
      </div>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
