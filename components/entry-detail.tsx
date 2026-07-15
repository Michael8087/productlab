import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Entry } from "@/lib/types";
import { Container } from "./container";
import { Badge } from "./badge";
import { mdxComponents } from "./mdx-components";
import { mdxOptions } from "@/lib/mdx";
import { Reveal } from "./reveal";

export function EntryDetail({ entry, basePath, backLabel }: { entry: Entry; basePath: string; backLabel: string }) {
  return (
    <article className="py-16 md:py-24">
      <Container narrow>
        <Link
          href={basePath}
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-muted hover:text-ink"
        >
          <ArrowLeft size={14} />
          {backLabel}
        </Link>

        <Reveal className="mt-8">
          {entry.status || entry.period ? (
            <p className="mb-3 font-mono text-xs uppercase tracking-wide text-amber-500">
              {entry.status ?? entry.period}
            </p>
          ) : null}
          <h1 className="font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
            {entry.title}
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">{entry.summary}</p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {entry.tags?.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
            <span className="ml-auto font-mono text-[11px] uppercase tracking-wide text-muted">
              {entry.readingTime}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="prose prose-neutral mt-14 max-w-none prose-headings:font-display prose-headings:font-medium prose-h2:mt-12 prose-h2:text-xl">
          <div className="hl">
            <MDXRemote source={entry.content} components={mdxComponents} options={mdxOptions} />
          </div>
        </Reveal>
      </Container>
    </article>
  );
}
