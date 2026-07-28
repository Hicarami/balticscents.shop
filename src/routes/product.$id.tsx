import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getProduct, products } from "@/lib/products";
import { useShop, priceForSize } from "@/lib/shop-store";
import { ProductCard } from "@/components/product-card";
import { Heart, Star, Check, Truck, RefreshCw, ShieldCheck, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found — Noir Essence" }] };
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — Noir Essence` },
        { name: "description", content: product.description },
        { property: "og:title", content: `${product.name} — Noir Essence` },
        { property: "og:description", content: product.description },
        { property: "og:image", content: product.image },
        { name: "twitter:image", content: product.image },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-display text-5xl mb-4">Fragrance not found</h1>
      <Link to="/shop" className="text-gold gold-underline text-sm tracking-[0.25em] uppercase">
        Return to shop
      </Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, wishlist, markViewed } = useShop();
  const [size, setSize] = useState(100);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    markViewed(product.id);
    setQty(1);
  }, [product.id, markViewed]);

  const isWished = wishlist.includes(product.id);
  const related = products.filter((p) => p.family === product.family && p.id !== product.id).slice(0, 4);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <nav className="text-[10px] tracking-[0.25em] uppercase text-foreground/50 mb-8 flex gap-2">
          <Link to="/" className="hover:text-gold">Moross</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gold">Veikals</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <div>
            <div className="aspect-[4/5] bg-charcoal overflow-hidden rounded-sm mb-4">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[product.image, product.image, product.image, product.image].map((src, i) => (
                <button key={i} className="aspect-square bg-charcoal overflow-hidden rounded-sm border border-transparent hover:border-gold transition-colors">
                  <img src={src} alt="" className="h-full w-full object-cover opacity-80" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">{product.brand}</p>
            <h1 className="font-display text-5xl md:text-6xl mb-4">{product.name}</h1>
            <p className="text-foreground/50 text-xs tracking-[0.2em] uppercase mb-6">{product.tagline}</p>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("h-4 w-4", i < Math.floor(product.rating) && "fill-gold")} />
                ))}
              </div>
              <span className="text-sm text-foreground/60">{product.rating} · {product.reviews} reviews</span>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-display text-4xl text-gold">${priceForSize(product.price, size)}</span>
              <span className={cn("text-[10px] tracking-[0.2em] uppercase inline-flex items-center gap-1.5", product.stock > 0 ? "text-emerald-400" : "text-destructive")}>
                {product.stock > 0 ? <><Check className="h-3 w-3" /> In stock · {product.stock} left</> : "Sold out"}
              </span>
            </div>

            <p className="text-sm text-foreground/70 font-light leading-relaxed mb-10">{product.description}</p>

            <div className="mb-8">
              <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/60 mb-4">Choose Size</p>
              <div className="flex gap-3">
                {product.sizes.map((s: number) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      "px-6 py-3 text-xs tracking-widest border transition-colors",
                      size === s
                        ? "border-gold text-gold bg-gold/5"
                        : "border-border text-foreground/60 hover:border-gold/50",
                    )}
                  >
                    {s}ml
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10 flex items-center gap-6">
              <div className="flex items-center border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-11 w-11 grid place-items-center hover:text-gold">
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="h-11 w-11 grid place-items-center hover:text-gold">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="flex-1 flex gap-3">
                <button
                  onClick={() => {
                    addToCart(product.id, size, qty);
                    toast.success(`${product.name} added to cart`);
                  }}
                  className="flex-1 bg-gold hover:bg-gold-light text-primary-foreground py-4 text-[10px] tracking-[0.25em] uppercase font-bold transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Wishlist"
                  className={cn(
                    "grid place-items-center h-14 w-14 border transition-colors",
                    isWished ? "border-gold text-gold" : "border-border hover:border-gold hover:text-gold",
                  )}
                >
                  <Heart className={cn("h-4 w-4", isWished && "fill-gold")} />
                </button>
              </div>
            </div>

            {/* Notes */}
            <div className="border-t border-border pt-8 mb-8">
              <h3 className="font-display text-2xl mb-8 italic">Fragrance Notes</h3>
              <div className="space-y-6">
                {[
                  { label: "Top Notes", items: product.notes.top, n: "01" },
                  { label: "Heart Notes", items: product.notes.heart, n: "02" },
                  { label: "Base Notes", items: product.notes.base, n: "03" },
                ].map((row) => (
                  <div key={row.label} className="flex gap-6 items-start">
                    <div className="text-gold font-display text-2xl opacity-40 shrink-0">{row.n}</div>
                    <div>
                      <p className="text-[10px] tracking-[0.25em] uppercase text-gold mb-2">{row.label}</p>
                      <p className="text-foreground/70 text-sm">{row.items.join(" · ")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Perks */}
            <div className="grid grid-cols-3 gap-4 border-t border-border pt-8">
              {[
                { icon: Truck, t: "Free shipping over $150" },
                { icon: RefreshCw, t: "30-day returns" },
                { icon: ShieldCheck, t: "Authenticity assured" },
              ].map((p, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2">
                  <p.icon className="h-5 w-5 text-gold" />
                  <span className="text-[10px] tracking-[0.15em] uppercase text-foreground/60">{p.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-charcoal/40 py-24 px-6 mt-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">You Might Also Like</p>
              <h2 className="font-display text-3xl md:text-4xl">Related Fragrances</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
