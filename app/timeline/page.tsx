import type { Metadata } from "next";
import Link from "next/link";
import { clsx } from "clsx";
import { getTimeline } from "@/content/timeline";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Products built, experiments shipped, talks given, articles written — in one running list."
};

const typeLabel: Record<string, string> = {
  product: "Product",
  experiment: "Experiment",
  talk: "Talk",
  article: "Article",
  milestone: "Milestone"
};

export default function TimelinePage() {
  const items = getTimeline();
  const years = Array.from(new Set(items.map((i) => i.date.slice(0, 4))));

  return (
    <Container className="py-20 md:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="Timeline"
          title="A running log, not a résumé"
          description="Every product shipped, experiment tried, and milestone hit — added as it happens, kept even when it's small. The point isn't to look impressive, it's to keep the streak going."
        />
      </Reveal>

      <div className="mt-16 space-y-14">
        {years.map((year) => (
          <div key={year} className="grid grid-cols-1 gap-6 md:grid-cols-[5rem_1fr]">
            <div className="font-display text-2xl font-medium text-ink md:sticky md:top-24 md:h-fit">
              {year}
            </div>
            <ol className="space-y-8 border-l border-line pl-8">
              {items
                .filter((i) => i.date.slice(0, 4) === year)
                .map((item, idx) => {
                  const isBuilt = item.type !== "milestone";
                  const body = (
                    <div className="relative">
                      <span
                        className={clsx(
                          "absolute -left-[2.15rem] top-1.5 h-2.5 w-2.5 rounded-full border-2",
                          isBuilt
                            ? "border-amber-500 bg-amber-50"
                            : "border-line-strong bg-paper"
                        )}
                      />
                      <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
                        {typeLabel[item.type]}
                      </p>
                      <p className="mt-1 font-display text-base font-medium text-ink">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </div>
                  );

                  return (
                    <li key={`${item.title}-${idx}`}>
                      {item.href ? (
                        <Link href={item.href} className="group block">
                          {body}
                        </Link>
                      ) : (
                        body
                      )}
                    </li>
                  );
                })}
            </ol>
          </div>
        ))}
      </div>
    </Container>
  );
}
