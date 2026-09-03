import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getEntry } from "@/lib/content";
import { EntryDetail } from "@/components/entry-detail";

export const dynamicParams = false;

export function generateStaticParams() {
  const eligible = getAllSlugs("ai-experiments").filter((slug) => {
    const entry = getEntry("ai-experiments", slug);
    return entry && !entry.link && !entry.confidential;
  });
  // Static export requires at least one static param per dynamic route —
  // see the identical fallback in app/case-studies/[slug]/page.tsx.
  return (eligible.length ? eligible : ["__none__"]).map((slug) => ({ slug }));
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
