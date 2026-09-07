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
| Homepage hero + courthouse band media slots | `content/home.ts` |
| Practice areas (client's verbatim blurbs) | `content/practice-areas.ts` |
| Attorney profiles (Brett is `draft: true` pending his sheet) | `content/attorneys.ts` |
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
tofu. No italic face is shipped — nothing on the site sets italic serif.

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

⚠️ **All six are STAND-IN crops** of the two approved photographs. The two
sources are different temperatures (warm sandstone / cool marble), so they
do not yet read as one graded set. Replace with the September shoot's
pre-graded stills at the same 4:5 ratio (2400×1000 for the index header) and
nothing shifts.

## Media pipeline (photos land late — zero layout shift)

- **Headshots** (week of Sept 14): overwrite the PNGs in
  `public/images/attorneys/` at 800×1000 (4:5). Dimensions are locked in
  `content/attorneys.ts`.
- **Court stills**: drop pre-graded files in `public/images/courts/` and
  set the paths in `content/home.ts` (band) — no CSS re-grading on top.
- **Hero footage**: 6–10s muted H.264 loop, compressed hard, into
  `public/media/`; set `videoSrc` in `content/home.ts`. Static still shows
  on mobile and for reduced-motion visitors; the placeholder still is
  marked and lives at `public/images/hero/`.
- **Lottie wordmark**: `public/media/watson-logo.json`, configured at
  `site.brandLottie`. Plays once on the **homepage header only** (the file
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
`site.contactRecipients` via Resend. Required env:

- `RESEND_API_KEY` — without it, production **fails loudly** (the form
  shows an error with the direct emails; dev logs-and-continues and says so
  in the UI). Message bodies are never logged.
- `CONTACT_FROM` — verified sender (defaults to Resend's onboarding sender).

Spam protection is a honeypot plus a minimum-time check — no third-party
service.

## Deploying / transfer

1. Import the repo at vercel.com/new (Next.js auto-detects). Set
   `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_FROM`,
   `NEXT_PUBLIC_KEYSTATIC_PROJECT`.
2. Enable **Preview Comments** on the deployment for the client review
   round.
3. Do **not** connect a domain until the name is registered.
4. At launch, the repo and Vercel project transfer to the client — nothing
   in the code references a GitHub org or Vercel team, so transfer is
   Settings → Transfer on both platforms plus re-entering the env vars.
