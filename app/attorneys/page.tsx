import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { site } from "@/config/site";
import { attorneys } from "@/content/attorneys";

export const metadata: Metadata = {
  title: "Attorneys",
  description: `The attorneys of ${site.name}.`,
};

export default function AttorneysPage() {
  return (
    <>
      <PageIntro kicker={site.name} title="Attorneys" />
      <div className="mx-auto max-w-[var(--container)] px-5 py-[var(--space-section-sm)]">
        <ul className="grid gap-12 sm:grid-cols-2">
          {attorneys.map((attorney) => (
            <li key={attorney.slug}>
              <Link
                href={`/attorneys/${attorney.slug}`}
                className="group block max-w-sm no-underline"
              >
                <Image
                  src={attorney.headshot.src}
                  alt={attorney.headshot.alt}
                  width={attorney.headshot.width}
                  height={attorney.headshot.height}
                  className="w-full border border-rule"
                  sizes="(min-width: 640px) 24rem, 100vw"
                />
                <h2 className="mt-5 font-serif text-h3 text-ink underline decoration-transparent decoration-2 underline-offset-4 group-hover:decoration-accent">
                  {attorney.name}
                </h2>
                <p className="mt-2 text-[length:var(--text-small)] text-gray">
                  {attorney.homeCredential}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
