import Image from "next/image";
import { home } from "@/content/home";

/**
 * Full-width courthouse photography band with its caption label. The
 * photograph landed 24 September; the placeholder branch stays because the
 * slot is typed nullable and a marked block is a better failure than an
 * empty band — it holds the exact height either way, so nothing shifts.
 */
export function CourtBand() {
  const { image, caption } = home.courtBand;

  return (
    <figure aria-label={caption}>
      <div className="relative h-[300px] w-full md:h-[440px]">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-rule">
            <p className="label text-ink">
              Placeholder · court photography pending
            </p>
          </div>
        )}
      </div>
      <figcaption className="mx-auto max-w-[var(--container)] px-5 pt-3">
        <span className="label label-caption text-gray">{caption}</span>
      </figcaption>
    </figure>
  );
}
