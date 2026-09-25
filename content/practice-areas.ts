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
   * is a one-line swap with no layout consequence — which is what Noah
   * asked for on 25 September, rotating three of the five between areas.
   *
   * THE FILENAMES ARE SLOTS, NOT SUBJECTS. detail-appeals.avif is no
   * longer the photograph on Appeals. Follow the `src` here, never the
   * name; renaming the files to chase the rotation would break the commit
   * history that shows which frame is which.
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
      src: "/images/courts/detail-litigation-strategy.avif",
      alt: "The dome of the Arkansas State Capitol at sunset",
      width: 2048,
      height: 2048,
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
      /*
       * ⚠️ Lowest-resolution frame of the five: its master is 816px
       * square where the other four are ~4000px. Ample for the 21rem index
       * pane, soft as this page's full-width header on a large display. It
       * arrived on this area with Noah's 25 September rotation — the weak
       * frame changed page, it did not go away. A re-export at the set's
       * native size drops in under the same filename.
       */
      src: "/images/courts/detail-election-law.avif",
      alt: "The colonnade along the flank of the Arkansas State Capitol in low sun",
      width: 816,
      height: 816,
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
      src: "/images/courts/detail-constitutional-litigation.avif",
      alt: "The west front of the Arkansas State Capitol, dome and portico seen head-on",
      width: 2048,
      height: 2048,
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
      src: "/images/courts/detail-amicus-briefing.avif",
      alt: "A corner pediment of the Arkansas State Capitol against an evening sky",
      width: 2048,
      height: 2048,
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
      src: "/images/courts/detail-appeals.avif",
      alt: "The Arkansas and United States flags above the Pulaski County Courthouse cornice",
      width: 2048,
      height: 2048,
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
 * Wide header image for the practice index (/practice).
 *
 * The same photograph as the homepage hero, at the client's request. It
 * was previously the second wide frame — a three-quarter view across the
 * lawn — chosen so the two pages would not read as the same picture
 * twice. His call: the regraded hero is the strongest frame in the set,
 * and /practice is a click away from the homepage rather than beside it.
 * The band crops to a different part of the frame than the full-height
 * hero does, so they do not read as identical.
 *
 * The frame this replaced is in git history if it is ever wanted back.
 */
export const practiceIndexImage: AreaImage = {
  src: "/images/hero/hero-still.avif",
  alt: "The dome of the Arkansas State Capitol at sunset, framed by trees",
  width: 3840,
  height: 2202,
};
