# CMS Preview 404 investigation

Branch: codex/vercel-cms-preview, starting commit f3b6a90719cb4e1c28c71d82e9b38cb7ff852436. This report records the local investigation before the separately authorized fix commit and Preview branch push. The investigation made no push, deployment, merge, DNS, Vercel setting or Studio change.

## Confirmed code defect and reproduction

lib/sanity/client.ts resolves a default project (rmgfsayz) and dataset (production), but the previous sanityConfigured expression examined only the raw NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_READ_TOKEN values. When both were missing/empty, it disabled fetching despite having valid public project configuration.

Exact failure chain: sanityConfigured=false -> getPublishedInsight returns null without a query -> CMS slug has no static article match -> notFound(). Static articles continue to work through the existing local fallback. Dataset configuration alone does not enable the old gate.

Controlled production builds used explicit empty public/token overrides to neutralize local .env.local settings without changing the environment file:

| Source | Build environment | CMS test route | Legacy article |
| --- | --- | --- | --- |
| Before fix | Public variables and server token empty | 404 | 200 |
| Before fix | NEXT_PUBLIC_SANITY_PROJECT_ID=rmgfsayz, NEXT_PUBLIC_SANITY_DATASET=production, empty token | 200, published body rendered | Existing fallback unchanged |
| After fix | Public variables and server token empty | 200, published body rendered | All five return 200 |

All builds use VERCEL_ENV=preview and Next.js production mode. Both before-fix builds and the after-fix build passed, generating 143 pages. The CMS test still carries noindex. Unknown article returns 404.

## Read-only content verification

The exact publishedInsightQuery returns the document from both the Sanity origin API and CDN without a token:

- Project/dataset: rmgfsayz / production.
- Slug: sanity-cms-integration-test.
- Document ID: 4c3d0371-ead4-46dd-94d3-7a09f4c58058.
- Type: blogPost (allowed by the query).
- publishedAt: 2026-10-26T06:53:00.000Z (not future-dated during verification).

Thus the query's type, slug, publication-date filters and public read access do not exclude this article. The SDK API version uses published documents by default. No drafts, content or assets were changed.

## Routing and caching findings

- generateStaticParams returns the five local article slugs, but dynamicParams is not disabled anywhere. Its default is true; additional CMS slugs render on demand.
- No static export is configured. The production build reports /insights/[slug] as dynamic.
- The route calls notFound only after both CMS lookup and local lookup fail.
- Listing/detail fetches use 60-second revalidation and their existing cache tags. No route-level revalidation changes are required for this defect.
- Proxy handles redirects/security headers and does not block this slug. CORS is not the cause: Sanity fetching is server-side.
- A network error or invalid project configuration can independently produce the same fallback/404 through the existing catch block; that behavior was not redesigned.

## Vercel evidence and limits

GitHub reports a successful Preview deployment for f3b6a90 (deployment record 7326308429). Its two reported preview URLs redirect unauthenticated requests to Vercel login:

- https://demo-website-bcrojlkvd-dish1.vercel.app
- https://demo-website-dgaorcjd5-dish1.vercel.app

The Preview environment values and function logs were not accessible here. The missing-variable failure is conclusively reproduced locally and explains the reported pattern, but absence of those values in the actual deployment remains an inference, not a remotely verified fact. If those values were present in the failing build, inspect its function logs and deployment commit for an independent Sanity fetch error.

## Minimal local fix

sanityConfigured now derives from the resolved sanityProjectId and sanityDataset, consistent with createClient. Valid built-in public defaults no longer require a redundant environment variable or token. Explicit project/dataset overrides and optional server-only token behavior remain intact. Routes, GROQ, static article bodies, layout and fallback error handling are unchanged.

tests/sanity-config.test.mjs covers absent/empty environment values, explicit overrides and server-token retention. The defaults test failed before the fix and passes afterward.

## Validation

- New regression tests: 2 passed.
- TypeScript: passed.
- Production build with both requested public variables: passed; CMS article 200.
- Fixed production build with empty public/token overrides: passed; CMS article 200 with published body and noindex.
- All five legacy article URLs and /insights: 200. Missing article: 404.
- Full suite: 41 tests, 37 passed, 3 existing failures, 1 skipped. Existing failures concern logo animation timing, literal years-experience value, and testimonial permission wording. No new failures.
- Skipped existing test targets dist/client; separate inspection of actual .next/static passed (no source maps, workspace paths or .env.local references).
- npm audit: zero vulnerabilities.
- git diff --check: passed.

## Remaining Preview configuration

For the currently deployed f3b6a90 code, confirm these exact values are set in Vercel's **Preview** environment and are available to the build:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=rmgfsayz
NEXT_PUBLIC_SANITY_DATASET=production
```

.env.example is documentation; Vercel does not use it as environment configuration. NEXT_PUBLIC_* values are frozen by next build, so editing settings alone does not repair an existing build. An authorized new Preview build would be needed after correcting configuration or deploying the local fix. No such action was performed here. A read token is unnecessary for the verified public dataset; never add a NEXT_PUBLIC token.

The fixed source works with the built-in defaults, but explicit Preview settings remain useful for documenting the intended dataset. Preview authentication protection is separate from the application's 404 and was not changed. Production settings remain untouched.

Reference: https://nextjs.org/docs/app/guides/environment-variables

## Files modified or added by this investigation

- lib/sanity/client.ts: configuration gate and explanatory comment.
- tests/sanity-config.test.mjs: regression tests.
- CMS_PREVIEW_404_REPORT.md: this report.

The two existing untracked package backup files and local environment file are preserved.
