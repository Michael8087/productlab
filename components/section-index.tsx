// components/section-index.tsx
import type { Entry } from "@/lib/types";
import { Container } from "./container";
import { SectionHeading } from "./section-heading";
import { EntryCard } from "./entry-card";
import { Reveal } from "./reveal";

export function SectionIndex({
  eyebrow,
  title,
  description,
  basePath,
  entries
}: {
  eyebrow: string;
  title: string;
  description: string;
  basePath: string;
  entries: Entry[];
}) {
  return (
    <Container className="py-20 md:py-28">
      <Reveal>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
        {entries.map((entry, i) => (
          <Reveal key={entry.slug} delay={Math.min(i * 0.05, 0.3)}>
            <EntryCard
              href={entry.link ?? `${basePath}/${entry.slug}`}
              external={Boolean(entry.link)}
              eyebrow={entry.status ?? entry.period}
              title={entry.title}
              summary={entry.summary}
              tags={entry.tags}
              meta={entry.readingTime}
            />
          </Reveal>
        ))}
      </div>

      {entries.length === 0 ? (
        <p className="mt-14 text-sm text-muted">
          Nothing published here yet — this section is ready for its first entry.
        </p>
      ) : null}
    </Container>
  );
}
