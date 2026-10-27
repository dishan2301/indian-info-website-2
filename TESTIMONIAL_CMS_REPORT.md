# Testimonial CMS release report

## Targets and release state

- Preview: https://demo-website-kz7ba5yxm-dish1.vercel.app/ (provided deployment URL); branch webhook alias: https://demo-website-git-codex-vercel-cms-preview-dish1.vercel.app/
- Production: https://indian-info-website-2.vercel.app/
- Both website configurations point to Sanity project `rmgfsayz`, dataset `production`. Published testimonials are queried from that single dataset.
- Phase 1–3 only. Production merge, deployment, webhook creation, and live dual-site verification require the requested explicit approval.

## Approval and display

The previous seven hardcoded client quotes were removed from homepage and `/testimonials`; no existing quote, identity, image, logo, or permission evidence was imported. The older `approvedTestimonials` array remains empty. The new schema contains exact text, identity, optional media, display order, publication state, permission reference/scope/dates, and an approval snapshot. Private evidence stays in the internal customer approval process.

Only Sanity project members with Editor, Administrator, or Developer roles see the **Confirm customer approval** action. Assign draft-only contributors the Contributor role and reserve publishing/editor roles for authorized approvers. The approver must check the retained internal written record before confirming. The action records their Sanity user ID, time, reference, selected scope, and SHA-256 digest of the exact quote, identity, and media assets. The website recomputes the digest and requires a published document, public display enabled, verified status, matching reference and scope, and no revocation or expiry. A changed quote, identity, or media asset disappears until reconfirmed. Display order and featured status can change without reconfirming customer wording. Media outside the approved scope is hidden. No approval reference or snapshot is returned in public testimonial objects.

Studio actions are workflow controls; Sanity project roles are the access boundary. Review API tokens and member roles before real customer publication. On plans without custom document roles, the built-in Editor role can edit and publish other content too. Do not give Editor access to staff who are not authorized to approve customer publication.

## Editor steps

1. Obtain and retain the customer's exact written permission using the existing internal process. Verify website, quote, identity, optional photo/logo, date, expiry, and withdrawal terms.
2. Create a Testimonial draft. Add only authorized content and assets, the opaque internal permission reference, permission date, and the corresponding scope items. Leave public display off and status pending while awaiting approval.
3. An authorized Editor checks the evidence and chooses **Confirm customer approval**. Set publication date, status `published`, public display on, then publish the document. The server checks the saved approval snapshot before display.
4. Edit wording, attribution, photo, or logo only after fresh approval; confirm again. Adjust `displayOrder` (smallest first), featured status, or product/service grouping as needed.
5. Unpublish or delete in Studio to remove a quote. For withdrawal, immediately set permission status `revoked` or enter a revocation date and publish that change; then unpublish/delete if desired. Confirm the quote has disappeared on both routes.

## Cache and webhook setup

The shared service uses a 60-second Sanity fetch revalidation and both pages have a 60-second page fallback. A signed Sanity document webhook for create/update/delete of testimonial documents invalidates `sanity:testimonials`, `/`, and `/testimonials`. Sanity unpublish fires a delete event. Use separate webhook deliveries with separate secrets: `studio/webhook.preview.json` targets the protected stable Preview branch alias, and `studio/webhook.production.json` targets Production. Set each delivery's signing secret to that environment's server-only `SANITY_REVALIDATE_SECRET`. Keep the existing Preview protection bypass header on its webhook; do not turn off Preview protection. Production webhook configuration belongs to phase 5. Webhook delivery and live Vercel environment values must be verified before declaring same-minute removal; if delivery fails, the 60-second fallback applies on the next request.

## Tests and blockers

Website TypeScript, website production build, Studio TypeScript, Studio build, and all 12 regression test files pass locally. Tests cover authorized display, changed content, media scope, publish/unpublish/revocation/delete gates, order changes, responsive styles, and signed testimonial webhook invalidation. Three stale regression assertions were updated to match the existing dynamic year value, logo reveal timings, and shared article loading; no related UI styles changed.

No real customer testimonial was published for testing. The Preview deployment URL may be protected, and a deployed Studio with the new action, Preview webhook delivery, Vercel environment secret, and real cross-site publication have not yet been independently confirmed. **NO-GO for Production until Preview deployment, webhook, roles/tokens, and live approval workflow are verified.**
