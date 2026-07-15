import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "./badge";

export function EntryCard({
  href,
  eyebrow,
  title,
  summary,
  tags,
  meta
}: {
  href: string;
  eyebrow?: string;
  title: string;
  summary: string;
  tags?: string[];
  meta?: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-line p-6 transition-colors hover:border-line-strong hover:bg-mist/60"
    >
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

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {tags?.slice(0, 3).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
        {meta ? (
          <span className="ml-auto font-mono text-[11px] uppercase tracking-wide text-muted">
            {meta}
          </span>
        ) : null}
      </div>
    </Link>
  );
}
