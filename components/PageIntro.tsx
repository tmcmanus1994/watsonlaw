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
        {kicker && <p className="label text-accent">{kicker}</p>}
        <h1 className="mt-3">{title}</h1>
        {lede && (
          <p className="mt-4 max-w-[var(--measure)] text-gray">{lede}</p>
        )}
      </div>
    </div>
  );
}
