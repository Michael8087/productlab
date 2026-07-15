import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getEntry } from "@/lib/content";
import { EntryDetail } from "@/components/entry-detail";

export function generateStaticParams() {
  return getAllSlugs("product-lab").map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = getEntry("product-lab", params.slug);
  if (!entry) return {};
  return { title: entry.title, description: entry.summary };
}

export default function ProductLabEntryPage({ params }: { params: { slug: string } }) {
  const entry = getEntry("product-lab", params.slug);
  if (!entry) notFound();
  return <EntryDetail entry={entry} basePath="/product-lab" backLabel="Product Lab" />;
}
