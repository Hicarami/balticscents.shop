import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-charcoal/40 pt-24 pb-12 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-xl tracking-[0.25em] uppercase text-gold mb-6">
              Moross
            </div>
            <p className="text-foreground/50 text-xs leading-loose font-light">
              Rīga Latvia
              <br />
            </p>
            <div className="flex gap-4 mt-8">
              <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-gold hover:text-gold transition-colors">
                <Instagram className="h-3.5 w-3.5" />
              </a>
              <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-gold hover:text-gold transition-colors">
                <Facebook className="h-3.5 w-3.5" />
              </a>
              <a href="#" aria-label="Twitter" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-gold hover:text-gold transition-colors">
                <Twitter className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
          <div>
            <ul className="space-y-4 text-xs text-foreground/50 font-light">
              <li><Link to="/shop" className="hover:text-gold transition-colors">Visas Smaržas</Link></li>
              <li><Link to="/shop" className="hover:text-gold transition-colors">Visvairāk pirktie</Link></li>
              <li><Link to="/shop" className="hover:text-gold transition-colors">Jaunumi</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-foreground mb-6">Pakalpojumi</h4>
            <ul className="space-y-4 text-xs text-foreground/50 font-light">
              <li><Link to="/contact" className="hover:text-gold transition-colors">Kontakti</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">Par mums</Link></li>
              <li><Link to="/wishlist" className="hover:text-gold transition-colors">Vēlmju saraksts</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-foreground mb-6">Mūsu kontakti</h4>
            <ul className="space-y-4 text-xs text-foreground/50 font-light">
              <li className="flex items-start gap-2"><MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0 text-gold" /> Rīga, Latvia</li>
              <li className="flex items-start gap-2"><Phone className="h-3.5 w-3.5 mt-0.5 shrink-0 text-gold" /> +371 230 405</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-border/60 gap-6">
          <p className="text-[10px] text-foreground/30 tracking-[0.15em] uppercase">
            © 2026 Moross. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[10px] text-foreground/40 tracking-[0.15em] uppercase">
            <span>Latviešu (LV)</span>
            <span>EUR €</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
