# External SEO evidence register

Audit date: 7 September 2026

## Verified public DNS

| Control | Current public record | Status |
| --- | --- | --- |
| SPF | `v=spf1 include:spf.protection.outlook.com -all` | Active |
| DMARC | `v=DMARC1; p=none; rua=mailto:sales@indianinfotech.org` | Active in monitor mode |
| MX | `indianinfotech-org.mail.protection.outlook.com` | Microsoft 365 |
| Google domain verification | Google Search Console DNS verification token | Active |

Keep DMARC in monitor mode until aggregate reports confirm legitimate senders. Record the previous TXT value, TTL, owner, approval, and propagation result before changing any DNS entry.

## Canonical business record

| Field | Approved value |
| --- | --- |
| Business name | Indian Infotech |
| Address | 429, 425, 403 Gala Empire, Opp. Doordarshan Kendra, Thaltej, Ahmedabad, Gujarat 380054, India |
| Phone | +91 76000 66770 |
| Website | https://indianinfotech.org |
| LinkedIn | https://in.linkedin.com/company/indian-infotech |

Use this record for every approved Google Business Profile, directory, social profile, and partner listing. Do not create, claim, merge, or edit an external listing without written business-owner approval.

## Account actions awaiting authenticated owner access

| System | Required action | Evidence required |
| --- | --- | --- |
| Google Search Console | Claim the `https://indianinfotech.org/` property using the existing DNS verification. Submit `https://indianinfotech.org/sitemap.xml` only after the new site is attached to the domain. | Property-owner screenshot and sitemap acceptance |
| Google Analytics | Create or select a GA4 web data stream and set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in the Sites environment. | Realtime event from a consented visit |
| Meta Pixel | Create/select the Indian Infotech pixel, set `NEXT_PUBLIC_META_PIXEL_ID`, and verify one PageView in Events Manager. | Pixel ID and Events Manager test result |
| Google Business Profile | Claim or create only the verified Thaltej location using the canonical business record. | Owner confirmation and profile URL |
| Directories | Correct the discovered ExportersIndia listing, which currently shows an older Ghatlodiya address, before adding any new directory profiles. | Before/after listing links |
| Backlinks | Obtain partner/client approval, then publish approved reciprocal or case-study links with the canonical website URL. | Source URL, owner, date, and anchor text |
| PageSpeed | Re-run mobile and desktop checks after public-domain cutover; the unauthenticated API returned HTTP 429 during this audit. | Saved report URLs and release commit |

## Site-side readiness

- GA4/GTM loads only when a valid environment ID is supplied.
- Meta Pixel loads only when a valid numeric `NEXT_PUBLIC_META_PIXEL_ID` is supplied.
- The official LinkedIn profile is linked in the footer and Organization structured data.
- The private Sites deployment has no custom domain attached, so do not submit the preview URL to search engines or business directories.
