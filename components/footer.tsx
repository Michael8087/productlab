import Link from "next/link";
import { Container } from "./container";

const links = [
  { href: "/product-lab", label: "Product Lab" },
  { href: "/ai-experiments", label: "AI Experiments" },
  { href: "/writing", label: "Writing" },
  { href: "/playground", label: "Playground" },
  { href: "/timeline", label: "Timeline" },
  { href: "/about", label: "About" }
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-line">
      <Container>
        <div className="flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-[15px] font-medium text-ink">Product Lab</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              A working notebook of products, experiments and ideas — kept in the
              open so it stays honest about what worked and what didn&apos;t.
            </p>
            <a
              href="mailto:mike.minovsky@gmail.com"
              className="mt-4 inline-block font-mono text-xs uppercase tracking-wide text-amber-500 hover:text-amber-600"
            >
              mike.minovsky@gmail.com
            </a>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 md:flex md:flex-col md:items-end">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-wide text-muted hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-line py-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Michael Miňovský. Built, not just written.</p>
          <p>Next.js &middot; Tailwind &middot; MDX</p>
        </div>
      </Container>
    </footer>
  );
}
