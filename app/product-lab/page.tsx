import type { Metadata } from "next";
import { getEntries } from "@/lib/content";
import { SectionIndex } from "@/components/section-index";

export const metadata: Metadata = {
  title: "Product Lab",
  description:
    "Case studies from products I've worked on — the problem, the constraints, the decisions, the trade-offs, and what I learned."
};

export default function ProductLabPage() {
  const entries = getEntries("product-lab");
  return (
    <SectionIndex
      eyebrow="Product Lab"
      title="Case studies, not credentials"
      description="How the work actually happened — the problem, the constraints I was working inside, the decisions I made, and what I'd tell you I learned. No confidential specifics, all real trade-offs."
      basePath="/product-lab"
      entries={entries}
    />
  );
}
