import { Link } from "@tanstack/react-router";
import { Heart, Eye } from "lucide-react";
import type { Product } from "@/lib/products";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, setQuickView } = useShop();
  const isWished = wishlist.includes(product.id);

  return (
    <div className="group">
      <div className="relative aspect-[4/5] bg-charcoal overflow-hidden mb-6 rounded-sm">
        <Link to="/product/$id" params={{ id: product.id }} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={800}
            height={1000}
            className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            aria-label="Add to wishlist"
            onClick={() => toggleWishlist(product.id)}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-full glass transition-colors",
              isWished ? "text-gold" : "text-foreground/70 hover:text-gold",
            )}
          >
            <Heart className={cn("h-4 w-4", isWished && "fill-gold")} />
          </button>
          <button
            aria-label="Quick view"
            onClick={() => setQuickView(product.id)}
            className="grid h-9 w-9 place-items-center rounded-full glass text-foreground/70 hover:text-gold transition-colors opacity-0 group-hover:opacity-100"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
        {product.bestSeller && (
          <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase bg-gold text-primary-foreground px-2.5 py-1 font-bold">
            Visvairāk pārdotais
          </span>
        )}
        {!product.bestSeller && product.newest && (
          <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase bg-foreground text-background px-2.5 py-1 font-bold">
            Jauns
          </span>
        )}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-onyx/85 backdrop-blur-md">
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="block w-full py-3.5 text-center border border-gold/50 text-gold text-[10px] tracking-[0.2em] uppercase hover:bg-gold hover:text-primary-foreground transition-colors font-bold"
          >
            Skatīt produktu
          </Link>
        </div>
      </div>
      <Link to="/product/$id" params={{ id: product.id }} className="block">
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-display truncate">{product.name}</h3>
            <p className="text-foreground/40 text-[10px] tracking-[0.2em] uppercase mt-1 truncate">
              {product.family} · {product.gender}
            </p>
          </div>
          <span className="text-gold font-medium shrink-0">${product.price}</span>
        </div>
      </Link>
    </div>
  );
}
