import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
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

  return (
    <>
      <PageIntro title={area.title} lede={area.blurb} />
      <div className="mx-auto max-w-[var(--container)] px-5 py-16">
        <div className="prose">
          {area.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-12">
          <Link href="/contact" className="text-accent">
            Contact the firm about {area.title.toLowerCase()}
          </Link>
        </p>
      </div>
    </>
  );
}
