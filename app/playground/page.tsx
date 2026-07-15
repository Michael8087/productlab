import type { Metadata } from "next";
import { getEntries } from "@/lib/content";
import { SectionIndex } from "@/components/section-index";

export const metadata: Metadata = {
  title: "Playground",
  description: "Half-finished ideas, crazy concepts, future products, sketches, and vision documents."
};

export default function PlaygroundPage() {
  const entries = getEntries("playground");
  return (
    <SectionIndex
      eyebrow="Playground"
      title="Ideas that might never ship"
      description="Half-finished thoughts, product concepts, and sketches — kept here on purpose, before they're polished enough to call finished."
      basePath="/playground"
      entries={entries}
    />
  );
}
