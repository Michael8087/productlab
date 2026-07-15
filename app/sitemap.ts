import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const sections = ["product-lab", "ai-experiments", "writing", "playground"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/product-lab", "/ai-experiments", "/writing", "/playground", "/timeline", "/about"].map(
    (route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date()
    })
  );

  const entryRoutes = sections.flatMap((section) =>
    getAllSlugs(section).map((slug) => ({
      url: `${SITE_URL}/${section}/${slug}`,
      lastModified: new Date()
    }))
  );

  return [...staticRoutes, ...entryRoutes];
}
