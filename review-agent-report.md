# Review report

[P1] Restore Software and Company destinations in the primary navigation — `app/_components/site-header.tsx:51`

The changed `menuItems`, `mobilePrimaryLinks`, `mobileMenuGroups`, and `endingNavLinks` remove the Software, Support, Contact, Company, Resources, and Case studies destinations from the header and mobile menu. They remain valid site sections and are only reachable through the footer or indirect links, so users who rely on the primary navigation can no longer discover or reach them. Restore these entries in both desktop and mobile navigation, or provide an equivalent visible path for each.

[P2] Keep the deployment-readiness section on software detail pages — `app/software/[slug]/page.tsx:58`

The diff removes the entire `software-readiness` section covering users and roles, hardware compatibility, data and integrations, and deployment and support. This content is the only explicit implementation checklist on every software detail page, while the page still tells prospective customers to validate configuration before rollout. Removing it leaves technical stakeholders without the promised readiness guidance. Re-add the section or replace it with equivalent content.

[P2] Do not embed Google Maps in every page footer without updating the privacy scope — `components/ui/footer-01.tsx:25`

The new footer iframe is rendered by `SiteFooter`, so every page now requests Google Maps when its lazy-loaded footer enters the viewport. The updated cookie policy says the map is used on the contact page and its provider table repeats that narrower scope. This creates a factual privacy disclosure mismatch and adds a third-party request to every page. Either keep the map on the contact page only, or update the policy and provide an explicit third-party loading choice for the global footer.

[P2] Respect reduced motion and provide a pause path for the new industry auto-rotation — `components/homepage/home-curated-sections.tsx:137`

`IndustriesAndClients` now advances the selected industry every three seconds, but it has no pause control and does not check `prefers-reduced-motion`. Keyboard and pointer users can have their selected panel replaced while reading it, and users who request reduced motion still receive the timer. Gate the timer behind reduced-motion state and pause it on interaction, or add an accessible pause control.

[P2] Restore the multi-location feature on the biometric attendance landing page — `app/seo-landing-content.ts:31`

The diff removes the `Multi-location oversight` feature while the same page still advertises multi-location capability in its FAQ, benefits, and integration guidance. The landing page now presents an incomplete and internally inconsistent feature summary. Restore the feature or revise the surrounding claims so the page describes the same scope throughout.

## Overall assessment

The change set builds and lints successfully, but it contains a release-blocking navigation regression and several user-facing content, privacy, and accessibility regressions that should be fixed before shipping.

## Verification and test gaps

- `npm run build` passed.
- `npm run lint -- --quiet` passed.
- `git diff --check` passed.
- `npm run check:readiness` and `npm run check:seo` still report `test failed` without useful assertion output.
- `npx tsc --noEmit` reports missing route-map types in stale `.next/types/validator.ts`; this needs a clean generated build or a separate type-check fix.
- Browser and local-server verification was unavailable in the sandbox, so the navigation, footer iframe, and motion findings should be confirmed in a real browser after fixes.
