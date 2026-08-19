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
      <PageIntro
        title="News"
        lede="Articles and commentary from the firm."
      />
      <div className="mx-auto max-w-[var(--container)] px-5 py-16">
        <ul className="grid gap-6">
          {posts.map((post) => (
            <li key={post.slug} className="border border-line p-8">
              <p className="text-xs uppercase tracking-widest text-ink-faint">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </p>
              <h2 className="mt-2 text-xl">
                <Link
                  href={`/news/${post.slug}`}
                  className="text-ink no-underline hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-[var(--measure)] text-ink-muted">
                {post.excerpt}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
