"use client";

import { useEffect, useRef, useState } from "react";
import { site, entitySuffix, wordmarkLines } from "@/config/site";

/**
 * The typographic wordmark — letterspaced caps between two hairlines with
 * the entity suffix beneath (stacked), or a single quiet line (inline).
 * Pure text and rules, built from config: it survives a name change.
 *
 * Lottie: when `site.brandLottieSrc` is set and the visitor allows motion,
 * the stacked mark hydrates a one-shot Lottie in the same fixed box (played
 * once, settling on the final frame). The player is imported dynamically
 * only here, never in the critical path; the static mark always renders
 * first and remains the fallback, so the swap causes zero layout shift.
 */
export function BrandMark({
  variant = "inline",
  withLottie = false,
  className = "",
}: {
  variant?: "stacked" | "inline";
  /** Only the header instance should opt in. */
  withLottie?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lottieReady, setLottieReady] = useState(false);
  const src = site.brandLottieSrc;
  const useLottie = withLottie && variant === "stacked" && !!src;

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
        className={`font-serif tracking-[var(--tracking-label)] uppercase whitespace-nowrap ${className}`}
      >
        {site.name}
        {entitySuffix() && (
          <span className="ml-2 text-[0.7em] align-[0.08em]">{entitySuffix()}</span>
        )}
      </span>
    );
  }

  const lines = wordmarkLines();
  return (
    <span className={`relative block ${className}`}>
      <span
        className="flex flex-col items-center gap-1 border-y border-current px-4 py-3"
        aria-hidden={lottieReady || undefined}
        style={lottieReady ? { visibility: "hidden" } : undefined}
      >
        <span className="font-serif text-[1.05em] leading-[1.35] tracking-[var(--tracking-label)] uppercase text-center">
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
        {entitySuffix() && (
          <span className="label text-[0.5em]">{entitySuffix()}</span>
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
