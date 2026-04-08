"use client";

import posthog from "posthog-js";

export function captureEvent(
  event: string,
  props?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  try {
    posthog.capture(event, props);
  } catch {
    /* noop */
  }
}
