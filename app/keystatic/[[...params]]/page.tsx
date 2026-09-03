import type { Metadata } from "next";
import Keystatic from "../keystatic";

/** Admin UI — never indexed (also disallowed in robots.ts). */
export const metadata: Metadata = {
  title: "Publishing",
  robots: { index: false, follow: false },
};

export default function KeystaticPage() {
  return <Keystatic />;
}
