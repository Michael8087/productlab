import { clsx } from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={clsx("max-w-2xl", className)}>
      {eyebrow ? (
        <p className="mb-3 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-amber-600">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}
