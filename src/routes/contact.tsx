import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Kontakti" },
      { name: "description", content: " Sazinieties ar mums pa e-pastu." },
      { property: "og:title", content: "Kontakti - Moross" },
      { property: "og:description", content: "Moross" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-16 text-center max-w-2xl mx-auto">
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Moross</p>
        <h1 className="font-display text-5xl md:text-6xl mb-6">Kontakti</h1>
        <p className="text-foreground/60">
          klientu apkalpošanas komanda
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-8">
          {[
            { icon: Phone, t: "Telefons", d: "+371 6000 4000\nPirmd. – Svētd. · 8:00 rīta līdz 17:00 vakara" },
            { icon: Mail, t: "E-Pasts", d: "Negribuarjumsrunāt@gmail.com" },
          ].map((item) => (
            <div key={item.t} className="flex gap-6 items-start">
              <div className="grid h-12 w-12 place-items-center rounded-full border border-gold text-gold shrink-0">
                <item.icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-[10px] tracking-[0.25em] uppercase text-gold mb-2">{item.t}</h3>
                <p className="text-foreground/70 whitespace-pre-line leading-relaxed">{item.d}</p>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            toast.success("Ziņojums nosūtīts. Mēs atbildēsim 24 stundu laikā.");
          }}
          className="glass p-8 md:p-10 rounded-sm space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ContactField label="Vārds" required />
            <ContactField label="Uzvārds" required />
          </div>
          <ContactField label="E-pasts" type="email" required />
          <ContactField label="Tēma" required />
          <label className="flex flex-col gap-2">
            <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/60">ziņojums</span>
            <textarea
              required
              rows={5}
              className="bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors resize-none"
            />
          </label>
          <button
            disabled={sent}
            className="w-full bg-gold hover:bg-gold-light text-primary-foreground py-4 text-[10px] tracking-[0.25em] uppercase font-bold transition-colors inline-flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {sent ? "Sent" : (<><Send className="h-3.5 w-3.5" /> Sūtīt ziņu</>)}
          </button>
        </form>
      </div>
    </div>
  );
}

function ContactField({ label, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/60">{label}</span>
      <input
        {...rest}
        className="bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
      />
    </label>
  );
}
