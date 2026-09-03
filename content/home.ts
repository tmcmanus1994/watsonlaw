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
    /** Poster / static still. Currently a marked, graded placeholder. */
    still: {
      src: "/images/hero/hero-placeholder.jpg",
      alt: "", // decorative until real courthouse footage lands — then describe it
      width: 1920,
      height: 1080,
    },
  },

  courtBand: {
    caption: "Richard Sheppard Arnold United States Courthouse · Little Rock",
    /** Pre-graded still from Trav — null renders the marked placeholder block. */
    image: null as {
      src: string;
      alt: string;
      width: number;
      height: number;
    } | null,
  },
} as const;
