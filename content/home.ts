/**
 * Homepage content and media slots (approved deck, page 2).
 *
 * Media pipeline: Trav supplies pre-graded stills into /public/images/courts
 * and hero footage into /public/media — swap the paths here; components
 * lock dimensions so nothing shifts. No CSS re-grading on top of his grade.
 */

export const home = {
  hero: {
    /*
     * Client's wording from the September review, verbatim. Both lines
     * replaced the approved deck copy at their request: the deck's
     * "Counsel for the appeal." read as narrower than the practice they
     * want to be hired for.
     */
    heading: "Superior advocacy.",
    sub: "From the Supreme Court of the United States to the Arkansas Supreme Court and to Arkansas and federal appellate and trial courts, we provide high-quality advocacy that makes a difference.",
    /**
     * 6–10s muted H.264 loop, compressed hard. Not yet delivered — when it
     * lands, drop it in /public/media and set the path here.
     */
    videoSrc: null as string | null,
    /** Poster / static still — Trav's pre-graded still (Sept 3). */
    still: {
      src: "/images/hero/hero-still.avif",
      alt: "", // decorative: background imagery behind the headline
      width: 3870,
      height: 2580,
    },
  },

  /*
   * The proof strip's first two facts, dictated by the client in the
   * September review — exact wording. Two decisions worth keeping visible:
   * they totalled their own appeal counts and raised the figure to 450+,
   * and they deliberately do NOT state the firm's size, because a
   * two-attorney headline loses them general-counsel enquiries.
   *
   * The third fact is derived from the practice areas themselves (see
   * app/page.tsx), so it cannot drift out of step with the ledger.
   */
  facts: {
    appeals: {
      value: "450+",
      unit: "appeals",
      label:
        "Before the Arkansas Supreme Court and Court of Appeals, the Supreme Court of the United States, and the U.S. Courts of Appeals.",
    },
    experience: {
      value: "30+ years’",
      unit: "experience",
      label:
        "Every decision gets direct, partner attention from experienced lawyers who know the case inside and out.",
    },
  },

  courtBand: {
    /**
     * ⚠️ Caption is the approved deck copy. The current still is stand-in
     * photography (per the deck: stand-ins until the September shoot) — when
     * the real Arnold Courthouse still lands, swap the file; if a stand-in
     * ships at launch, confirm with the client that the caption stays.
     */
    caption: "Richard Sheppard Arnold United States Courthouse · Little Rock",
    image: {
      src: "/images/courts/courthouse-band.avif",
      alt: "Marble columns and coffered ceiling of a courthouse portico",
      width: 3871,
      height: 2580,
    } as {
      src: string;
      alt: string;
      width: number;
      height: number;
    } | null,
  },
} as const;
