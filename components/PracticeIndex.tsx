"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { indexDescriptionFor, practiceAreas } from "@/content/practice-areas";

/**
 * The practice index as a ledger: five equal full-width rows, I–V,
 * hairline-separated. Rest is a clean table of contents; hovering or
 * focusing a row draws an oxblood rule along its top edge, unfolds the
 * description beneath it, and lets the other rows recede from ink to gray.
 *
 * Motion is CSS only (see the "Practice ledger" block in globals.css) —
 * the sole JS is the IntersectionObserver below, which plays the one-time
 * entrance. Everything degrades: no JS, no hover, or reduced motion each
 * render the full list, expanded and instant.
 */

/**
 * True once any instance has mounted — i.e. JS is running, so a later mount
 * is a client-side navigation whose content has not been painted yet and
 * can start from the pre-entrance state directly. The first (hydrated)
 * instance must not: its HTML is already on screen, so hiding it after the
 * fact would flash. ENTRANCE_SCRIPT handles that case before first paint.
 */
let jsReady = false;

const SECTION_ID = "practice-index";

/** Runs during HTML parse, before the first paint. */
const ENTRANCE_SCRIPT = `(function(){var s=document.getElementById(${JSON.stringify(
  SECTION_ID
)});var m=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(s&&!m)s.dataset.entrance="pending";})();`;

export function PracticeIndex({
  headingTag: HeadingTag = "h2",
}: {
  /** "h1" when the index is the page itself (/practice); "h2" on the home. */
  headingTag?: "h1" | "h2";
}) {
  const sectionRef = useRef<HTMLElement>(null);
  // Client-side navigations can render the pre-entrance state immediately.
  const [preEntrance] = useState(
    () =>
      jsReady &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    jsReady = true;
    const section = sectionRef.current;
    // Absent when the pre-entrance state was never applied (reduced motion,
    // or the inline script did not run) — the list is already visible.
    if (!section || section.dataset.entrance !== "pending") return;

    if (typeof IntersectionObserver === "undefined") {
      section.dataset.entrance = "in";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          // Let the pending state paint once so the change transitions.
          requestAnimationFrame(() => {
            section.dataset.entrance = "in";
          });
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={SECTION_ID}
      aria-labelledby="practice-index-heading"
      data-entrance={preEntrance ? "pending" : undefined}
      className="ledger mx-auto max-w-[var(--container)] px-5 py-[var(--space-section)]"
    >
      <div className="ledger-head flex items-baseline justify-between">
        <HeadingTag id="practice-index-heading" className="label text-accent">
          Our Practice
        </HeadingTag>
        <p className="label text-gray">Five Areas</p>
      </div>

      <ul className="ledger-rows">
        {practiceAreas.map((area, index) => (
          <li
            key={area.slug}
            className="ledger-row"
            style={{ "--row-index": index } as React.CSSProperties}
          >
            <Link href={`/practice/${area.slug}`} className="ledger-link">
              <span className="ledger-numeral" aria-hidden="true">
                {area.numeral.toLowerCase()}.
              </span>
              <span className="ledger-title">{area.title}</span>
              <span className="ledger-desc">
                <span className="ledger-desc-clip">
                  <span className="ledger-desc-text">
                    {indexDescriptionFor(area)}
                  </span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <script dangerouslySetInnerHTML={{ __html: ENTRANCE_SCRIPT }} />
    </section>
  );
}
