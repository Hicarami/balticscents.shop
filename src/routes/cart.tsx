import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useShop, priceForSize } from "@/lib/shop-store";
import { getProduct } from "@/lib/products";
import { Minus, Plus, X, ArrowRight, Tag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Grozs - Moross" },
      { name: "description", content: ".." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, updateQty, removeFromCart, subtotal } = useShop();
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(0);

  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const discount = applied ? Math.round(subtotal * applied) : 0;
  const total = Math.max(0, subtotal - discount + shipping);

  const applyCode = () => {
    if (code.toUpperCase() === "NOIR10") setApplied(0.1);
    else if (code.toUpperCase() === "VIP20") setApplied(0.2);
    else setApplied(0);
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Grozs</p>
        <h1 className="font-display text-5xl mb-6">Jūsu grozs pagaidām tukšs</h1>
        <p className="text-foreground/60 mb-10">Sāciet savu izvēli ar meklēšanas lauku</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-primary-foreground px-10 py-4 text-[10px] tracking-[0.25em] uppercase font-bold transition-colors"
        >
          Atklājiet smaržas <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12">
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Grozs</p>
        <h1 className="font-display text-5xl">Iepirkumu grozs</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
        <div className="space-y-8">
          {cart.map((item) => {
            const p = getProduct(item.id);
            if (!p) return null;
            const line = priceForSize(p.price, item.size) * item.qty;
            return (
              <div key={`${item.id}-${item.size}`} className="grid grid-cols-[100px_1fr_auto] gap-6 pb-8 border-b border-border">
                <Link to="/product/$id" params={{ id: p.id }} className="aspect-[4/5] bg-charcoal overflow-hidden rounded-sm">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                </Link>
                <div className="min-w-0">
                  <Link to="/product/$id" params={{ id: p.id }} className="block">
                    <h3 className="font-display text-xl truncate">{p.name}</h3>
                  </Link>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 mt-1">{item.size}ml · {p.family}</p>
                  <div className="mt-4 inline-flex items-center border border-border">
                    <button onClick={() => updateQty(item.id, item.size, item.qty - 1)} className="h-9 w-9 grid place-items-center hover:text-gold">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-10 text-center text-sm">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.size, item.qty + 1)} className="h-9 w-9 grid place-items-center hover:text-gold">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    aria-label="Remove"
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-foreground/40 hover:text-destructive transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <span className="text-gold font-medium">${line}</span>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="bg-charcoal/40 p-8 h-fit sticky top-28 rounded-sm">
          <h2 className="font-display text-2xl mb-6">Pasūtījuma kopsavilkums</h2>
          <div className="space-y-3 text-sm mb-6">
            <div className="flex justify-between"><span className="text-foreground/60">Starpsumma</span><span>${subtotal.toFixed(2)}</span></div>
            {discount > 0 && <div className="flex justify-between text-gold"><span>Atlaide</span><span>−${discount.toFixed(2)}</span></div>}
            <div className="flex justify-between"><span className="text-foreground/60">Piegāde</span><span>{shipping === 0 ? "Free" : `$${shipping}`}</span></div>
          </div>
          <div className="border-t border-border pt-4 flex justify-between font-display text-2xl mb-6">
            <span>Summa</span>
            <span className="text-gold">${total.toFixed(2)}</span>
          </div>

          <div className="mb-6">
            <label className="text-[10px] tracking-[0.2em] uppercase text-foreground/60 mb-2 block flex items-center gap-2">
              <Tag className="h-3 w-3" /> Atlaides kods
            </label>
            <div className="flex">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="MOROSS10"
                className="flex-1 bg-transparent border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
              />
              <button onClick={applyCode} className="border border-gold text-gold px-4 text-[10px] tracking-[0.2em] uppercase hover:bg-gold hover:text-primary-foreground transition-colors">
                Apply
              </button>
            </div>
            {applied > 0 && <p className="mt-2 text-xs text-emerald-400">Piemērotais kods: {applied * 100}% off</p>}
            {code && applied === 0 && <p className="mt-2 text-xs text-destructive">Nederīgs kods.</p>}
          </div>

          <Link
            to="/checkout"
            className="block text-center bg-gold hover:bg-gold-light text-primary-foreground py-4 text-[10px] tracking-[0.25em] uppercase font-bold transition-colors"
          >
            Doties uz norēķiniem
          </Link>
          <Link to="/shop" className="block text-center mt-4 text-[10px] tracking-[0.25em] uppercase text-foreground/60 gold-underline w-fit mx-auto">
            Turpināt iepirkties
          </Link>
        </aside>
      </div>
    </div>
  );
}
