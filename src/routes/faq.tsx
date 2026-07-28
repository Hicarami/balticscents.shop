import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Noir Essence" },
      { name: "description", content: "Frequently asked questions about Noir Essence fragrances, shipping, returns, and authenticity." },
      { property: "og:title", content: "FAQ — Noir Essence" },
      { property: "og:description", content: "Answers about ordering, shipping, returns, and authenticity." },
    ],
  }),
  component: FaqPage,
});

const groups = [
  {
    title: "Orders & Shipping",
    items: [
      { q: "How long does shipping take?", a: "Domestic orders arrive in 3–5 business days via express courier. International orders arrive in 5–10 business days. All orders ship with tracking." },
      { q: "Is shipping free?", a: "Complimentary express shipping is included on all orders over $150. Below that, a flat rate of $15 applies." },
      { q: "Do you ship internationally?", a: "Yes, we ship to over 40 countries. Import duties are the responsibility of the recipient." },
    ],
  },
  {
    title: "Fragrance & Product",
    items: [
      { q: "How long does a bottle last?", a: "A 100ml bottle used twice daily typically lasts 8–10 months. Stored properly (cool, away from light), the juice remains at peak for 3–5 years." },
      { q: "Are your fragrances vegan?", a: "All Noir Essence compositions are vegan and cruelty-free. We do not use animal-derived ingredients." },
      { q: "How do I choose my signature scent?", a: "Book a virtual consultation with our concierge, or order a discovery set of five 5ml vials to explore at home." },
    ],
  },
  {
    title: "Returns & Authenticity",
    items: [
      { q: "What is your return policy?", a: "Unopened bottles may be returned within 30 days for a full refund. Opened bottles are eligible for store credit within 14 days." },
      { q: "Are your fragrances authentic?", a: "Every bottle is distilled and filled in our Grasse atelier, and ships with a serial number verifiable on our site." },
      { q: "Do you offer gift wrapping?", a: "Yes. Every order arrives in a signature black lacquered box with hand-tied gold ribbon at no additional cost." },
    ],
  },
];

function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <div className="mb-16 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Answers</p>
        <h1 className="font-display text-5xl md:text-6xl">Frequently Asked</h1>
      </div>
      <div className="space-y-12">
        {groups.map((g) => (
          <section key={g.title}>
            <h2 className="font-display text-2xl mb-6 italic">{g.title}</h2>
            <Accordion type="single" collapsible className="w-full">
              {g.items.map((item, i) => (
                <AccordionItem key={i} value={`${g.title}-${i}`} className="border-border">
                  <AccordionTrigger className="text-left text-base hover:text-gold hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/70 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}
      </div>
    </div>
  );
}
