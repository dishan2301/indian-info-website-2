import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import test from 'node:test';
import { legacyRoutes } from '../lib/legacy-routes.mjs';

function filesWithin(root) {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    return entry.isDirectory() ? filesWithin(path) : [path];
  });
}

test('legacy redirect contract is unique, permanent, relevant, and chain-free', () => {
  const sources = legacyRoutes.map((item) => item.source);
  assert.equal(new Set(sources).size, sources.length);
  assert.ok(legacyRoutes.length >= 28);
  for (const item of legacyRoutes) {
    assert.match(item.source, /^\//);
    assert.match(item.destination, /^\//);
    assert.notEqual(item.source, item.destination);
    assert.notEqual(item.destination, '/');
    assert.ok(['direct', 'closest-relevant'].includes(item.equivalence));
    assert.equal(sources.includes(item.destination.split('#')[0]), false, `${item.source} creates a redirect chain`);
  }
  const proxy = readFileSync('proxy.ts', 'utf8');
  assert.match(proxy, /legacyRedirectMap/);
  assert.match(proxy, /legacyDestination[^\n]+NextResponse\.redirect\([^\n]+, 301\)/);
});

test('approved public statistics have one provenance-aware source', () => {
  const claims = readFileSync('lib/company-profile.ts', 'utf8');
  for (const value of [14, 12, 7, 2000]) assert.match(claims, new RegExp(`value: ${value}`));
  for (const field of ['source:', 'owner:', 'status:', 'verifiedOn:']) assert.match(claims, new RegExp(field));
  const homepage = readFileSync('components/homepage/home-curated-sections.tsx', 'utf8');
  assert.match(homepage, /companyStats\.map/);
  assert.match(homepage, /IntersectionObserver/);
  assert.match(homepage, /data-final-value/);
});

test('proof publication types require attribution, outcomes, and permission', () => {
  const proof = readFileSync('app/proof-content.ts', 'utf8');
  for (const field of ['person:', 'title:', 'company:', 'permissionReference:', "evidenceStatus: 'approved'", 'problem:', 'solution:', 'deployment:', 'outcome:']) assert.match(proof, new RegExp(field.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(readFileSync('app/testimonials/page.tsx', 'utf8'), /No permission-backed named testimonial/);
  assert.match(readFileSync('app/case-studies/page.tsx', 'utf8'), /No approved deployment stories/);
});

test('resource and launch artifacts are present', () => {
  const brochure = 'public/indian-infotech-company-brochure.pdf';
  assert.ok(existsSync(brochure));
  assert.ok(statSync(brochure).size > 10_000);
  assert.match(readFileSync('CONTENT_GOVERNANCE.md', 'utf8'), /Publish two evidence-reviewed posts each month/);
  const runbook = readFileSync('CUTOVER_RUNBOOK.md', 'utf8');
  for (const item of ['Search Console', 'Bing Webmaster', 'Google Business Profile', 'MX', 'rollback', 'Daily for two weeks']) assert.match(runbook, new RegExp(item, 'i'));
});

test('live source has no stale Vercel form URL or insecure asset URL', () => {
  const files = ['app', 'components', 'lib'].flatMap(filesWithin).filter((path) => ['.js', '.mjs', '.ts', '.tsx'].includes(extname(path)));
  for (const path of files) {
    const source = readFileSync(path, 'utf8');
    assert.doesNotMatch(source, /indian-info-website-2\.vercel\.app/);
    assert.doesNotMatch(source, /["'`]http:\/\//);
  }
});

test('fill images declare responsive sizes', () => {
  const files = ['app', 'components'].flatMap(filesWithin).filter((path) => ['.ts', '.tsx'].includes(extname(path)));
  for (const path of files) {
    const source = readFileSync(path, 'utf8');
    for (const tag of source.match(/<Image\b[\s\S]*?\/>/g) ?? []) {
      if (/\sfill(?:\s|=)/.test(tag)) assert.match(tag, /\ssizes=/, `${path} has a fill image without sizes`);
    }
  }
});

test('technical buyers can download specifications and use tender guidance', () => {
  const specification = readFileSync('app/products/[slug]/specification/route.ts', 'utf8');
  assert.match(specification, /Content-Disposition/);
  assert.match(specification, /currently published catalogue information/);
  const product = readFileSync('app/products/[slug]/page.tsx', 'utf8');
  assert.match(product, /Download summary/);
  const procurement = readFileSync('app/resources/procurement/page.tsx', 'utf8');
  for (const item of ['Operating scope', 'Functional requirements', 'Integration requirements', 'Commercial response', 'Evaluation method']) assert.match(procurement, new RegExp(item));
  assert.match(readFileSync('app/sitemap.ts', 'utf8'), /\/resources\/procurement/);
  const developers = readFileSync('app/developers/page.tsx', 'utf8');
  assert.doesNotMatch(developers, /noIndex/);
  for (const item of ['Discover', 'Design', 'Prove', 'Operate', 'Public endpoint documentation is pending approval']) assert.match(developers, new RegExp(item));
});

test('phase-five polish keeps navigation accessible and defers offscreen work', () => {
  const layout = readFileSync('app/layout.tsx', 'utf8');
  assert.match(layout, /id="main-content" tabIndex=\{-1\}/);
  const header = readFileSync('app/_components/site-header.tsx', 'utf8');
  assert.doesNotMatch(header, /role="toolbar"/);
  assert.match(header, /aria-label="Navigation menu"/);
  const hero = readFileSync('components/homepage/hero-poster-carousel.tsx', 'utf8');
  assert.match(hero, /activePanel === index/);
  assert.match(hero, /quality=\{82\}/);
  const styles = readFileSync('app/globals.css', 'utf8');
  assert.match(styles, /content-visibility:\s*auto/);
  assert.match(styles, /safe-area-inset-bottom/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
});

test('brochure-backed software facts have one display and download source', () => {
  const content = readFileSync('app/content.ts', 'utf8');
  for (const value of ['Up to 3 metres', 'Up to 10,000 templates', 'Less than one second', '60+ functional MIS reports', 'ERP, payroll, and SAP']) assert.match(content, new RegExp(value.replace(/[+]/g, '\\+')));
  assert.match(content, /evidenceSource:/);
  const page = readFileSync('app/software/[slug]/page.tsx', 'utf8');
  assert.match(page, /software\.publishedFacts\.map/);
  assert.match(page, /featureList:/);
  const download = readFileSync('app/software/[slug]/specification/route.ts', 'utf8');
  assert.match(download, /Content-Disposition/);
  assert.match(download, /Confirm the exact software version/);
});

test('trust center publishes an evidence register without inventing certifications', () => {
  const evidence = readFileSync('app/trust/content.ts', 'utf8');
  for (const status of ['Published', 'Request review', 'Awaiting approved source', 'Not connected']) assert.match(evidence, new RegExp(status));
  for (const owner of ['Website operations', 'Support', 'Quality', 'Engineering']) assert.match(evidence, new RegExp(owner));
  const trust = readFileSync('app/trust/page.tsx', 'utf8');
  assert.match(trust, /trustEvidence\.map/);
  assert.match(trust, /ItemList/);
  const security = readFileSync('app/trust/security/page.tsx', 'utf8');
  for (const control of ['Transport security', 'Content execution', 'Framing protection', 'Browser capabilities']) assert.match(evidence, new RegExp(control));
  assert.match(security, /do not automatically describe/i);
  const disclosure = readFileSync('app/trust/responsible-disclosure/page.tsx', 'utf8');
  assert.match(disclosure, /does not promise a response or remediation deadline/i);
  assert.match(disclosure, /companyProfile\.supportEmail/);
});
