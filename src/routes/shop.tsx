import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, families, genders, type Family, type Gender } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Search, SlidersHorizontal } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Smaržas" },
      { name: "description", content: "Aplūkojiet pilnu Moross aromātu kolekciju. Filtrējiet pēc aromātu grupas, dzimuma, tilpuma un cenas." },
      { property: "og:title", content: "Smaržu veikals - Moross" },
      { property: "og:description", content: "Aplūkojiet pilnu Moross aromātu kolekciju." },
    ],
  }),
  component: ShopPage,
});

type Sort = "newest" | "popularity" | "price-asc" | "price-desc" | "rating";

function ShopPage() {
  const [query, setQuery] = useState("");
  const [fam, setFam] = useState<Family[]>([]);
  const [gen, setGen] = useState<Gender[]>([]);
  const [size, setSize] = useState<number[]>([]);
  const [maxPrice, setMaxPrice] = useState(400);
  const [sort, setSort] = useState<Sort>("popularity");
  const [openFilters, setOpenFilters] = useState(false);

  const results = useMemo(() => {
    let list = [...products];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.family.toLowerCase().includes(q));
    }
    if (fam.length) list = list.filter((p) => fam.includes(p.family));
    if (gen.length) list = list.filter((p) => gen.includes(p.gender));
    if (size.length) list = list.filter((p) => p.sizes.some((s) => size.includes(s)));
    list = list.filter((p) => p.price <= maxPrice);
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "newest": list.sort((a, b) => Number(!!b.newest) - Number(!!a.newest)); break;
      case "popularity": list.sort((a, b) => b.reviews - a.reviews); break;
    }
    return list;
  }, [query, fam, gen, size, maxPrice, sort]);

  const toggle = <T,>(setter: (v: T[]) => void, list: T[], value: T) =>
    setter(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);

  const FiltersPanel = (
    <aside className="space-y-8">
      <div>
        <h4 className="text-[10px] tracking-[0.25em] uppercase text-gold mb-4">Smaržu grupa</h4>
        <div className="space-y-2">
          {families.map((f) => (
            <label key={f} className="flex items-center gap-3 text-sm cursor-pointer group">
              <input
                type="checkbox"
                checked={fam.includes(f)}
                onChange={() => toggle(setFam, fam, f)}
                className="accent-gold h-4 w-4"
              />
              <span className="group-hover:text-gold transition-colors">{f}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-[10px] tracking-[0.25em] uppercase text-gold mb-4">Dzimums</h4>
        <div className="space-y-2">
          {genders.map((g) => (
            <label key={g} className="flex items-center gap-3 text-sm cursor-pointer group">
              <input
                type="checkbox"
                checked={gen.includes(g)}
                onChange={() => toggle(setGen, gen, g)}
                className="accent-gold h-4 w-4"
              />
              <span className="group-hover:text-gold transition-colors">{g}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-[10px] tracking-[0.25em] uppercase text-gold mb-4">Izmērs</h4>
        <div className="flex gap-2">
          {[50, 100].map((s) => (
            <button
              key={s}
              onClick={() => toggle(setSize, size, s)}
              className={
                "px-4 py-2 text-xs tracking-widest border transition-colors " +
                (size.includes(s) ? "border-gold text-gold" : "border-border text-foreground/60 hover:border-gold/50")
              }
            >
              {s}ml
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-[10px] tracking-[0.25em] uppercase text-gold mb-4">Maksimāla cena: €{maxPrice}</h4>
        <input
          type="range"
          min={100}
          max={400}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-gold"
        />
      </div>
      <div>
        <h4 className="text-[10px] tracking-[0.25em] uppercase text-gold mb-4">Brands</h4>
        <label className="flex items-center gap-3 text-sm cursor-pointer">
          <input type="checkbox" defaultChecked className="accent-gold h-4 w-4" />
          <span>Moross</span>
        </label>
      </div>
    </aside>
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Boutique</p>
        <h1 className="font-display text-5xl md:text-6xl">Visas smaržas</h1>
        <p className="text-foreground/60 text-sm mt-4">{results.length} of {products.length} scents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12">
        <div className="hidden md:block sticky top-28 self-start">{FiltersPanel}</div>

        <div>
          <div className="flex flex-wrap gap-3 mb-8 items-center">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Meklēt smaržas..."
                className="w-full bg-charcoal/40 border border-border pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-foreground/30"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="bg-charcoal/40 border border-border py-3 px-4 text-xs tracking-widest uppercase focus:outline-none focus:border-gold"
            >
              <option value="popularity">Populārs</option>
              <option value="newest">Jaunāks</option>
              <option value="price-asc">Cena: zemāka</option>
              <option value="price-desc">Cena: Augstāka</option>
              <option value="rating">Pēc vērtējuma</option>
            </select>
            <button
              onClick={() => setOpenFilters((o) => !o)}
              className="md:hidden flex items-center gap-2 border border-border px-4 py-3 text-[10px] tracking-[0.2em] uppercase"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" /> Filtrs
            </button>
          </div>

          {openFilters && (
            <div className="md:hidden mb-8 p-6 border border-border rounded-sm">
              {FiltersPanel}
            </div>
          )}

          {results.length === 0 ? (
            <div className="py-24 text-center text-foreground/50">
              <p className="font-display text-2xl mb-2">Neviens aromāts neatbilst jūsu meklējumam..</p>
              <p className="text-sm">Mēģiniet pielāgot filtrus.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
