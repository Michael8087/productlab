import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getLatest } from "@/lib/content";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { EntryCard } from "@/components/entry-card";
import { Reveal } from "@/components/reveal";
import { HeroSketch } from "@/components/hero-sketch";

export default function HomePage() {
  const latestExperiments = getLatest("ai-experiments", 2);
  const latestCaseStudies = getLatest("case-studies", 2);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-violet-400 opacity-25 blur-3xl md:h-[44rem] md:w-[44rem]"
        />
        <Container className="relative grid grid-cols-1 items-center gap-8 py-24 md:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wide text-amber-600">
              Product Lab
            </p>
            <h1 className="mt-5 max-w-2xl font-display text-5xl font-bold tracking-tight text-ink md:text-6xl">
              I find real value,{" "}
              <span className="bg-gradient-to-r from-amber-500 to-violet-500 bg-clip-text text-transparent">
                then build and ship it.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
              Michael Miňovský — Senior Product Manager working on analytics,
              complex products, and AI-powered ones. This is a working notebook,
              not a résumé: case studies, AI experiments, writing, and the
              half-finished ideas in between.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/ai-experiments"
                className="group inline-flex items-center gap-1.5 rounded-lg bg-ink px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wide text-paper shadow-lg shadow-ink/10 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/20"
              >
                Latest AI experiments
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="hidden lg:block">
            <HeroSketch className="mx-auto w-full max-w-md" />
          </Reveal>
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
                    className="hidden shrink-0 font-mono text-xs font-semibold uppercase tracking-wide text-muted hover:text-amber-600 md:block"
                  >
                    All →
                  </Link>
                </div>
              </Reveal>
              <div className="mt-8 space-y-4">
                {latestExperiments.map((entry, i) => (
                  <Reveal key={entry.slug} delay={Math.min(i * 0.06, 0.2)}>
                    <EntryCard
                      href={entry.link ?? `/ai-experiments/${entry.slug}`}
                      external={Boolean(entry.link)}
                      eyebrow={entry.status}
                      title={entry.title}
                      summary={entry.summary}
                      tags={entry.tags}
                    />
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <Reveal>
                <div className="flex items-end justify-between gap-6">
                  <SectionHeading eyebrow="Fresh" title="Latest case studies" />
                  <Link
                    href="/case-studies"
                    className="hidden shrink-0 font-mono text-xs font-semibold uppercase tracking-wide text-muted hover:text-amber-600 md:block"
                  >
                    All →
                  </Link>
                </div>
              </Reveal>
              <div className="mt-8 space-y-4">
                {latestCaseStudies.map((entry, i) => (
                  <Reveal key={entry.slug} delay={Math.min(i * 0.06, 0.2)}>
                    <EntryCard
                      href={entry.link ?? `/case-studies/${entry.slug}`}
                      external={Boolean(entry.link)}
                      eyebrow={entry.status}
                      title={entry.title}
                      summary={entry.summary}
                      tags={entry.tags}
                      confidential={entry.confidential}
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
