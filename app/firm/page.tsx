import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "The Firm",
  description: site.description,
};

/*
 * ⚠️ CONTENT GAP — flagged for Trav to resolve with Noah.
 * The intake's "why did you start this firm" came back empty, so this page
 * carries clearly-marked draft copy assembled ONLY from intake facts (the
 * client's own thirty-second takeaway, the firm-wide appeals figure, the
 * jurisdictions list, and the client's litigation-strategy wording). No
 * invented history, values, or mission language.
 */
export default function FirmPage() {
  return (
    <>
      <PageIntro kicker={site.name} title="The Firm" />
      <div className="mx-auto max-w-[var(--container)] px-5 py-[var(--space-section-sm)] md:py-[var(--space-section)]">
        <p className="label inline-block border border-rule px-3 py-2 text-gray">
          Draft · firm story pending — assembled from intake facts only
        </p>

        <div className="prose mt-8">
          <p>
            {site.name} is an appellate and constitutional litigation firm in
            Arkansas — a firm that handles appeals and provides strategic
            guidance throughout all litigation. The firm has handled more than
            four hundred appeals.
          </p>
        </div>

        <section aria-labelledby="jurisdictions" className="mt-12 max-w-[var(--measure)]">
          <h2 id="jurisdictions" className="label border-b border-rule pb-2 text-accent">
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
          <h2 id="with-trial-counsel" className="label border-b border-rule pb-2 text-accent">
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
              Read more under{" "}
              <Link href="/practice/litigation-strategy">
                Litigation Strategy
              </Link>
              , or meet <Link href="/attorneys">the attorneys</Link>.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
