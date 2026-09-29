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
  assert.match(source, /image \? 'summary_large_image' : 'summary'/);
  assert.match(source, /images: image \? \[image\] : undefined/);
});

test('detail-page social images are record-specific or deliberately absent', async () => {
  const [products, insights, caseStudies, software, solutions, industries, hrms] = await Promise.all([
    read('app/products/[slug]/page.tsx'), read('app/insights/[slug]/page.tsx'), read('app/case-studies/[slug]/page.tsx'),
    read('app/software/[slug]/page.tsx'), read('app/solutions/[slug]/page.tsx'), read('app/industries/[slug]/page.tsx'), read('app/hrms-payroll/[slug]/page.tsx'),
  ]);
  assert.match(products, /image: product\.image \?\? null/);
  assert.match(insights, /image: article\.image/);
  assert.match(caseStudies, /image: item\.logo/);
  for (const source of [software, solutions, industries, hrms]) assert.match(source, /image: null/);
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
  assert.match(page, /<HeroPoster\s*\/>/);
  assert.equal((hero.match(/<h1(?:\s|>)/g) ?? []).length, 1);
  assert.match(styles, /image-rendering:\s*auto/);
  assert.doesNotMatch(styles, /\.workforce-screen-card img\s*\{[^}]*filter:\s*blur/);
  assert.match(hero, /quality=\{82\}/);
});

test('SEO landing page keywords are page-specific head metadata', async () => {
  const [content, page, helper] = await Promise.all([read('app/seo-landing-content.ts'), read('app/[seo]/page.tsx'), read('lib/site.ts')]);
  assert.equal((content.match(/^    slug: '/gm) ?? []).length, 14);
  assert.equal((content.match(/^    keywords: \[/gm) ?? []).length, 14);
  assert.match(page, /keywords: page\.keywords/);
  assert.match(helper, /keywords: keywords \?/);
});

test('sitemap company, partner, and solution pages are crawlable from site navigation', async () => {
  const footer = await read('components/ui/footer-01.tsx');
  for (const route of ['/company', '/partners', '/entrance-control-system', '/canteen-management-system']) {
    assert.ok(footer.includes(route), `missing internal footer link to ${route}`);
  }
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

test('approved customer proof remains empty and sitemap dates stay content-derived', async () => {
  const [proof, sitemap, product] = await Promise.all([
    read('app/proof-content.ts'), read('app/sitemap.ts'), read('app/products/[slug]/page.tsx'),
  ]);
  assert.match(proof, /approvedTestimonials: readonly Testimonial\[\] = \[\]/);
  assert.match(proof, /approvedCaseStudies: readonly CaseStudy\[\] = \[\]/);
  assert.match(sitemap, /['"]\/testimonials['"]/);
  assert.doesNotMatch(sitemap, /lastModified: new Date\(\)/);
  assert.match(sitemap, /lastModified: new Date\(item\.date\)/);
  assert.match(product, /model: product\.name/);
});

test('homepage and product decision support stay evidence-safe', async () => {
  const [homepage, profile, layout, contact, catalogue, roi] = await Promise.all([
    read('components/homepage/home-curated-sections.tsx'), read('lib/company-profile.ts'), read('app/layout.tsx'), read('app/contact/page.tsx'),
    read('components/catalog/product-catalogue.tsx'), read('components/resources/roi-calculator.tsx'),
  ]);
  assert.match(homepage, /useState\(value\)/);
  assert.match(homepage, /IntersectionObserver/);
  assert.match(homepage, /data-final-value/);
  assert.match(profile, /companyFoundedOn = new Date\(2011,/);
  assert.match(profile, /value: completedYearsSince\(new Date\(\)\)/);
  for (const value of ['12', '7', '2500']) assert.match(profile, new RegExp(`value: ${value}`));
  assert.match(layout, /floating-whatsapp/);
  assert.match(contact, /FAQPage/);
  for (const topic of ['cost', 'implementation take', 'existing HR or payroll']) assert.match(contact, new RegExp(topic, 'i'));
  assert.match(catalogue, /Side-by-side comparison/);
  assert.match(catalogue, /Compare up to three products/);
  assert.match(roi, /Recoverable time \(%\)/);
  assert.match(roi, /not guaranteed cash savings/i);
  assert.match(roi, /Download summary/);
});
