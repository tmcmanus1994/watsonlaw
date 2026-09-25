/**
 * Single source of truth for firm identity and contact details.
 *
 * ⚠️ THE NAME IS STILL NOT SETTLED. As of 16 September the Secretary of
 * State has not accepted "Watson & Watson LLP" — they lost the filing, then
 * rejected the name on one employee's reading of the statute, and their
 * legal team is reviewing it. The client's fallback is
 * "Watson & Watson, Attorneys at Law, LLP".
 *
 * That fallback matters to the wordmark, not just to this file. The lockup
 * sets `entitySuffix()` beneath the name in wide tracking, and the suffix
 * goes from "LLP" (3 characters) to ", Attorneys at Law, LLP" (23) — see
 * the note in components/BrandMark.tsx before switching.
 *
 * The domain (watsonlawllp.com) IS registered and the site is served from
 * it. That closed the launch blocker the earlier note here described — but
 * see contactEmail and contactRecipients below: a resolving domain is not
 * a provisioned mailbox, and the two failures look identical from outside.
 *
 * Nothing outside this file may hardcode the name — nav, footer, wordmark,
 * monogram, metadata, JSON-LD and email subjects all read from here, so a
 * name change stays a one-file edit.
 */

/**
 * The site's own address, in order of preference:
 *
 * 1. NEXT_PUBLIC_SITE_URL — set this once the real domain is registered.
 * 2. The Vercel branch URL — stable across pushes to the same branch, so
 *    preview builds get correct canonical and OG URLs without anyone
 *    setting a variable per deployment. This is the review-round case.
 * 3. The per-deployment Vercel URL — changes every push, but still better
 *    than a placeholder.
 * 4. example.com, so local builds are obviously not the real thing.
 *
 * Vercel exposes 2 and 3 automatically while "Automatically expose System
 * Environment Variables" is on (the default). Both are bare hostnames, so
 * the scheme is added here.
 */
function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;

  const host =
    process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL;
  if (host) return `https://${host}`;

  return "https://example.com";
}

export const site = {
  name: "Watson & Watson",
  legalName: "Watson & Watson LLP",
  /*
   * No tagline. The hero and footer both carried "Appellate &
   * Constitutional Litigation · Arkansas" until the client asked for it
   * removed — they do not want to be read as limited to one region or one
   * practice area. `description` below is metadata only and still names
   * both, which is where search engines look.
   */
  description:
    "An appellate and constitutional litigation firm in Arkansas, practicing before the Arkansas courts, the U.S. Courts of Appeals, and the Supreme Court of the United States.",

  /**
   * Canonical URL, used for metadataBase, canonical links, JSON-LD and the
   * sitemap. Resolved by siteUrl() below.
   */
  url: siteUrl(),

  /**
   * Two offices, each with the attorney who answers it. The client settled
   * this in the September review: they want North Little Rock and Searcy
   * named, the way multi-office Arkansas firms present themselves, rather
   * than the single vague region the site carried while the question was
   * open.
   *
   * Still no street address — only a city, a name and a number.
   */
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

  /**
   * Correspondence address. Real, and still NOT rendered anywhere: the
   * client asked for cities and offices back but said nothing about a
   * mailing address, so it stays out until they do. Also kept out of the
   * JSON-LD.
   *
   * To bring it back: render it in the /contact aside and restore the
   * PostalAddress block in lib/structured-data.ts.
   */
  mailingAddress: {
    line1: "PO Box 707",
    city: "Searcy",
    /* Postal abbreviation, for an address block. Prose uses `stateName`
       below: Noah asked on 25 September for the footer to spell Arkansas
       out, and an address label and a sentence want different forms. */
    state: "AR",
    zip: "72145-0707",
  },

  /** The state written out, for anywhere that reads as prose. */
  stateName: "Arkansas",

  /**
   * The address shown to visitors.
   *
   * ⚠️ NOT CONFIRMED TO RECEIVE. The client named this as the firm's
   * general contact address in the September review, and it is printed on
   * /contact in their own intake wording. The domain is registered now, so
   * the address at least can exist — but nobody has yet sent mail to it
   * and watched it arrive. An unprovisioned box bounces silently from the
   * sender's point of view, and this address is public. Test it.
   */
  contactEmail: "watson@watsonlawllp.com",

  /**
   * Where the contact form delivers.
   *
   * The general address, on Noah's instruction of 25 September: "Please
   * have the contact form send e-mails to watson@watsonlawllp.com." It
   * replaces the two individual addresses, so neither attorney is now a
   * recipient — enquiries reach them through whatever that box forwards
   * to, which is the firm's arrangement to make, not this file's.
   *
   * Reply-to is set to the enquirer, so answering goes straight back to
   * them. Adding a recipient is an edit to this array and nothing else.
   *
   * ⚠️ This is only as good as the mailbox behind it. The domain
   * resolves, but a registered domain does not mean an address exists:
   * mail to an unprovisioned box bounces, and Resend reports the send as
   * accepted, so the form will look fine while every enquiry goes nowhere.
   * Send a real message through the live form and confirm it arrives
   * before telling anyone the site is open for business.
   */
  contactRecipients: ["watson@watsonlawllp.com"],

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
