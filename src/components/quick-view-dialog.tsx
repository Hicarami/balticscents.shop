import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useShop, priceForSize } from "@/lib/shop-store";
import { getProduct } from "@/lib/products";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";

export function QuickViewDialog() {
  const { quickView, setQuickView, addToCart } = useShop();
  const [size, setSize] = useState(100);
  const product = quickView ? getProduct(quickView) : null;

  if (!product) return null;

  return (
    <Dialog open={!!quickView} onOpenChange={(o) => !o && setQuickView(null)}>
      <DialogContent className="max-w-4xl bg-onyx border-border p-0 overflow-hidden">
        <button
          onClick={() => setQuickView(null)}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 grid h-9 w-9 place-items-center rounded-full glass hover:text-gold"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="grid md:grid-cols-2">
          <div className="aspect-square md:aspect-auto bg-charcoal">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="p-8 md:p-10 flex flex-col">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">{product.brand}</p>
            <h2 className="font-display text-3xl mb-2">{product.name}</h2>
            <p className="text-foreground/50 text-xs tracking-[0.2em] uppercase mb-6">{product.tagline}</p>
            <p className="text-sm text-foreground/70 font-light leading-relaxed mb-8">
              {product.description}
            </p>
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/60 mb-3">Size</p>
              <div className="flex gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={
                      "px-4 py-2 text-xs tracking-widest border transition-colors " +
                      (size === s
                        ? "border-gold text-gold"
                        : "border-border text-foreground/60 hover:border-gold/50")
                    }
                  >
                    {s}ml
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-auto flex items-center justify-between mb-4">
              <span className="text-2xl font-display text-gold">${priceForSize(product.price, size)}</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/50">
                {product.stock > 0 ? "In stock" : "Sold out"}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  addToCart(product.id, size, 1);
                  setQuickView(null);
                }}
                className="flex-1 bg-gold hover:bg-gold-light text-primary-foreground py-4 text-[10px] tracking-[0.25em] uppercase font-bold transition-colors"
              >
                Pievienot grozā
              </button>
              <Link
                to="/product/$id"
                params={{ id: product.id }}
                onClick={() => setQuickView(null)}
                className="px-6 border border-border grid place-items-center text-[10px] tracking-[0.25em] uppercase hover:border-gold hover:text-gold transition-colors"
              >
                Sīkāka informācija
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
