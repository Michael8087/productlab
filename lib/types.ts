export type Section = "ai-experiments" | "writing" | "case-studies";

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
  confidential?: boolean; // if set, the card shows the title but masks the summary behind a skeleton placeholder
}

export interface Entry extends Frontmatter {
  slug: string;
  section: Section;
  content: string;
}
