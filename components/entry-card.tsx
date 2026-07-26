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
  external = false
}: {
  href: string;
  eyebrow?: string;
  title: string;
  summary: string;
  tags?: string[];
  external?: boolean;
}) {
  const content = (
    <>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            {eyebrow ? (
              <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-amber-500">
                {eyebrow}
              </p>
            ) : null}
            <h3 className="font-display text-lg font-medium tracking-tight text-ink">
              {title}
            </h3>
          </div>
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
          />
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted">{summary}</p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {tags?.slice(0, 3).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </>
  );

  const className =
    "group flex h-full flex-col rounded-xl border border-line p-6 transition-colors hover:border-line-strong hover:bg-mist/60";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
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
