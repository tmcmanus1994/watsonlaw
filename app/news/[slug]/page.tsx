import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/format";
import { getAllPosts, getPost } from "@/lib/news";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", publishedTime: post.date },
  };
}

export default async function NewsPostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-[var(--container)] px-5 py-[var(--space-section-sm)] md:py-[var(--space-section)]">
      <p className="label text-accent">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </p>
      <h1 className="mt-3 max-w-3xl">{post.title}</h1>
      {/* Post HTML comes from repo-controlled markdown (see lib/news.ts). */}
      <div
        className="prose mt-10"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      {post.attachments.length > 0 && (
        <section aria-labelledby="attachments" className="mt-12 max-w-[var(--measure)]">
          <h2 id="attachments" className="label border-b border-rule pb-2 text-accent">
            Attachments
          </h2>
          <ul className="mt-3 grid gap-2">
            {post.attachments.map((attachment) => (
              <li key={attachment.href}>
                <a href={attachment.href} className="link text-[length:var(--text-small)]">
                  {attachment.label} (PDF)
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-12">
        <Link href="/news" className="link text-[length:var(--text-small)]">
          ← All news
        </Link>
      </p>
    </article>
  );
}
