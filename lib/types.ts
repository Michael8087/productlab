export type Section = "product-lab" | "ai-experiments" | "writing" | "playground";

export interface Frontmatter {
  title: string;
  summary: string;
  date: string; // ISO date — drives sorting everywhere
  tags?: string[];
  featured?: boolean;
  status?: string; // e.g. "Shipped", "Prototype", "Sketch", "Vision doc"
  period?: string; // display string, e.g. "2022–Present"
  role?: string;
  cover?: string;
  draft?: boolean;
  link?: string; // if set, cards link straight out to this external URL instead of an internal detail page
}

export interface Entry extends Frontmatter {
  slug: string;
  section: Section;
  content: string;
  readingTime: string;
}

export interface TimelineItem {
  date: string; // ISO date
  title: string;
  description: string;
  type: "product" | "experiment" | "talk" | "article" | "milestone";
  href?: string;
}
