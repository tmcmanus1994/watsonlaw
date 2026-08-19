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
    description: `${attorney.name}, ${site.name} — ${site.tagline}.`,
  };
}

export default async function AttorneyPage({ params }: Props) {
  const attorney = getAttorney((await params).slug);
  if (!attorney) notFound();

  return (
    <div className="mx-auto max-w-[var(--container)] px-5 py-16">
      <div className="grid gap-10 md:grid-cols-[minmax(0,20rem)_1fr]">
        <Image
          src={attorney.headshot.src}
          alt={attorney.headshot.alt}
          width={attorney.headshot.width}
          height={attorney.headshot.height}
          className="w-full max-w-xs border border-line"
          sizes="(min-width: 768px) 20rem, 100vw"
          priority
        />
        <div>
          <h1 className="text-3xl">{attorney.name}</h1>
          <p className="mt-2 text-lg text-ink-muted">{attorney.title}</p>

          <div className="prose mt-8">
            {attorney.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <h2 className="mt-10 text-xl">Credentials</h2>
          <ul className="mt-4 grid gap-2 text-sm text-ink-muted">
            {attorney.credentials.map((credential) => (
              <li key={credential}>{credential}</li>
            ))}
          </ul>
        </div>
      </div>
      <JsonLd data={attorneyJsonLd(attorney)} />
    </div>
  );
}
