"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Hero media layer: the static still always renders (it is the LCP image
 * and the poster). When a video source exists, viewports ≥768px that allow
 * motion get the muted loop layered over it — mobile and
 * prefers-reduced-motion visitors only ever load the still.
 *
 * Quality 90, against 75 everywhere else — see next.config.ts. This ran
 * at 42 on the reasoning that the scrim hid the compression; it does not,
 * and a smeared sky and softened stonework were the first thing the
 * client noticed. It is the only image on the site that fills a screen,
 * so it is the only one that earns the extra bytes.
 */
export function HeroMedia({
  still,
  videoSrc,
}: {
  still: {
    src: string;
    alt: string;
    width: number;
    height: number;
    blurDataURL?: string;
  };
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
        /* `preload` replaces `priority`, deprecated in Next 16. This image
           is unambiguously the LCP element — one photograph filling the
           first screen — which is the case the docs say to use it for. */
        preload
        quality={90}
        sizes="100vw"
        {...(still.blurDataURL
          ? { placeholder: "blur" as const, blurDataURL: still.blurDataURL }
          : {})}
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
