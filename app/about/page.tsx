import type { Metadata } from "next";
import Image from "next/image";
import { Mail } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/badge";

export const metadata: Metadata = {
  title: "About",
  description: "What I enjoy building, what problems excite me, and how to reach me."
};

export default function AboutPage() {
  return (
    <Container narrow className="py-20 md:py-28">
      <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <Image
          src="/michael.jpg"
          alt="Michael Miňovský"
          width={112}
          height={112}
          className="h-28 w-28 shrink-0 rounded-full border-2 border-amber-200 object-cover shadow-lg shadow-amber-500/10"
          priority
        />
        <div>
          <p className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-amber-600">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            About
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Michael Miňovský
          </h1>
        </div>
      </Reveal>

      <Reveal delay={0.03} className="mt-6">
        <p className="text-[17px] leading-relaxed text-ink-soft">
          I build technical platforms, AI-powered products, dashboards and more.
          I&apos;m a Senior Product Manager by title, but the actual job is turning
          ambiguous problems into things that ship and hold up under real use.
        </p>
      </Reveal>

      <Reveal delay={0.05} className="mt-12">
        <h2 className="font-display text-lg font-bold text-ink">What I enjoy building</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Decision-support tools more than reporting tools — dashboards,
          analytics systems and AI agents that change what someone does next,
          not just what they know. I like the unglamorous parts too: data
          foundations, calibration, the difference between a metric moving
          and a metric mattering.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <h2 className="font-display text-lg font-bold text-ink">What problems excite me</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Systems where the interesting failure mode isn&apos;t &ldquo;it&apos;s broken,&rdquo; it&apos;s
          &ldquo;it&apos;s technically correct and nobody trusts it&rdquo; — analytics people
          ignore, AI agents that hedge for the wrong reasons, dashboards that
          get looked at and never acted on. Most of my product work lives in
          that gap between correct and useful.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-10">
        <h2 className="font-display text-lg font-bold text-ink">Background, briefly</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          MA Economics &amp; Policy (UCL), MSc Smart Building Control (ČVUT),
          BA Sociology &amp; Economics (Charles University), Robotics
          undergraduate studies (ČVUT). Product roles spanning hardware,
          social analytics, and enterprise SaaS.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge>Czech — native</Badge>
          <Badge>English — native</Badge>
          <Badge>French — professional</Badge>
          <Badge>German — elementary</Badge>
        </div>
      </Reveal>

      <Reveal delay={0.2} className="mt-14 border-t border-line pt-10">
        <h2 className="font-display text-lg font-bold text-ink">Get in touch</h2>
        <a href="mailto:mike.minovsky@gmail.com" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 font-mono text-sm font-semibold text-paper shadow-lg shadow-ink/10 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/20">
          <Mail size={16} />
          mike.minovsky@gmail.com
        </a>
      </Reveal>
    </Container>
  );
}
