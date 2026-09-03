import Image from "next/image";
import { home } from "@/content/home";

/**
 * Full-width courthouse photography band with its caption label. Until
 * Trav's pre-graded stills land, a marked placeholder block in the rule
 * color holds the exact slot (fixed height — no shift on swap).
 */
export function CourtBand() {
  const { image, caption } = home.courtBand;

  return (
    <figure aria-label={caption}>
      <div className="relative h-[280px] w-full md:h-[380px]">
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
        <span className="label text-gray">{caption}</span>
      </figcaption>
    </figure>
  );
}
