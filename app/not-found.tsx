import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="font-mono text-xs font-semibold uppercase tracking-wide text-amber-600">404</p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink">
        Nothing built here yet.
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
        Either this page hasn&apos;t been written, or the link&apos;s out of date. Either way, back to the lab.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-1.5 rounded-lg bg-ink px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wide text-paper shadow-lg shadow-ink/10 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/20"
      >
        Back home
      </Link>
    </Container>
  );
}
