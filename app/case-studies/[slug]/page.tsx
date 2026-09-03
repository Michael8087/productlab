import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getEntry } from "@/lib/content";
import { EntryDetail } from "@/components/entry-detail";

export const dynamicParams = false;

export function generateStaticParams() {
  const eligible = getAllSlugs("case-studies").filter((slug) => {
    const entry = getEntry("case-studies", slug);
    return entry && !entry.link && !entry.confidential;
  });
  // Static export requires at least one static param per dynamic route.
  // Every current entry links out or is confidential, so fall back to a
  // slug that can't match a real entry — getEntry() returns null for it,
  // and the page below 404s on that, same as any other unknown slug.
  return (eligible.length ? eligible : ["__none__"]).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = getEntry("case-studies", params.slug);
  if (!entry || entry.link || entry.confidential) return {};
  return { title: entry.title, description: entry.summary };
}

export default function CaseStudyEntryPage({ params }: { params: { slug: string } }) {
  const entry = getEntry("case-studies", params.slug);
  if (!entry || entry.link || entry.confidential) notFound();
  return <EntryDetail entry={entry} basePath="/case-studies" backLabel="Product Explorations" />;
}
