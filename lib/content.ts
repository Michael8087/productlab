import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Entry, Frontmatter, Section } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

function sectionDir(section: Section) {
  return path.join(CONTENT_DIR, section);
}

function readEntry(section: Section, filename: string): Entry {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(sectionDir(section), filename), "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as Frontmatter;

  return {
    ...frontmatter,
    slug,
    section,
    content,
    readingTime: readingTime(content).text
  };
}

export function getEntries(section: Section, { includeDrafts = false } = {}): Entry[] {
  const dir = sectionDir(section);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  const entries = files
    .map((f) => readEntry(section, f))
    .filter((e) => includeDrafts || !e.draft);

  return entries.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getEntry(section: Section, slug: string): Entry | null {
  const file = path.join(sectionDir(section), `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  return readEntry(section, `${slug}.mdx`);
}

export function getAllSlugs(section: Section): string[] {
  const dir = sectionDir(section);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}

export function getFeatured(section: Section, limit = 3): Entry[] {
  const entries = getEntries(section);
  const featured = entries.filter((e) => e.featured);
  return (featured.length ? featured : entries).slice(0, limit);
}

export function getLatest(section: Section, limit = 3): Entry[] {
  return getEntries(section).slice(0, limit);
}
