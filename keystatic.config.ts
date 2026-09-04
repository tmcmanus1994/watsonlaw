/**
 * Keystatic — the approved News stack (docs/(C) News Stack Decision.md).
 *
 * Storage: Cloud auth mode once NEXT_PUBLIC_KEYSTATIC_PROJECT is set (a
 * free Keystatic Cloud project, ≤3 users — created once by the maintainer,
 * with the Keystatic GitHub App installed on the repo; editors then sign in
 * with email and never touch GitHub). See docs/PUBLISHING.md.
 *
 * Without the env var it runs in local mode, which writes to the local
 * filesystem — correct for development, impossible on a deployed host. The
 * /keystatic route refuses to render the editor in production when the
 * project is unset rather than accepting posts it cannot save.
 *
 * Posts are plain markdown with YAML frontmatter in content/news/ — the
 * site reads them with its own file-based loader (lib/news.ts), so the
 * content survives the vendor and static generation is preserved.
 */
import { config, fields, collection } from "@keystatic/core";
import { site } from "./config/site";

const cloudProject = process.env.NEXT_PUBLIC_KEYSTATIC_PROJECT;

export default config({
  storage: cloudProject ? { kind: "cloud" } : { kind: "local" },
  ...(cloudProject
    ? { cloud: { project: cloudProject as `${string}/${string}` } }
    : {}),
  ui: {
    brand: { name: `${site.name} · News` },
  },
  collections: {
    posts: collection({
      label: "News posts",
      slugField: "title",
      path: "content/news/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["date"],
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            description: "The post headline.",
            validation: { isRequired: true },
          },
        }),
        date: fields.date({
          label: "Date",
          defaultValue: { kind: "today" },
          validation: { isRequired: true },
        }),
        excerpt: fields.text({
          label: "Excerpt",
          description:
            "One or two sentences shown on the news index and in search results.",
          multiline: true,
        }),
        draft: fields.checkbox({
          label: "Draft",
          description: "Drafts are hidden from the site until unchecked.",
          defaultValue: false,
        }),
        attachments: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            file: fields.file({
              label: "PDF file",
              directory: "public/files/news",
              publicPath: "/files/news/",
            }),
          }),
          {
            label: "PDF attachments",
            description: "Filings or documents linked at the end of the post.",
            itemLabel: (props) => props.fields.label.value || "Attachment",
          }
        ),
        content: fields.markdoc({
          label: "Post",
          extension: "md",
          options: {
            image: {
              directory: "public/images/news",
              publicPath: "/images/news/",
            },
          },
        }),
      },
    }),
  },
});
