export type Roast = "light" | "medium" | "dark";

export type Product = {
  id: number;
  name: string;
  origin: string;
  roast: Roast;
  level: number; // 1–5
  price: number;
  notes: string;
  color: string;
  badge?: string;
};

// Fictional catalog
export const PRODUCTS: Product[] = [
  { id: 1, name: "Ethiopia Yirgacheffe", origin: "Ethiopia", roast: "light", level: 1, price: 18, notes: "Blueberry, jasmine, lemon zest", color: "#d98c5f", badge: "Bestseller" },
  { id: 2, name: "Colombia Huila", origin: "Colombia", roast: "medium", level: 3, price: 16, notes: "Caramel, red apple, milk chocolate", color: "#b5651d" },
  { id: 3, name: "Midnight Ember", origin: "House Blend", roast: "dark", level: 5, price: 15, notes: "Dark chocolate, molasses, smoke", color: "#3b2418", badge: "Espresso" },
  { id: 4, name: "Kenya Nyeri AA", origin: "Kenya", roast: "light", level: 2, price: 20, notes: "Blackcurrant, grapefruit, brown sugar", color: "#c0563b" },
  { id: 5, name: "Guatemala Antigua", origin: "Guatemala", roast: "medium", level: 3, price: 17, notes: "Cocoa, toffee, orange peel", color: "#8a5a3c" },
  { id: 6, name: "Sumatra Mandheling", origin: "Indonesia", roast: "dark", level: 4, price: 17, notes: "Cedar, earthy spice, dark cherry", color: "#55392a" },
  { id: 7, name: "Morning Glow", origin: "House Blend", roast: "medium", level: 2, price: 14, notes: "Honey, almond, stone fruit", color: "#d4a15a", badge: "New" },
  { id: 8, name: "Decaf Brazil", origin: "Brazil", roast: "medium", level: 3, price: 16, notes: "Hazelnut, cocoa, smooth body", color: "#6b8f71" },
];

export const FREE_SHIPPING_MIN = 35;
export const SHIPPING_COST = 5.99;

export const findProduct = (id: number) => PRODUCTS.find((p) => p.id === id);
export const money = (n: number) => `$${n.toFixed(2)}`;
