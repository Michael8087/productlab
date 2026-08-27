import type { MetadataRoute } from "next";
import { getEntries } from "@/lib/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const sections = ["ai-experiments", "writing", "case-studies"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/ai-experiments", "/writing", "/case-studies", "/about"].map(
    (route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date()
    })
  );

  // Entries with a `link` have no internal page (they redirect out), and
  // confidential entries have no page at all — neither belongs in the sitemap.
  const entryRoutes = sections.flatMap((section) =>
    getEntries(section)
      .filter((entry) => !entry.link && !entry.confidential)
      .map((entry) => ({
        url: `${SITE_URL}/${section}/${entry.slug}`,
        lastModified: new Date()
      }))
  );

  return [...staticRoutes, ...entryRoutes];
}
