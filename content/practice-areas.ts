/**
 * The five practice areas, in the approved order.
 *
 * Blurbs are the client's own words from the intake (Part 3), verbatim —
 * do not alter beyond punctuation/consistency without client approval. The
 * short index descriptions are also theirs, written for the September
 * review; they replaced both the deck's copy and the first-sentence
 * derivation that stood in for the areas that had none.
 *
 * The Roman numerals the deck specified are gone at the client's request.
 */

export type AreaImage = {
  src: string;
  /** Descriptive alt for the practice page header; the index pane is decorative. */
  alt: string;
  width: number;
  height: number;
};

export type PracticeArea = {
  slug: string;
  title: string;
  /**
   * This area's photograph: the practice-index hover pane and this area's
   * page header. Delivered 24 September as one graded set — five square
   * frames of the Arkansas State Capitol and the Pulaski County
   * Courthouse, all shot at the same golden hour, so the five finally read
   * as one set rather than two temperatures.
   *
   * They are square; both slots are `fill` + `object-cover` (a 4:5 pane, a
   * wide header band), so each is centre-cropped and the assignment below
   * is a one-line swap with no layout consequence.
   */
  image?: AreaImage;
  /**
   * The line shown on the practice index. Client-written, verbatim, from
   * the September review — every area now has one, so nothing is derived.
   */
  indexDescription: string;
  /** One-line summary for metadata (first sentence of the client's blurb). */
  summary: string;
  /** The client's full blurb, verbatim, rendered as paragraphs. */
  body: string[];
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "appeals",
    image: {
      src: "/images/courts/detail-appeals.webp",
      alt: "The Arkansas and United States flags above the Pulaski County Courthouse cornice",
      width: 1800,
      height: 1800,
    },
    title: "Appeals",
    indexDescription:
      "Handling all appeal-related aspects of litigation: postjudgment motions; notices of appeal; briefing; oral arguments; and petitions for rehearing, review, and certiorari in state and federal courts.",
    summary:
      "We litigate appeals before all levels of Arkansas and federal courts.",
    body: [
      "We litigate appeals before all levels of Arkansas and federal courts: the Arkansas Supreme Court and Court of Appeals, the Supreme Court of the United States, and the United States Courts of Appeals. We’ve handled more than 450 appeals, encompassing Arkansas and federal constitutional law, complex statutory schemes, election law, voting rights, business disputes, property conflicts, administrative appeals, and more. We bring a wealth of knowledge and experience; we know how appellate courts think, understand appellate procedure, prepare effective briefs, and present persuasive oral arguments.",
    ],
  },
  {
    slug: "litigation-strategy",
    image: {
      src: "/images/courts/detail-litigation-strategy.webp",
      alt: "The dome of the Arkansas State Capitol at sunset",
      width: 1800,
      height: 1800,
    },
    title: "Litigation Strategy",
    indexDescription:
      "Providing trial-court litigation strategy, including drafting of and consultation on pleadings, motions, jury instructions, and other critical decisions from prefiling through trial.",
    summary:
      "We help clients and their trial attorneys develop forward-looking strategies from before a complaint is filed through trial.",
    body: [
      "We help clients and their trial attorneys develop forward-looking strategies from before a complaint is filed through trial. In high-stakes and novel disputes, we draft, edit, and argue dispositive trial motions, like motions to dismiss and motions for summary judgment; ensure issues are preserved for appellate review; and build trial-court records, which often shape the outcome of future appeals. For the important decisions that are made long before trial, we think ahead to best secure our clients’ interests throughout litigation.",
    ],
  },
  {
    slug: "constitutional-litigation",
    indexDescription:
      "Litigating Arkansas and U.S. constitutional issues with comprehensive knowledge from experience defending and challenging government actions.",
    image: {
      src: "/images/courts/detail-constitutional-litigation.webp",
      alt: "The west front of the Arkansas State Capitol, dome and portico seen head-on",
      width: 1800,
      height: 1800,
    },
    title: "Constitutional Litigation",
    summary:
      "We bring extensive experience in both Arkansas and U.S. constitutional issues.",
    body: [
      "We bring extensive experience in both Arkansas and U.S. constitutional issues. We have defended and challenged legislative and executive actions, so we have comprehensive knowledge of how to best advocate for our clients’ interests. And we have a unique understanding of the Arkansas Constitution, an often untapped area of constitutional protections. We have researched and written on the history of the Arkansas Constitution.",
    ],
  },
  {
    slug: "amicus-briefing",
    indexDescription:
      "Drafting amicus briefs to fill gaps in the parties’ arguments by presenting clients’ unique interests and expertise to the court.",
    image: {
      src: "/images/courts/detail-amicus-briefing.webp",
      alt: "A corner pediment of the Arkansas State Capitol against an evening sky",
      width: 1800,
      height: 1800,
    },
    title: "Amicus Briefing",
    summary:
      "We understand how to craft an amicus brief that’s most likely to win the court’s attention.",
    body: [
      "When litigation can affect nonparties, a nonparty—an amicus curiae (“friend of the court”)—can bring its unique perspective to aid the court’s decision. We understand how to craft an amicus brief that’s most likely to win the court’s attention. We don’t just echo the parties’ arguments; we fill in the gaps for the court, presenting our clients’ unique contexts and subject-matter expertise. We also assist clients in building and coordinating coalitions of amici, ensuring the aligned nonparties speak with one voice.",
    ],
  },
  {
    slug: "election-law",
    indexDescription:
      "Guiding clients through high-stakes election-law contexts, including ballot initiatives, Ethics Commission proceedings, campaign finance, and candidate eligibility.",
    image: {
      /*
       * ⚠️ Lowest-resolution frame of the five: the delivered master is
       * 816px square, where the other four are ~4000px. It is ample for
       * the 21rem index pane but soft as this page's full-width header on
       * a large display. A re-export at the set's native size drops
       * straight in — same name, nothing else to change.
       */
      src: "/images/courts/detail-election-law.webp",
      alt: "The colonnade along the flank of the Arkansas State Capitol in low sun",
      width: 816,
      height: 816,
    },
    title: "Election Law",
    summary:
      "Our experience in election law is broad: ballot initiatives, campaign finance, candidate eligibility, and more.",
    body: [
      "Our experience in election law is broad: ballot initiatives, Ethics Commission proceedings, state and federal campaign finance, permissible nonprofit activities, candidate eligibility, and more. When the stakes are high—and they always are—we guide our clients through these complex areas of law to accomplish their goals.",
    ],
  },
];

export function getPracticeArea(slug: string): PracticeArea | undefined {
  return practiceAreas.find((p) => p.slug === slug);
}

/**
 * Short description for the practice index. Areas I and II have deck copy
 * (`indexDescription`); III–V fall back to the FIRST SENTENCE of the
 * client's own blurb, taken verbatim — never rewritten or summarized.
 *
 * Deriving it means the index can't drift when the client edits a blurb.
 * The splitter stops at the first sentence-ending period followed by a new
 * capitalized sentence, so mid-sentence abbreviations ("U.S.", "Ark.") do
 * not split. If a legal citation ever does trip it, the fix is to set an
 * explicit `indexDescription` on that area rather than to touch the blurb.
 */
export function indexDescriptionFor(area: PracticeArea): string {
  return area.indexDescription;
}

/**
 * Wide header image for the practice index (/practice) — the second of the
 * two wide frames, a three-quarter view of the Capitol across the lawn,
 * deliberately framed wider than the homepage hero so the two do not read
 * as the same photograph twice.
 */
export const practiceIndexImage: AreaImage = {
  src: "/images/courts/practice-header.webp",
  alt: "The Arkansas State Capitol seen across its lawn, flags flying, at sunset",
  width: 2880,
  height: 1620,
};
