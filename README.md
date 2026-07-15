# Product Lab

Michael Miňovský's personal site — a working notebook of products, AI experiments,
writing and half-finished ideas. Not a résumé site: the point is that it gets
richer every time something worth sharing gets built, tried, or written down.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, MDX and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Before deploying, set your real domain:

```bash
cp .env.example .env.local
# edit NEXT_PUBLIC_SITE_URL
```

## Adding content

Every section is a folder of `.mdx` files under `content/`. Add a file, and it
shows up automatically — no code changes, no registry to update.

```
content/
  product-lab/       # case studies
  ai-experiments/     # AI builds
  writing/             # articles
  playground/          # sketches, ideas, vision docs
  timeline.ts           # manually maintained milestone list
```

### Adding a Product Lab case study

Create `content/product-lab/my-new-project.mdx`:

```mdx
---
title: "Title of the project"
summary: "One or two sentences — shows up on cards and in search results."
date: "2026-07-01"        # drives sort order everywhere
period: "2024–2025"        # optional, shown instead of a date
role: "Senior Product Manager"
tags: ["Analytics", "B2B SaaS"]
featured: true              # shows on the homepage
---

## The problem
## Constraints
## Decisions
## Trade-offs
## Outcome
## What I learned
```

The H2 structure is a convention, not a requirement — MDX is fully free-form
inside the body.

### Adding an AI Experiment

Same idea, in `content/ai-experiments/`. Common frontmatter: `status` ("Shipped",
"Prototype", "Exploring") instead of `period`. Suggested body sections: Overview,
Architecture, Lessons learned, Future improvements.

### Adding a Writing post or Playground entry

Same pattern in `content/writing/` or `content/playground/`. Playground entries
typically use `status: "Sketch" | "Idea" | "Vision doc"`.

### Updating the Timeline

`content/timeline.ts` is a plain TypeScript array — add an object with `date`,
`title`, `description`, `type` (`product` | `experiment` | `talk` | `article` |
`milestone`), and an optional `href` to link it to a page.

**Note:** the three education entries in `timeline.ts` currently use estimated
years — confirm and correct them before publishing.

## Design system

- Fonts: Inter (body), Inter Tight (headings), JetBrains Mono (labels/eyebrows) —
  loaded via `next/font/google`, so the first build needs normal internet access.
- Color: near-black ink on white, one amber accent used sparingly for links,
  active states and "things I built" markers. Tokens live in `tailwind.config.ts`.
- Motion: a single `<Reveal>` wrapper (`components/reveal.tsx`) does a subtle
  fade/slide on scroll. Used consistently, not decoratively.

## Deploying

Any platform that supports Next.js works; Vercel is the path of least resistance:

```bash
npx vercel
```

Set `NEXT_PUBLIC_SITE_URL` as an environment variable in the deployment so
metadata, the sitemap and Open Graph tags point at the right domain.

## Project structure

```
app/                  routes (App Router)
components/            shared UI (nav, footer, cards, MDX renderer)
content/                all site content (MDX + timeline data)
lib/                     content-loading helpers, MDX config, fonts, types
```
