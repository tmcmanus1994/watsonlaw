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
   * Animated wordmark. Plays once on the homepage header and settles on its
   * final frame; the static typographic mark is always rendered first and
   * remains the fallback (no JS, reduced motion, or load failure).
   *
   * `artwork` is where the mark actually sits inside the composition,
   * measured from the file — the export is a 1920×1080 comp in which the
   * mark occupies ~72% of the width and is not centred. BrandMark fits the
   * mark by THIS box, not by the canvas, so it lands at the same size and
   * position as the static one. Re-measure if the file is re-exported.
   */
  brandLottie: {
    src: "/media/watson-logo.json",
    artwork: {
      x: 297,
      y: 341,
      width: 1387,
      height: 343,
      canvasWidth: 1920,
      canvasHeight: 1080,
    },
  } as {
    src: string;
    artwork: {
      x: number;
      y: number;
      width: number;
      height: number;
      canvasWidth: number;
      canvasHeight: number;
    };
  } | null,

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
