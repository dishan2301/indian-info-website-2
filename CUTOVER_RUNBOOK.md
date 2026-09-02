# indianinfotech.org cutover runbook

This runbook separates repository-complete checks from actions that require company authority, production accounts, DNS access, or elapsed post-launch data. Do not mark an operator action complete without the evidence named below.

## Release gates

| Gate | Owner | Required evidence | Current state |
|---|---|---|---|
| Complete indexed-URL export | SEO owner | Google Search Console export plus WordPress crawl | Awaiting account/export |
| Redirect contract | Web owner | `npm run check:readiness` and live redirect report | Repository map ready; full indexed inventory pending |
| Search Console verification | SEO owner | Verified-property screenshot/export and submitted sitemap | Awaiting account action |
| Bing Webmaster verification | SEO owner | Verified-property screenshot/export and submitted sitemap | Awaiting account action |
| Google Business Profile | Business owner | Verified profile showing canonical NAP and URL | Awaiting account action |
| GA4/GTM | Analytics owner | Approved measurement ID, DebugView events, consent review | Awaiting identifier and account action |
| Forms/CRM | Sales operations | Test lead with timestamp and CRM/mail receipt | Web form implemented; production receipt must be verified |
| Customer evidence | Sales/client success | Written permission and source record for every story, quote, logo, and metric | Awaiting approved records |
| Certificates/policies | Quality owner | Current PDF, scope, number, issuer, dates, approver | Awaiting approved documents |
| Status system | Service owner | Monitor provider, components, incident workflow, and owner | Awaiting operational system |
| Domain/DNS | Domain owner | Approved change record and pre/post DNS export | Awaiting authorization |
| Mail protection | Domain/email owner | Pre/post MX, SPF, DKIM, and DMARC comparison | Must remain unchanged |
| WordPress rollback | Web owner | Restorable backup and tested staging URL | Awaiting operator proof |
| SSL/mixed content | Web owner | Valid certificate and production crawl with no insecure subresources | Verify after DNS propagation |

## Before launch

1. Export indexed and linked legacy URLs, merge them into `lib/legacy-routes.mjs`, and classify each destination as direct or closest relevant. Never redirect unmatched content to the homepage.
2. Run lint, SEO, security, readiness, production build, and rendered crawl checks.
3. Verify the production environment values for `NEXT_PUBLIC_SITE_URL`, `GOOGLE_SITE_VERIFICATION`, and `NEXT_PUBLIC_GA_MEASUREMENT_ID` without committing secrets.
4. Submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools after ownership is verified.
5. Confirm the footer, contact page, Google Business Profile, and Organization/LocalBusiness schema use the same name, address, and phone record.
6. Export all DNS records. Separately record MX, SPF, DKIM, DMARC, mail-provider verification, and any service-specific CNAME records.
7. Create a restorable WordPress backup and keep it available on an access-controlled staging host.
8. Lower only the required web-record TTL if the DNS owner approves the change. Do not alter mail records.

## Cutover day

1. Deploy the approved build and attach `indianinfotech.org` in the hosting provider.
2. Change only the web A/AAAA/CNAME records identified in the approved change record. Do not touch MX, SPF, DKIM, or DMARC.
3. Wait for provider domain verification and certificate issuance; verify HTTPS without bypassing certificate errors.
4. Test every legacy route in `lib/legacy-routes.mjs`, plus at least 30 highest-traffic/backlinked URLs from the final export. Require one permanent hop and a relevant 200 destination.
5. Crawl the sitemap, internal links, images, canonical tags, robots rules, structured data, and mixed-content URLs on the live domain.
6. Submit a real enquiry and confirm receipt in the approved mailbox/CRM. Confirm phone, email, WhatsApp, pricing, demo, support, resource, and industry CTAs.
7. Confirm GA4/GTM page views and conversion events in the approved account.
8. Compare post-change MX and mail-authentication records with the pre-launch export.

Rollback if the domain cannot serve valid HTTPS, critical routes or forms fail, redirect coverage is materially incomplete, mail records changed, or the production build cannot be restored quickly. The domain owner and web owner must approve rollback execution.

## Post-launch monitoring

- First hour: HTTPS, redirects, forms, analytics, 404s, and mail-record comparison.
- First day: hosting errors, Search Console inspection, Bing crawl, top landing pages, and conversion events.
- Daily for two weeks: crawl errors, 404 spikes, redirect failures, indexed-page changes, traffic anomalies, and top-page ranking movement.
- Weekly through week four: compare the top 20–30 landing pages and keyword set with the pre-launch baseline; fix old internal paths and relevant unmapped URLs.
- At day 30: retain needed redirects, restore normal TTLs if changed, close the rollback window deliberately, and record unresolved SEO/content actions.

## Other references

Update social profile links, CRM templates, email signatures, directory profiles, print material, business cards, and QR codes only after their target URLs are confirmed live. Record each change owner and evidence in the release ticket.
