/**
 * File-based news stub. This is the layer the chosen CMS replaces once the
 * News Stack Decision is approved — page components consume only the
 * NewsPost shape below, so the swap should not touch them.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type NewsPost = {
  slug: string;
  title: string;
  date: string; // ISO date
  excerpt: string;
  /** Rendered HTML from trusted repo-controlled markdown. */
  html: string;
};

const NEWS_DIR = path.join(process.cwd(), "content", "news");

export function getAllPosts(): NewsPost[] {
  return fs
    .readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => loadPost(file.replace(/\.md$/, "")))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): NewsPost | undefined {
  // Guard against path traversal even though slugs come from our own files.
  if (!/^[a-z0-9-]+$/.test(slug)) return undefined;
  const file = path.join(NEWS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  return loadPost(slug);
}

function loadPost(slug: string): NewsPost {
  const raw = fs.readFileSync(path.join(NEWS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    html: marked.parse(content, { async: false }),
  };
}
