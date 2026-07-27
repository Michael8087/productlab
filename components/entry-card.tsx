// components/entry-card.tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "./badge";

export function EntryCard({
  href,
  eyebrow,
  title,
  summary,
  tags,
  external = false,
  confidential = false
}: {
  href: string;
  eyebrow?: string;
  title: string;
  summary: string;
  tags?: string[];
  external?: boolean;
  confidential?: boolean;
}) {
  const content = (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 scale-x-0 bg-gradient-to-r from-amber-400 to-violet-400 transition-transform duration-200 group-hover:scale-x-100"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            {eyebrow ? (
              <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-amber-600">
                {eyebrow}
              </p>
            ) : null}
            <h3 className="font-display text-lg font-bold tracking-tight text-ink">
              {title}
            </h3>
          </div>
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-600"
          />
        </div>

        {confidential ? (
          <div className="mt-4 space-y-2">
            <span className="sr-only">Description withheld — confidential.</span>
            <div aria-hidden="true" className="h-2.5 w-full animate-pulse rounded bg-line" />
            <div aria-hidden="true" className="h-2.5 w-11/12 animate-pulse rounded bg-line" />
            <div aria-hidden="true" className="h-2.5 w-2/3 animate-pulse rounded bg-line" />
          </div>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-muted">{summary}</p>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {tags?.slice(0, 3).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </>
  );

  const className =
    "group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-paper p-6 transition-all duration-200 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-500/10";

  if (external) {
    // Confidential entries get nofollow so crawlers don't index the destination.
    // The URL still sits in the page source — only the destination's own access
    // control keeps the contents private.
    const rel = confidential
      ? "noopener noreferrer nofollow"
      : "noopener noreferrer";
    return (
      <a href={href} target="_blank" rel={rel} className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
