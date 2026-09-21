import type { ReactNode } from "react";

/**
 * Renders `*emphasised*` spans in a content string as real <em>.
 *
 * Credentials and bios carry publication titles and case names, which legal
 * convention sets in italic — `Chair, Drafting Committee, *Handling Appeals
 * in Arkansas*`. Those strings are plain data in content/, not markdown, and
 * they are short, so this handles the one piece of markup they need rather
 * than putting a markdown parser in front of a credential line.
 *
 * Unpaired asterisks are left alone, so a stray one prints as itself instead
 * of swallowing the rest of the sentence.
 */
export function withEmphasis(text: string): ReactNode {
  const parts = text.split(/\*([^*]+)\*/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    // Odd indices are the captured groups, i.e. what sat between asterisks.
    i % 2 === 1 ? <em key={i}>{part}</em> : part
  );
}

/** The same string with the markers stripped, for metadata and alt text. */
export function withoutEmphasis(text: string): string {
  return text.replace(/\*([^*]+)\*/g, "$1");
}
