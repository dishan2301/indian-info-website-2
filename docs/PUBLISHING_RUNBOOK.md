# Universal editorial publishing — Preview

## Diagnosis before code changes

`demo 1` is an actual published `blogPost` in project `rmgfsayz`, dataset `production`, document ID `47434108-31d7-4a7c-bab4-bb27e0b28187`, slug `demo`. At `2026-10-26T09:53:43Z`, both the live API and CDN returned it with `_updatedAt: 2026-10-26T09:43:22Z` and `publishedAt: 2026-10-26T09:43:00.000Z` (15:13 IST). All original publication predicates passed. It is neither a draft nor future-dated.

Before any source edits, the existing 3a07f76 Preview returned 302 to Vercel SSO for an anonymous `/insights/demo` request. Using the project's existing automation bypass returned 200, title `demo 1 | Indian Infotech`, and the article body. `/insights` and `/` also already contained the article. Preview project/dataset values matched. There were no error events among the 30 deployment events retrieved. These are deployment events, not a complete historical runtime-log archive; a historical authenticated 404/query failure could not be established. No timezone, filter, Sanity authorization or CDN discrepancy was found for this document. The reproduced access failure was Vercel Deployment Protection, not an application 404.

The previous release had no webhook endpoint, no configured Sanity webhook, and no Preview revalidation secret. This work adds those missing capabilities; it does not claim caching caused the observed demo access failure.

## Shared service

`lib/insights.ts` exposes `getPublishedArticles()`, `getPublishedArticleBySlug(slug)` and `getLatestArticles(limit)` over one normalized Article interface. All three editorial types and the original five articles use it. Originals win slug conflicts; CMS collisions choose newest publication instant then ascending ID. ISO offsets are compared as instants (`dateTime` in GROQ; `Date.parse` when normalizing). Missing optional image/author/category/body fields have safe defaults. Future dates, drafts and release-version documents stay invisible. New slugs require no static route registration or build.

CMS reads use the live API, explicit `perspective: published`, shared cache tags and 60-second fallback revalidation. The CDN cannot refill an invalidated cache with stale data. Listing outages log a sanitized operation/status and retain originals. Detail outages log and throw a service error instead of returning/caching a false 404. No tokens, headers or upstream bodies are logged.

The homepage requests the latest five; the listing requests the full collection. A new article can displace an older original from the five-card homepage, but never removes it from the listing or its original URL. ArticleBody and Portable Text typography are unchanged.

## Signed webhook

Endpoint (stable Preview branch alias):

`https://demo-website-git-codex-vercel-cms-preview-dish1.vercel.app/api/sanity/revalidate`

Use this stable alias, not a single deployment URL. The reviewed public configuration is `studio/webhook.preview.json`.

- Dataset: `production`
- Method: POST
- API version: `v2026-02-01`
- Events: create, update, delete. Publishing creates/updates the published document; unpublishing/deleting emits a delete of the published document.
- Types: blogPost, companyNews, researchArticle, author, category
- Draft/version events: excluded
- Secret: same private value as the branch-scoped Vercel `SANITY_REVALIDATE_SECRET`
- Preview header: `x-vercel-protection-bypass`, set privately to a project automation bypass credential. Do not put it into the URL or commit it.

Filter:

```groq
coalesce(after()._type, before()._type) in ["blogPost", "companyNews", "researchArticle", "author", "category"]
&& !(coalesce(after()._id, before()._id) in path("drafts.**"))
&& !(coalesce(after()._id, before()._id) in path("versions.**"))
```

Projection:

```groq
{
  "projectId": "rmgfsayz",
  "dataset": "production",
  "_id": coalesce(after()._id, before()._id),
  "_type": coalesce(after()._type, before()._type),
  "operation": delta::operation(),
  "beforeSlug": before().slug.current,
  "afterSlug": after().slug.current
}
```

The route verifies the raw-body HMAC using official `@sanity/webhook` 4.0.4, rejects unsigned/invalid requests with 401, missing server configuration with 503, and invalid/oversize events with 400/413. It checks project/dataset and allowed event types, ignores draft/version IDs, and never accepts arbitrary caller-supplied paths/tags. It waits three seconds for Content Lake consistency, then calls Next 16.4.3's `revalidateTag(tag, {expire: 0})` for the shared collection and both old/new slug tags; calls `revalidatePath` for `/`, `/insights`, both old/new URLs and `/insights/[slug]` with type `page`. Author/category edits and related-content changes invalidate the shared tag and article pattern. Retries are safe; failed cache invalidation returns 500 for webhook retry.

The content cache expires immediately; pages regenerate when next requested. A webhook does not deploy the website. The 60-second fallback is request-driven and can serve one stale response while refreshing, not a guaranteed wall-clock timer or an automatic reload of an already-open browser tab. Scheduled posts need no mutation at eligibility time: the fallback reruns the time predicate. Webhook delivery/retry and request latency affect visibility; do not promise an observed 60-second publishing SLA until measured.

## Environment configuration

Preview project `demo-website` already had correct `NEXT_PUBLIC_SANITY_PROJECT_ID=rmgfsayz` and `NEXT_PUBLIC_SANITY_DATASET=production`. An encrypted `SANITY_REVALIDATE_SECRET` was added only for branch `codex/vercel-cms-preview`. The private local review copy is in `~/.config/indian-infotech-cms-preview/webhook.json` with owner-only permissions; no actual secret values belong in this document, source control, screenshots or logs. Public datasets need no read token. A private dataset may use server-only `SANITY_API_READ_TOKEN`.

Do not disable Vercel protection globally. Header-based automation bypass plus the independent Sanity signature lets Sanity reach the protected Preview endpoint without granting unsigned cache invalidation. The same architecture can be used later in Production by configuring a separate Production secret and webhook URL/environment scope, not by changing article code. This task does not change Production variables, Production deployments, domains, DNS or email.

## Studio source and deployment boundary

The active Studio source was in a separate, dirty checkout on `main`. It was left untouched. This branch now carries a standalone `studio/` copy with required title/summary/body/date validation, cross-type slug uniqueness, original-URL protection and an ISO-now date default. Image, author and category are optional; image alt is required when supplying an image. There are no per-article typography inputs. Next.js excludes Studio from its TS build and Vercel upload. Studio builds and is deployed independently; pushing this Preview branch does not update the currently hosted Studio. A reviewed Studio release is still needed to activate these new validation rules remotely. No document migration or existing content mutation is performed.

## Tests and remaining acceptance

- `npm run check:publishing`: normalized services, several slugs/types, simulated lifecycle, UTC offsets/schedules, optional fields, deduplication, failures and logging, real cryptographic signatures, slug-change invalidation, reference updates, draft exclusion and Studio validation. These are regression tests, not claims of live CMS mutations.
- `npm run lint`, `npm run build`; standalone Studio TypeScript and `npm --prefix studio run build`.
- `tests/publishing-browser.mjs`: read-only real `demo` and all five originals at 1920/1366/768/375px, homepage/listing, computed typography, canonical/JSON-LD, image loading and overflow. Set `PREVIEW_BASE_URL`, installed Playwright paths and a writable TMPDIR if needed. It restricts any automation bypass header to the Preview origin, never sends it to external image hosts, and never mutates CMS content.
- `scripts/check-publishing-preview.mjs`: manually signed delivery to the real Preview endpoint; rejects bad signatures and checks valid cache invalidation plus the current real article collection and eligible homepage/detail URLs. This does not create a Sanity event or measure a real publication.

User explicitly selected read-only Sanity content. Therefore actual create/publish/update/slug-change/unpublish/delete lifecycle tests, and measured publish-to-visibility timing, remain blocked. The article was already visible at the first authorized observation; `_updatedAt` is not a measured publication delay. Do not label manual signed delivery or mocks as a full publishing acceptance pass.

The two existing readiness failures (fixed-age assertion and testimonial permission/publication gate) remain outside this publishing change and are not waived. See the preceding acceptance report for their classification. Production remains NO-GO pending those issues and a real permitted lifecycle test.

Official references: [Next 16 revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag), [Sanity webhook validation](https://www.sanity.io/docs/nextjs/validating-sanity-webhooks-nextjs), [Sanity webhook API](https://www.sanity.io/docs/http-reference/webhooks), [Vercel automation bypass](https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation). APIs were also checked against the installed Next.js documentation and webhook toolkit types.

During final Preview verification the live published inventory became empty again; the same deployed code correctly returned 404 for `/insights/demo`. This task made no content mutations. The signed delivery test accepted a valid event in 3547ms and rejected unsigned/invalid events with 401. That is delivery timing, not publication-to-visibility timing.
