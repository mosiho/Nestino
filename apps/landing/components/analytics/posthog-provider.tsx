"use client";

import posthog from "posthog-js";
import { useEffect, useRef, type ReactNode } from "react";

export function PostHogProvider({ children }: { children: ReactNode }) {
  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;
    didInit.current = true;
    posthog.init(key, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
      capture_pageview: false,
      persistence: "localStorage+cookie",
    });
    posthog.capture("landing_view");
  }, []);

  return <>{children}</>;
}
