import type { Metadata } from "next";
import Keystatic from "../keystatic";

/** Admin UI — never indexed (also disallowed in robots.ts). */
export const metadata: Metadata = {
  title: "Publishing",
  robots: { index: false, follow: false },
};

const cloudProject = process.env.NEXT_PUBLIC_KEYSTATIC_PROJECT;
const isProduction = process.env.NODE_ENV === "production";

export default function KeystaticPage() {
  /*
   * Without a Cloud project, Keystatic falls back to local storage — which
   * writes to the filesystem. That is correct in development, but on a
   * deployed host the filesystem is read-only and ephemeral: the editor
   * would load, accept a post, and lose it. Say so instead of pretending.
   */
  if (isProduction && !cloudProject) {
    return (
      <div className="mx-auto max-w-[var(--measure)] px-5 py-[var(--space-section)]">
        <p className="label label-kicker text-accent">Publishing</p>
        <h1 className="mt-3">Not configured yet</h1>
        <div className="support mt-6 grid gap-4 text-gray">
          <p>
            The editor is not connected to a Keystatic Cloud project on this
            deployment, so nothing written here could be saved. Rather than
            lose a post, it is switched off.
          </p>
          <p>
            Setup takes a few minutes and is written up in{" "}
            <code className="font-label text-ink">docs/PUBLISHING.md</code> —
            create the free Cloud project, install its GitHub App on the
            repository, then set{" "}
            <code className="font-label text-ink">
              NEXT_PUBLIC_KEYSTATIC_PROJECT
            </code>{" "}
            and redeploy.
          </p>
          <p>
            If you were expecting to write a post, contact whoever maintains
            the site — nothing is broken, this step simply has not been done.
          </p>
        </div>
      </div>
    );
  }

  return <Keystatic />;
}
