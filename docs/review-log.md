# Client review log

One row per piece of feedback from the September review round, so there is a
single place that answers "what did they ask for, and what happened to it."

## Getting the comments out of Vercel

Do not copy them from the dashboard one at a time — it is how threads get
missed. The Vercel CLI dumps the lot:

```bash
npm i -g vercel
vercel login
vercel link                      # once, in this repo
vercel comments list --status all --all-branches --limit 100 --json > comments.json
```

Three flags matter, and every one of them is a default that will quietly
hide comments from you:

- `--status all` — the default is `unresolved` only.
- `--all-branches` — the default is the current branch when it can infer one.
- `--limit 100` — the default page is **20**. Round 1 had 21 threads.

If there are more than 100, the output carries a cursor; pass it back with
`-N <cursor>`.

There is no REST API for comments — it is an open feature request — so the
CLI is the only bulk route.

## Replying and resolving

Also from the terminal, which means the loop closes without opening the
dashboard:

```bash
vercel comments inspect <thread>              # full conversation
vercel comments resolve <thread> -m 'Fixed.'  # reply and resolve together
```

Reply in the attorneys' own threads as things land. A note that disappears
without an answer is how a client stops leaving them.

**Dispositions**

| | Meaning |
| --- | --- |
| `fixed` | Changed in code. Commit noted. |
| `theirs` | Needs a decision or wording from Brett or Noah. |
| `known` | Already on the placeholder list in `REVIEW.md`. No action. |
| `declined` | Not done, with the reason. Usually a brand-guide or launch-scope conflict. |

Keep the wording of what they asked for close to what they actually wrote —
paraphrasing loses the thing they were reacting to.

---

## Round 1 — 15 September

Twenty-one notes, all on the homepage. Everything actionable is done; three
items need answers rather than code.

| # | Page | What they asked for | Disposition | Note |
| --- | --- | --- | --- | --- |
| 1 | / hero | Delete "Appellate & Constitutional Litigation · Arkansas" — don't limit to region or practice area | `fixed` | `tagline` removed from config. Also dropped from the browser title; `description` still carries region + courts for search |
| 2 | / hero | Headline to "Superior advocacy." | `fixed` | |
| 3 | / hero | New sub-line, from SCOTUS down to trial courts | `fixed` | Verbatim |
| 4 | / facts | "450+ appeals" — they totalled their own figures | `fixed` | |
| 5 | / facts | Fact 1 label: named courts, in their order | `fixed` | Verbatim |
| 6 | / facts | Drop "Two attorneys" → "30+ years' experience"; size puts off general counsel | `fixed` | Firm size no longer stated anywhere on the homepage |
| 7 | / facts | Fact 2 label: direct partner attention | `fixed` | Verbatim |
| 8 | / facts | Fact 3 list: delete the "and" | `fixed` | Plain comma list, still derived from the ledger |
| 9 | / ledger | Five client-written short descriptions, one per area | `fixed` | Replaced the deck copy and the first-sentence derivation; every area now has explicit copy |
| 10 | / ledger | Drop the "Five Areas" counter | `fixed` | |
| 11 | / ledger + practice pages | Drop the Roman numerals | `fixed` | Removed from the ledger, the "Also in Practice" list and the practice-page kicker. Overrides the approved deck, which specified them |
| 12 | / attorneys | Brett's credential → "Appellate counsel in hundreds of cases. Chair, Drafting Committee, *Handling Appeals in Arkansas*." | `fixed` | Needed a real italic face — see note below |
| 13 | / close | Delete the homepage contact section — nav and footer already cover it | `fixed` | |
| 14 | / footer | Delete the firm description line | `fixed` | |
| 15 | / footer | Split into NLR (Noah) and Searcy (Brett); drop "Central Arkansas" | `fixed` | Reverses the region-only presentation. Cities, names, numbers — still no street address, which they did not ask for |
| 16 | / header | Logo is getting lost — make it bigger | `fixed` | 0.72→0.88rem, 0.8→1.02rem. Animated mark scales with it |
| 17 | / global | Type feels small to Brett, who is a fair proxy for the audience | `fixed` | Whole scale up ~12%, ratios unchanged. Moves away from the Figma values deliberately; old scale recorded in `tokens.css` |
| 18 | / hero + band | Are these the real courthouse photographs? Don't want random courthouses. Brett finds the hero too dark | `theirs` | Trav's answer — the packet said placeholders would be grey blocks, but these two slots have real stand-in photography, so nothing looked unfinished |
| 19 | / band | Doesn't recall this being the Arnold courthouse | `theirs` | Same. If the photograph is not that building, the caption is wrong and must change with it |

**Italics.** Item 12 needed a publication title in italic, and the site
shipped no italic face — the browser would have synthesised a slant, which
on a serif reads as a mistake. Source Serif 4 italic is now subset to
exactly the roman's coverage and registered. This was going to surface
anyway: legal writing italicises case names, and markdown in a news post can
emit `<em>` at any time.
