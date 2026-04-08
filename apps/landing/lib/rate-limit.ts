import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

const redis = getRedis();

const ipLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 h"),
      prefix: "landing:trials:ip",
    })
  : null;

const emailLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "24 h"),
      prefix: "landing:trials:email",
    })
  : null;

export async function rateLimitTrialByIp(
  identifier: string
): Promise<{ success: boolean }> {
  if (!ipLimiter) return { success: true };
  const { success } = await ipLimiter.limit(identifier);
  return { success };
}

export async function rateLimitTrialByEmailHash(
  emailHash: string
): Promise<{ success: boolean }> {
  if (!emailLimiter) return { success: true };
  const { success } = await emailLimiter.limit(emailHash);
  return { success };
}
