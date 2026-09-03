import Link from "next/link";
import { practiceAreas } from "@/content/practice-areas";

/**
 * The practice index from the deck: label row, areas I and II full-width
 * with their descriptions, III–V as a compact three-across row. Numerals
 * are oxblood; titles serif; everything separated by hairlines.
 */
export function PracticeIndex({
  headingTag: HeadingTag = "h2",
}: {
  /** "h1" when the index is the page itself (/practice); "h2" on the home. */
  headingTag?: "h1" | "h2";
}) {
  const featured = practiceAreas.slice(0, 2);
  const compact = practiceAreas.slice(2);

  return (
    <section
      aria-labelledby="practice-index-heading"
      className="mx-auto max-w-[var(--container)] px-5 py-[var(--space-section)]"
    >
      <div className="flex items-baseline justify-between border-b border-rule pb-3">
        <HeadingTag id="practice-index-heading" className="label text-accent">
          Our Practice
        </HeadingTag>
        <p className="label text-gray">Five Areas</p>
      </div>

      <ul>
        {featured.map((area) => (
          <li key={area.slug} className="border-b border-rule">
            <Link
              href={`/practice/${area.slug}`}
              className="group grid gap-2 py-8 no-underline md:grid-cols-[3rem_1fr_minmax(0,24rem)] md:gap-6"
            >
              <span className="font-serif text-accent" aria-hidden="true">
                {area.numeral.toLowerCase()}.
              </span>
              <span className="font-serif text-h3 text-ink underline decoration-transparent decoration-2 underline-offset-4 group-hover:decoration-accent">
                {area.title}
              </span>
              <span className="text-[length:var(--text-small)] text-gray">
                {area.indexDescription}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <ul className="grid sm:grid-cols-3">
        {compact.map((area) => (
          <li key={area.slug} className="border-b border-rule sm:border-b-0">
            <Link
              href={`/practice/${area.slug}`}
              className="group flex gap-3 py-6 no-underline sm:pr-6"
            >
              <span
                className="font-serif text-[length:var(--text-small)] text-accent"
                aria-hidden="true"
              >
                {area.numeral.toLowerCase()}.
              </span>
              <span className="font-serif text-ink underline decoration-transparent decoration-2 underline-offset-4 group-hover:decoration-accent">
                {area.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
