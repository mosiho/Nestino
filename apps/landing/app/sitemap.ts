import type { MetadataRoute } from "next";
import { and, eq } from "drizzle-orm";

import { getSiteUrl } from "@/lib/constants";
import { listDemoSitemapSubdomains } from "@/lib/demo-queries";
import {
  contentPages,
  contentVersions,
  getDb,
  isDatabaseConfigured,
} from "@nestino/db";
import { getActiveLangs, getSiteBySubdomain } from "@nestino/villa-site/lib/tenant";

function publicPaths(): string[] {
  const core = ["/", "/privacy", "/terms", "/bowora"];
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

    const db = getDb();
    const villaGuideRoutes: MetadataRoute.Sitemap = [];

    for (const sub of subdomains) {
      const ctx = await getSiteBySubdomain(sub);
      if (!ctx) continue;
      const langs = getActiveLangs(ctx);
      if (langs.length === 0) continue;

      for (const lang of langs) {
        villaGuideRoutes.push({
          url: `${base}/sites/${sub}/${lang}/guides`,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.65,
        });
      }

      const guidePages = await db
        .selectDistinctOn([contentPages.slug], {
          slug: contentPages.slug,
          publishedAt: contentVersions.publishedAt,
        })
        .from(contentPages)
        .innerJoin(
          contentVersions,
          and(
            eq(contentVersions.pageId, contentPages.id),
            eq(contentVersions.isCurrent, true),
            eq(contentVersions.status, "published")
          )
        )
        .where(
          and(
            eq(contentPages.siteId, ctx.site.id),
            eq(contentPages.status, "active"),
            eq(contentPages.pageType, "guide")
          )
        );

      for (const page of guidePages) {
        for (const lang of langs) {
          villaGuideRoutes.push({
            url: `${base}/sites/${sub}/${lang}/${page.slug}`,
            lastModified: page.publishedAt ?? lastModified,
            changeFrequency: "weekly",
            priority: 0.64,
          });
        }
      }
    }

    return [...staticRoutes, ...demoRoutes, ...villaGuideRoutes];
  } catch {
    return staticRoutes;
  }
}
