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

Gathered by copying from the dashboard, which returned only the homepage
threads — 23 of the 36 that existed. Round 2 is the remainder, pulled with
the CLI. Use the CLI.

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

---

## Round 2 — 15 September

The thirteen threads the dashboard copy missed, on `/contact`, `/news`,
`/attorneys/noah-watson`, `/practice/*` and `/firm`. Two of them closed
items that had been blocking launch.

| # | Page | What they asked for | Disposition | Note |
| --- | --- | --- | --- | --- |
| 20 | /firm | The firm story, two paragraphs, written out in full | `fixed` | Verbatim. The "Draft · firm story pending" label is gone and the content gap this page carried from the start is closed |
| 21 | /firm | Keep the closing line as "Learn more about our practice, and meet us.", linking those phrases to Our Practice and Attorneys | `fixed` | |
| 22 | /contact | The intake wording, written out in full, naming watson@watsonlawllp.com | `fixed` | Verbatim, address as a mailto. Note it does **not** include no-attorney-client-relationship language — still theirs if they want it |
| 23 | /contact | "We're also going to have a general contact email, which will be watson@watsonlawllp.com" | `fixed` (partly `theirs`) | Added as `site.contactEmail` and printed. **It cannot receive mail** — the domain isn't registered, and the address is now public on /contact |
| 24 | /contact | Offices split NLR / Searcy here too | `fixed` | Already covered by round 1 |
| 25 | /attorneys/noah-watson | Replace the opening paragraph | `fixed` | Verbatim |
| 26 | /attorneys/noah-watson | Reorder: Clerkship, Education, Government Service, Professional Memberships, Publications, Admissions | `fixed` | Kept the existing "Bar & Court Admissions" heading rather than renaming to "Admissions" — they listed section names loosely, not a rename |
| 27 | /attorneys/noah-watson | Remove the Notable Cases section | `fixed` | Four matters removed. Nothing on the site now publishes case results outside News |
| 28 | /attorneys/noah-watson | Remove the personal quotes | `fixed` | Noah's `approach` quote removed; Brett never had one. Field and rendering kept in case they want one back |
| 29 | /attorneys/noah-watson | "Henry Woods Inn of Court" → "Judge Henry Woods American Inn of Court" | `fixed` | |
| 30 | /attorneys/noah-watson | Add "Eighth Circuit Bar Association" | `fixed` | Grouped with the other bar associations |
| 31 | /practice/appeals | Updated full description | `fixed` | Verbatim. Raises 400 → 450 appeals, matching the homepage figure |
| 32 | /practice/constitutional-litigation | Append "We have researched and written on the history of the Arkansas Constitution." | `fixed` | Verbatim |
| 33 | /practice/election-law | Updated full description | `fixed` | One substantive change: "Ethics Commission representation" → "proceedings" |
| 34 | /practice/* | Drop the office-cities line under each blurb | `fixed` | Removed from all five; the footer carries them on every page |
| 35 | /practice | Same as the homepage re numerals, "Five Areas", short descriptions | `fixed` | Covered by round 1 |
| 36 | /news | "I tried to publish a sample, but it never populated" | `theirs` | The Draft box was ticked, which hides a post by design. Needs a reply, not a change — `docs/PUBLISHING.md` now explains it |

**Open question on /firm.** Their comment said to replace "the text on this
page (except for the other comment below)" with the firm story. Taken
literally that also removes the Jurisdictions list and the With Trial
Counsel section, neither of which they commented on. Those are left in
place — deleting client content on an ambiguous instruction is harder to
notice than not deleting it. Confirm with them.

**Still not supplied:** the attorney advertising disclaimer. It is the last
empty slot and the only remaining launch blocker in the copy.
