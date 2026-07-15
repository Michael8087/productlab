import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getFeatured, getLatest } from "@/lib/content";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { EntryCard } from "@/components/entry-card";
import { Reveal } from "@/components/reveal";

export default function HomePage() {
  const featuredProjects = getFeatured("product-lab", 3);
  const latestExperiments = getLatest("ai-experiments", 2);
  const latestWriting = getLatest("writing", 2);

  return (
    <>
      <section className="border-b border-line">
        <Container className="py-24 md:py-32">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-wide text-amber-500">
              Product Lab
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
              I build products, then take them apart to see how they work.
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
              Michael Miňovský — Senior Product Manager working on analytics,
              dashboards and AI-enhanced products. This is a working notebook,
              not a résumé: case studies, AI experiments, writing, and the
              half-finished ideas in between.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/product-lab"
                className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2.5 font-mono text-xs uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
              >
                View the lab
                <ArrowUpRight size={14} />
              </Link>
              <Link
                href="/ai-experiments"
                className="inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2.5 font-mono text-xs uppercase tracking-wide text-ink transition-colors hover:border-line-strong hover:bg-mist"
              >
                Latest AI experiments
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="py-20 md:py-28">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <SectionHeading eyebrow="Featured" title="Featured projects" />
              <Link
                href="/product-lab"
                className="hidden shrink-0 font-mono text-xs uppercase tracking-wide text-muted hover:text-ink md:block"
              >
                All case studies →
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {featuredProjects.map((entry, i) => (
              <Reveal key={entry.slug} delay={Math.min(i * 0.06, 0.24)}>
                <EntryCard
                  href={`/product-lab/${entry.slug}`}
                  eyebrow={entry.period}
                  title={entry.title}
                  summary={entry.summary}
                  tags={entry.tags}
                  meta={entry.readingTime}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-mist/50">
        <Container className="py-20 md:py-28">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div>
              <Reveal>
                <div className="flex items-end justify-between gap-6">
                  <SectionHeading eyebrow="Fresh" title="Latest experiments" />
                  <Link
                    href="/ai-experiments"
                    className="hidden shrink-0 font-mono text-xs uppercase tracking-wide text-muted hover:text-ink md:block"
                  >
                    All →
                  </Link>
                </div>
              </Reveal>
              <div className="mt-8 space-y-4">
                {latestExperiments.map((entry, i) => (
                  <Reveal key={entry.slug} delay={Math.min(i * 0.06, 0.2)}>
                    <EntryCard
                      href={`/ai-experiments/${entry.slug}`}
                      eyebrow={entry.status}
                      title={entry.title}
                      summary={entry.summary}
                      tags={entry.tags}
                      meta={entry.readingTime}
                    />
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <Reveal>
                <div className="flex items-end justify-between gap-6">
                  <SectionHeading eyebrow="Fresh" title="Latest writing" />
                  <Link
                    href="/writing"
                    className="hidden shrink-0 font-mono text-xs uppercase tracking-wide text-muted hover:text-ink md:block"
                  >
                    All →
                  </Link>
                </div>
              </Reveal>
              <div className="mt-8 space-y-4">
                {latestWriting.map((entry, i) => (
                  <Reveal key={entry.slug} delay={Math.min(i * 0.06, 0.2)}>
                    <EntryCard
                      href={`/writing/${entry.slug}`}
                      title={entry.title}
                      summary={entry.summary}
                      tags={entry.tags}
                      meta={entry.readingTime}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
