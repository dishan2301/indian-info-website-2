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
  assert.match(hero, /quality=\{82\}/);
});

test('contact card does not introduce a second page heading', async () => {
  const source = await read('components/ui/contact-card.tsx');
  assert.doesNotMatch(source, /<h1/);
  assert.match(source, /<h2>\{title\}<\/h2>/);
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

test('customer proof stays permission-gated and sitemap dates remain current', async () => {
  const [homepage, proof, testimonials, sitemap, product] = await Promise.all([
    read('components/homepage/home-curated-sections.tsx'), read('app/proof-content.ts'), read('app/testimonials/page.tsx'),
    read('app/sitemap.ts'), read('app/products/[slug]/page.tsx'),
  ]);
  assert.equal((homepage.match(/quote: '/g) ?? []).length, 0);
  assert.match(proof, /approvedTestimonials: readonly Testimonial\[\] = \[\]/);
  assert.match(proof, /approvedCaseStudies: readonly CaseStudy\[\] = \[\]/);
  assert.match(testimonials, /No permission-backed named testimonial is published yet/);
  assert.match(sitemap, /['"]\/testimonials['"]/);
  assert.doesNotMatch(sitemap, /lastModified: new Date\(\)/);
  assert.match(sitemap, /lastModified: new Date\(item\.date\)/);
  assert.match(product, /model: product\.name/);
});

test('audit priorities stay visible and evidence-safe', async () => {
  const [homepage, profile, layout, contact, catalogue, insights, roi] = await Promise.all([
    read('components/homepage/home-curated-sections.tsx'), read('lib/company-profile.ts'), read('app/layout.tsx'), read('app/contact/page.tsx'),
    read('components/catalog/product-catalogue.tsx'), read('app/insights/content.ts'), read('components/resources/roi-calculator.tsx'),
  ]);
  assert.match(homepage, /useState\(value\)/);
  assert.match(homepage, /IntersectionObserver/);
  assert.match(homepage, /data-final-value/);
  for (const value of ['14', '12', '7', '2000']) assert.match(profile, new RegExp(`value: ${value}`));
  assert.match(layout, /floating-whatsapp/);
  assert.match(contact, /FAQPage/);
  for (const topic of ['cost', 'implementation take', 'existing HR or payroll']) assert.match(contact, new RegExp(topic, 'i'));
  assert.match(catalogue, /Side-by-side comparison/);
  assert.match(catalogue, /Compare up to three products/);
  assert.match(insights, /Biometric Attendance System Cost in India/);
  assert.match(roi, /Recoverable time \(%\)/);
  assert.match(roi, /not guaranteed cash savings/i);
  assert.match(roi, /Download summary/);
});
