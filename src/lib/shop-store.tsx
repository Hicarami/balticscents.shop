import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "./products";

export interface CartItem {
  id: string;
  size: number;
  qty: number;
}

interface ShopState {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  quickView: string | null;
  theme: "dark" | "light";
  addToCart: (id: string, size: number, qty?: number) => void;
  updateQty: (id: string, size: number, qty: number) => void;
  removeFromCart: (id: string, size: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  markViewed: (id: string) => void;
  setQuickView: (id: string | null) => void;
  toggleTheme: () => void;
  cartCount: number;
  subtotal: number;
}

const ShopContext = createContext<ShopState | null>(null);

const KEY = "noir-essence-shop-v1";

function readState() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [quickView, setQuickView] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const s = readState();
    if (s) {
      setCart(s.cart ?? []);
      setWishlist(s.wishlist ?? []);
      setRecentlyViewed(s.recentlyViewed ?? []);
      setTheme(s.theme ?? "dark");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(
      KEY,
      JSON.stringify({ cart, wishlist, recentlyViewed, theme }),
    );
  }, [cart, wishlist, recentlyViewed, theme]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const addToCart = useCallback((id: string, size: number, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id && c.size === size);
      if (existing) {
        return prev.map((c) =>
          c.id === id && c.size === size ? { ...c, qty: c.qty + qty } : c,
        );
      }
      return [...prev, { id, size, qty }];
    });
  }, []);

  const updateQty = useCallback((id: string, size: number, qty: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id && c.size === size ? { ...c, qty } : c))
        .filter((c) => c.qty > 0),
    );
  }, []);

  const removeFromCart = useCallback((id: string, size: number) => {
    setCart((prev) => prev.filter((c) => !(c.id === id && c.size === size)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const markViewed = useCallback((id: string) => {
    setRecentlyViewed((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 8));
  }, []);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    [],
  );

  const cartCount = useMemo(() => cart.reduce((s, c) => s + c.qty, 0), [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const p = products.find((x) => x.id === item.id);
      if (!p) return sum;
      const sizeMult = item.size === 50 ? 0.75 : item.size === 200 ? 1.6 : 1;
      return sum + p.price * sizeMult * item.qty;
    }, 0);
  }, [cart]);

  const value: ShopState = {
    cart,
    wishlist,
    recentlyViewed,
    quickView,
    theme,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
    markViewed,
    setQuickView,
    toggleTheme,
    cartCount,
    subtotal,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}

export function priceForSize(basePrice: number, size: number) {
  const mult = size === 50 ? 0.75 : size === 200 ? 1.6 : 1;
  return Math.round(basePrice * mult);
}

export { products as _products };
export type { Product };
