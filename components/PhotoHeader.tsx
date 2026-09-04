import Image from "next/image";

/**
 * Graded photo header with the page title set over a scrim on the image —
 * no box behind the title (deck rule). Until Trav's pre-graded stills
 * land, the image layer is a marked placeholder block in the rule color;
 * the scrim and type treatment are identical either way, so the photo
 * swap is a data edit with zero layout shift.
 */
export function PhotoHeader({
  kicker,
  title,
  image,
}: {
  kicker?: string;
  title: string;
  image?: { src: string; alt: string } | null;
}) {
  return (
    <div className="relative flex h-[300px] flex-col justify-end md:h-[360px]">
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-rule">
          <p className="label absolute right-5 top-5 text-ink">
            Placeholder · court photography pending
          </p>
        </div>
      )}
      <div
        aria-hidden="true"
        className="scrim-bottom absolute inset-x-0 bottom-0 h-[75%]"
      />
      <div className="relative mx-auto w-full max-w-[var(--container)] px-5 pb-10">
        {kicker && <p className="label label-kicker text-paper">{kicker}</p>}
        <h1 className="mt-2 text-paper">{title}</h1>
      </div>
    </div>
  );
}
