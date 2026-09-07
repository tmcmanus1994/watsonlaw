/**
 * Renders a YYYY-MM-DD date (the shape lib/news.ts normalises to) as
 * "September 7, 2026". The T00:00:00 suffix pins it to local midnight so
 * the day never slips backwards the way a bare ISO date — parsed as UTC —
 * does for readers west of Greenwich.
 *
 * Anything that is not a plain ISO date returns "" rather than the string
 * "Invalid Date": a missing date should leave a quiet gap, not shout.
 */
export function formatDate(iso: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return "";
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
