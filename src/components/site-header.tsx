import { Link, useRouterState } from "@tanstack/react-router";
import { Search, User, Heart, ShoppingBag, Sun, Moon, Menu, X } from "lucide-react";
import { useState } from "react";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Moross" },
  { to: "/shop", label: "Veikals" },
  { to: "/about", label: "Par Mums" },
  { to: "/contact", label: "Kontakti" },
] as const;

export function SiteHeader() {
  const { cartCount, wishlist, theme, toggleTheme } = useShop();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full glass border-b border-border/60">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6">
        <Link to="/" className="shrink-0 font-display text-xl tracking-[0.25em] uppercase text-gold">
          
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-[11px] tracking-[0.2em] uppercase font-medium">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "gold-underline transition-colors",
                pathname === n.to ? "text-gold" : "text-foreground/70 hover:text-foreground",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            aria-label="Search"
            className="hidden sm:grid place-items-center h-9 w-9 rounded-full hover:text-gold transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            aria-label={theme === "dark" ? "Light mode" : "Dark mode"}
            onClick={toggleTheme}
            className="hidden sm:grid place-items-center h-9 w-9 rounded-full hover:text-gold transition-colors"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative hidden sm:grid place-items-center h-9 w-9 rounded-full hover:text-gold transition-colors"
          >
            <Heart className="h-4 w-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-gold text-[9px] font-bold text-primary-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button
            aria-label="Account"
            className="hidden sm:grid place-items-center h-9 w-9 rounded-full hover:text-gold transition-colors"
          >
            <User className="h-4 w-4" />
          </button>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative grid place-items-center h-9 w-9 rounded-full hover:text-gold transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-gold text-[9px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden grid place-items-center h-9 w-9 rounded-full"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-onyx/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-6">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm tracking-[0.2em] uppercase hover:text-gold transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
