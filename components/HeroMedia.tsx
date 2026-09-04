"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Hero media layer: the static still always renders (it is the LCP image
 * and the poster). When a video source exists, viewports ≥768px that allow
 * motion get the muted loop layered over it — mobile and
 * prefers-reduced-motion visitors only ever load the still.
 */
export function HeroMedia({
  still,
  videoSrc,
}: {
  still: { src: string; alt: string; width: number; height: number };
  videoSrc: string | null;
}) {
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    if (!videoSrc) return;
    const wide = window.matchMedia("(min-width: 768px)");
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setPlayVideo(wide.matches && motionOk.matches);
    update();
    wide.addEventListener("change", update);
    motionOk.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      motionOk.removeEventListener("change", update);
    };
  }, [videoSrc]);

  return (
    <>
      <Image
        src={still.src}
        alt={still.alt}
        fill
        priority
        quality={42}
        sizes="100vw"
        className="object-cover"
      />
      {videoSrc && playVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={videoSrc}
          poster={still.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      )}
    </>
  );
}
