import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Entry } from "@/lib/types";
import { Container } from "./container";
import { Badge } from "./badge";
import { Reveal } from "./reveal";

export function EntryHeader({ entry, basePath, backLabel }: { entry: Entry; basePath: string; backLabel: string }) {
  return (
    <div className="pt-16 md:pt-24">
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
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
