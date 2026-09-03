/**
 * The five practice areas, in the approved order with Roman numerals.
 * Blurbs are the client's own words from the intake (Part 3), verbatim —
 * do not alter beyond punctuation/consistency without client approval.
 * Index descriptions for I and II are from the approved design deck.
 */

export type PracticeArea = {
  slug: string;
  numeral: string;
  title: string;
  /** Short description shown on the practice index (deck copy where given). */
  indexDescription?: string;
  /** One-line summary for metadata (first sentence of the client's blurb). */
  summary: string;
  /** The client's full blurb, verbatim, rendered as paragraphs. */
  body: string[];
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "appeals",
    numeral: "I",
    title: "Appeals",
    indexDescription:
      "Briefing and oral argument in state and federal appellate courts, from notice of appeal through rehearing and certiorari.",
    summary:
      "We litigate appeals before all levels of Arkansas and federal courts.",
    body: [
      "We litigate appeals before all levels of Arkansas and federal courts: the Arkansas Supreme Court and Court of Appeals; the United States Courts of Appeals; and the Supreme Court of the United States. We have handled more than 400 appeals, encompassing Arkansas and federal constitutional law, complex statutory schemes, election law, voting rights, business disputes, property conflicts, administrative appeals, and more. We bring a wealth of knowledge and experience: we know how appellate courts think, understand appellate procedure, prepare effective briefs, and present persuasive oral arguments.",
    ],
  },
  {
    slug: "litigation-strategy",
    numeral: "II",
    title: "Litigation Strategy",
    indexDescription:
      "Counsel to trial teams on preserving error and positioning the case for review — before the appeal exists.",
    summary:
      "We help clients and their trial attorneys develop forward-looking strategies from before a complaint is filed through trial.",
    body: [
      "We help clients and their trial attorneys develop forward-looking strategies from before a complaint is filed through trial. In high-stakes and novel disputes, we draft, edit, and argue dispositive trial motions, like motions to dismiss and motions for summary judgment; ensure issues are preserved for appellate review; and build trial-court records, which often shape the outcome of future appeals. For the important decisions that are made long before trial, we think ahead to best secure our clients’ interests throughout litigation.",
    ],
  },
  {
    slug: "constitutional-litigation",
    numeral: "III",
    title: "Constitutional Litigation",
    summary:
      "We bring extensive experience in both Arkansas and U.S. constitutional issues.",
    body: [
      "We bring extensive experience in both Arkansas and U.S. constitutional issues. We have defended and challenged legislative and executive actions, so we have comprehensive knowledge of how to best advocate for our clients’ interests. And we have a unique understanding of the Arkansas Constitution, an often untapped area of constitutional protections.",
    ],
  },
  {
    slug: "amicus-briefing",
    numeral: "IV",
    title: "Amicus Briefing",
    summary:
      "We understand how to craft an amicus brief that’s most likely to win the court’s attention.",
    body: [
      "When litigation can affect nonparties, a nonparty—an amicus curiae (“friend of the court”)—can bring its unique perspective to aid the court’s decision. We understand how to craft an amicus brief that’s most likely to win the court’s attention. We don’t just echo the parties’ arguments; we fill in the gaps for the court, presenting our clients’ unique contexts and subject-matter expertise. We also assist clients in building and coordinating coalitions of amici, ensuring the aligned nonparties speak with one voice.",
    ],
  },
  {
    slug: "election-law",
    numeral: "V",
    title: "Election Law",
    summary:
      "Our experience in election law is broad: ballot initiatives, campaign finance, candidate eligibility, and more.",
    body: [
      "Our experience in election law is broad: ballot initiatives, Ethics Commission representation, state and federal campaign finance, permissible nonprofit activities, candidate eligibility, and more. When the stakes are high—and they always are—we guide our clients through these complex areas of law to accomplish their goals.",
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
  if (area.indexDescription) return area.indexDescription;
  const blurb = area.body[0] ?? "";
  const match = blurb.match(/^[\s\S]*?[.!?](?=\s+["“(]?[A-Z])/);
  return (match ? match[0] : blurb).trim();
}
