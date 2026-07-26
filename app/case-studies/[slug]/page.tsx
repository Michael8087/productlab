import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getEntry } from "@/lib/content";
import { EntryDetail } from "@/components/entry-detail";

export function generateStaticParams() {
  return getAllSlugs("case-studies")
    .filter((slug) => !getEntry("case-studies", slug)?.link)
    .map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = getEntry("case-studies", params.slug);
  if (!entry || entry.link) return {};
  return { title: entry.title, description: entry.summary };
}

export default function CaseStudyEntryPage({ params }: { params: { slug: string } }) {
  const entry = getEntry("case-studies", params.slug);
  if (!entry || entry.link) notFound();
  return <EntryDetail entry={entry} basePath="/case-studies" backLabel="Case Studies" />;
}
