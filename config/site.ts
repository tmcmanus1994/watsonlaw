/**
 * Single source of truth for firm identity and contact details.
 *
 * ⚠️ The name "Watson & Watson LLP" is the expected filing but is NOT yet
 * registered with the Arkansas Secretary of State, and the expected domain
 * (watsonlawllp.com) is NOT bought. Nothing outside this file may hardcode
 * the name — nav, footer, wordmark, monogram, metadata, JSON-LD, and email
 * subjects all read from here, so a name change stays a one-file edit.
 */

export const site = {
  name: "Watson & Watson",
  legalName: "Watson & Watson LLP",
  /** Kicker line used in the hero and metadata. */
  tagline: "Appellate & Constitutional Litigation · Arkansas",
  description:
    "An appellate and constitutional litigation firm in Arkansas, practicing before the Arkansas courts, the U.S. Courts of Appeals, and the Supreme Court of the United States.",

  /** Canonical production URL. Vercel preview URLs are injected via env. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",

  offices: [
    {
      city: "North Little Rock",
      attorney: "Noah P. Watson",
      phone: "(501) 388-4514",
    },
    {
      city: "Searcy",
      attorney: "Brett D. Watson",
      phone: "(501) 281-2468",
    },
  ],
  mailingAddress: {
    line1: "PO Box 707",
    city: "Searcy",
    state: "AR",
    zip: "72145-0707",
  },

  /** Contact form submissions deliver to BOTH addresses. */
  contactRecipients: ["watson@bdwpllc.com", "noah.watson57@gmail.com"],

  jurisdictions: [
    "Arkansas courts",
    "United States Courts of Appeals",
    "Supreme Court of the United States",
  ],

  /**
   * Optional .lottie file for the animated wordmark (Trav is producing it).
   * When the file lands, put it in /public/media and set the path here —
   * BrandMark hydrates it automatically; static mark ships until then.
   */
  brandLottieSrc: null as string | null,

  /** Add entries as the client provides them. */
  socials: [] as { label: string; href: string }[],
} as const;

export type Site = typeof site;

/**
 * Entity suffix ("LLP") derived from the legal name, so the wordmark keeps
 * working if the name or suffix changes.
 */
export function entitySuffix(): string {
  return site.legalName.startsWith(site.name)
    ? site.legalName.slice(site.name.length).trim()
    : "";
}

/**
 * The wordmark stacks the name on two lines, split at the ampersand
 * ("WATSON &" / "WATSON"). Falls back to a single line without one.
 */
export function wordmarkLines(): string[] {
  const i = site.name.indexOf("&");
  if (i === -1) return [site.name];
  return [site.name.slice(0, i + 1).trim(), site.name.slice(i + 1).trim()];
}

/**
 * Monogram initials — first letter of each name segment around the
 * ampersand (W / W today), stacked with the oxblood rule between.
 */
export function monogramInitials(): string[] {
  return site.name
    .split("&")
    .map((part) => part.trim().charAt(0).toUpperCase())
    .filter(Boolean);
}
