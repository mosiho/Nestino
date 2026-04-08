import { and, eq, or } from "drizzle-orm";

import { getDb, isDatabaseConfigured, sites, tenants } from "@nestino/db";

export type DemoSiteRow = {
  subdomain: string;
  destination: string;
  tenantName: string;
};

export async function getDemoSiteBySubdomain(
  subdomain: string
): Promise<DemoSiteRow | null> {
  if (!isDatabaseConfigured()) return null;
  const db = getDb();
  const rows = await db
    .select({
      subdomain: sites.subdomain,
      destination: tenants.destination,
      tenantName: tenants.name,
    })
    .from(sites)
    .innerJoin(tenants, eq(sites.tenantId, tenants.id))
    .where(
      and(
        eq(sites.subdomain, subdomain),
        or(eq(sites.status, "demo"), eq(sites.status, "live"))
      )
    )
    .limit(1);

  return rows[0] ?? null;
}

export async function listDemoSitemapSubdomains(): Promise<string[]> {
  if (!isDatabaseConfigured()) return [];
  const db = getDb();
  const rows = await db
    .select({ subdomain: sites.subdomain })
    .from(sites)
    .where(or(eq(sites.status, "demo"), eq(sites.status, "live")));

  return rows.map((r) => r.subdomain);
}
