import type { Metadata } from "next";
import { PhotoHeader } from "@/components/PhotoHeader";
import { PracticeIndex } from "@/components/PracticeIndex";
import { site } from "@/config/site";
import { practiceAreas, practiceIndexImage } from "@/content/practice-areas";

export const metadata: Metadata = {
  title: "Our Practice",
  description: `Practice areas at ${site.name}: ${practiceAreas
    .map((p) => p.title)
    .join(", ")}.`,
};

/** The ledger as the page itself, with the counterweight image pane. */
export default function PracticePage() {
  return (
    <>
      <PhotoHeader
        kicker={site.name}
        title="Our Practice"
        image={practiceIndexImage}
      />
      <PracticeIndex headingTag="h1" variant="canvas" />
    </>
  );
}
