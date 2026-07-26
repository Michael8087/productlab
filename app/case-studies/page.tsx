import type { Metadata } from "next";
import { getEntries } from "@/lib/content";
import { SectionIndex } from "@/components/section-index";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Speculative product case studies — problem framing, market analysis, and phased roadmaps."
};

export default function CaseStudiesPage() {
  const entries = getEntries("case-studies");
  return (
    <SectionIndex
      eyebrow="Case Studies"
      title="Speculative product case studies"
      description="Deep-dive case studies on real products — problem framing, market shift, personas, gap analysis, and a phased roadmap."
      basePath="/case-studies"
      entries={entries}
    />
  );
}
