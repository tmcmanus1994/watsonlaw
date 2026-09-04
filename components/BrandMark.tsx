"use client";

import { useEffect, useRef, useState } from "react";
import { site, entitySuffix, wordmarkLines } from "@/config/site";

/**
 * The typographic wordmark, built from config so it survives a name change.
 *
 * Variants:
 *  - "mark"   the site header: the name on ONE line in letterspaced caps
 *             between two hairlines, entity suffix beneath — as both
 *             approved mockup screens show it.
 *  - "lockup" the standalone identity lockup from the brand guide's page 1,
 *             stacked across two lines at the ampersand. For cards and
 *             reverses, not the site header.
 *  - "inline" a single quiet line, for the footer.
 *
 * Lottie: when `site.brandLottieSrc` is set and the visitor allows motion,
 * the mark hydrates a one-shot Lottie in the same fixed box (played once,
 * settling on the final frame). The player is imported dynamically only
 * here, never in the critical path; the static mark always renders first
 * and remains the fallback, so the swap causes zero layout shift.
 */
export function BrandMark({
  variant = "inline",
  withLottie = false,
  className = "",
}: {
  variant?: "mark" | "lockup" | "inline";
  /** Only the header instance should opt in. */
  withLottie?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lottieReady, setLottieReady] = useState(false);
  const src = site.brandLottieSrc;
  const useLottie = withLottie && variant !== "inline" && !!src;

  useEffect(() => {
    if (!useLottie || !src || !canvasRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let player: { destroy: () => void } | undefined;
    import("@lottiefiles/dotlottie-web").then(({ DotLottie }) => {
      if (disposed || !canvasRef.current) return;
      player = new DotLottie({
        canvas: canvasRef.current,
        src,
        autoplay: true,
        loop: false,
      });
      setLottieReady(true);
    });
    return () => {
      disposed = true;
      player?.destroy();
    };
  }, [useLottie, src]);

  if (variant === "inline") {
    return (
      <span
        className={`font-serif uppercase whitespace-nowrap tracking-[var(--tracking-wordmark)] ${className}`}
      >
        {site.name}
        {entitySuffix() && (
          <span className="ml-2 align-[0.08em] text-[0.7em] tracking-[var(--tracking-suffix)]">
            {entitySuffix()}
          </span>
        )}
      </span>
    );
  }

  // The name: one line for the site mark, split at the ampersand for the
  // standalone lockup.
  const lines = variant === "lockup" ? wordmarkLines() : [site.name];

  return (
    <span className={`relative block ${className}`}>
      <span
        className="flex flex-col items-center border-y border-current px-4 py-2"
        aria-hidden={lottieReady || undefined}
        style={lottieReady ? { visibility: "hidden" } : undefined}
      >
        <span
          className="whitespace-nowrap text-center font-serif uppercase leading-[1.35] tracking-[var(--tracking-wordmark)]"
          /* Tracking adds space after the final letter; nudge right so the
             line reads optically centered between the rules. */
          style={{ paddingLeft: "var(--tracking-wordmark)" }}
        >
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
        {entitySuffix() && (
          <span
            className="mt-1 font-label text-[0.62em] font-semibold uppercase leading-none tracking-[var(--tracking-suffix)] opacity-85"
            style={{ paddingLeft: "var(--tracking-suffix)" }}
          >
            {entitySuffix()}
          </span>
        )}
      </span>
      {useLottie && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        />
      )}
      {lottieReady && <span className="sr-only">{site.legalName}</span>}
    </span>
  );
}
