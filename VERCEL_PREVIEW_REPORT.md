# Local Vercel CMS preview preparation

## Repository and branch

- Requested repository: dishan2301/indian-info-website-2.
- Verified remote: github = https://github.com/dishan2301/indian-info-website-2.git.
- Fetched github/main base: 66f9660fcee13aea6a12c855b7ff5fbe2ddbc5b7.
- Local starting HEAD exactly equals fetched github/main: zero ahead/behind commits and no tracked baseline differences.
- Prepared branch: codex/vercel-cms-preview. One local commit atop that base contains the files below. Its exact hash is available from git log github/main..codex/vercel-cms-preview.
- Other remotes easytime and gpu remain unchanged. Local main tracks easytime/main, not github/main; comparison and preparation explicitly used github/main.
- Other worktrees: original website/main; /tmp/indian-infotech-cms on codex/sanity-free-cms; /tmp/indian-infotech-next-security-upgrade-20261026 on codex/next-security-upgrade. This SSD worktree began on codex/next-security-upgrade-ssd. Their work is preserved.
- Requested Vercel target: demo-website; production branch main; supplied production address https://indian-info-website-2.vercel.app/. There is no local .vercel/project.json. Vercel project/repository linkage and remote environment settings have not been independently verified or changed. No deployment was attempted.

## Commit file manifest

| File | Intended change |
| --- | --- |
| .env.example | Preserve existing canonical/verification/analytics settings and add public Sanity project/dataset examples plus an empty, commented server-token placeholder. |
| app/insights/page.tsx | Read the published CMS listing with existing static-library fallback. |
| app/insights/[slug]/page.tsx | Read published CMS detail and metadata; render PortableText directly; retain legacy detail fallback and unknown-slug 404. |
| lib/sanity/client.ts | Sanity client for rmgfsayz / production; optional server environment token. |
| lib/sanity/content.ts | Typed fetch helpers, error/missing-config fallback, 60-second revalidation. |
| lib/sanity/queries.ts | Editorial listing/detail GROQ with publication-date filtering. |
| lib/sanity/index.ts | Client/query exports. |
| next.config.ts | Allow Sanity CDN images and let Next.js manage hashed-asset caching; retain security headers. |
| package.json | Pin Next.js 16.4.3; add @portabletext/react 7.0.1, @sanity/client 8.11.0-compatible range and @sanity/image-url 2.1.1-compatible range. No website Studio dependencies. |
| package-lock.json | Exact cleaned dependency graph; zero audit vulnerabilities. |
| SECURITY_CLEANUP_REPORT.md | Detailed cleanup checks and existing CMS limitations. |
| VERCEL_PREVIEW_REPORT.md | This preparation report. |

No unrelated historical commits would be introduced relative to fetched GitHub main. No route/content/CSS changes or conflict resolutions are included. The prior .env.example replacement had removed existing settings; this preparation restores those examples while retaining the Sanity additions.

## Excluded and preserved

- .env.local, other real environment files, node_modules, .next, .vercel, credentials and tokens are excluded. Git tracks only .env.example. Automated secret-pattern inspection of the intended source/package files and tracked repository found no private keys or token patterns. The public project ID and dataset are configuration, not secrets.
- package.json.before-sanity-cleanup and package-lock.json.before-sanity-cleanup remain untracked, unmodified backups; explicit staging excludes them.
- The original website's uncommitted CMS changes and standalone Studio's existing schema changes remain untouched.
- Vercel settings, DNS, main, production infrastructure and remote branches were not modified.

## Verification on the prepared files

- npm run lint: passed.
- npm run build: passed with Next.js 16.4.3, 143 pages generated; no custom Cache-Control warning.
- VERCEL_ENV=preview npm run build: passed, 143 pages generated.
- npm audit --json: zero vulnerabilities including development dependencies.
- Security/SEO tests: 19 passed, one skipped, zero failed. The artifact test targets dist/client, which Next.js does not produce. A separate inspection of the actual .next/static output passed: no source maps, environment files, workspace paths or .env.local references. Full suite: 35 passed, three existing failures, one skipped.
- git diff --check: passed.
- Runtime preview-mode checks: homepage, /insights, all five existing article URLs and the published CMS test return 200 with canonical metadata, noindex and all shared security headers. robots.txt disallows all crawlers. Unknown article returns 404.
- Existing articles verified: /insights/contract-workforce-management-auditable-model; /insights/biometric-access-control-door-interlock-design; /insights/indian-infotech-publishes-product-planning-guides; /insights/easytime-cloud-attendance-benefits; /insights/ai-in-production-lines.
- /insights/sanity-cms-integration-test renders its published Sanity body. No content was created or published by this preparation.
- Fetch-helper checks using simulated dependencies confirm empty-list/null fallback when Sanity is unconfigured or fetch fails. Static article fallback remains in the pages.
- Existing SEO configuration, static content, CSS, security headers, tests and the three failure inputs are byte-for-byte unchanged from github/main.

## Existing test failures: not branch regressions

1. client-logo-reveal.test.mjs expects .65s / 1.3s timing; existing CSS uses .15s for the second row.
2. readiness.test.mjs requires literal value: 14; existing source computes years since 15 August 2011 (15 as of this verification).
3. readiness.test.mjs requires the literal permission-backed testimonial notice; existing page instead renders client quotes. Permission review remains an editorial concern.

The relevant tests and source inputs are unchanged from fetched GitHub main, establishing that this commit does not introduce those failures. Content and tests were not adjusted to force green results.

## Preview handoff and limits

This is local preparation only. Before any authorized push/deployment, confirm demo-website's Git integration targets this repository and configure its Preview environment to use NEXT_PUBLIC_SANITY_PROJECT_ID=rmgfsayz and NEXT_PUBLIC_SANITY_DATASET=production. A public dataset requires no token. For a private dataset, use a narrowly scoped read-only SANITY_API_READ_TOKEN in Vercel's server environment; never put it in NEXT_PUBLIC_* or Git. Existing client uses the published perspective default for its fixed API version.

Existing canonical origin is https://indianinfotech.org (or NEXT_PUBLIC_SITE_URL when set). This differs from the supplied Vercel production address and has intentionally been preserved. Preview requests are noindex and robots-blocked; the preview hostname should not replace production canonicals.

The integration's existing limitations remain: static homepage/knowledge/search/sitemap sources; nonempty CMS listing replaces static list; no custom PortableText inline-image renderer, PDF display, CMS article JSON-LD or related-content rendering. See SECURITY_CLEANUP_REPORT.md. These do not prevent testing the current CMS text article in a preview, but broader editorial acceptance remains outstanding.

No push, merge, deployment, Vercel setting change or DNS change is authorized by this local preparation. The new local commit is ready for review.
