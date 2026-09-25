# Watson & Watson — Website

Site for an appellate and constitutional litigation firm in Arkansas.
Next.js (App Router) + TypeScript + Tailwind CSS v4 + Keystatic, deployed
on Vercel. Design source of truth: `docs/design-reference.pdf`.

⚠️ The firm name is the expected filing but **not yet registered**, and the
expected domain is **not bought**. Everything name-related flows from
`config/site.ts` (see below).

## Local development

```bash
npm install
npm run dev      # http://localhost:3000  (Keystatic admin at /keystatic, local mode)
npm run build    # production build — the pre-push sanity check
npm run lint
```

## Where everything lives

| What | Where |
| --- | --- |
| Firm name, service area, phones, recipients, jurisdictions | `config/site.ts` |
| Design tokens — every color, font, size, spacing value | `app/tokens.css` |
| Font files (Source Serif 4, Libre Franklin — self-hosted, OFL) | `app/fonts/` (see Fonts) |
| Link-preview card (generated from config, never a committed PNG) | `app/opengraph-image.tsx` |
| Homepage hero + courthouse band media slots | `content/home.ts` |
| Practice areas (client's verbatim blurbs) | `content/practice-areas.ts` |
| Attorney profiles (both live; `draft: true` holds a page back) | `content/attorneys.ts` |
| News posts (markdown; written via /keystatic) | `content/news/` |
| News PDF attachments / images | `public/files/news/`, `public/images/news/` |
| Court photography (pre-graded stills from Trav) | `public/images/courts/` |
| Hero footage + poster | `public/media/`, `public/images/hero/` |

## The one-file name rule

Nothing outside `config/site.ts` hardcodes the firm name. The wordmark,
monogram, and favicon are typographic components generated from config —
when registration lands (or changes), edit `name`/`legalName` there and
everything follows. Exception noted in code: `app/icon.tsx` keeps literal
palette hex values because the favicon renderer can't read CSS variables —
keep them in sync with `app/tokens.css`.

## How location is presented

⚠️ The site names a **region and nothing else** — `site.serviceArea`
("Central Arkansas"). There are deliberately no offices, no cities, and no
street or mailing address anywhere on the pages or in the JSON-LD, because
the attorneys are not putting a physical location behind the firm yet.

Every location line on every page reads from that one string, so when Brett
and Noah decide how they want location shown it is a one-value edit. The
real mailing address is still in `config/site.ts`, unrendered, with a note
on how to bring it back.

## Brand rules enforced in code

- Oxblood (`--color-accent`) is only ever hairlines, labels, numerals,
  link states, and the monogram rule — never a background or fill.
- Print stylesheet drops oxblood to ink (`app/tokens.css`).
- Practice-area numerals are **uppercase** Roman (`I.`–`V.`), serif, oxblood.

### Fonts

Both families are self-hosted from `app/fonts/` (OFL-1.1, the same files
Google Fonts serves), so visitors make no request to Google.

**Source Serif 4 ships as the two-axis cut — `wght` *and* `opsz` (8–60).**
This matters: with `font-optical-sizing: auto` (the browser default) the
optical-size axis thickens strokes at small sizes and refines them at
display sizes, which is how the type looks in Figma and the brand guide.
The `wght`-only cut cannot do that and reads noticeably thin at body sizes
— do not swap it back to save bytes.

It is subset to Latin + accented letters + the punctuation this site uses
(286 glyphs, 108 KB). To regenerate after changing coverage:

```py
# pip install fonttools brotli ; source file from @fontsource-variable/source-serif-4
from fontTools.ttLib import TTFont; from fontTools import subset
f = TTFont("source-serif-4-latin-opsz-normal.woff2")
o = subset.Options(); o.layout_features = ["*"]; o.name_IDs = ["*"]; o.notdef_outline = True
s = subset.Subsetter(options=o); s.populate(unicodes=[...]); s.subset(f)
f.flavor = "woff2"; f.save("app/fonts/source-serif-4-latin-opsz-normal.woff2")
```

Characters outside the subset fall back to Georgia per-glyph rather than
tofu.

**The italic is shipped too**, subset to exactly the roman's coverage.
Legal writing italicises case names and publication titles — Brett's
credential line sets *Handling Appeals in Arkansas* — and markdown in a
news post can emit `<em>` at any time. Without a real italic the browser
synthesises a slant, which on a serif reads as a mistake.

**Two `*-og.ttf` faces sit alongside them and are never served to a
browser.** They exist only for `app/opengraph-image.tsx`: the OG renderer
takes ttf/otf/woff and cannot read woff2. They are static instances of the
same variable fonts (Source Serif 4 at `opsz` 60, Libre Franklin at
`wght` 500), so the link-preview card is set in the firm's real type
rather than the renderer's substitute face. Regenerate them the same way:

```py
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
f = TTFont("app/fonts/source-serif-4-latin-opsz-normal.woff2"); f.flavor = None
instantiateVariableFont(f, {"wght": 400, "opsz": 60}, inplace=True)
f.save("app/fonts/source-serif-4-og.ttf")
```

### Which family goes where

The guide uses two families with a specific division of labour. Getting
this wrong is the most likely way the site drifts off-brand:

| Role | Family | How |
| --- | --- | --- |
| Headings, the firm's own prose (practice blurbs, bios, news posts), numerals, wordmark | Source Serif 4 | default; `.prose`, `font-serif` |
| Labels, kickers, nav, captions | Libre Franklin caps 600 | `.label` (+ `.label-nav` / `.label-kicker` / `.label-caption` for per-role tracking) |
| Short supporting lines — index descriptions, hero sub, credential strips, excerpts, addresses | Libre Franklin | `.support` |

"One family for everything with a voice: Source Serif 4." The `.support`
class is the caption voice — use it for short secondary lines, never for
the firm's own long-form prose.

Type scale, tracking, and both families live in `app/tokens.css`; no
component sets a font name or size directly.

## Motion

Two mechanisms, both CSS-first. The rule learned the hard way: **never gate
content on JS, and never put a reveal on the LCP element** — an
observer-driven entrance once cost ~2.9s of LCP render delay on `/practice`.

- **Load reveal** (`.reveal`, `.reveal-dissolve` + `--reveal-i` for stagger):
  pure CSS animation, starts at parse, no JS. Applied to each page's opening
  type — never to the photograph behind it.
- **Ledger entrance** (`components/PracticeIndex.tsx`): the one JS-driven
  piece, armed only for hover-capable pointers so touch devices get content
  immediately.

Both are declared inside `@media (prefers-reduced-motion: no-preference)`,
so reduced motion and no-JS simply render the finished page.

### Added in the September polish pass

See `docs/audit-2026-09.md` for the reasoning. All of it is CSS in
`globals.css` plus three components; no new dependencies.

- **Scroll-in reveal** (`.rise`): CSS scroll-driven animation
  (`animation-timeline: view()`), wrapped in `@supports` and the
  reduced-motion query. No observer, nothing gated — browsers without it
  render the finished page. Never on the hero.
- **Drawn nav underline** (`.nav-link`): the active/hover rule scales in from
  the left and withdraws to the right. Colour still comes from
  `--nav-underline`, set per header context.
- **Hero details**: `.hero-rule` draws across the measure on load;
  `.scroll-cue` is a paper rule that draws downward on a slow loop (desktop
  only, decorative).
- **Directional link** (`.cta`): the site's only call-to-action shape — caps
  label, serif arrow, hairline that turns oxblood. Never a filled button.
- **Proof strip** (`.facts`, homepage): three facts, every one derived from
  content already on the site (`home.hero.sub`, `attorneys[].homeCredential`,
  `site.offices`). Change the source and the strip follows.
- **Ledger**: two-column editorial rows above 768px on the homepage (title
  left, description right, `Read →` cue at the edge on hover); `/practice`
  keeps the stacked row because the image pane is its counterweight.
  Titles use `--text-ledger`.
- **Practice pages**: `.prose-lede` sets the blurb's first paragraph a step
  larger (as the mockup does) — the words are untouched; one `Discuss a
  matter` link below the blurb.
- **Interior header** is sticky (`.header-sticky`, solid paper).

## Practice imagery

Each area in `content/practice-areas.ts` carries an `image` used twice: as
that area's page header, and in the `/practice` counterweight pane (the
sticky image that dissolves between areas on hover/focus, wide hover-capable
viewports only, driven by `:has()` — no JS).

The final set landed 24 September: graded frames of the Arkansas State
Capitol and the Pulaski County Courthouse, all shot at one golden hour, so
the photography finally reads as a single set. The hero does double duty
as the /practice header, at the client's request — the band crops to the
dome where the full-height hero shows the whole building, so the two do
not read as the same picture.

Both slots are `fill` + `object-cover`, so the square area images are
centre-cropped (a 4:5 pane, a wide header band) and the mapping of photo to
practice area is a one-line swap with no layout consequence.

⚠️ **`detail-election-law.avif` is 816px square** where the other four are
2048. Ample for the index pane; soft as that page's full-width header on a
large display. A re-export at the set's native size drops in under the same
name.

### How the files are encoded, and why

Everything in `public/images/courts/` and `public/images/hero/` is **AVIF
at quality 80**, committed at 3840 (hero), 3200 (the two wide frames) and
2048 (the squares). That is the archive copy, not what anyone downloads —
`next/image` resizes and re-encodes it per request.

The numbers behind those choices, measured on the hero against its own
15MB master (PSNR at 1920px, so higher is closer to the original):

| Committed as | Size | Delivered quality |
| --- | --- | --- |
| the 15MB PNG master | 15 MB | 40.3 dB |
| AVIF q80 | 0.75 MB | 40.0 dB |
| WebP q90 | 0.84 MB | 38.9 dB |

AVIF q80 costs 0.3 dB against keeping a 15MB PNG in git forever. WebP at
the same file size costs four times that, because a sunset sky is one long
smooth gradient and that is precisely where WebP bands.

**Do not re-encode a committed file in place.** Each pass is lossy and
they compound. Re-export from the master, or pull the previous upload out
of git history (the client's originals are in the `Add files via upload`
commits) — that is how this set was regraded.

## Media pipeline (photos land late — zero layout shift)

- **Headshots**: delivered 21 September and in place at their native
  720×928 (not the 4:5 the placeholders assumed). A replacement should
  match that, or update `width`/`height` in `content/attorneys.ts` to the
  real dimensions — they are declared so the browser reserves the right box
  and nothing shifts.
- **Court stills**: delivered 24 September. Drop replacements in
  `public/images/courts/` and set the paths in `content/home.ts` (hero and
  band) and `content/practice-areas.ts` (the five areas and the index
  header) — no CSS re-grading on top. See the encoding note above before
  converting anything.

  The band's caption in `content/home.ts` **names the building in the
  photograph**. It changed with the file once already (the deck specified
  the Richard Sheppard Arnold United States Courthouse; the delivered frame
  is the Pulaski County Courthouse). If the photograph changes again, the
  caption changes with it.
- **Hero footage**: 6–10s muted H.264 loop, compressed hard, into
  `public/media/`; set `videoSrc` in `content/home.ts`. Static still shows
  on mobile and for reduced-motion visitors; it lives at
  `public/images/hero/`.
- **Lottie wordmark**: ⚠️ **currently switched off** — `withLottie={false}`
  in `components/SiteHeader.tsx`, one word from returning.

  On 25 September the client asked for "LLP" on the same line as the name
  in the header. The animation draws the STACKED lockup: name, LLP and the
  two rules are separate outlined layers, with LLP on its own line. A
  homepage that animates into a different shape from the one every other
  page shows is worse than no animation, so it waits for a re-exported
  file. To restore it: drop the new `.json` in, **re-measure the artwork
  bounds** into `site.brandLottie.artwork` (they position the canvas over
  the static mark's box, and that box changed shape), and set
  `withLottie={overHero}` again.

  `public/media/watson-logo.json`, configured at
  `site.brandLottie`. Played once on the **homepage header only** (the file
  is paper-coloured, so it reads over the hero photograph and would be
  invisible on interior pages) and settles on its final frame. The static
  typographic mark renders first, defines the box, and remains the fallback
  for no-JS, reduced motion and load failure — so there is no layout shift.

  Two things to know before replacing the file:
  1. The player's WASM is **self-hosted** at
     `public/media/dotlottie-player.wasm`, set via `DotLottie.setWasmUrl()`.
     By default the library fetches it from unpkg on every visit; this site
     makes no uncontrolled third-party request (Terms 5 and 13). Re-copy it
     from `node_modules/@lottiefiles/dotlottie-web/dist/` when that package
     is upgraded, or the version will drift.
  2. `site.brandLottie.artwork` records where the mark sits **inside** the
     composition (x 297, y 341, 1387×343 within 1920×1080). The mark is
     fitted by that box, not the canvas, because the export leaves the
     artwork off-centre in a 16:9 comp. **Re-measure after any re-export**,
     or export the comp cropped tight to the mark and set the box to the
     full canvas.

## News / Keystatic

Admin at `/keystatic` — excluded from robots + sitemap, and rendered
without the site header and footer so a marketing nav can't sit above the
editor and discard an unsaved post.

Posts are plain markdown in `content/news/`; the site renders them
statically via `lib/news.ts` (headings, bold/italic, lists, block quotes,
links, `[^1]` footnotes, PDF attachments). `draft: true` keeps a post off
the site.

**Storage.** Local mode in dev; Keystatic Cloud in production. Local mode
writes to the filesystem, which cannot work on a deployed host — so when
`NEXT_PUBLIC_KEYSTATIC_PROJECT` is unset in production, `/keystatic`
deliberately renders a "Not configured yet" notice instead of an editor
that would accept a post and lose it. Setup steps are at the bottom of
`docs/PUBLISHING.md`; the editor guide for the attorneys is at the top.

⚠️ `content/news/` currently holds three **`sample-*.md` posts** so the
section can be demoed before the client writes anything. They are marked as
samples in their titles and opening line and describe no real matter —
**delete them before launch**.

## Contact form

`app/contact/actions.ts` delivers to **both** addresses in
`site.contactRecipients` — currently `brett@` and `noah@watsonlawllp.com` —
via Resend, with reply-to set to the enquirer so either attorney can answer
directly. Required env:

- `RESEND_API_KEY` — without it, production **fails loudly** (the form
  shows an error with the direct emails; dev logs-and-continues and says so
  in the UI). Message bodies are never logged.
- `CONTACT_FROM` — a sender on a domain **verified in Resend**. Defaults to
  Resend's onboarding sender, which works for testing but should not be
  what a potential client sees.

⚠️ A successful send is not proof of delivery. Resend accepts mail for any
address on a verified domain; if the mailbox behind it does not exist, it
bounces afterwards and the form still reports success. Send a real message
through the live form and confirm it arrives in both inboxes.

Spam protection is a honeypot plus a minimum-time check — no third-party
service.

## Branches

- **`main`** — the production branch. Vercel's Production Branch setting
  points here, and `<project>.vercel.app` (later the real domain) serves it.
- **Working branches** — everything else. Each push builds a **preview**
  deployment, which is what client review runs on.

This split is not bookkeeping: **Vercel's on-page comments only appear on
preview deployments.** While the project's Production Branch was the same
branch the work was happening on, every push deployed straight to
production, no preview ever existed, and there was nowhere for a reviewer to
leave a comment. Keep the work off `main` and previews keep working.

Keystatic Cloud commits to whichever branch it is configured for — check
that it still matches after any branch change, or published posts will land
somewhere the production site never builds from.

## Deploying / transfer

1. Import the repo at vercel.com/new (Next.js auto-detects). Set
   `RESEND_API_KEY`, `CONTACT_FROM`, `NEXT_PUBLIC_KEYSTATIC_PROJECT`
   (scope each to Preview as well as Production — see `docs/PUBLISHING.md`).
   `NEXT_PUBLIC_SITE_URL` is optional: without it the site derives its URL
   from Vercel's `NEXT_PUBLIC_VERCEL_BRANCH_URL`, so previews get correct
   canonical/OG URLs on their own. Set it once the domain is registered.
2. Client review round — invite each reviewer to the Vercel team as a
   **Viewer**, not a Member. Viewer seats are free on Pro and can comment
   on previews; a Member seat is a billed developer seat, which would be a
   client-approved cost under Term 5. Because reviewers are then team
   members, leave **deployment protection on** — the preview stays private.
   Share the **branch preview URL** (stable across pushes), not the
   per-deployment URL, which goes stale on the next push. Non-production
   builds are `noindex` regardless (`app/robots.ts`).
   Reviewer-facing instructions: `docs/REVIEW.md`.
3. Do **not** connect a domain until the name is registered.
4. At launch, the repo and Vercel project transfer to the client — nothing
   in the code references a GitHub org or Vercel team, so transfer is
   Settings → Transfer on both platforms plus re-entering the env vars.
