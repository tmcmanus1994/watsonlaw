import { HeroMedia } from "@/components/HeroMedia";
import { PracticeIndex } from "@/components/PracticeIndex";
import { CourtBand } from "@/components/CourtBand";
import { attorneys } from "@/content/attorneys";
import { home } from "@/content/home";
import { site } from "@/config/site";

export default function HomePage() {
  return (
    <>
      {/* 1 · Full-bleed photographic hero, bottom-weighted scrim to ink. */}
      <section className="relative flex min-h-[540px] flex-col justify-end h-[76vh]">
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
        <div className="relative mx-auto w-full max-w-[var(--container)] px-5 pb-14">
          <p className="reveal label label-kicker text-paper">{site.tagline}</p>
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
      </section>

      {/* 2 · Practice index — I & II full-width, III–V compact. */}
      <PracticeIndex />

      {/* 3 · Second courthouse band with caption label. */}
      <CourtBand />

      {/* 4 · Credentials two-up (approved deck copy, verbatim). */}
      <section
        aria-label="Credentials"
        className="mx-auto max-w-[var(--container)] px-5 py-[var(--space-section)]"
      >
        <ul className="grid gap-10 md:grid-cols-2">
          {attorneys.map((attorney) => (
            <li key={attorney.slug}>
              <p className="font-serif text-h3 text-ink">
                — {surname(attorney.name)}
              </p>
              <p className="support mt-2 max-w-[var(--measure)] text-[length:var(--text-small)] text-gray">
                {attorney.homeCredential}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function surname(fullName: string) {
  return fullName.split(" ").at(-1) ?? fullName;
}
