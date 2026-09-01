import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import test from 'node:test';
import { extname, join } from 'node:path';
import { contentSecurityPolicy, createEnquiryMailto, sanitizeQueryValue, serializeStructuredData, validateContactSubmission } from '../lib/security.mjs';

test('CSP forbids framing, objects, inline handlers, and eval in production', () => {
  const policy = contentSecurityPolicy('known-nonce', true);
  assert.match(policy, /script-src 'nonce-known-nonce' 'strict-dynamic'/);
  assert.match(policy, /frame-ancestors 'none'/);
  assert.match(policy, /object-src 'none'/);
  assert.match(policy, /script-src-attr 'none'/);
  assert.doesNotMatch(policy, /unsafe-eval/);
});

test('query and mailto values remove controls, bidi markers, and excess input', () => {
  assert.equal(sanitizeQueryValue(['safe\u202Eevil', 'second']), 'safe evil, second');
  const result = createEnquiryMailto({ organization: `Acme\u0000${'x'.repeat(500)}`, requirements: 'Need 🔒 access' });
  assert.ok(result.truncated);
  assert.ok(result.href.length < 3500);
  assert.doesNotMatch(decodeURIComponent(result.href), /\u0000|\u202E/);
});

test('structured data cannot close its script element', () => {
  const serialized = serializeStructuredData({ value: '</script><script>alert(1)</script>&\u2028' });
  assert.doesNotMatch(serialized, /<|>|&|\u2028/u);
  assert.deepEqual(JSON.parse(serialized), { value: '</script><script>alert(1)</script>&\u2028' });
});

test('contact submissions validate required fields and silently trap bots', () => {
  const valid = validateContactSubmission({ name: 'Asha Patel', email: 'asha@example.com', phone: '+91 98765 43210', message: 'Please share attendance options.' });
  assert.equal(valid.valid, true);
  assert.equal(valid.spam, false);
  const invalid = validateContactSubmission({ name: 'A', email: 'not-an-email', phone: '123', message: 'short' });
  assert.equal(invalid.valid, false);
  assert.equal(invalid.errors.length, 4);
  const bot = validateContactSubmission({ website: 'https://spam.example', name: '', email: '', phone: '', message: '' });
  assert.equal(bot.spam, true);
});

function filesWithin(root) {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    return entry.isDirectory() ? filesWithin(path) : [path];
  });
}

test('frontend source has no silent network-transmission sink', () => {
  const files = ['app', 'components', 'lib'].flatMap(filesWithin).filter((path) => ['.js', '.mjs', '.ts', '.tsx'].includes(extname(path)));
  const forbidden = [/\bfetch\s*\(/u, /\bXMLHttpRequest\b/u, /\bsendBeacon\b/u, /\bWebSocket\s*\(/u, /<form[^>]+action=/u];
  for (const path of files) {
    if (path === 'components/contact/enquiry-brief.tsx') continue;
    const source = readFileSync(path, 'utf8');
    for (const pattern of forbidden) assert.doesNotMatch(source, pattern, `${path} introduced browser data egress`);
  }
  assert.match(readFileSync('components/contact/enquiry-brief.tsx', 'utf8'), /fetch\("https:\/\/formsubmit\.co\/ajax\/chaudharydishan90@gmail\.com"/u);
});

test('public build contains no source maps, environment files, or workspace paths', { skip: !existsSync('dist/client') }, () => {
  const files = filesWithin('dist/client');
  assert.equal(files.some((path) => path.endsWith('.map') || /(^|\/)\.env(?:\.|$)|(^|\/)\.git(?:\/|$)/u.test(path)), false);
  for (const path of files.filter((path) => ['.css', '.html', '.js', '.json'].includes(extname(path)))) {
    assert.doesNotMatch(readFileSync(path, 'utf8'), /\/home\/dishan|\.env\.local/u, `${path} leaked a local path`);
  }
});
