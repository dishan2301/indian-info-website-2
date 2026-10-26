# Website security cleanup verification

Scope: website worktree only. No deploy, push, merge, content mutation, or standalone Studio changes.

## Dependency decision

The entire website source contains one next-sanity import: PortableText. Installed next-sanity 13.4.0 directly re-exports @portabletext/react 7.0.1. It provides no additional rendering behavior here. There are no Studio, Visual Editing, draft-mode, defineLive, webhook, or next-sanity client usages in this website.

Replaced that import with @portabletext/react 7.0.1 and removed website dependencies sanity 6.20.0 and next-sanity 13.4.0. Kept Next.js 16.4.3, React/React DOM 19.2.8, @sanity/client 8.11.0 and @sanity/image-url 2.1.1. Removed 880 installed packages. No retained package versions changed during cleanup. No forced updates or dependency overrides.

npm audit after cleanup: **0 vulnerabilities** (including development dependencies). npm ls confirms sanity and next-sanity are absent and the direct renderer/client resolve without peer errors. npm reports an extraneous @emnapi/runtime optional native-tooling package even after npm prune; it is not a vulnerable dependency or missing peer.

## Caching

Removed the explicit /_next/static/:path* Cache-Control header. Installed Next.js documentation says immutable hashed assets already receive public, max-age=31536000, immutable. The /:path* security header rule still applies to all paths. Production build emits no custom Cache-Control warning. Live production-server verification confirms HTTP 200, the immutable cache header, and all shared security headers on a hashed JavaScript asset.

## Verification

- TypeScript: passed.
- Production build: passed, 143 pages generated.
- Latest post-build security and SEO tests: 19 passed, one skipped, zero failed. The artifact test targets dist/client rather than Next.js output; a separate .next/static inspection passed with no source maps, environment files, local workspace paths or .env.local references.
- Additional full rendered SEO crawl was attempted and stopped after exceeding two minutes without results; it performs sequential link/image fetches without request timeouts. No full-crawl pass is claimed. Direct route/canonical/header and CMS rendering checks passed as described below.
- Full existing test suite: 35 passed, 3 failed, 1 skipped. The skipped public-build test uses dist/client; actual Next.js static artifacts were inspected separately during preview preparation.
- All five legacy article routes return 200 with their existing canonical URLs and shared security headers: contract-workforce-management-auditable-model, biometric-access-control-door-interlock-design, indian-infotech-publishes-product-planning-guides, easytime-cloud-attendance-benefits, ai-in-production-lines (all under /insights/).
- /insights/sanity-cms-integration-test returns 200, the expected canonical, and the published CMS body including its rich-text markup.
- / and /insights return 200; an unknown insight returns 404.
- Existing client configuration, GROQ queries, caching, token handling, missing-content behavior and local article fallback are unchanged.

## Existing test failures investigated

1. Statistics test requires a literal value: 14. The implementation computes completed years from 15 August 2011; it now yields 15. This is a stale literal-source assertion, not a dependency regression.
2. Testimonials test requires the literal notice No permission-backed named testimonial. The existing page instead renders clientQuotes. Permission governance needs editorial review; this cleanup does not establish permission or alter the page.
3. Client logo reveal test expects .65s and 1.3s transition delays; current CSS uses .15s for the second row. Existing animation/test expectations disagree. CSS and test are unchanged.

## Files changed in this cleanup

- package.json: replace two unused Studio dependencies with the exact existing PortableText renderer.
- package-lock.json: update dependency graph.
- app/insights/[slug]/page.tsx: direct PortableText import.
- next.config.ts: remove redundant static cache override.
- SECURITY_CLEANUP_REPORT.md: this report.

Existing uncommitted CMS files, environment example, index page, and package backup files were preserved. Standalone Studio status before/after remains its existing schema changes.

## Readiness boundaries

The existing integration retains known functional limitations: homepage/knowledge/search/sitemap still use static content sources; a nonempty CMS listing replaces the static index list; PortableText image blocks have no custom image renderer; CMS details do not render PDF attachments or the legacy detail page's article JSON-LD/related-content section. These are pre-existing CMS features outside this dependency cleanup. The five existing detail URLs and current published test content work, but broader CMS/editorial acceptance should review these limitations before rollout.
