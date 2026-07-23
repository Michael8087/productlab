import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getEntry } from "@/lib/content";
import { EntryDetail } from "@/components/entry-detail";
import { CvTailoringTool } from "@/components/cv-tailoring-tool";

export function generateStaticParams() {
  return getAllSlugs("ai-experiments").map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = getEntry("ai-experiments", params.slug);
  if (!entry) return {};
  return { title: entry.title, description: entry.summary };
}

export default function AIExperimentEntryPage({ params }: { params: { slug: string } }) {
  const entry = getEntry("ai-experiments", params.slug);
  if (!entry) notFound();
  return (
    <>
      <EntryDetail entry={entry} basePath="/ai-experiments" backLabel="AI Experiments" />
      {params.slug === "cv-tailoring-agent" ? <CvTailoringTool /> : null}
    </>
  );
}
