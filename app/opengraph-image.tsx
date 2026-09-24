import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site, entitySuffix } from "@/config/site";

/**
 * The link preview card — what a recipient sees when either attorney sends
 * the firm's address in an email, a message or a LinkedIn post. Without
 * this file the card is a bare URL, which reads as an unfinished site.
 *
 * It is the wordmark lockup on the ink ground, not a photograph: a
 * courthouse thumbnailed to 200px in a chat bubble is mush, where the mark
 * stays legible at any size. Every string is read from config/site.ts, so
 * the card follows the name rather than baking it into a committed PNG —
 * which is exactly the trap the one-file name rule exists to avoid, and
 * which nobody would notice had gone stale.
 *
 * The two .ttf faces beside this file are server-side only and are never
 * served to a browser: the OG renderer takes ttf/otf/woff and cannot read
 * the woff2 the site itself uses. They are static instances of the same
 * variable fonts (Source Serif 4 at opsz 60, Libre Franklin at 500), so
 * the card is set in the firm's real type rather than the renderer's
 * substitute face.
 */
export const alt = site.legalName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const serif = await readFile(
  join(process.cwd(), "app/fonts/source-serif-4-og.ttf")
);
const label = await readFile(
  join(process.cwd(), "app/fonts/libre-franklin-og.ttf")
);

export default async function Image() {
  const suffix = entitySuffix();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1A1B1E",
          color: "#F7F3EA",
          fontFamily: "Source Serif 4",
          /* The courts line hangs below the lockup, so centring the flex
             box alone reads low; lift the whole block to the optical
             centre. */
          paddingBottom: 24,
        }}
      >
        {/* The lockup's hairlines, in paper — matching the site header. */}
        <div style={{ width: 620, height: 1, background: "#F7F3EA" }} />
        <div
          style={{
            display: "flex",
            fontSize: 76,
            letterSpacing: "0.22em",
            /* Tracking adds space after the final letter; nudge right so
               the line reads optically centred between the rules. */
            paddingLeft: "0.22em",
            padding: "38px 0 26px",
            textTransform: "uppercase",
          }}
        >
          {site.name}
        </div>
        {suffix && (
          <div
            style={{
              display: "flex",
              fontFamily: "Libre Franklin",
              fontSize: 22,
              letterSpacing: "0.42em",
              paddingLeft: "0.42em",
              paddingBottom: 34,
              textTransform: "uppercase",
              opacity: 0.85,
            }}
          >
            {suffix}
          </div>
        )}
        <div style={{ width: 620, height: 1, background: "#F7F3EA" }} />

        {/* Oxblood rule, then the courts — the one line worth carrying
            into a preview card. Hairline only: the deck forbids oxblood
            as a fill or behind text. */}
        <div
          style={{ width: 64, height: 2, background: "#5C1F1F", marginTop: 64 }}
        />
        {/* The courts, as separate children with a real gap between them.
            Joined into one string, the tracking makes the space INSIDE
            "United States Courts of Appeals" as wide as the space between
            two courts, and the line reads as five items instead of three. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "Libre Franklin",
            /* Sized to hold all three on ONE line: wrapped, the longest of
               them breaks mid-name, which is worse than small. If the list
               grows, drop the size again rather than let it wrap. */
            fontSize: 15,
            letterSpacing: "0.1em",
            marginTop: 26,
            textTransform: "uppercase",
            opacity: 0.72,
          }}
        >
          {site.jurisdictions.map((court, i) => (
            <div key={court} style={{ display: "flex", gap: 14 }}>
              {i > 0 && <div style={{ display: "flex" }}>·</div>}
              <div style={{ display: "flex" }}>{court}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Source Serif 4", data: serif, style: "normal", weight: 400 },
        { name: "Libre Franklin", data: label, style: "normal", weight: 500 },
      ],
    }
  );
}
