---
type: decision
client: Brett Watson + Noah Watson
project: Website & Brand Identity
status: approved — implemented in the Sept 2 build (Keystatic, cloud auth mode)
created: 2026-08-19
tags: [website, client, cms, decision]
---

# News Stack Decision — How the News Section Publishes

**Status: ✅ Approved and implemented** (Sept 2 build — admin at `/keystatic`, cloud
auth pending the Keystatic Cloud project; see `docs/PUBLISHING.md`).

> Sourcing note: this research environment could not reach the vendors' own pricing pages
> directly (network egress blocked), so figures below come from vendor docs and multiple
> 2026-dated third-party pricing reviews found via web search. **Before approving, spend two
> minutes eyeballing keystatic.com/pricing and sanity.io/pricing to confirm the numbers.**

## Recommendation: Keystatic (Cloud auth mode)

Keystatic is an MIT-licensed, git-backed CMS by Thinkmill (the KeystoneJS team — actively
maintained, issue/release activity through August 2026). The admin UI mounts inside our
Next.js app at `/keystatic`. Content is stored as markdown files **in our own repo** —
Keystatic is just an editor over them.

Why it wins, against the criteria in order:

1. **$0 forever.** The CMS itself is open source. Auth for non-technical editors comes from
   Keystatic Cloud, whose free tier covers **3 users per team** — exactly Brett + Noah + one
   support seat. (Pro is $10/mo + $5/user past 3, only if they ever add editors.)
2. **No git literacy.** Editors sign in at `oursite.com/keystatic` with a free Keystatic
   Cloud account (email — **no GitHub account needed**). Saving a post creates the commit
   behind the scenes; Vercel rebuilds automatically. They never see git.
3. **Low maintenance.** No servers, no database, no separate studio deployment. One npm
   dependency in the repo we already maintain.
4. **Content survives the vendor — this is the decisive point.** Posts are plain markdown
   files in the repo. If Keystatic Cloud's free tier changes or the project dies, we lose
   only the login layer: the site keeps building, every post is still ours, and we swap in
   another editor with **zero content migration**. No other option has this property.
5. **Fast.** Pure static generation from repo files. No runtime fetch at all.
6. **Lawyer-grade writing.** Rich-text editor over markdown: headings, block quotes, links,
   footnotes (markdown footnotes), and PDF attachments stored in the repo alongside posts.

Publish latency: a post goes live ~1–2 minutes after "Save" (Vercel rebuild). For appellate
commentary, that's fine; flag it to the client so it's not a surprise.

## Runner-up: Sanity (embedded studio at `/studio`)

Free tier (as of 2026-08): **20 seats, 10,000 documents, 2 datasets, ~1M CDN API
requests/mo, 100 GB assets, 100 GB bandwidth**; next tier is Growth at $15/seat/mo.
Well-funded vendor, best-in-class editing UX, editors log in with plain email accounts.

**What would change the call:** if the attorneys try Keystatic and dislike the editor, or
want scheduled publishing / drafts-with-review workflows, Sanity is the answer — its free
tier is the most generous hosted one available. The trade-off: content lives in Sanity's
hosted store, so a future pricing change means an export-and-migrate project (export
exists via CLI, but it's a rebuild-week-sized task), and the embedded studio is a much
larger dependency tree in the repo (Term 13 surface).

## Eliminated

- **TinaCMS** — free tier is **2 users, hard stop**. That's Brett + Noah with no support
  seat; the moment anyone else needs access it's $29/mo (Team). Too tight to bet on.
- **Decap CMS** — free, but its no-GitHub-account auth path (Netlify Git Gateway) is
  **deprecated**. Today's options: every editor gets a GitHub account with repo access, or
  we run a custom OAuth proxy — which is exactly the "custom auth" red flag the handoff
  says disqualifies an option.
- **Notion-as-CMS** — $0 and a familiar editor, but: **5 MB per-file upload cap on the free
  plan** (court filing PDFs will blow through that), 3 req/s API limit, hosted-image URLs
  that expire after ~1 hour (must download/rehost at build), and a pile of custom sync code
  that is permanent Term 13 exposure. The glue code we'd write *is* the CMS, and we'd own
  its bugs forever.

## If the free tier changes in a year

- **Keystatic:** content is unaffected (it's in our repo). Worst case, editors temporarily
  lose the friendly login and we either pay $10/mo, switch to GitHub-account login (free
  forever), or swap editors. Site never goes down, nothing to migrate.
- **Sanity (if chosen instead):** content is hostage to the export path. Migration is real
  work billed to nobody.

## Client publish workflow (becomes handoff documentation)

1. Go to `oursite.com/keystatic` in any browser.
2. Sign in with your Keystatic account (email + password; free).
3. Click **News**, then **Create new post**.
4. Write the post — headings, quotes, and links from the toolbar; drag PDFs in to attach.
5. Click **Save**. The site rebuilds itself; the post is live in about two minutes.

## Requires client account / client approval

- Each editor creates a **free Keystatic Cloud account** (email signup). $0 — but it is a
  third-party account, so mention it under Term 5 transparency.
- The Keystatic GitHub App gets installed on the repo — that's on **our** GitHub, one-time,
  by us. The client never touches GitHub.
- ⚠️ **Separate flag, while we're on Term 5:** Vercel's free Hobby tier is licensed for
  *non-commercial* use. A law firm site is commercial — long-term hosting is either Vercel
  Pro ($20/mo, needs client approval) or a free-for-commercial host (Cloudflare Pages /
  Netlify free tier). Preview/staging on Hobby during the build is normal; decide before
  launch.

---

*Sources checked 2026-08-19: Keystatic docs (cloud/github-mode) + 2026 reviews
(luckymedia.dev, toolradar, propicked); Sanity 2026 pricing breakdowns (robotostudio,
toolpick, nayankyada); TinaCMS pricing reviews (spotsaas, luckymedia); Decap Git Gateway
deprecation (decaporg/decap-cms discussion #7419, Netlify docs); Notion 2026 free-plan
limits (smartprocessflow, usecarly) and API webhook notes (fazm.ai).*
