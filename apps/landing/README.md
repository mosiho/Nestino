# Nestino marketing landing (`nestino.ai`)

Next.js 15 App Router site: conversion landing, trial activation (`POST /api/trials/activate`), and demo previews (`/demo/[slug]`).

## Develop

From the **monorepo root**:

```bash
pnpm install
pnpm dev:landing
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local` and fill values per [docs/00-system/env-vars.md](../../docs/00-system/env-vars.md).

- `DATABASE_URL` is required for trial activation and demo resolution.
- Without Upstash env vars, rate limiting is skipped (dev only — set in production).

## Vercel

1. Create a Vercel project with **Root Directory** `apps/landing`.
2. Set **Install Command** to `cd ../.. && pnpm install` (or rely on `vercel.json` in this folder).
3. Set **Build Command** to `cd ../.. && pnpm --filter @nestino/landing build`.
4. Add env vars from `.env.example`.
5. Attach custom domain `nestino.ai`.

## Specs

- [PRD](../../docs/01-nestino-landing/PRD.md)
- [Tech spec](../../docs/01-nestino-landing/tech-spec.md)
- [Design spec](../../docs/01-nestino-landing/design-spec.md)
