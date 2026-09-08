# Publishing to the News section

*A guide for Brett and Noah. No technical setup needed — just a web browser.*

## Posting a news item

1. Go to **yoursite.com/keystatic** in any web browser. Bookmark it.
2. Sign in with your email address. (You'll get a free account invitation by
   email before launch — accept it once and you're set on that device.)
3. Click **News posts**, then **Create entry** (the + button).
4. Fill in:
   - **Title** — the headline. This also becomes the web address of the post.
   - **Date** — today's date is filled in automatically.
   - **Excerpt** — one or two sentences shown on the News page under the
     headline, and in search results.
   - **Post** — the article itself. Use the toolbar for headings, bold and
     italic, block quotes, lists and links, exactly like a word processor.
     You can paste from Word; formatting carries over.
5. To attach a filing or other PDF: scroll to **PDF attachments**, click
   **Add**, give it a label (e.g. "Opinion, Ark. Sup. Ct."), and choose the
   file. Attachments are listed at the end of the post automatically.
6. Click **Create** (or **Save**) in the top right.
7. That's it. The site rebuilds itself; your post is live in about two
   minutes. Nothing else to do.

## Saving something you're not ready to publish

Tick the **Draft** box before saving. The post is stored but hidden from the
website. Untick it and save again when you're ready.

## "I published it and it isn't on the site"

Almost always the **Draft** box. A drafted post saves and commits normally —
it just never renders, so from the editor it looks published and from the
website it looks missing. Open the post and check that box first.

If Draft is unticked and it still hasn't appeared, give it three minutes: the
site rebuilds after each save, and the post shows up when that finishes.

## Editing or removing a post

Open **yoursite.com/keystatic**, click **News posts**, click the post, make
your change (or use **Delete entry**), and save. Live in about two minutes.

## What the section is for

Per the plan: one-paragraph summaries of cases won, and monthly summaries of
select appellate decisions — roughly two to three posts a month. Case results
appear only here, where you control the wording.

Three **sample posts** are on the site now so you can see how writing appears
before you write your own. They are clearly marked as samples and should be
deleted before launch — open each one and use **Delete entry**.

## If something looks wrong

Nothing you do in the editor can break the website — every change is saved
with a history and can be rolled back. If a post looks wrong and you can't
fix it, contact Trav.

---

## Setup notes — Trav (remove this section from the client copy)

**Until this is done, `/keystatic` on the deployed site deliberately shows a
"Not configured yet" notice instead of the editor.** Without a Cloud project
Keystatic falls back to local storage, which writes to the filesystem — fine
in `npm run dev`, impossible on Vercel, where a post would be accepted and
then silently lost. The route refuses rather than lose someone's writing.

To turn it on:

1. Sign in at **keystatic.cloud** and create a project (free tier: **3
   users**, enough for Brett, Noah and one support seat).
2. From the project, **install the Keystatic GitHub App** on this repository
   and grant it write access. This is the only GitHub step, and it is yours —
   the attorneys never see it.
3. Copy the project identifier, which looks like `team-name/project-name`.
4. In Vercel → Project → Settings → Environment Variables, add:

   ```
   NEXT_PUBLIC_KEYSTATIC_PROJECT = team-name/project-name
   ```

   Set it for Production **and** Preview, then redeploy. It is a
   `NEXT_PUBLIC_` var, so it is inlined at build time — an existing
   deployment will not pick it up without a rebuild.
5. Invite Brett and Noah from the Keystatic Cloud project (email invitations
   — no GitHub accounts).
6. Open `/keystatic` on the deployment, sign in, and publish a throwaway post
   end to end to confirm the commit lands and the site rebuilds. Delete it.

Publishing writes markdown to `content/news/` and PDFs to
`public/files/news/` as real commits, so Vercel rebuilds on push — that is
the "live in about two minutes" the editors see. Because posts are plain
files in the repo, the content survives the vendor entirely: if Keystatic
Cloud ever changes terms, only the login layer is lost.

**Before launch:** delete the three `sample-*.md` posts in `content/news/`
(or have the attorneys delete them from the editor, which doubles as their
first real exercise).
