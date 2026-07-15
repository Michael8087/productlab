import type { Metadata } from "next";
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
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-wide text-amber-500">About</p>
        <h1 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
          Michael Miňovský
        </h1>
        <p className="mt-6 text-[17px] leading-relaxed text-ink-soft">
          I build analytics platforms, dashboards, and AI-enhanced products —
          the kind that quietly change what a few thousand people do with
          their Monday morning, rather than the kind that make a good demo.
          I&apos;m a Senior Product Manager by title, but the actual job is turning
          ambiguous problems into things that ship and hold up under real use.
        </p>
      </Reveal>

      <Reveal delay={0.05}
