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
  // README: Fonts). No italic face is shipped — nothing sets italic serif.
  src: [
    {
      path: "./fonts/source-serif-4-latin-opsz-normal.woff2",
      weight: "200 900",
      style: "normal",
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
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
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
