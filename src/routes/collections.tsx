import { createFileRoute, Link } from "@tanstack/react-router";
import { products, families } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — Noir Essence" },
      { name: "description", content: "Explore Noir Essence fragrance collections by olfactory family: Woody, Fresh, Citrus, Oriental, and Floral." },
      { property: "og:title", content: "Collections — Noir Essence" },
      { property: "og:description", content: "Fragrance collections by olfactory family." },
    ],
  }),
  component: CollectionsPage,
});

const familyBlurbs: Record<string, string> = {
  Woody: "Cedar, sandalwood, and vetiver — the architecture of a forest floor.",
  Fresh: "Crystalline air, alpine mint, and the exhale of first light.",
  Citrus: "Sicilian bergamot and grapefruit — luxury made luminous.",
  Oriental: "Amber, oud, and vanilla absolute — the heavy warmth of old worlds.",
  Floral: "Peony, rose, and jasmine sambac — bouquets that whisper.",
};

function CollectionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-16 text-center max-w-2xl mx-auto">
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Curated Journeys</p>
        <h1 className="font-display text-5xl md:text-6xl mb-6">Our Collections</h1>
        <p className="text-foreground/60">
          Five olfactory families, each an invitation to a different mood, memory, and season.
        </p>
      </div>

      <div className="space-y-24">
        {families.map((family) => {
          const items = products.filter((p) => p.family === family);
          if (items.length === 0) return null;
          return (
            <section key={family}>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Family</p>
                  <h2 className="font-display text-4xl md:text-5xl italic">{family}</h2>
                  <p className="text-foreground/60 mt-3 max-w-lg">{familyBlurbs[family]}</p>
                </div>
                <Link
                  to="/shop"
                  className="text-[10px] tracking-[0.25em] uppercase text-gold gold-underline w-fit"
                >
                  Shop {family}
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
