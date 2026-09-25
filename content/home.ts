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
    /**
     * Poster / static still — Trav's regraded still (Sept 24, second pass:
     * the first was soft and the grade was warmer than he wanted).
     * Committed from a 15MB master as AVIF at quality 80, which measures
     * within 0.3 dB of the master once next/image has resized it, at a
     * twentieth of the bytes.
     */
    still: {
      src: "/images/hero/hero-still.avif",
      alt: "", // decorative: background imagery behind the headline
      width: 3840,
      height: 2202,
      /*
       * 16px wide, inlined. The hero is the first paint and sits on an ink
       * background, so without it the first thing a visitor sees is a
       * black rectangle where the photograph will be. 116 bytes buys the
       * shape and the colour of the sky immediately.
       */
      blurDataURL:
        "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADwAQCdASoQAAkAA8BgJQBOgCLC32Ypq5AA/Nc8lWEmblOnHkq2bDx3u+Dj4qgDhEwJsnqQItAr5mgeqtfSIUQA+atXmwBQJir2fTOOMAA=",
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
     * ⚠️ THE CAPTION NAMES THE BUILDING IN FRAME. It has been wrong once
     * already — it read "Richard Sheppard Arnold United States Courthouse"
     * over a photograph that was never that building, and Noah caught it.
     * If the photograph changes, this line changes in the same commit.
     *
     * The band is now the Arkansas State Capitol. It was the Pulaski
     * County Courthouse until 25 September, when Noah asked for it off the
     * homepage: "not particularly connected to our practice. We almost
     * never practice there." He offered removal or another courthouse —
     * but the Pulaski courthouse is the ONLY courthouse in the delivered
     * set, so another one means another shoot. The Capitol is where their
     * election and constitutional work actually happens, and it is the one
     * wide frame available that is not already the hero.
     */
    caption: "Arkansas State Capitol · Little Rock",
    image: {
      src: "/images/courts/home-band.avif",
      alt: "The Arkansas State Capitol seen across its lawn, flags flying, at sunset",
      width: 3200,
      height: 1800,
    } as {
      src: string;
      alt: string;
      width: number;
      height: number;
    } | null,
  },
} as const;
