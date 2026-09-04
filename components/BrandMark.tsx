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
 * Lottie (`withLottie`): plays once and settles on its final frame. The
 * player is imported dynamically only here, never in the critical path.
 * The static mark always renders first and defines the box, so there is no
 * layout shift and no JS, reduced-motion or load-failure path without a
 * mark. The animation is fitted by the artwork's bounds inside the
 * composition (site.brandLottie.artwork), not by the canvas — see config.
 */
export function BrandMark({
  variant = "inline",
  withLottie = false,
  className = "",
}: {
  variant?: "mark" | "lockup" | "inline";
  /** Only the header instance on the homepage opts in. */
  withLottie?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lottieReady, setLottieReady] = useState(false);
  const lottie = site.brandLottie;
  const useLottie = withLottie && variant !== "inline" && !!lottie;

  useEffect(() => {
    if (!useLottie || !lottie || !canvasRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let player: { destroy: () => void } | undefined;
    import("@lottiefiles/dotlottie-web")
      .then(({ DotLottie }) => {
        if (disposed || !canvasRef.current) return;
        // Self-host the player's WASM. By default it is fetched from unpkg
        // at runtime — an uncontrolled third-party request on every visit,
        // which this site does not make (contract Terms 5 and 13).
        DotLottie.setWasmUrl("/media/dotlottie-player.wasm");
        player = new DotLottie({
          canvas: canvasRef.current,
          src: lottie.src,
          autoplay: true,
          loop: false, // plays once, settles on the final frame
          backgroundColor: "transparent",
        });
        setLottieReady(true);
      })
      .catch(() => {
        /* keep the static mark */
      });
    return () => {
      disposed = true;
      player?.destroy();
    };
  }, [useLottie, lottie]);

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

  /*
   * Fit the composition so its ARTWORK — not its canvas — lands on the
   * static mark's box. All three values are percentages, so the mark scales
   * with the box at every breakpoint:
   *   width      canvas wider than the box by the artwork's inset
   *   left       pull back by the artwork's own left offset
   *   translateY put the artwork's vertical centre on the box's centre
   */
  const art = lottie?.artwork;
  const fit = art
    ? {
        width: `${(art.canvasWidth / art.width) * 100}%`,
        left: `${-(art.x / art.width) * 100}%`,
        translateY: `${-((art.y + art.height / 2) / art.canvasHeight) * 100}%`,
        aspectRatio: `${art.canvasWidth} / ${art.canvasHeight}`,
      }
    : null;

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
             line reads optically centred between the rules. */
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
      {useLottie && fit && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2"
          style={{
            width: fit.width,
            left: fit.left,
            aspectRatio: fit.aspectRatio,
            transform: `translateY(${fit.translateY})`,
          }}
        />
      )}
      {lottieReady && <span className="sr-only">{site.legalName}</span>}
    </span>
  );
}
