/**
 * Attorney profiles. Bios (~150–250 words) get drafted after the client
 * intake returns — swapping them in is an edit to this file only.
 * Headshots arrive week of Aug 25; replace the placeholder PNGs in
 * /public/images/attorneys at the same 4:5 ratio (800×1000) and nothing
 * else needs to change.
 */

export type Attorney = {
  slug: string;
  name: string;
  /** Role/title is the client's call — placeholder until intake returns. */
  title: string;
  headshot: {
    src: string;
    /** Descriptive alt text; update when the real photo lands. */
    alt: string;
    width: number;
    height: number;
  };
  /** Bar admissions, education, clerkships — from intake. */
  credentials: string[];
  /** ~150–250 words, rendered as paragraphs. */
  bio: string[];
  email?: string;
};

const PLACEHOLDER_NOTE = "[Placeholder bio — drafted after client intake returns.]";

const LOREM_BIO_1 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const LOREM_BIO_2 =
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt, neque porro quisquam est qui dolorem ipsum quia dolor sit amet.";

const LOREM_BIO_3 =
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint obcaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.";

export const attorneys: Attorney[] = [
  {
    slug: "brett-watson",
    name: "Brett Watson",
    title: "[Title]",
    headshot: {
      src: "/images/attorneys/brett-watson.png",
      alt: "Placeholder headshot of Brett Watson",
      width: 800,
      height: 1000,
    },
    credentials: [
      "[Bar admissions — from intake]",
      "[Education — from intake]",
      "[Clerkships & prior practice — from intake]",
    ],
    bio: [`${PLACEHOLDER_NOTE} ${LOREM_BIO_1}`, LOREM_BIO_2, LOREM_BIO_3],
  },
  {
    slug: "noah-watson",
    name: "Noah Watson",
    title: "[Title]",
    headshot: {
      src: "/images/attorneys/noah-watson.png",
      alt: "Placeholder headshot of Noah Watson",
      width: 800,
      height: 1000,
    },
    credentials: [
      "[Bar admissions — from intake]",
      "[Education — from intake]",
      "[Clerkships & prior practice — from intake]",
    ],
    bio: [`${PLACEHOLDER_NOTE} ${LOREM_BIO_1}`, LOREM_BIO_2, LOREM_BIO_3],
  },
];

export function getAttorney(slug: string): Attorney | undefined {
  return attorneys.find((a) => a.slug === slug);
}
