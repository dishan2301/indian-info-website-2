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
