import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PhotoHeader } from "@/components/PhotoHeader";
import { site } from "@/config/site";
import { getPracticeArea, practiceAreas } from "@/content/practice-areas";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return practiceAreas.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = getPracticeArea((await params).slug);
  if (!area) return {};
  return { title: area.title, description: area.summary };
}

export default async function PracticeAreaPage({ params }: Props) {
  const area = getPracticeArea((await params).slug);
  if (!area) notFound();
  const others = practiceAreas.filter((p) => p.slug !== area.slug);

  return (
    <>
      <PhotoHeader
        kicker={`Our Practice · ${area.numeral}`}
        title={area.title}
        image={area.image}
      />
      <div className="mx-auto grid max-w-[var(--container)] gap-12 px-5 py-[var(--space-section-sm)] md:grid-cols-[1fr_minmax(0,16rem)] md:py-[var(--space-section)]">
        <div>
          {/* The client's blurb, verbatim (intake Part 3) — do not edit.
              `prose-lede` only sets the opening paragraph a step larger, as
              the approved practice-page mockup does. */}
          <div
            className="prose prose-lede reveal"
            style={{ "--reveal-i": 2 } as React.CSSProperties}
          >
            {area.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* The page's one ask, kept out of the blurb itself. */}
          <div
            className="reveal mt-12 max-w-[var(--measure)] border-t border-rule pt-8"
            style={{ "--reveal-i": 3 } as React.CSSProperties}
          >
            <p className="support text-[length:var(--text-small)] text-gray">
              {site.offices.map((o) => o.city).join(" · ")}, Arkansas
            </p>
            <Link href="/contact" className="cta mt-3">
              Discuss a matter <span className="cta-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <aside aria-labelledby="also-in-practice">
          <h2 id="also-in-practice" className="label label-kicker border-b border-rule pb-3 text-accent">
            Also in Practice
          </h2>
          <ul>
            {others.map((other) => (
              <li key={other.slug} className="border-b border-rule">
                <Link
                  href={`/practice/${other.slug}`}
                  className="group flex gap-3 py-3 no-underline"
                >
                  <span
                    className="font-serif text-[length:var(--text-small)] text-accent"
                    aria-hidden="true"
                  >
                    {other.numeral}.
                  </span>
                  <span className="font-serif text-[length:var(--text-small)] text-ink underline decoration-transparent decoration-2 underline-offset-4 group-hover:decoration-accent">
                    {other.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
