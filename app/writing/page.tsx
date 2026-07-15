import type { Metadata } from "next";
import { getEntries } from "@/lib/content";
import { SectionIndex } from "@/components/section-index";

export const metadata: Metadata = {
  title: "Writing",
  description: "Analytical, evidence-based writing on AI, product management, enterprise software, data and systems thinking."
};

export default function WritingPage() {
  const entries = getEntries("writing");
  return (
    <SectionIndex
      eyebrow="Writing"
      title="Thinking out loud, carefully"
      description="AI, product management, enterprise software, data, analytics and systems thinking — occasionally economics, urbanism, or whatever else I'm genuinely curious about."
      basePath="/writing"
      entries={entries}
    />
  );
}
