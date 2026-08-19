import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { practiceAreas } from "@/content/practice-areas";
import { attorneys } from "@/content/attorneys";
import { getAllPosts } from "@/lib/news";
import { formatDate } from "@/lib/format";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 2);

  return (
    <>
      <section className="border-b border-line bg-paper-shade">
        <div className="mx-auto max-w-[var(--container)] px-5 py-24">
          <p className="text-sm uppercase tracking-widest text-ink-faint">
            {site.address.city}, {site.address.state}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl md:text-4xl">
            {site.tagline}
          </h1>
          <p className="mt-5 max-w-[var(--measure)] text-lg text-ink-muted">
            {site.description} [Placeholder positioning copy — replaced when
            the client intake returns.]
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-block bg-accent px-6 py-3 text-sm text-accent-ink no-underline"
            >
              Contact the firm
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--container)] px-5 py-20">
        <h2 className="text-2xl">Our Practice</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area) => (
            <li key={area.slug} className="border border-line p-6">
              <h3 className="text-lg">
                <Link
                  href={`/practice/${area.slug}`}
                  className="text-ink no-underline hover:underline"
                >
                  {area.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-ink-muted">{area.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line bg-paper-shade">
        <div className="mx-auto max-w-[var(--container)] px-5 py-20">
          <h2 className="text-2xl">Attorneys</h2>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2">
            {attorneys.map((attorney) => (
              <li key={attorney.slug} className="flex items-start gap-5">
                <Image
                  src={attorney.headshot.src}
                  alt={attorney.headshot.alt}
                  width={attorney.headshot.width}
                  height={attorney.headshot.height}
                  className="w-24 shrink-0 border border-line"
                  sizes="6rem"
                />
                <div>
                  <h3 className="text-lg">
                    <Link
                      href={`/attorneys/${attorney.slug}`}
                      className="text-ink no-underline hover:underline"
                    >
                      {attorney.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-ink-muted">{attorney.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--container)] px-5 py-20">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl">News</h2>
          <Link href="/news" className="text-sm text-accent">
            All news
          </Link>
        </div>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug} className="border border-line p-6">
              <p className="text-xs uppercase tracking-widest text-ink-faint">
                {formatDate(post.date)}
              </p>
              <h3 className="mt-2 text-lg">
                <Link
                  href={`/news/${post.slug}`}
                  className="text-ink no-underline hover:underline"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-ink-muted">{post.excerpt}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
