import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="font-mono text-xs uppercase tracking-wide text-amber-500">404</p>
      <h1 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink">
        Nothing built here yet.
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
        Either this page hasn't been written, or the link's out of date. Either way, back to the lab.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2.5 font-mono text-xs uppercase tracking-wide text-paper hover:opacity-90"
      >
        Back home
      </Link>
    </Container>
  );
}
