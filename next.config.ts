import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 42 is used for the scrimmed hero still — it sits under an ~85% scrim,
    // so the compression is invisible; 75 is the default for everything else.
    qualities: [42, 75],
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
