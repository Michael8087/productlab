"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { Container } from "./container";

const links = [
  { href: "/ai-experiments", label: "AI Experiments" },
  { href: "/writing", label: "Writing", disabled: true },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" }
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-display text-[15px] font-medium tracking-tight text-ink"
            onClick={() => setOpen(false)}
          >
            Product Lab
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              if (link.disabled) {
                return (
                  <span
                    key={link.href}
                    aria-disabled="true"
                    className="inline-flex cursor-not-allowed items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-muted/50"
                  >
                    {link.label}
                    <span className="rounded-full border border-line px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-muted/60">
                      WIP
                    </span>
                  </span>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "font-mono text-[11px] uppercase tracking-wide transition-colors",
                    active ? "text-amber-500" : "text-muted hover:text-ink"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            className="text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-line md:hidden">
          <Container>
            <nav className="flex flex-col gap-1 py-4">
              {links.map((link) => {
                const active = pathname === link.href || pathname.startsWith(link.href + "/");
                if (link.disabled) {
                  return (
                    <span
                      key={link.href}
                      aria-disabled="true"
                      className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-md px-2 py-2.5 font-mono text-xs uppercase tracking-wide text-muted/50"
                    >
                      {link.label}
                      <span className="rounded-full border border-line px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-muted/60">
                        WIP
                      </span>
                    </span>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      "rounded-md px-2 py-2.5 font-mono text-xs uppercase tracking-wide",
                      active ? "bg-amber-50 text-amber-700" : "text-muted"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
