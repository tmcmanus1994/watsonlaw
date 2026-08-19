import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { site } from "@/config/site";
import { practiceAreas } from "@/content/practice-areas";

export const metadata: Metadata = {
  title: "Our Practice",
  description: `Practice areas at ${site.name}: ${practiceAreas
    .map((p) => p.title)
    .join(", ")}.`,
};

export default function PracticePage() {
  return (
    <>
      <PageIntro
        title="Our Practice"
        lede="[Placeholder lede — practice overview copy arrives with the client intake.]"
      />
      <div className="mx-auto max-w-[var(--container)] px-5 py-16">
        <ul className="grid gap-6">
          {practiceAreas.map((area) => (
            <li key={area.slug} className="border border-line p-8">
              <h2 className="text-xl">
                <Link
                  href={`/practice/${area.slug}`}
                  className="text-ink no-underline hover:underline"
                >
                  {area.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-[var(--measure)] text-ink-muted">
                {area.summary}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
