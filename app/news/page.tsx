import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { site } from "@/config/site";
import { formatDate } from "@/lib/format";
import { getAllPosts } from "@/lib/news";

export const metadata: Metadata = {
  title: "News",
  description: `News and commentary from ${site.name}.`,
};

export default function NewsPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageIntro kicker={site.name} title="News" />
      <div className="mx-auto max-w-[var(--container)] px-5 py-[var(--space-section-sm)]">
        <ul>
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-rule">
              <Link
                href={`/news/${post.slug}`}
                className="group grid gap-2 py-8 no-underline md:grid-cols-[10rem_1fr] md:gap-8"
              >
                <time dateTime={post.date} className="label pt-1 text-gray">
                  {formatDate(post.date)}
                </time>
                <span>
                  <span className="font-serif text-h3 text-ink underline decoration-transparent decoration-2 underline-offset-4 group-hover:decoration-accent">
                    {post.title}
                  </span>
                  {post.excerpt && (
                    <span className="mt-2 block max-w-[var(--measure)] text-[length:var(--text-small)] text-gray">
                      {post.excerpt}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
