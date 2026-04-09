import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/constants";
import { isDatabaseConfigured } from "@nestino/db";
import { listDemoSitemapSubdomains } from "@/lib/demo-queries";

function publicPaths(): string[] {
  const core = ["/", "/privacy", "/terms"];
  const out: string[] = [];
  for (const p of core) {
    if (p === "/") {
      out.push("/");
      out.push("/tr");
    } else {
      out.push(p);
      out.push(`/tr${p}`);
    }
  }
  return out;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl().replace(/\/$/, "");
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = publicPaths().map((path) => ({
    url: path === "/" ? base : `${base}${path}`,
    lastModified,
    changeFrequency: path.includes("privacy") || path.includes("terms")
      ? "yearly"
      : "weekly",
    priority:
      path === "/" || path === "/tr"
        ? 1
        : path.includes("privacy") || path.includes("terms")
          ? 0.3
          : 0.5,
  }));

  if (!isDatabaseConfigured()) {
    return staticRoutes;
  }

  try {
    const subdomains = await listDemoSitemapSubdomains();
    const demoRoutes: MetadataRoute.Sitemap = subdomains.flatMap((sub) => [
      {
        url: `${base}/demo/${sub}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      },
      {
        url: `${base}/tr/demo/${sub}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      },
    ]);
    return [...staticRoutes, ...demoRoutes];
  } catch {
    return staticRoutes;
  }
}
