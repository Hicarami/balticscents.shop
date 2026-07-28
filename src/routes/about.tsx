import { createFileRoute } from "@tanstack/react-router";
import ingredients from "@/assets/ingredients.jpg";
import heroBottle from "@/assets/Obsidian_Velvet.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Par mums" },
      { property: "og:title", content: "Par Moross" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="relative h-[60svh] flex items-end overflow-hidden">
        <img src={heroBottle} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/60 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Kopš 2026</p>
          <h1 className="font-display text-5xl md:text-7xl max-w-2xl">Aromāts, kas paliek atmiņā.</h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-foreground/70 font-light leading-relaxed mb-6">
              Smaržas ir vairāk nekā aromāts — tās ir identitāte, pārliecība un neaizmirstams iespaids.

              Mūsu kolekcija ir radīta tiem, kuri novērtē kvalitāti, eleganci un izsmalcinātas detaļas. Katra smarža ir rūpīgi izvēlēta, lai sniegtu unikālu pieredzi un ļautu ikvienam atrast aromātu, kas kļūst par daļu no viņa stāsta.
          </p>
          <p className="text-lg text-foreground/70 font-light leading-relaxed">
            Atklājiet aromātus, kas iedvesmo, izceļ jūsu individualitāti un piešķir eleganci ikvienam mirklim.
          </p>
        </div>
      </section>
    </div>
  );
}
