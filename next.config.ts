import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 42 is used for the scrimmed hero still — it sits under an ~85% scrim,
    // so the compression is invisible; 75 is the default for everything else.
    qualities: [42, 75],
  },
};

export default nextConfig;
