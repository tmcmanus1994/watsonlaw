import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
     * AVIF first, WebP as the fallback for browsers without it.
     *
     * Measured on this site's own hero, against the untouched master:
     * AVIF holds the same fidelity as WebP for roughly 60% of the bytes,
     * and the gap widens on exactly the content this site is made of —
     * a sunset sky is a long, smooth gradient, which is where WebP starts
     * to band and AVIF does not. Order matters: the first format the
     * browser says it accepts is the one it gets.
     */
    formats: ["image/avif", "image/webp"],

    /*
     * Next's defaults with 2560 and 2880 added.
     *
     * Every photograph here is full-bleed (sizes="100vw"), so a browser
     * asks for viewport width x pixel ratio and takes the smallest
     * candidate at least that big. The stock list jumps 2048 -> 3840, so a
     * 1280px laptop at 2x (2560) and a 1440px laptop at 2x (2880) both
     * landed on 3840 and downloaded around 150KB of detail their screens
     * cannot resolve. Those two are the most common laptops there are.
     */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 2880, 3840],

    /*
     * 75 is Next's default and is where this site's photography stops
     * losing anything visible (measured at ~40 dB PSNR against the
     * master). The hero previously ran at 42 on the theory that the scrim
     * hid the compression; it does not — the scrim is heavy at the top and
     * bottom edges and nearly clear across the middle band, which is
     * precisely where the dome and the sky gradient sit. Anything below 75
     * shows there first.
     */
    qualities: [75, 85, 90, 95],
  },

  async redirects() {
    return [
      {
        /*
         * A door the attorneys can remember. "Keystatic" is the name of a
         * tool they did not choose and have no reason to retain; /articles
         * is what they call the thing they are going there to write.
         *
         * Temporary (307) rather than permanent on purpose: a 308 is cached
         * hard by browsers and is unpleasant to undo, and this is an alias
         * to an admin route, not a moved page. Nothing links to it, so
         * there is no ranking to preserve.
         */
        source: "/articles",
        destination: "/keystatic",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
