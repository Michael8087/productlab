import type { Metadata } from "next";
import { getEntries } from "@/lib/content";
import { SectionIndex } from "@/components/section-index";

export const metadata: Metadata = {
  title: "AI Experiments",
  description: "Everything I build around AI — agents, prompt engineering, evals, and AI product concepts."
};

export default function AIExperimentsPage() {
  const entries = getEntries("ai-experiments");
  return (
    <SectionIndex
      eyebrow="AI Experiments"
      title="Building with AI, in the open"
      description="Agents, prompt engineering, evaluation frameworks, local LLMs, and AI product concepts — with the architecture and the lessons, not just the demo."
      basePath="/ai-experiments"
      entries={entries}
    />
  );
}
