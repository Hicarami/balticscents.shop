import { createFileRoute, Link } from "@tanstack/react-router";
import { products, families, genders } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { ArrowRight, Star } from "lucide-react";
import heroBottle from "@/assets/hero-bottle.jpg";
import ingredients from "@/assets/ingredients.jpg";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moross — Atklāj savu raksturīgo aromātu" },
      {
        name: "description",
        content:
          ".",
      },
      { property: "og:title", content: "Noir Essence — Luxury Fragrance Atelier" },
      { property: "og:description", content: "Hand-crafted elixirs for those who command presence." },
    ],
  }),
  component: HomePage,
});

const reviews = [
  {
    name: ".",
    role: ".",
    stars: 1,
    text: ".",
  },
  {
    name: ".",
    role: ".",
    stars: 1,
    text: ".",
  },

];

function HomePage() {
  const { recentlyViewed } = useShop();
  const featured = products.filter((p) => p.featured);
  const bestSellers = products.filter((p) => p.bestSeller);
  const recentProducts = recentlyViewed
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 4) as typeof products;

  return (
    <div>
      {/* HERO */}
      <section className="relative -mt-20 pt-20 h-[100svh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBottle}
            alt="Noir Essence luxury perfume bottle"
            width={1920}
            height={1280}
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-onyx via-onyx/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-transparent" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
          <div className="max-w-xl animate-fade-up">
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl leading-[0.95] mb-8">
              Atver savu <em className="text-gold">raksturīgo</em> Smaržu.
            </h1>
            <p className="text-foreground/70 text-base md:text-lg mb-12 font-light leading-relaxed max-w-md">
                Ar rokām darinātas smaržas, kas radīti tiem, kuri izstaro pārliecību un atstāj paliekošu iespaidu.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-primary-foreground px-10 py-5 text-[10px] tracking-[0.25em] uppercase font-bold transition-colors"
              >
                Smaržu veikals <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/collections"
                className="inline-flex items-center gap-3 border border-border hover:border-gold hover:text-gold px-10 py-5 text-[10px] tracking-[0.25em] uppercase font-medium transition-colors"
              >
                Apskati kolekcijas
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40">
          <span className="text-[9px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-foreground/30" />
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-32 px-6 mx-auto max-w-7xl">
        <div className="flex justify-between items-end mb-16">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Īpaši atlasīta izlase</p>
            <h2 className="font-display text-4xl md:text-5xl">Īpaši izcelti aromāti</h2>
            <div className="w-24 h-px bg-gold/50 mt-6" />
          </div>
          <Link to="/shop" className="hidden sm:inline-block text-[10px] tracking-[0.25em] uppercase text-gold gold-underline">
            Skatīt visus
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* CATEGORY */}
      <section className="py-32 px-6 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Iepirkties pēc kategorijas</p>
          <h2 className="font-display text-4xl md:text-5xl">Katram der</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {genders.map((g) => (
            <Link
              key={g}
              to="/shop"
              search={{ gender: g } as never}
              className="group relative aspect-[4/5] overflow-hidden bg-charcoal rounded-sm"
            >
              <img
                src={products.find((p) => p.gender === g)?.image}
                alt={g}
                loading="lazy"
                className="h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-onyx/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Collection</p>
                <h3 className="font-display text-3xl mb-4">{g === "Men" ? "Pour Homme" : g === "Women" ? "Pour Femme" : "Unisex"}</h3>
                <span className="text-[10px] tracking-[0.25em] uppercase gold-underline w-fit">Shop {g}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="py-32 px-6 mx-auto max-w-7xl">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="font-display text-4xl md:text-5xl">Visvairāk pirktie</h2>
            <div className="w-24 h-px bg-gold/50 mt-6" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {bestSellers.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-charcoal/40 py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Atsauksmes</p>
            <h2 className="font-display text-4xl md:text-5xl">Vārdi no loka</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r) => (
              <div key={r.name} className="glass p-10 rounded-sm">
                <div className="flex gap-1 text-gold mb-6">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold" />
                  ))}
                </div>
                <blockquote className="font-display text-xl italic leading-relaxed mb-8 text-foreground/90">
                  "{r.text}"
                </blockquote>
                <cite className="not-italic text-[10px] tracking-[0.2em] uppercase text-foreground/50 block">
                  {r.name}
                </cite>
                <span className="text-[9px] tracking-[0.15em] uppercase text-foreground/30 mt-1 block">
                  {r.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENTLY VIEWED */}
      {recentProducts.length > 0 && (
        <section className="py-24 px-6 mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Atgriezties uz</p>
            <h2 className="font-display text-3xl">Nesen skatītiem</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {recentProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* NEWSLETTER */}
      <section className="py-32 px-6 text-center max-w-3xl mx-auto">
        <h3 className="font-display text-4xl md:text-5xl mb-6">
            Uzziniet pirmais par atlaidēm</h3>
        <p className="text-foreground/60 text-sm font-light mb-12 tracking-wide max-w-md mx-auto">
          Kā arī par jaunumiem, īpašiem piedāvājumiem.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col md:flex-row gap-4"
        >
          <input
            type="email"
            required
            placeholder="E-Pasts"
            className="flex-1 bg-transparent border-b border-border py-4 px-2 focus:outline-none focus:border-gold transition-colors text-sm placeholder:text-foreground/30"
          />
          <button className="bg-foreground text-background px-10 py-4 text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-gold hover:text-primary-foreground transition-colors">
            Pievienoties
          </button>
        </form>
      </section>
    </div>
  );
}
