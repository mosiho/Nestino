import type { NextConfig } from "next";

// CSP allows embedding inside nestino.com iframes for demo previews.
// See tech-spec §Security — Landing iframe (demo preview).
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.posthog.com https://us.i.posthog.com https://eu.i.posthog.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.posthog.com https://us.i.posthog.com https://eu.i.posthog.com wss://*.posthog.com https://maps.googleapis.com",
  "frame-src https://www.google.com https://maps.google.com",
  // Allow marketing site to embed demo villa pages in iframes
  "frame-ancestors 'self' https://nestino.com https://*.nestino.com https://nestino-main.vercel.app",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  transpilePackages: ["@nestino/db", "@nestino/villa-site"],
  images: {
    remotePatterns: [
      // Supabase Storage CDN
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      // Allow original silyan domain during migration
      {
        protocol: "https",
        hostname: "www.silyanvillas.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Do NOT send X-Frame-Options on villa-sites (would conflict with
          // frame-ancestors CSP and block landing site demo embed).
        ],
      },
    ];
  },
};

export default nextConfig;