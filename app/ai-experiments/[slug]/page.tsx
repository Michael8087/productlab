import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getEntry } from "@/lib/content";
import { EntryDetail } from "@/components/entry-detail";

export function generateStaticParams() {
  return getAllSlugs("ai-experiments")
    .filter((slug) => {
      const entry = getEntry("ai-experiments", slug);
      return entry && !entry.link && !entry.confidential;
    })
    .map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = getEntry("ai-experiments", params.slug);
  if (!entry || entry.link || entry.confidential) return {};
  return { title: entry.title, description: entry.summary };
}

export default function AIExperimentEntryPage({ params }: { params: { slug: string } }) {
  const entry = getEntry("ai-experiments", params.slug);
  if (!entry || entry.link || entry.confidential) notFound();

  return <EntryDetail entry={entry} basePath="/ai-experiments" backLabel="AI Experiments" />;
}
