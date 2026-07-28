import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ShopProvider } from "@/lib/shop-store";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { QuickViewDialog } from "@/components/quick-view-dialog";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-6">Error 404</p>
        <h1 className="font-display text-6xl text-foreground">Lapa nav atrasta</h1>
        <p className="mt-4 text-sm text-foreground/60">
          Meklētā lapa ir izgaisusi ēterā.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-gold px-8 py-4 text-[10px] tracking-[0.25em] uppercase font-bold text-primary-foreground hover:bg-gold-light transition-colors"
          >
            Atgriezties mājās
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-foreground">Kaut kas nogāja greizi</h1>
        <p className="mt-3 text-sm text-foreground/60">
          Atsvaidziniet lapu vai atgriezieties sākuma veikalā.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-gold px-6 py-3 text-[10px] tracking-[0.25em] uppercase font-bold text-primary-foreground hover:bg-gold-light transition-colors"
          >
            Mēģiniet vēlreiz
          </button>
          <a
            href="/"
            className="border border-border px-6 py-3 text-[10px] tracking-[0.25em] uppercase font-medium hover:border-gold hover:text-gold transition-colors"
          >
            atpakaļ mājās
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Moross" },
      {
        name: "description",
        content:
          "..",
      },
      { name: "author", content: "Moross" },
      { property: "og:title", content: "Moross — ekskluzīvu smaržu darbnīca" },
      {
        property: "og:description",
        content: "Ar rokām darinātas smaržas tiem, kuri izstaro klātbūtnes spēku.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ShopProvider>
        <SiteHeader />
        <main className="pt-20 min-h-screen">
          <Outlet />
        </main>
        <SiteFooter />
        <QuickViewDialog />
        <Toaster />
      </ShopProvider>
    </QueryClientProvider>
  );
}
