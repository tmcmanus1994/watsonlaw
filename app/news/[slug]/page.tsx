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
    <article className="mx-auto max-w-[var(--container)] px-5 py-16">
      <p className="text-xs uppercase tracking-widest text-ink-faint">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </p>
      <h1 className="mt-3 max-w-3xl text-3xl">{post.title}</h1>
      {/* Post HTML comes from repo-controlled markdown (see lib/news.ts). */}
      <div
        className="prose mt-10"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <p className="mt-12">
        <Link href="/news" className="text-accent">
          ← All news
        </Link>
      </p>
    </article>
  );
}
