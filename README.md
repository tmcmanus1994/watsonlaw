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
| Firm name, offices, phones, mailing address, recipients, jurisdictions | `config/site.ts` |
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
- **Lottie wordmark**: when the .dotlottie file lands, put it in
  `public/media/` and set `brandLottieSrc` in `config/site.ts`. It plays
  once and settles; static mark is always the fallback.

## News / Keystatic

Admin at `/keystatic` (excluded from robots + sitemap). Local mode in dev;
production uses Keystatic Cloud auth — setup steps at the bottom of
`docs/PUBLISHING.md`, editor guide at the top. Posts are plain markdown in
`content/news/`; the site renders them statically via `lib/news.ts`
(headings, quotes, links, `[^1]` footnotes, PDF attachments).

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
