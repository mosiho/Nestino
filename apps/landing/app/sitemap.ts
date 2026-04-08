import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/constants";
import { isDatabaseConfigured } from "@nestino/db";
import { listDemoSitemapSubdomains } from "@/lib/demo-queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  if (!isDatabaseConfigured()) {
    return staticRoutes;
  }

  try {
    const subdomains = await listDemoSitemapSubdomains();
    const demoRoutes: MetadataRoute.Sitemap = subdomains.map((sub) => ({
      url: `${base}/demo/${sub}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    }));
    return [...staticRoutes, ...demoRoutes];
  } catch {
    return staticRoutes;
  }
}
