# Client review log

One row per piece of feedback from the September review round, so there is a
single place that answers "what did they ask for, and what happened to it."

## Getting the comments out of Vercel

Do not copy them from the dashboard one at a time — it is how threads get
missed. The Vercel CLI dumps the lot:

```bash
npx vercel@latest login
npx vercel@latest link           # once, in this repo
npx vercel@latest comments list --status all --all-branches --limit 100 --json > comments.json
```

Run them **one line at a time**. `npm i -g vercel` needs write access to
the global prefix and fails with EACCES on a default macOS node install —
`npx` sidesteps it entirely and always fetches the current CLI.

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

---

## Round 3 — 16 September (Noah's email + Brett's credential sheet)

| # | What | Disposition | Note |
| --- | --- | --- | --- |
| 37 | "No advertising disclaimer needed" | `fixed` | The empty footer slot is removed. This was the last blocking copy item. Their call under the Arkansas rules — do not add one back unasked |
| 38 | Brett's full credential sheet | `fixed` | Loaded verbatim: opening paragraph, clerkship, education, experience, memberships, eight publications and presentations, two awards, admissions. Sequenced to match Noah's page using Brett's own groupings. `draft` removed — his page publishes |
| 39 | "Leave the Federalist Society off Brett's memberships" | `fixed` | Omitted |
| 40 | Brett: "We are not doing this section" (notable cases) | `fixed` | No such section. Consistent with Noah's removal |
| 41 | Brett declined an approach quote and a personal note | `fixed` | Neither rendered. Matches Noah, whose quote the client removed |
| 42 | Contact form should go to watson@watsonlawllp.com | **`theirs` — deliberately not done yet** | That domain is not registered, so routing the form there now would bounce or silently drop every enquiry. Recorded as the launch target in `config/site.ts`; one-line switch at domain cutover |
| 43 | Central Arkansas → NLR + Searcy offices | `fixed` | Covered in round 1 |
| 44 | Draft sample never populated | `theirs` | The Draft checkbox. Reply and resolve the thread |

**Title discrepancy — needs one answer.** The homepage credential the client
approved in round 1 says "Chair, Drafting Committee"; Brett's own sheet says
"**Co-Chair**, Drafting Committee, *Handling Appeals in Arkansas* (since
2014)". Both places now read "Co-Chair", because his own sheet is the
authority on his own title and under-claiming is the safer error. Confirm
with Brett.

**His bio opens "Brett has handled…"** while Noah's opens "Noah P. Watson
served as…". Brett's wording, verbatim — but the two pages now address their
subjects differently. Worth one question rather than an edit.

**Noah thinks Brett is still working on his bio.** The sheet Trav supplied
reads as finished and is live. If more arrives it is additive; say the word
to hold the page instead.

**The firm name is not settled.** The Secretary of State has not accepted
"Watson & Watson LLP"; the fallback is "Watson & Watson, Attorneys at Law,
LLP", with a decision expected Monday. See the warning at the top of
`config/site.ts` — the fallback lengthens the wordmark's suffix from 3
characters to 23 and needs a look at the lockup before it is switched.

---

## Round 4 — 24 September (final photography)

Not client feedback: the delivered image set, and what it closed.

| # | What | Disposition | Note |
| --- | --- | --- | --- |
| 45 | Eight final stills delivered | `fixed` | Arkansas State Capitol and Pulaski County Courthouse, one golden hour, one grade. Replaces every stand-in crop. Masters were 6000px; committed at 2880 wide (three wide frames) and 1800 square (five area images) |
| 46 | Round 1 #18 — "are these the real courthouses?" | `fixed` | Answered by the delivery. Both buildings are Arkansas, both are ones the firm actually practises in front of, neither is a stock courthouse from somewhere else |
| 47 | Round 1 #19 — "I don't recall this being the Arnold courthouse" | `fixed` | He was right. The homepage band caption read "Richard Sheppard Arnold United States Courthouse · Little Rock" and the photograph was never that building. It now reads **"Pulaski County Courthouse · Little Rock"**, which is what is in frame. Still worth one confirmation from them |
| 48 | Brett: "the hero is too dark" | `fixed` | The new hero is the Capitol dome at golden hour against open sky — the brightest frame in the set |

**Photo-to-area mapping is arbitrary and reversible.** The five squares went
to the practice areas in delivery order (Box 1 → Appeals … Box 5 → Election
Law). Only one pairing is deliberate: Box 1 is the courthouse and it heads
Appeals; the other four are the Capitol. Each is a one-line swap in
`content/practice-areas.ts` with no layout consequence.

**One frame is under-resolution.** `detail-election-law.webp` came in at
816px square where the other four are ~4000. It is fine in the 21rem index
pane and soft as that page's full-width header on a large display. A
re-export at the set's native size drops in under the same name — flagged
to Trav rather than silently upscaled, which would only have made it blurry
in a way nobody could then diagnose.

---

## Round 5 — 25 September

Seven Vercel threads plus three items in Noah's email. Pulled with the CLI
(`--status all --all-branches --limit 100`), which returned 46 threads —
the 39 from September 13 and these seven.

| # | Page | What they asked for | Disposition | Note |
| --- | --- | --- | --- | --- |
| 49 | / header | Put "LLP" on one line with the name, as the footer does. And the name "still feels small compared to the link options to the right" | `fixed` (size) · **`theirs`** (lockup) | Header mark 0.88/1.02 → 1/1.18rem. The one-line lockup is held: the homepage mark is a Lottie whose "WATSON & WATSON", "LLP" and two rules are separate outlined layers, so changing the shape desynchronises the animation from every other page until the file is re-exported. See below |
| 50 | all but / | The "LLP" is a different font on interior pages | `fixed` | It was Libre Franklin semibold — a geometric sans inside a serif lockup — against the Lottie's outlined Source Serif. The static suffix is now serif at regular weight. The homepage side is a vector file and cannot be edited here, so this side moved |
| 51 | / facts | "30+ years' experience" on one line — "might just be my screen width" | `fixed` | It was his screen width, and he was right about the cause. `--text-ledger` caps at 2.125rem from ~1720px up; the string then needs 312px in a 290px column, and it is the MIDDLE column, which pays the gutter on both sides. `.fact-value` now caps at 1.95rem and the gutter is 2rem. Nobody sees smaller type than a 1440px laptop already renders |
| 52 | /firm | Delete the Jurisdictions list and the With Trial Counsel section | `fixed` | **Closes the round-2 open question.** The literal reading of their September instruction would have deleted both; they were left standing because deleting uncommented client content on an ambiguous instruction is harder to notice than not deleting it. The "Learn more about our practice, and meet us." line lived inside With Trial Counsel — it is kept, per round 2 #21, and moves up |
| 53 | /firm | More blank space between the title and the first paragraph than on other pages | `fixed` | Correct: this page alone stepped up to `--space-section` at md where /news and /attorneys stay at `--space-section-sm`. Now matches them |
| 54 | footer | Spell out "Arkansas"; distinguish the place from the name and number, "sort of like on the Contact page" | `fixed` | The place is now a kicker label in oxblood above the name and number, which is exactly what /contact does with its office headings. `site.stateName` added beside the postal `state` — an address label and a colophon want different forms |
| 55 | /practice | Rotate three pictures: Litigation Strategy's → Appeals, Appeals' → Election Law, Election Law's → Litigation Strategy | `fixed` | Done as a rotation of `src`+`alt`. **The filenames are slots, not subjects** — `detail-appeals.avif` no longer heads Appeals. Renaming them to chase this would break the history showing which frame is which |

**From the email, not Vercel**

| # | What | Disposition | Note |
| --- | --- | --- | --- |
| 56 | Contact form should send to watson@watsonlawllp.com | `fixed` | Replaces both individual addresses; neither attorney is a recipient now. This was round 3 #42, deferred then because the domain did not exist. It does now. **Still unproven end to end** — a resolving domain is not a provisioned mailbox, and Resend reports a send to a dead box as accepted |
| 57 | The Pulaski County Courthouse "is not particularly connected to our practice. We almost never practice there." Remove or replace with a different courthouse | `fixed`, with a caveat | Off the homepage; the band is now the Arkansas State Capitol across its lawn. **The Pulaski courthouse is the only courthouse in the delivered set** — another one means another shoot. Flagged to them |
| 58 | Send all the portraits so we can choose | `theirs` / Trav | Not a code change. Trav holds the shoot files |

**The Pulaski overlap.** #57 takes the Pulaski courthouse off the homepage
because they do not practise there. #55 moves a *different* frame of the
same building onto the Election Law page. Both instructions are followed
literally and they are not contradictory — a practice-page pane is not the
homepage band — but it is worth one sentence to them in case they had not
registered that Box 1 is the same courthouse.

**The Capitol now appears twice on the homepage** — the hero (dome, close,
framed by trees) and the band (three-quarter across the lawn). Different
enough not to read as a repeat, and it is what the delivered set allows.

**The low-resolution frame moved, it did not go away.** The 816px square is
now Litigation Strategy's rather than Election Law's. Still ample for the
index pane, still soft as a full-width page header.
