# Preview testimonial CMS implementation

## Audit

The homepage carousel and `/testimonials` page used the seven `clientQuotes` in `app/content.ts` without publication permission checks. Their exact wording and logos were removed from those consumers; no customer quote or identity was copied to Sanity. The older `approvedTestimonials` array in `app/proof-content.ts` remains empty and is retained as historical evidence of the previous publication gate. No verified permission records or evidence files were supplied. Existing case-study evidence and records were untouched.

## Publication contract

A published Sanity `testimonial` is only a candidate. The server sends its opaque `permissionReference` and SHA-256 digest of exact quote, displayed identity, photo URL, and logo URL to the configured external permission register. The register must return `{verified:true,status:"verified",reference,digest,scope,verifiedAt,expiresAt?,revokedAt?}` over HTTPS. Scope must contain `website`, `quote`, `customerName`, `companyName`, and `designation`; optional `photo` and `logo` are displayed only with their own scopes. Missing, pending, expired, revoked, changed, malformed, and unavailable decisions fail closed. The register must issue decisions from retained written evidence, independent of Sanity editor labels. Private references and evidence never enter public response objects. The register should keep an audit trail and revoke the old digest when text, identity, or media changes.

Required Preview server variables: `TESTIMONIAL_PERMISSION_URL` and `TESTIMONIAL_PERMISSION_TOKEN`. The URL must be HTTPS. Restrict the token to read-only permission checks and keep it server-only. This external register is a configuration blocker: until it exists and is populated with verified records, the website intentionally displays no testimonial. Do not put permission evidence, customer photos, logos, or old quotes in Sanity without explicit customer authorization.

## Editor workflow

1. Collect the exact quote, identity, media, allowed website scope, permission date, expiry, and withdrawal contact in the existing controlled evidence process. A reviewer verifies the written evidence in the external permission register and issues an opaque reference and matching digest.
2. In Studio, create a Testimonial draft with the exact approved fields. Add only approved media, the opaque reference, related product/service, display order, and featured status. Leave `publicDisplay` off and status `pending` while approval is requested.
3. After the reviewer confirms the register decision, set publication date, status `published`, and `publicDisplay` on, then publish the Sanity document. Website retrieval still independently checks the live register.
4. Reorder by changing `displayOrder`; lower numbers appear first. Featured and product/service filters are supported by the shared server service.
5. For text, identity, or media edits, request a new matching register approval before publishing. The old digest will fail and the quote will disappear until fresh approval exists.
6. To unpublish, turn off `publicDisplay`, set status `unpublished`, or unpublish the Sanity document. To revoke, revoke the register decision first, then set `revoked` and record the revocation date in Studio. Verify `/` and `/testimonials` no longer show it.

The signed Sanity webhook now includes testimonial documents and invalidates `/` and `/testimonials`. Configure its existing Preview webhook with the updated filter; this repository change alone does not update a deployed Sanity webhook. The permission register must call the same signed endpoint with a testimonial event on external approval or revocation so active client routes refresh promptly. Both testimonial pages render dynamically and recheck the register with `no-store` on each request, independent of webhook delivery. Product/service pages currently contain no testimonial sections; future sections can call the service with `productService` and must be added to webhook invalidation.

## Verification and limits

`npm run lint`, website `npm run build`, and Studio `npm run build` passed in an isolated copy of `codex/vercel-cms-preview`. `tests/testimonials.test.mjs` covers authorized publication, missing/pending/revoked/expired permission, changed quote, media scope, unpublished content, no static fallback, live fetching, invalidation, and existing responsive CSS. Existing regression tests have unrelated baseline failures in this branch, including hardcoded historical stats and expectations about old static quotes. No external register, Sanity publication, Vercel deployment, or live revocation integration was exercised.
