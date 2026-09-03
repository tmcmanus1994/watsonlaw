import type { Metadata } from "next";
import { PracticeIndex } from "@/components/PracticeIndex";
import { site } from "@/config/site";
import { practiceAreas } from "@/content/practice-areas";

export const metadata: Metadata = {
  title: "Our Practice",
  description: `Practice areas at ${site.name}: ${practiceAreas
    .map((p) => p.title)
    .join(", ")}.`,
};

/** Mirrors the homepage practice index, as the page itself. */
export default function PracticePage() {
  return <PracticeIndex headingTag="h1" />;
}
