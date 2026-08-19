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
      <PageIntro
        title="Attorneys"
        lede="[Placeholder lede — replaced when bios are drafted.]"
      />
      <div className="mx-auto max-w-[var(--container)] px-5 py-16">
        <ul className="grid gap-10 sm:grid-cols-2">
          {attorneys.map((attorney) => (
            <li key={attorney.slug}>
              <Link
                href={`/attorneys/${attorney.slug}`}
                className="group block no-underline"
              >
                <Image
                  src={attorney.headshot.src}
                  alt={attorney.headshot.alt}
                  width={attorney.headshot.width}
                  height={attorney.headshot.height}
                  className="w-full max-w-sm border border-line"
                  sizes="(min-width: 640px) 24rem, 100vw"
                />
                <h2 className="mt-4 text-xl text-ink group-hover:underline">
                  {attorney.name}
                </h2>
                <p className="mt-1 text-sm text-ink-muted">{attorney.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
