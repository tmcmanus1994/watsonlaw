import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "The Firm",
  description: site.description,
};

/*
 * The firm story is the client's own, supplied in the September review and
 * printed verbatim. It closed the content gap this page carried from the
 * start: the intake's "why did you start this firm" came back empty, so the
 * page previously showed clearly-marked draft copy assembled only from
 * intake facts.
 */
export default function FirmPage() {
  return (
    <>
      <PageIntro kicker={site.name} title="The Firm" />
      <div className="mx-auto max-w-[var(--container)] px-5 py-[var(--space-section-sm)] md:py-[var(--space-section)]">
        {/* The client's own firm story, written for the September review and
            printed verbatim. It replaced the draft assembled from intake
            facts, so the "Draft" label that sat above it is gone. */}
        <div className="prose">
          <p>
            Many complex cases turn on a handful of critical moments: a motion
            that clarifies the dispositive arguments, an appellate brief that
            anticipates the court’s questions, or oral advocacy that
            highlights the decisive issues. In those critical moments, it’s
            the quality of the advocacy that matters, not the number of
            attorneys assigned to the case.
          </p>
          <p>
            We provide superior advocacy in the critical moments and from
            litigation’s start to its finish. Every matter we take gets our
            direct attention. That’s how we meet our clients’ goals, even in
            the most complex litigation.
          </p>
        </div>

        <section aria-labelledby="jurisdictions" className="mt-12 max-w-[var(--measure)]">
          <h2 id="jurisdictions" className="label label-kicker border-b border-rule pb-2 text-accent">
            Jurisdictions
          </h2>
          <ul className="mt-4 grid gap-2">
            {site.jurisdictions.map((jurisdiction) => (
              <li key={jurisdiction} className="font-serif text-h3">
                {jurisdiction}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="with-trial-counsel" className="mt-12 max-w-[var(--measure)]">
          <h2 id="with-trial-counsel" className="label label-kicker border-b border-rule pb-2 text-accent">
            With Trial Counsel
          </h2>
          <div className="prose mt-4">
            <p>
              The firm works alongside clients and their trial attorneys from
              before a complaint is filed through trial — drafting, editing,
              and arguing dispositive motions; ensuring issues are preserved
              for appellate review; and building trial-court records that
              shape the outcome of future appeals.
            </p>
            <p>
              Learn more about{" "}
              <Link href="/practice">our practice</Link>, and{" "}
              <Link href="/attorneys">meet us</Link>.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
