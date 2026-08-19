/** Consistent page title block used by every top-level page. */
export function PageIntro({
  title,
  lede,
}: {
  title: string;
  lede?: string;
}) {
  return (
    <div className="border-b border-line bg-paper-shade">
      <div className="mx-auto max-w-[var(--container)] px-5 py-14">
        <h1 className="text-3xl md:text-4xl">{title}</h1>
        {lede && (
          <p className="mt-4 max-w-[var(--measure)] text-lg text-ink-muted">
            {lede}
          </p>
        )}
      </div>
    </div>
  );
}
