# Frontend security controls

This site intentionally has no application authentication, session storage, state-changing API, file upload, analytics, or server-submitted contact form. The enquiry form prepares a local `mailto:` message and does not transmit data to the site.

## Implemented controls

- `proxy.ts` redirects production HTTP requests to HTTPS and applies HSTS, nonce-based CSP, clickjacking protection, MIME-sniffing protection, referrer policy, browser-feature restrictions, and cross-origin opener isolation to every route.
- CSP permits scripts only with a per-request nonce, blocks inline event handlers, framing, plugins, and third-party network requests. Inline styles remain allowed because existing React components use style attributes; scripts do not use `unsafe-inline` or production `unsafe-eval`.
- JSON-LD uses one escaped `StructuredData` boundary. ESLint rejects other `dangerouslySetInnerHTML` use.
- URL-prefilled contact context and enquiry fields are normalized, stripped of control and bidirectional-formatting characters, and size-limited before a `mailto:` URI is created. HTML rendering remains React-escaped.
- External navigation suppresses referrers. The embedded Google map and remote footer artwork were removed, leaving no third-party script, iframe, CDN asset, or mixed-content request.
- Dependency versions are pinned and `package-lock.json` is committed. Production uses one `npm run build` path. Public production artifacts are checked for source maps, environment files, and workspace paths before release.

## Not applicable here

- Authentication cookies, token expiry, password autocomplete, CSRF, credentialed CORS, sensitive-page caching, uploads, CAPTCHA, and rate-limiting require a backend or corresponding feature. Add server-side validation and protection before any such feature is introduced.
- SRI is unnecessary while the site loads no scripts or styles from a CDN. Add integrity hashes before introducing a CDN asset.
- CSP reporting, WAF policy, continuous vulnerability scanning, and security-change retention are deployment operations. Configure them at the hosting account and review this file whenever a third-party integration or stateful feature is added.

## Release checks

Run `npm run check:security`, `npm run lint`, `npm run build`, and `npm audit`. Then probe the deployed homepage, a nested page, a redirect, a 404, and a static asset for the headers defined in `lib/security.mjs`. Inspect the browser Network, Application, and Console panels after major releases.

## Security-relevant changes

- 2026-08-27: Added transport and browser security policy, nonce-based CSP, safe JSON-LD serialization, bounded enquiry handling, dependency pinning, third-party embed removal, and automated release checks.
