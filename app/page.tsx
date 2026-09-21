import Link from "next/link";
import { HeroMedia } from "@/components/HeroMedia";
import { PracticeIndex } from "@/components/PracticeIndex";
import { CourtBand } from "@/components/CourtBand";
import { attorneys } from "@/content/attorneys";
import { withEmphasis } from "@/lib/emphasis";
import { home } from "@/content/home";
import { practiceAreas } from "@/content/practice-areas";

export default function HomePage() {
  return (
    <>
      {/* 1 · Full-bleed photographic hero, bottom-weighted scrim to ink.
          The first screen is the whole first impression: one photograph,
          one line, nothing competing with it. */}
      <section className="relative flex min-h-[560px] flex-col justify-end h-[82vh] md:h-[86vh]">
        <HeroMedia still={home.hero.still} videoSrc={home.hero.videoSrc} />
        {/* top scrim keeps the paper wordmark/nav legible over the image */}
        <div
          aria-hidden="true"
          className="scrim-top absolute inset-x-0 top-0 h-64"
        />
        {/* bottom-weighted scrim carrying the headline block */}
        <div
          aria-hidden="true"
          className="scrim-bottom absolute inset-x-0 bottom-0 h-[70%]"
        />
        <div className="relative mx-auto w-full max-w-[var(--container)] px-5 pb-16 md:pb-20">
          <div aria-hidden="true" className="hero-rule mb-6 max-w-3xl" />
          {/* The kicker that sat here named a region and a practice area;
              the client had it removed rather than be read as limited to
              either. The headline now leads the page. */}
          <h1 className="reveal max-w-3xl text-paper">{home.hero.heading}</h1>
          <p
            className="reveal support mt-4 max-w-[var(--measure)] text-base text-paper"
            style={{ "--reveal-i": 1 } as React.CSSProperties}
          >
            {home.hero.sub}
          </p>
        </div>
        <div aria-hidden="true" className="scroll-cue">
          <span className="label label-caption">Scroll</span>
          <span className="scroll-cue-line" />
        </div>
      </section>

      {/* 2 · Proof strip — three facts set as a ledger. The first two are
          the client's own wording; the third is derived from the practice
          areas, so it cannot disagree with the ledger below. */}
      <section
        aria-label="At a glance"
        className="mx-auto max-w-[var(--container)] px-5"
      >
        <ul className="facts rise">
          <li className="fact">
            <p className="fact-value">
              <em>{home.facts.appeals.value}</em> {home.facts.appeals.unit}
            </p>
            <p className="fact-label support text-[length:var(--text-small)] text-gray">
              {home.facts.appeals.label}
            </p>
          </li>
          <li className="fact">
            <p className="fact-value">
              <em>{home.facts.experience.value}</em>{" "}
              {home.facts.experience.unit}
            </p>
            <p className="fact-label support text-[length:var(--text-small)] text-gray">
              {home.facts.experience.label}
            </p>
          </li>
          <li className="fact">
            <p className="fact-value">
              <em>{numberWord(practiceAreas.length)}</em> practice areas
            </p>
            <p className="fact-label support text-[length:var(--text-small)] text-gray">
              {/* The ledger's own titles. Listed without a final "and" at
                  the client's request — it reads as a table, not a
                  sentence. */}
              {practiceAreas.map((a) => a.title).join(", ")}.
            </p>
          </li>
        </ul>
      </section>

      {/* 3 · Practice index — the ledger. */}
      <PracticeIndex />

      {/* 4 · Second courthouse band with caption label. */}
      <CourtBand />

      {/* 5 · The attorneys (approved deck credential copy, verbatim), now
          under a section head and linking through to the biographies. */}
      <section
        aria-labelledby="attorneys-heading"
        className="mx-auto max-w-[var(--container)] px-5 py-[var(--space-section)]"
      >
        <div className="section-head rise">
          <h2 id="attorneys-heading" className="label label-kicker text-accent">
            The Attorneys
          </h2>
          <Link href="/attorneys" className="cta">
            Biographies <span className="cta-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
        <ul className="grid gap-10 pt-10 md:grid-cols-2 md:gap-16">
          {attorneys.map((attorney, i) => (
            <li
              key={attorney.slug}
              className="rise"
              style={{ "--reveal-i": i } as React.CSSProperties}
            >
              <Link
                href={`/attorneys/${attorney.slug}`}
                className="group block no-underline"
              >
                <p className="font-serif text-[length:var(--text-ledger)] leading-tight text-ink">
                  <span className="text-accent" aria-hidden="true">
                    —{" "}
                  </span>
                  <span className="underline decoration-transparent decoration-1 underline-offset-[6px] transition-colors duration-[var(--dur-slow)] group-hover:decoration-accent">
                    {attorney.name}
                  </span>
                </p>
                <p className="support mt-3 max-w-[var(--measure)] text-[length:var(--text-small)] text-gray">
                  {withEmphasis(attorney.homeCredential)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/*
        The homepage used to close on its own contact section. The client
        had it removed: the nav carries a Contact link and the footer
        carries both offices and both numbers directly below, so the
        section repeated itself one scroll from the end.
      */}
    </>
  );
}

/** Small counts read as words in the ledger ("Five practice areas"). */
function numberWord(n: number): string {
  const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six"];
  return words[n] ?? String(n);
}
