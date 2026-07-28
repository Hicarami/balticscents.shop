import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useShop, priceForSize } from "@/lib/shop-store";
import { getProduct } from "@/lib/products";
import { Send, Truck } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Apmaksa" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cart, subtotal, clearCart } = useShop();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const customer = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      postalCode: formData.get("postalCode") as string,
      country: formData.get("country") as string,
    };

    // Construct enriched item list from store
    const items = cart
      .map((item) => {
        const p = getProduct(item.id);
        if (!p) return null;
        const unitPrice = priceForSize(p.price, item.size);
        return {
          id: item.id,
          name: p.name,
          size: item.size,
          qty: item.qty,
          unitPrice,
          totalPrice: unitPrice * item.qty,
        };
      })
      .filter(Boolean);

    try {
      const response = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          items,
          subtotal,
          shipping,
          total,
        }),
      });

      if (!response.ok) {
        throw new Error("Neizdevās nosūtīt pasūtījumu. Lūdzu, mēģiniet vēlreiz.");
      }

      clearCart();
      navigate({ to: "/checkout/confirmation" });
    } catch (err: any) {
      setErrorMsg(err.message || "Radās negaidīta kļūda.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12">
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">
          Tiešā pieprasījuma noformēšana
        </p>
        <h1 className="font-display text-5xl">Pasūtījums tiks apstrādāts</h1>
      </div>

      <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16">
        <div className="space-y-12">
          <section>
            <h2 className="font-display text-2xl mb-6 flex items-center gap-3">
              <Truck className="h-5 w-5 text-gold" /> Informācija par piegādi un saziņu
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Vārds" name="firstName" required />
              <Field label="Uzvārds" name="lastName" required />
              <Field label="E-Pasts" name="email" type="email" required className="sm:col-span-2" />
              <Field label="Telefona numurs" name="phone" type="tel" required className="sm:col-span-2" />
              <Field label="Adrese" name="address" required className="sm:col-span-2" />
              <Field label="Pilsēta" name="city" required />
              <Field label="Postal Code" name="postalCode" required />
              <Field label="Valsts" name="country" required defaultValue="Latvia" className="sm:col-span-2" />
            </div>
          </section>

          {errorMsg && (
            <p className="text-sm text-red-400 bg-red-950/30 border border-red-800 p-4 rounded-sm">
              {errorMsg}
            </p>
          )}
        </div>

        <aside className="bg-charcoal/40 p-8 h-fit sticky top-28 rounded-sm">
          <h2 className="font-display text-2xl mb-6">Pasūtījuma kopsavilkums</h2>
          <div className="space-y-4 mb-6 max-h-72 overflow-y-auto">
            {cart.map((item) => {
              const p = getProduct(item.id);
              if (!p) return null;
              return (
                <div key={`${item.id}-${item.size}`} className="flex gap-4">
                  <div className="h-16 w-14 bg-charcoal shrink-0 overflow-hidden rounded-sm">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-display truncate">{p.name}</p>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-foreground/50">
                      {item.size}ml · Qty {item.qty}
                    </p>
                  </div>
                  <span className="text-sm text-gold shrink-0">
                    ${priceForSize(p.price, item.size) * item.qty}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-border pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-foreground/60">Starpsumma</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/60">Piegāde</span>
              <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
            </div>
            <div className="flex justify-between font-display text-2xl pt-3 border-t border-border mt-3">
              <span>Kopā</span>
              <span className="text-gold">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || cart.length === 0}
            className="w-full mt-6 bg-gold hover:bg-gold-light text-primary-foreground py-4 text-[10px] tracking-[0.25em] uppercase font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Send className="h-3.5 w-3.5" />
            {submitting ? "Pasūtījuma nosūtīšana..." : "Iesniegt pasūtījuma pieprasījumu"}
          </button>

          <p className="text-[10px] text-foreground/40 mt-4 text-center tracking-wide">
            Jūsu dati tiks nosūtīti tieši mūsu pārdošanas komandai apstrādei.
          </p>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  className = "",
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={"flex flex-col gap-2 " + className}>
      <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/60">{label}</span>
      <input
        {...rest}
        className="bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-foreground/30"
      />
    </label>
  );
}