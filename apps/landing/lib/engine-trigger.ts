import { engineJobs, getDb } from "@nestino/db";

type TriggerPayload = {
  tenantId: string;
  siteId: string;
  cmsApiKeyPlaintext: string;
  subdomain: string;
};

export async function enqueueCrawlSiteJob(
  payload: TriggerPayload
): Promise<void> {
  const base = process.env.ENGINE_INTERNAL_URL?.replace(/\/$/, "");
  const token = process.env.ENGINE_INTERNAL_TOKEN;

  if (base && token) {
    const res = await fetch(`${base}/jobs/trigger`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        tenant_id: payload.tenantId,
        job_type: "CrawlSiteJob",
        triggered_by: "event",
        priority: "high",
        idempotency_key: `crawl-onboard:${payload.siteId}`,
        payload: {
          site_id: payload.siteId,
          subdomain: payload.subdomain,
          cms_api_key_plaintext: payload.cmsApiKeyPlaintext,
        },
      }),
    });
    if (!res.ok) {
      throw new Error(`Engine trigger failed: ${res.status}`);
    }
    return;
  }

  const db = getDb();

  await db.insert(engineJobs).values({
    tenantId: payload.tenantId,
    jobType: "CrawlSiteJob",
    status: "pending",
    triggeredBy: "event",
    priority: "high",
    idempotencyKey: `crawl-onboard:${payload.siteId}`,
    payloadJson: {
      site_id: payload.siteId,
      subdomain: payload.subdomain,
      cms_api_key_plaintext: payload.cmsApiKeyPlaintext,
    },
  });
}
