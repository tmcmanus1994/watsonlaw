# Watson Law — Website

Six-page site for a father-and-son appellate and constitutional litigation
boutique in Little Rock, Arkansas. Next.js (App Router) + TypeScript +
Tailwind CSS v4, deployed on Vercel.

**The firm name is not registered yet** — the repo name is a working label
only. See "Swapping in the firm name" below.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also the pre-push sanity check)
npm run lint
```

## Where everything lives

| What | Where |
| --- | --- |
| Firm name, tagline, address, phone, email, socials, contact recipient | `config/site.ts` |
| Design tokens — every color, font, size, spacing value | `app/tokens.css` |
| Practice areas (5) | `content/practice-areas.ts` |
| Attorney profiles (2) | `content/attorneys.ts` |
| News posts (markdown + frontmatter stub) | `content/news/*.md` |
| Headshots (800×1000, 4:5) | `public/images/attorneys/` |

Routes: `/` · `/firm` · `/attorneys` (+ `/attorneys/[slug]`) · `/practice`
(+ `/practice/[slug]`) · `/news` (+ `/news/[slug]`) · `/contact`. Dynamic
pages generate statically from the content files above.

## Swapping in the firm name (Constraint 1)

Nothing outside `config/site.ts` hardcodes the name. When registration
lands, edit `name` and `legalName` there — nav, footer, page titles,
OpenGraph, JSON-LD, and the contact email subject all follow.

## Swapping in the brand (Constraint 3)

All colors, font stacks, and scale values are tokens in `app/tokens.css`.
Applying the real identity = editing that file. If the brand uses a hosted
font, load it in `app/layout.tsx` via `next/font` and point the
`--font-heading` / `--font-body` tokens at it — still no component changes.

## Dropping in real content

- **Copy (~Aug 24):** replace the placeholder strings in `content/*.ts` and
  the page ledes. Blurbs are sized for 75–125 words, bios for 150–250.
- **Headshots (week of Aug 25):** overwrite the PNGs in
  `public/images/attorneys/` at 800×1000 (4:5). Dimensions are locked in
  `content/attorneys.ts`, so the layout will not shift.
- **Disclaimer / intake language:** client-supplied. Slots are marked with
  `TODO: client-supplied` comments in `components/SiteFooter.tsx` and
  `app/contact/page.tsx`.

## Contact form

Server action in `app/contact/actions.ts`. Spam protection is a honeypot
field plus a minimum-time check — no third-party service. Delivery uses the
Resend API free tier (100 emails/day) when these env vars are set:

- `RESEND_API_KEY` — from a (free) Resend account, pending client approval
- `CONTACT_FROM` — verified sender (defaults to Resend's onboarding sender)

Without a key, submissions are validated and logged so the form is testable.
The recipient is `contactRecipient` in `config/site.ts`.

## News section

Currently a file-based stub: markdown with frontmatter in `content/news/`,
parsed in `lib/news.ts`. Pages consume only the `NewsPost` shape, so the CMS
chosen in `docs/(C) News Stack Decision.md` (awaiting approval) replaces
`lib/news.ts` without touching page components.

## Deploying to Vercel

1. Import the GitHub repo at vercel.com/new (framework auto-detects).
2. Set `NEXT_PUBLIC_SITE_URL` to the deployment URL (used for canonical
   URLs, sitemap, and JSON-LD).
3. Do **not** connect a domain yet — the firm name isn't registered.

Note: Vercel's free Hobby tier is licensed for non-commercial use. Fine for
previews during the build; pick the production host (Vercel Pro vs. a
free-for-commercial alternative) before launch — client approval required
for any paid option (contract Term 5).
