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
 *
 * The Jurisdictions list and the With Trial Counsel section are gone. Their
 * removal was the literal reading of the September instruction to replace
 * "the text on this page" with the story, but neither had been commented on
 * directly, so they were left standing and the ambiguity was put back to
 * the client. Noah answered it on 25 September: "Let's delete this
 * information." Both were intake facts that the story now covers in the
 * firm's own words. site.jurisdictions is still read by the JSON-LD.
 */
export default function FirmPage() {
  return (
    <>
      <PageIntro kicker={site.name} title="The Firm" />
      {/* Matches /news and /attorneys. This page alone stepped up to the
          larger section space at md, which Noah read as a gap between the
          title and the first paragraph that the other pages do not have. */}
      <div className="mx-auto max-w-[var(--container)] px-5 py-[var(--space-section-sm)]">
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

        {/* The closing line Noah asked to keep in the September round. It
            lived inside "With Trial Counsel"; that section is now deleted,
            so it moves up rather than going with it. */}
        <div className="prose mt-8">
          <p>
            Learn more about{" "}
            <Link href="/practice">our practice</Link>, and{" "}
            <Link href="/attorneys">meet us</Link>.
          </p>
        </div>

      </div>
    </>
  );
}
