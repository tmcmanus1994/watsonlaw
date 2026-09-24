import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/config/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { legalServiceJsonLd } from "@/lib/structured-data";
import "./globals.css";

/* The two approved families, self-hosted (variable woff2, OFL-1.1, from
 * Google Fonts via fontsource) — exposed as CSS variables consumed only by
 * app/tokens.css (--font-serif / --font-label). Self-hosting also means no
 * request to Google from visitors' browsers. */
const sourceSerif = localFont({
  // The two-axis cut (wght + opsz 8–60), i.e. the same font Google Fonts
  // and the Figma file use. The optical-size axis is what makes small text
  // render with sturdier strokes and headings stay refined; the wght-only
  // cut cannot do that and read noticeably thinner at body sizes.
  // Subset to Latin + the accents and punctuation this site can render (see
  // README: Fonts); the italic is subset to exactly the same coverage.
  //
  // The italic face matters more than it looks: legal writing italicises
  // case names and publication titles, and markdown in a news post can
  // emit <em> at any time. Without a real italic the browser synthesises a
  // slant, which on a serif reads as a mistake.
  src: [
    {
      path: "./fonts/source-serif-4-latin-opsz-normal.woff2",
      weight: "200 900",
      style: "normal",
    },
    {
      path: "./fonts/source-serif-4-latin-opsz-italic.woff2",
      weight: "200 900",
      style: "italic",
    },
  ],
  variable: "--font-source-serif",
  display: "swap",
});
const libreFranklin = localFont({
  src: [
    {
      path: "./fonts/libre-franklin-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-libre-franklin",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    // The tagline used to follow the name here. It named a region and a
    // practice area, which the client asked to drop site-wide; `description`
    // below still carries both for search.
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  /*
   * The card image itself is app/opengraph-image.tsx, which Next wires
   * into both og: and twitter: automatically. This only asks the clients
   * that read twitter:card — X, and several chat apps that follow it — for
   * the large format rather than the small thumbnail beside a text block.
   */
  twitter: { card: "summary_large_image" },
  /*
   * Preview deployments are shared with the client with protection off, so
   * the URL is effectively public. Keep every non-production build out of
   * the index — robots.txt alone would not stop a crawler that reaches a
   * page by link. See app/robots.ts.
   */
  ...(process.env.VERCEL_ENV === "production"
    ? {}
    : { robots: { index: false, follow: false } }),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${libreFranklin.variable}`}>
      <body className="relative flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-20 focus:bg-paper focus:px-3 focus:py-2"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={legalServiceJsonLd()} />
      </body>
    </html>
  );
}
