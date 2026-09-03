import { ImageResponse } from "next/og";
import { monogramInitials } from "@/config/site";

/**
 * Favicon: the monogram reversed — paper initials on ink with the oxblood
 * rule between — generated from config at build time. (The OG renderer
 * substitutes its bundled face for the serif; at favicon size that's
 * acceptable, and the on-page monogram is true Source Serif.)
 */
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  const initials = monogramInitials();
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
          fontSize: 26,
          lineHeight: 1,
        }}
      >
        <div style={{ display: "flex" }}>{initials[0]}</div>
        <div
          style={{
            width: 22,
            height: 2,
            background: "#5C1F1F",
            margin: "3px 0",
          }}
        />
        <div style={{ display: "flex" }}>{initials[1] ?? ""}</div>
      </div>
    ),
    size
  );
}
