/**
 * File-based news loader. Posts are plain markdown with YAML frontmatter in
 * content/news/ — written either by hand or through the Keystatic admin at
 * /keystatic (which commits the same files). Pages consume only the
 * NewsPost shape below, so the storage layer can evolve without touching
 * components.
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
  attachments: { label: string; href: string }[];
};

const NEWS_DIR = path.join(process.cwd(), "content", "news");
const ATTACHMENT_PUBLIC_PATH = "/files/news/";

export function getAllPosts(): NewsPost[] {
  return fs
    .readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => loadPost(file.replace(/\.md$/, "")))
    .filter((post): post is NewsPost => post !== undefined)
    // Dates are normalised to YYYY-MM-DD, so lexical order is date order.
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): NewsPost | undefined {
  // Guard against path traversal even though slugs come from our own files.
  if (!/^[a-z0-9-]+$/.test(slug)) return undefined;
  const file = path.join(NEWS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  return loadPost(slug);
}

function loadPost(slug: string): NewsPost | undefined {
  const raw = fs.readFileSync(path.join(NEWS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  if (data.draft === true) return undefined;

  const attachments = Array.isArray(data.attachments)
    ? data.attachments
        .filter((a) => a && typeof a.file === "string")
        .map((a) => ({
          label: String(a.label || a.file),
          href: a.file.startsWith("/")
            ? a.file
            : `${ATTACHMENT_PUBLIC_PATH}${a.file}`,
        }))
    : [];

  return {
    slug,
    title: String(data.title ?? slug),
    date: toIsoDate(data.date),
    excerpt: String(data.excerpt ?? ""),
    html: renderMarkdown(content),
    attachments,
  };
}

/**
 * Frontmatter dates arrive in two shapes and both have to end up as
 * YYYY-MM-DD. Keystatic writes `date: 2026-09-07` unquoted, and YAML parses
 * an unquoted date as a timestamp — so gray-matter hands us a Date object,
 * not a string. Stringifying that gives "Mon Sep 07 2026 00:00:00 GMT+0000
 * (Coordinated Universal Time)", which formatDate then renders as
 * "Invalid Date" and which also sorts wrong against the ISO strings from
 * hand-written posts.
 *
 * Normalising here rather than quoting the dates in the markdown is
 * deliberate: Keystatic rewrites the frontmatter on every save, so any fix
 * applied to the files would be undone the next time an attorney edits a
 * post. The YAML timestamp is UTC midnight, so read it back with the UTC
 * getters — local getters would shift the day west of Greenwich.
 */
function toIsoDate(value: unknown): string {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return "";
    return [
      String(value.getUTCFullYear()).padStart(4, "0"),
      String(value.getUTCMonth() + 1).padStart(2, "0"),
      String(value.getUTCDate()).padStart(2, "0"),
    ].join("-");
  }
  if (typeof value === "string") {
    // Already ISO, or an ISO datetime we only want the date part of.
    const match = /^(\d{4}-\d{2}-\d{2})/.exec(value.trim());
    return match ? match[1] : "";
  }
  return "";
}

/**
 * Markdown → HTML via marked, plus minimal footnote support ([^1] refs and
 * single-line "[^1]: text" definitions) implemented here rather than as
 * another dependency.
 */
function renderMarkdown(markdown: string): string {
  const definitions = new Map<string, string>();
  const body = markdown.replace(
    /^\[\^([^\]\s]+)\]:[ \t]*(.+)$/gm,
    (_, id: string, text: string) => {
      definitions.set(id, text.trim());
      return "";
    }
  );

  const order: string[] = [];
  const withRefs = body.replace(/\[\^([^\]\s]+)\]/g, (match, id: string) => {
    if (!definitions.has(id)) return match;
    if (!order.includes(id)) order.push(id);
    const n = order.indexOf(id) + 1;
    return `<sup id="fnref-${id}"><a href="#fn-${id}" aria-label="Footnote ${n}">${n}</a></sup>`;
  });

  let html = marked.parse(withRefs, { async: false });

  if (order.length > 0) {
    const items = order
      .map((id) => {
        const text = marked.parseInline(definitions.get(id) ?? "", {
          async: false,
        });
        return `<li id="fn-${id}">${text} <a href="#fnref-${id}" aria-label="Back to reference">↩</a></li>`;
      })
      .join("\n");
    html += `\n<section class="footnotes" aria-label="Footnotes"><hr /><ol>\n${items}\n</ol></section>`;
  }

  return html;
}
