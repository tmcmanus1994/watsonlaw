/**
 * Homepage content and media slots (approved deck, page 2).
 *
 * Media pipeline: Trav supplies pre-graded stills into /public/images/courts
 * and hero footage into /public/media — swap the paths here; components
 * lock dimensions so nothing shifts. No CSS re-grading on top of his grade.
 */

export const home = {
  hero: {
    /** Approved headline & sub (deck, verbatim). */
    heading: "Counsel for the appeal.",
    sub: "More than four hundred appeals before the Arkansas courts, the U.S. Courts of Appeals, and the Supreme Court of the United States.",
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
