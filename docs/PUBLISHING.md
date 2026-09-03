# Publishing to the News section

*A guide for Brett and Noah. No technical setup needed — just a web browser.*

## Posting a news item

1. Go to **yoursite.com/keystatic** in any web browser (a link "Publishing"
   will also be provided). Bookmark it.
2. Sign in with your email address and password. (You'll receive a free
   account invitation by email before launch — accept it once and you're
   set on that device.)
3. Click **News posts**, then **Create entry** (the + button).
4. Fill in:
   - **Title** — the headline. This also becomes the web address of the post.
   - **Date** — today's date is filled in automatically.
   - **Excerpt** — one or two sentences shown on the News page under the
     headline.
   - **Post** — the article itself. Use the toolbar for headings, block
     quotes, and links, exactly like a word processor. You can paste from
     Word; formatting carries over.
5. To attach a filing or other PDF: scroll to **PDF attachments**, click
   **Add**, give it a label (e.g. "Opinion, Ark. Sup. Ct."), and choose the
   file. Attachments are listed at the end of the post.
6. Click **Create** (or **Save**) in the top right.
7. That's it. The site rebuilds itself; your post is live in about two
   minutes. Nothing else to do.

## Saving something you're not ready to publish

Tick the **Draft** box before saving. The post is stored but hidden from
the website. Untick it and save again when you're ready.

## Editing or removing a post

Open **yoursite.com/keystatic**, click **News posts**, click the post, make
your change (or use **Delete entry**), and save. Live in about two minutes.

## What the section is for

Per the plan: one-paragraph summaries of cases won, and monthly summaries
of select appellate cases — roughly two to three posts a month. Case
results appear only here, where you control the wording.

## If something looks wrong

Nothing you do in the editor can break the website — every change is
saved with a history and can be rolled back. If a post looks wrong and you
can't fix it, contact Trav.

---

## Setup notes (Trav — remove this section from the client copy)

- Create the free Keystatic Cloud project (≤3 users on the free tier),
  install the Keystatic GitHub App on the repo, then set
  `NEXT_PUBLIC_KEYSTATIC_PROJECT=team/project` in Vercel env. Without that
  var the admin runs in **local mode** (dev only).
- Invite Brett and Noah (email accounts — no GitHub accounts needed).
- Publishing writes markdown to `content/news/` and PDFs to
  `public/files/news/` via commits; Vercel rebuilds on push, which is the
  "live in about two minutes."
