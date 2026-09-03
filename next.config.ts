import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 55 is used for the scrimmed hero still (heavy compression hides
    // behind the gradient); 75 is the default for everything else.
    qualities: [55, 75],
  },
};

export default nextConfig;
