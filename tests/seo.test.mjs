import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('commercial SEO inventory contains the 14 required unique routes', async () => {
  const source = await read('app/seo-landing-content.ts');
  const slugs = [...source.matchAll(/^    slug: '([^']+)',$/gm)].map((match) => match[1]);
  const required = [
    'biometric-attendance-system', 'face-recognition-attendance-system',
    'fingerprint-attendance-machine', 'attendance-management-software',
    'cloud-attendance-system', 'hrms-software', 'payroll-software',
    'workforce-management-software', 'access-control-system',
    'door-access-control-system', 'visitor-management-system',
    'entrance-control-system', 'canteen-management-system',
    'time-attendance-software',
  ];
  assert.deepEqual(slugs.sort(), required.sort());
  assert.equal(new Set(slugs).size, 14);
});

test('shared metadata emits canonical, social, and robots controls', async () => {
  const source = await read('lib/site.ts');
  for (const requirement of ['canonical:', 'openGraph:', 'twitter:', 'robots,']) {
    assert.match(source, new RegExp(requirement));
  }
});

test('production discovery and preview noindex controls are present', async () => {
  const [robots, sitemap, proxy] = await Promise.all([
    read('app/robots.ts'), read('app/sitemap.ts'), read('proxy.ts'),
  ]);
  assert.match(robots, /IS_INDEXABLE/);
  assert.match(robots, /sitemap/);
  assert.doesNotMatch(sitemap, /['"]\/search['"]/);
  assert.match(proxy, /X-Robots-Tag/);
  assert.match(proxy, /VERCEL_ENV/);
});

test('homepage has one semantic H1 and clear-image rendering remains enabled', async () => {
  const [page, styles, hero] = await Promise.all([read('app/page.tsx'), read('app/globals.css'), read('components/homepage/hero-poster-carousel.tsx')]);
  assert.equal((page.match(/<h1(?:\s|>)/g) ?? []).length, 1);
  assert.match(styles, /image-rendering:\s*auto/);
  assert.doesNotMatch(styles, /\.workforce-screen-card img\s*\{[^}]*filter:\s*blur/);
  assert.match(hero, /quality=\{90\}/);
});

test('removed animation dependency does not return', async () => {
  const [manifest, header] = await Promise.all([read('package.json'), read('app/_components/site-header.tsx')]);
  assert.doesNotMatch(manifest, /framer-motion/);
  assert.doesNotMatch(header, /framer-motion/);
});

test('solution builder produces an architecture and evidence-safe quote brief', async () => {
  const [builder, contact] = await Promise.all([read('components/solutions/solution-builder-form.tsx'), read('app/contact/page.tsx')]);
  assert.match(builder, /Generated architecture/);
  assert.match(builder, /Download summary/);
  assert.match(builder, /Request architecture &amp; quote/);
  assert.match(builder, /not a compatibility confirmation or price quote/);
  for (const field of ['solutions', 'workforce', 'locations', 'authentication', 'deployment']) assert.match(contact, new RegExp(`query\\.${field}`));
});

test('approved client quotes and sitemap dates remain current', async () => {
  const [homepage, sitemap, product] = await Promise.all([
    read('components/homepage/home-curated-sections.tsx'), read('app/sitemap.ts'), read('app/products/[slug]/page.tsx'),
  ]);
  assert.equal((homepage.match(/quote: '/g) ?? []).length, 4);
  for (const text of ['Smooth HRMS implementation', 'Strong technical expertise', 'HCP Pvt. Ltd.', 'Indbest Healthcare Pvt. Ltd.']) assert.match(homepage, new RegExp(text.replaceAll('.', '\\.')));
  assert.match(homepage, /Client’s Quote/);
  assert.match(homepage, /aria-label=\{`\$\{item\.mark\} logo`\}/);
  assert.doesNotMatch(sitemap, /lastModified: new Date\(\)/);
  assert.match(sitemap, /lastModified: new Date\(item\.date\)/);
  assert.match(product, /model: product\.name/);
});
