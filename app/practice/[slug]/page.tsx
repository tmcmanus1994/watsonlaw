import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PhotoHeader } from "@/components/PhotoHeader";
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
      <PhotoHeader kicker={`Our Practice · ${area.numeral}`} title={area.title} />
      <div className="mx-auto grid max-w-[var(--container)] gap-12 px-5 py-[var(--space-section-sm)] md:grid-cols-[1fr_minmax(0,16rem)] md:py-[var(--space-section)]">
        {/* The client's blurb, verbatim (intake Part 3) — do not edit. */}
        <div className="prose">
          {area.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
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
