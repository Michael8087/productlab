import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getEntry } from "@/lib/content";
import { EntryDetail } from "@/components/entry-detail";
import { EntryHeader } from "@/components/entry-header";
import { EntryBody } from "@/components/entry-body";
import { CvTailoringTool } from "@/components/cv-tailoring-tool";

const DEMO_TOOLS: Record<string, React.ComponentType> = {
  "cv-tailoring-agent": CvTailoringTool
};

export function generateStaticParams() {
  return getAllSlugs("ai-experiments")
    .filter((slug) => !getEntry("ai-experiments", slug)?.link)
    .map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = getEntry("ai-experiments", params.slug);
  if (!entry) return {};
  return { title: entry.title, description: entry.summary };
}

export default function AIExperimentEntryPage({ params }: { params: { slug: string } }) {
  const entry = getEntry("ai-experiments", params.slug);
  if (!entry || entry.link) notFound();

  const DemoTool = DEMO_TOOLS[params.slug];
  if (DemoTool) {
    return (
      <>
        <EntryHeader entry={entry} basePath="/ai-experiments" backLabel="AI Experiments" />
        <DemoTool />
        <EntryBody entry={entry} />
      </>
    );
  }

  return <EntryDetail entry={entry} basePath="/ai-experiments" backLabel="AI Experiments" />;
}
