import type { Metadata } from "next";
import { getEntries } from "@/lib/content";
import { SectionIndex } from "@/components/section-index";

export const metadata: Metadata = {
  title: "Product Explorations",
  description: "Product explorations — about products I like and use."
};

export default function CaseStudiesPage() {
  const entries = getEntries("case-studies");
  return (
    <SectionIndex
      eyebrow="Product Explorations"
      title="Product explorations"
      description="About products I like and use — deep dives, speculative redesigns, and the odd side business, not just polished case studies."
      basePath="/case-studies"
      entries={entries}
    />
  );
}
