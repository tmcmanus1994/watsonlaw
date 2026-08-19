/**
 * Single source of truth for firm identity and contact details.
 *
 * The firm name is NOT yet registered with the Arkansas Secretary of State.
 * Nothing outside this file may hardcode the name — nav, footer, metadata,
 * JSON-LD, and email templates all read from here. When the name lands,
 * updating `name` (and `legalName`) below is the entire change.
 */

export const site = {
  /** Display name used in nav, titles, footer. Placeholder until registration. */
  name: "[Firm Name]",
  /** Formal registered entity name for JSON-LD / legal contexts. */
  legalName: "[Firm Name, PLLC]",
  tagline: "Appellate & Constitutional Litigation", // descriptive, not brand copy
  description:
    "A father-and-son appellate and constitutional litigation boutique in Little Rock, Arkansas.",

  /** Canonical production URL. Vercel preview URLs are injected via env. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",

  address: {
    street: "[Street Address]",
    city: "Little Rock",
    state: "AR",
    zip: "[ZIP]",
  },
  phone: "[Phone]",
  email: "[email@example.com]",

  /** Where the contact form delivers. Placeholder until the client confirms. */
  contactRecipient: "[intake@example.com]",

  /** Add entries as the client provides them, e.g. { label: "LinkedIn", href: "..." } */
  socials: [] as { label: string; href: string }[],
} as const;

export type Site = typeof site;
