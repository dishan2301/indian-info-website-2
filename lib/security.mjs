export const SECURITY_HEADERS = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Permissions-Policy': 'accelerometer=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
};

export function contentSecurityPolicy(nonce, production = process.env.NODE_ENV === 'production') {
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "connect-src 'self'",
    "font-src 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "frame-src 'none'",
    "img-src 'self' data: blob:",
    "manifest-src 'self'",
    "media-src 'self'",
    "object-src 'none'",
    `script-src 'nonce-${nonce}' 'strict-dynamic'${production ? '' : " 'unsafe-eval'"}`,
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline'",
    "worker-src 'self' blob:",
    ...(production ? ['upgrade-insecure-requests'] : []),
  ].join('; ');
}

const DISALLOWED_TEXT = /[\u0000-\u0009\u000B-\u001F\u007F-\u009F\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/gu;

export function sanitizeText(value, encodedLimit) {
  const normalized = String(value ?? '')
    .normalize('NFC')
    .replace(DISALLOWED_TEXT, ' ')
    .replace(/[ \t]+/gu, ' ')
    .trim();
  let output = '';
  let encodedLength = 0;
  for (const character of normalized) {
    const size = encodeURIComponent(character).length;
    if (encodedLength + size > encodedLimit) break;
    output += character;
    encodedLength += size;
  }
  return output;
}

export function sanitizeQueryValue(value, encodedLimit = 180) {
  return sanitizeText(Array.isArray(value) ? value.slice(0, 3).join(', ') : value, encodedLimit);
}

export const MAILTO_LIMITS = {
  enquiryType: 80,
  organization: 180,
  name: 150,
  phone: 80,
  sites: 240,
  workforce: 80,
  context: 500,
  requirements: 1200,
};

const MAILTO_LABELS = [
  ['enquiryType', 'Enquiry type'],
  ['organization', 'Organization'],
  ['name', 'Contact name'],
  ['phone', 'Telephone'],
  ['sites', 'Sites'],
  ['workforce', 'Workforce size'],
  ['context', 'Product or software context'],
  ['requirements', 'Requirements'],
];

export function createEnquiryMailto(values) {
  let truncated = false;
  const lines = MAILTO_LABELS.map(([field, label]) => {
    const raw = String(values[field] ?? '').trim();
    const safe = sanitizeText(raw, MAILTO_LIMITS[field]);
    truncated ||= safe !== raw.normalize('NFC').replace(DISALLOWED_TEXT, ' ').replace(/[ \t]+/gu, ' ').trim();
    return `${label}: ${safe || 'Not provided'}`;
  });
  const body = lines.join('\n');
  const href = `mailto:sales@indianinfotech.org?subject=${encodeURIComponent('Website solution enquiry')}&body=${encodeURIComponent(body)}`;
  return { href, truncated };
}

export function serializeStructuredData(value) {
  return JSON.stringify(value).replace(/[<>&\u2028\u2029]/gu, (character) => `\\u${character.charCodeAt(0).toString(16).padStart(4, '0')}`);
}
