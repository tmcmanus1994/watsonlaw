import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/config/site";
import { attorneys, getAttorney } from "@/content/attorneys";
import { attorneyJsonLd } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return attorneys.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const attorney = getAttorney((await params).slug);
  if (!attorney) return {};
  return {
    title: attorney.name,
    description: `${attorney.name}, ${site.name} — ${attorney.homeCredential}`,
  };
}

export default async function AttorneyPage({ params }: Props) {
  const attorney = getAttorney((await params).slug);
  if (!attorney) notFound();

  return (
    <div className="mx-auto max-w-[var(--container)] px-5 py-[var(--space-section-sm)] md:py-[var(--space-section)]">
      <div className="grid gap-12 md:grid-cols-[minmax(0,20rem)_1fr]">
        <div>
          <Image
            src={attorney.headshot.src}
            alt={attorney.headshot.alt}
            width={attorney.headshot.width}
            height={attorney.headshot.height}
            className="w-full max-w-xs border border-rule"
            sizes="(min-width: 768px) 20rem, 100vw"
            priority
          />
          <p className="label mt-3 text-gray">
            Photograph · shoot week of Sept 14
          </p>
        </div>

        <div>
          <p className="label text-accent">{site.name}</p>
          <h1 className="mt-3">{attorney.name}</h1>

          {attorney.draft && (
            /* Draft state: confirmed credentials only — nothing else may
               publish for this attorney until his sheet arrives. */
            <p className="label mt-4 inline-block border border-rule px-3 py-2 text-gray">
              Draft · full biography pending confirmation
            </p>
          )}

          {attorney.intro.length > 0 && (
            <div className="prose mt-8">
              {attorney.intro.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}

          {attorney.approach && (
            <blockquote className="mt-8 max-w-[var(--measure)] border-l-2 border-accent pl-5 text-gray">
              “{attorney.approach}”
            </blockquote>
          )}

          <div className="mt-10 grid gap-8">
            {attorney.sections.map((section) => (
              <section key={section.heading} aria-label={section.heading}>
                <h2 className="label border-b border-rule pb-2 text-accent">
                  {section.heading}
                </h2>
                <ul className="mt-3 grid gap-2 text-[length:var(--text-small)] text-ink">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
      <JsonLd data={attorneyJsonLd(attorney)} />
    </div>
  );
}
