import { createFileRoute, Link } from "@tanstack/react-router";
import { useShop } from "@/lib/shop-store";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Jūsu vēlmes — Moross" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useShop();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12">
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Saglabā vēlāk</p>
        <h1 className="font-display text-5xl">Vēlmju saraksts</h1>
      </div>

      {items.length === 0 ? (
        <div className="py-24 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-border mb-6">
            <Heart className="h-6 w-6 text-foreground/50" />
          </div>
          <p className="font-display text-2xl mb-3">Saraksts ir tukšs, pievienojiet preces</p>
          <p className="text-foreground/60 mb-8 text-sm">Uzspied šeit, lai saglabāt savas mīļākās smaržas.</p>
          <Link
            to="/shop"
            className="inline-block bg-gold hover:bg-gold-light text-primary-foreground px-8 py-4 text-[10px] tracking-[0.25em] uppercase font-bold transition-colors"
          >
            Meklēt smaržas
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
