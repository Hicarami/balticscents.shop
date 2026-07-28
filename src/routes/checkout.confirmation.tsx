import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/checkout/confirmation")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — Noir Essence" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ConfirmationPage,
});

function ConfirmationPage() {
  const orderId = `NE-${Math.floor(100000 + Math.random() * 900000)}`;
  return (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold text-gold mb-8">
        <Check className="h-8 w-8" />
      </div>
      <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Order Confirmed</p>
      <h1 className="font-display text-5xl md:text-6xl mb-6">Thank you.</h1>
      <p className="text-foreground/60 mb-2">Your order <span className="text-gold">{orderId}</span> has been received.</p>
      <p className="text-foreground/60 mb-10 text-sm">
        A confirmation with tracking details will arrive in your inbox shortly. Expected delivery: 3–5 business days.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/shop"
          className="bg-gold hover:bg-gold-light text-primary-foreground px-10 py-4 text-[10px] tracking-[0.25em] uppercase font-bold transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          to="/"
          className="border border-border hover:border-gold hover:text-gold px-10 py-4 text-[10px] tracking-[0.25em] uppercase font-medium transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
