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
            /*
             * 32% from the top, not centred and not flush to it.
             *
             * The band is a fixed 440px slice of a 16:9 frame, so the
             * wider the screen the LESS of the photograph it shows:
             * object-cover scales to the width, and at 1440px that leaves
             * the top 54% of the frame visible, at 1920px 41%, at 2560px
             * only 31%. The carved "PVLASKI COVNTY COVRT HOVSE" runs
             * across roughly 28-42% of the frame height.
             *
             * Flush to the top, therefore, the carved name sat on the cut
             * edge at 1920 and vanished entirely above it — a caption
             * naming a building whose name had been cropped off. 32% is
             * the anchor that keeps the whole of it in frame from 1440px
             * to 3840px; the cost is the tip of the flagpole on narrower
             * screens. Changing the band height or the photograph means
             * re-deriving this number, not nudging it.
             */
            className="object-cover object-[center_32%]"
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
