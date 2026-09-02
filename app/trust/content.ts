export type TrustEvidenceStatus = 'Published' | 'Request review' | 'Awaiting approved source' | 'Not connected';

export const trustEvidence = [
  { title: 'Public website security controls', status: 'Published', owner: 'Website operations', evidence: 'Live security-header policy and implementation scope', href: '/trust/security' },
  { title: 'Privacy notice', status: 'Published', owner: 'Indian Infotech', evidence: 'Website information-handling notice', href: '/privacy' },
  { title: 'Cookie notice', status: 'Published', owner: 'Website operations', evidence: 'Current and optional measurement behavior', href: '/cookies' },
  { title: 'Vulnerability reporting', status: 'Published', owner: 'Support', evidence: 'Public reporting route and submission guidance', href: '/trust/responsible-disclosure' },
  { title: 'ISO 9001 certificate', status: 'Awaiting approved source', owner: 'Quality', evidence: 'Current certificate PDF, scope, issuer, number, issue date, and expiry required', href: '/certification' },
  { title: 'Corporate quality policy', status: 'Awaiting approved source', owner: 'Quality', evidence: 'Approved policy, version, effective date, review date, and approver required', href: '/trust/quality-policy' },
  { title: 'Product and cloud security dossier', status: 'Request review', owner: 'Engineering', evidence: 'Deployment-specific architecture, controls, hosting, subprocessors, and recovery evidence', href: '/contact?topic=security' },
  { title: 'Public service availability monitor', status: 'Not connected', owner: 'Support', evidence: 'Uptime monitor, incident owner, update process, and historical feed required', href: '/support' },
] as const satisfies readonly { title: string; status: TrustEvidenceStatus; owner: string; evidence: string; href: string }[];

export const websiteSecurityControls = [
  { title: 'Transport security', value: 'HTTPS upgrade and HTTP Strict Transport Security for two years, including subdomains' },
  { title: 'Content execution', value: 'Nonce-based Content Security Policy; inline event handlers, object embedding, and production eval are blocked' },
  { title: 'Framing protection', value: 'Frame ancestors are blocked and X-Frame-Options is DENY' },
  { title: 'Browser capabilities', value: 'Camera, microphone, geolocation, payment, USB, and other unused capabilities are disabled' },
  { title: 'Content interpretation', value: 'MIME sniffing is disabled with X-Content-Type-Options' },
  { title: 'Referrer handling', value: 'Cross-site referrer detail is limited by strict-origin-when-cross-origin' },
] as const;
