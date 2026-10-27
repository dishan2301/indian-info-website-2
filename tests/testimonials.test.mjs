import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {approvalDigest, authorizedTestimonial} from '../lib/testimonial-permission.mjs';

const item = {_id: 't1', quote: 'Exact words.', customerName: 'Customer', companyName: 'Company', designation: 'Director', photoRef: 'image-photo', logoRef: 'image-logo', photoUrl: 'https://cdn.sanity.io/photo', logoUrl: 'https://cdn.sanity.io/logo', publicDisplay: true, publicationStatus: 'published', permissionStatus: 'verified', permissionReference: 'opaque-ref', featured: true, displayOrder: 2};
const approval = {status: 'confirmed', confirmedBy: 'authorized-editor', reference: 'opaque-ref', digest: approvalDigest(item), scope: ['website', 'quote', 'customerName', 'companyName', 'designation', 'photo', 'logo'], confirmedAt: '2025-01-01T00:00:00Z'};
const now = Date.parse('2026-01-01T00:00:00Z');
const approved = {...item, approval};

test('publishing a confirmed exact quote and media returns public fields only', () => {
  const result = authorizedTestimonial(approved, now);
  assert.equal(result.quote, item.quote);
  assert.equal(result.logoUrl, item.logoUrl);
  assert.equal(JSON.stringify(result).includes('opaque-ref'), false);
  assert.equal(JSON.stringify(result).includes('authorized-editor'), false);
});
test('draft, unpublish, delete and revocation remove public content', () => {
  for (const change of [{publicationStatus: 'pending'}, {publicationStatus: 'unpublished'}, {publicDisplay: false}, {revocationDate: '2025-05-01'}, {permissionStatus: 'revoked'}]) assert.equal(authorizedTestimonial({...approved, ...change}, now), null);
  assert.equal(authorizedTestimonial(null, now), null);
});
test('missing, pending, expired and changed approval fail closed', () => {
  for (const change of [{approval: null}, {approval: {...approval, status: 'pending'}}, {approval: {...approval, expiresAt: '2025-12-31'}}, {quote: 'Edited quote'}, {companyName: 'Edited company'}, {logoRef: 'different-logo'}, {permissionReference: 'different-ref'}]) assert.equal(authorizedTestimonial({...approved, ...change}, now), null);
});
test('unapproved photo and logo are hidden; display order can change without reapproval', () => {
  const result = authorizedTestimonial({...approved, displayOrder: 1, approval: {...approval, scope: approval.scope.filter((scope) => !['photo', 'logo'].includes(scope))}}, now);
  assert.equal(result.displayOrder, 1);
  assert.equal(result.photoUrl, null);
  assert.equal(result.logoUrl, null);
});
test('shared service has 60-second fallback; signed webhook invalidates both routes', () => {
  const service = readFileSync('lib/sanity/testimonials.ts', 'utf8');
  assert.match(service, /revalidate: 60/);
  assert.doesNotMatch(service, /TESTIMONIAL_PERMISSION_URL|clientQuotes|approvedTestimonials/);
  for (const path of ['app/page.tsx', 'app/testimonials/page.tsx']) assert.match(readFileSync(path, 'utf8'), /getPublicTestimonials/);
  const hook = readFileSync('app/api/sanity/revalidate/route.ts', 'utf8');
  assert.match(hook, /revalidateTag\('sanity:testimonials'/);
  assert.match(hook, /revalidatePath\('\/testimonials'\)/);
  assert.match(hook, /revalidatePath\('\/'\)/);
  assert.match(readFileSync('app/globals.css', 'utf8'), /@media[^\n]*max-width: 760px[\s\S]*?\.home-quote-slide/);
});
