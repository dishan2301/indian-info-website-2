# Blog integration verification

The homepage and insights listing now share `lib/insights.ts`. Five static articles remain intact. Published Sanity documents are merged, publication dates validated, drafts and future dates excluded, and canonical slugs deduplicated. Static content wins collisions to preserve original URLs and metadata; CMS collisions use newest publication then ascending document ID. Both queries use the same CMS ordering and explicitly exclude drafts.

Portable Text has explicit paragraph, h2/h3, list/list-item, safe link, image and blockquote renderers. Heading groups reuse original bordered article sections and existing typography tokens. Missing images stay empty. CMS pages include article structured data and related articles. The 404 light background now has readable eyebrow, route links and secondary button colors.

Changed files: app/globals.css, app/page.tsx, app/insights/page.tsx, app/insights/[slug]/page.tsx, components/homepage/home-curated-sections.tsx, components/article-portable-text.tsx, lib/insights.ts, lib/sanity/queries.ts, tests/insights-integration.test.mjs, this report.

Verification:
- Production build and TypeScript passed after implementation; final query-order refinement rebuilt before commit.
- Focused regression/SEO/security/ROI/comparison suite: 24 passed, 1 skipped, 0 failed. New integration tests cover six unique cards, ordering, duplicates, static collision precedence, invalid/future/draft protection, empty results, fetch failure, shared homepage/listing wiring, all five original routes and Portable Text elements/section styling.
- Broader suite: 37 passed, 1 skipped, 2 failed. Both failures are in unchanged readiness tests and unchanged target files: fixed company age of 14 and obsolete testimonial placeholder expectations. These remain unresolved outside this task.
- Production HTTP smoke checks: homepage, listing, original EasyTime article and published CMS article return 200; unknown route returns 404. CMS article link appears on homepage and listing; original links remain on listing.
- Desktop/mobile screenshot comparison could not run: browser tooling initialization failed with `Quota exceeded (os error 122)`. Responsive CSS and carousel implementation are preserved, but visual parity and mobile overflow require manual verification. No screenshot-based responsiveness claim is made.

Preview-only branch: codex/vercel-cms-preview. No production deployment, DNS, email, CMS content edits or merge into main performed. Existing uncommitted files in both worktrees were preserved; the article route's prior encoded-slug correction is retained and consolidated with canonical slug handling.

Paths to verify on the resulting Preview deployment:
- /
- /insights
- /insights/easytime-cloud-attendance-benefits
- /insights/how-biometric-attendance-systems-are-transforming-workforce-management
- /missing-regression-page
