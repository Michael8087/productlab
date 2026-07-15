import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getEntry } from "@/lib/content";
import { EntryDetail } from "@/components/entry-detail";

export function generateStaticParams() {
  return getAllSlugs("playground").map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = getEntry("playground", params.slug);
  if (!entry) return {};
  return { title: entry.title, description: entry.summary };
}

export default function PlaygroundEntryPage({ params }: { params: { slug: string } }) {
  const entry = getEntry("playground", params.slug);
  if (!entry) notFound();
  return <EntryDetail entry={entry} basePath="/playground" backLabel="Playground" />;
}
