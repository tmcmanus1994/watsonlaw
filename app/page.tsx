import Link from "next/link";
import { HeroMedia } from "@/components/HeroMedia";
import { PracticeIndex } from "@/components/PracticeIndex";
import { CourtBand } from "@/components/CourtBand";
import { attorneys } from "@/content/attorneys";
import { home } from "@/content/home";
import { practiceAreas } from "@/content/practice-areas";
import { site } from "@/config/site";

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
          <p className="reveal label label-kicker text-balance text-paper">
            {site.tagline}
          </p>
          <h1
            className="reveal mt-3 max-w-3xl text-paper"
            style={{ "--reveal-i": 1 } as React.CSSProperties}
          >
            {home.hero.heading}
          </h1>
          <p
            className="reveal support mt-4 max-w-[var(--measure)] text-base text-paper"
            style={{ "--reveal-i": 2 } as React.CSSProperties}
          >
            {home.hero.sub}
          </p>
        </div>
        <div aria-hidden="true" className="scroll-cue">
          <span className="label label-caption">Scroll</span>
          <span className="scroll-cue-line" />
        </div>
      </section>

      {/* 2 · Proof strip — the firm's facts, each already published on the
          site (hero sub-line, Jurisdictions, Contact), set as a ledger. */}
      <section
        aria-label="At a glance"
        className="mx-auto max-w-[var(--container)] px-5"
      >
        <ul className="facts rise">
          <li className="fact">
            <p className="fact-value">
              <em>400+</em> appeals
            </p>
            <p className="fact-label support text-[length:var(--text-small)] text-gray">
              {/* The hero sub-line, verbatim (approved deck copy). */}
              {home.hero.sub.replace(/^More than four hundred appeals before /, "Before ")}
            </p>
          </li>
          <li className="fact">
            <p className="fact-value">
              <em>{numberWord(attorneys.length)}</em> attorneys
            </p>
            <p className="fact-label support text-[length:var(--text-small)] text-gray">
              {/* First credential of each attorney, verbatim. */}
              {attorneys
                .map((a) => a.homeCredential.split(". ")[0].replace(/\.$/, ""))
                .join(" · ")}
              .
            </p>
          </li>
          <li className="fact">
            <p className="fact-value">
              <em>{numberWord(practiceAreas.length)}</em> practice areas
            </p>
            <p className="fact-label support text-[length:var(--text-small)] text-gray">
              {/* The ledger's own titles, verbatim (content/practice-areas.ts). */}
              {joinNatural(practiceAreas.map((a) => a.title))}.
            </p>
          </li>
        </ul>
      </section>

      {/* 3 · Practice index — the ledger, I–V. */}
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
                  {attorney.homeCredential}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 6 · Close — the page ends on a clear next step, not a footer. */}
      <section
        aria-labelledby="contact-heading"
        className="border-t border-rule"
      >
        <div className="mx-auto grid max-w-[var(--container)] gap-8 px-5 py-[var(--space-section)] md:grid-cols-[1fr_minmax(0,22rem)] md:gap-16">
          <div className="rise">
            <p className="label label-kicker text-accent">Contact</p>
            {/* The approved site description, verbatim (config/site.ts). */}
            <h2 id="contact-heading" className="mt-3 max-w-2xl text-[length:var(--text-ledger)]">
              {site.description}
            </h2>
            <Link href="/contact" className="cta mt-8">
              Discuss a matter <span className="cta-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="rise grid content-end gap-6 md:justify-items-end md:text-right">
            {/* Location is a region, not an address — see site.serviceArea. */}
            <p className="label label-caption text-gray">{site.serviceArea}</p>
            <ul className="grid gap-4 md:justify-items-end">
              {site.contacts.map((contact) => (
                <li key={contact.phone}>
                  <p className="support text-[length:var(--text-small)]">
                    {contact.attorney}
                    <br />
                    <a
                      href={`tel:+1${contact.phone.replace(/\D/g, "")}`}
                      className="link"
                    >
                      {contact.phone}
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

/** "Arkansas courts, the U.S. Courts of Appeals, and the Supreme Court" */
function joinNatural(items: readonly string[]): string {
  if (items.length <= 1) return items.join("");
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}

/** Small counts read as words in the ledger ("Five practice areas"). */
function numberWord(n: number): string {
  const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six"];
  return words[n] ?? String(n);
}
