# The domain

Not code, but it is the one piece of the launch that can make a finished
site look unbuilt, and it has done so once already.

## The failure it caused (24 September)

`https://watsonlawllp.com/` served GoDaddy's "Launching Soon" page —
starfield, cookie banner, a GoDaddy ad bar across the top — while
`https://www.watsonlawllp.com/` served the real site. Same domain, same
moment, two different pages.

The cause was in DNS, not in the app:

```
watsonlawllp.com        3 A records:  13.248.243.5, 216.150.1.1, 76.223.105.230
www.watsonlawllp.com    2 A records:  216.150.1.129, 216.150.16.129
```

The bare domain had **three** A records pointing at **two different
hosts**. Two of them (`13.248.243.5`, `76.223.105.230`) are AWS Global
Accelerator addresses — the pair GoDaddy's Websites + Marketing builder
serves its pages from, left behind when the domain was registered. One
(`216.150.1.1`) is Vercel.

A browser handed several A records picks one and caches it. Two of the
three led to GoDaddy, so roughly two visitors in three saw "Launching
Soon", and which one *you* saw depended on your DNS cache — which is why
it can look intermittent, or look fixed when it is not. `www` was clean:
both its addresses are in the same Vercel block.

## How to check it, from any machine

```bash
dig +short watsonlawllp.com A
dig +short www.watsonlawllp.com A
```

**The bare domain must return exactly one A record**, and it must be the
value Vercel names under Project → Settings → Domains. More than one, or
a value Vercel does not name, is this bug.

Do not test by loading the site: a cached DNS answer or a cached redirect
will tell you it is fine when it is not. `dig` reads the zone.

## Fixing it

1. **Detach the GoDaddy builder site from the domain first.** While a
   Websites + Marketing / Airo site is attached, GoDaddy re-adds its own
   A records, so editing DNS alone gets silently undone.
2. In GoDaddy DNS, delete every A record on `@` except Vercel's. Leave
   `www` alone — it is already right. Leave MX and TXT records alone:
   they are the mail records, and the contact addresses depend on them.
3. In Vercel, both `watsonlawllp.com` and `www.watsonlawllp.com` should be
   listed, one marked as the redirect target of the other.
4. Wait for the old records' TTL, then re-run the `dig` above.

## Which address is canonical

Whichever Vercel redirects *to* must equal `NEXT_PUBLIC_SITE_URL`, with
the scheme and no trailing slash:

```
NEXT_PUBLIC_SITE_URL=https://www.watsonlawllp.com
```

It is read in `config/site.ts` and feeds the canonical link tags, the
sitemap, the JSON-LD and the link-preview card. It is inlined at **build**
time, so setting it requires a redeploy — changing it in the Vercel UI
alone does nothing to the running site. Unset, the site falls back to
`example.com`, which is what the OG card will advertise to anyone the
attorneys send the link to.
