/** Title block for text pages: kicker label, serif h1, hairline below. */
export function PageIntro({
  kicker,
  title,
  lede,
}: {
  kicker?: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="border-b border-rule">
      <div className="mx-auto max-w-[var(--container)] px-5 py-14">
        {kicker && (
          <p className="reveal label label-kicker text-accent">{kicker}</p>
        )}
        <h1 className="reveal mt-3" style={{ "--reveal-i": 1 } as React.CSSProperties}>
          {title}
        </h1>
        {lede && (
          <p
            className="reveal support mt-4 max-w-[var(--measure)] text-gray"
            style={{ "--reveal-i": 2 } as React.CSSProperties}
          >
            {lede}
          </p>
        )}
      </div>
    </div>
  );
}
