/**
 * The five practice areas. Real blurbs (~75–125 words) are being written by
 * the attorneys and land ~Aug 24 — swapping them in is an edit to this file
 * only. All copy below is placeholder filler sized to the real word counts.
 */

export type PracticeArea = {
  slug: string;
  title: string;
  /** One-line summary used on cards and metadata descriptions. */
  summary: string;
  /** ~75–125 words, shown at the top of the practice page. */
  blurb: string;
  /** Longer placeholder body, rendered as paragraphs. */
  body: string[];
};

const PLACEHOLDER_NOTE = "[Placeholder copy — attorney-drafted text replaces this.]";

const LOREM_SHORT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.";

const LOREM_LONG =
  LOREM_SHORT +
  " Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.";

export const practiceAreas: PracticeArea[] = [
  {
    slug: "appeals",
    title: "Appeals",
    summary: "[Placeholder] State and federal appellate representation.",
    blurb: `${PLACEHOLDER_NOTE} ${LOREM_SHORT}`,
    body: [LOREM_LONG, LOREM_SHORT, LOREM_LONG],
  },
  {
    slug: "constitutional-litigation",
    title: "Constitutional Litigation",
    summary: "[Placeholder] Litigation of constitutional questions at every level.",
    blurb: `${PLACEHOLDER_NOTE} ${LOREM_SHORT}`,
    body: [LOREM_LONG, LOREM_SHORT, LOREM_LONG],
  },
  {
    slug: "amicus-briefing",
    title: "Amicus Briefing & Strategy",
    summary: "[Placeholder] Amicus curiae briefs and coordinated amicus strategy.",
    blurb: `${PLACEHOLDER_NOTE} ${LOREM_SHORT}`,
    body: [LOREM_LONG, LOREM_SHORT, LOREM_LONG],
  },
  {
    slug: "election-law",
    title: "Election Law",
    summary: "[Placeholder] Election-related disputes, compliance, and litigation.",
    blurb: `${PLACEHOLDER_NOTE} ${LOREM_SHORT}`,
    body: [LOREM_LONG, LOREM_SHORT, LOREM_LONG],
  },
  {
    slug: "litigation-strategy",
    title: "Litigation Strategy",
    summary: "[Placeholder] Case framing and strategy consulting for trial teams.",
    blurb: `${PLACEHOLDER_NOTE} ${LOREM_SHORT}`,
    body: [LOREM_LONG, LOREM_SHORT, LOREM_LONG],
  },
];

export function getPracticeArea(slug: string): PracticeArea | undefined {
  return practiceAreas.find((p) => p.slug === slug);
}
