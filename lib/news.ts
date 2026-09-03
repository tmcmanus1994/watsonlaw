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
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    html: renderMarkdown(content),
    attachments,
  };
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
