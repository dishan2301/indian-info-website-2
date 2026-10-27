import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {authorizedTestimonial, permissionDigest} from '../lib/testimonial-permission.mjs';

const item = {_id: 't1', quote: 'Exact words.', customerName: 'Customer', companyName: 'Company', designation: 'Director', photoUrl: 'https://cdn.sanity.io/photo', logoUrl: 'https://cdn.sanity.io/logo', publicDisplay: true, publicationStatus: 'published', permissionReference: 'private-ref', featured: true, displayOrder: 2};
const permission = {verified: true, status: 'verified', reference: 'private-ref', digest: permissionDigest(item), scope: ['website', 'quote', 'customerName', 'companyName', 'designation', 'photo', 'logo'], verifiedAt: '2025-01-01T00:00:00Z'};
const now = Date.parse('2026-01-01T00:00:00Z');
test('verified exact quote, identity and media display without private evidence', () => {
  const publicItem = authorizedTestimonial(item, permission, now);
  assert.equal(publicItem.quote, item.quote);
  assert.equal(publicItem.logoUrl, item.logoUrl);
  assert.equal(JSON.stringify(publicItem).includes('private-ref'), false);
});
test('missing, pending, revoked, expired and mismatched permission fail closed', () => {
  for (const decision of [null, {...permission, status: 'pending'}, {...permission, revokedAt: '2025-02-01'}, {...permission, expiresAt: '2025-12-31'}, {...permission, digest: 'wrong'}]) assert.equal(authorizedTestimonial(item, decision, now), null);
  assert.equal(authorizedTestimonial({...item, quote: 'Changed words.'}, permission, now), null);
  assert.equal(authorizedTestimonial({...item, publicationStatus: 'pending'}, permission, now), null);
  assert.equal(authorizedTestimonial({...item, publicDisplay: false}, permission, now), null);
});
test('unapproved media is hidden', () => {
  const result = authorizedTestimonial(item, {...permission, scope: permission.scope.filter((scope) => !['photo', 'logo'].includes(scope))}, now);
  assert.equal(result.photoUrl, null);
  assert.equal(result.logoUrl, null);
});
test('public pages use live service, webhook invalidates pages, responsive card CSS remains', () => {
  const service = readFileSync('lib/sanity/testimonials.ts', 'utf8');
  assert.match(service, /cache: 'no-store'/);
  assert.match(service, /return \[\]/);
  assert.doesNotMatch(service, /clientQuotes|approvedTestimonials/);
  const hook = readFileSync('app/api/sanity/revalidate/route.ts', 'utf8');
  assert.match(hook, /revalidatePath\('\/testimonials'\)/);
  assert.match(hook, /revalidatePath\('\/'\)/);
  const css = readFileSync('app/globals.css', 'utf8');
  assert.match(css, /@media[^\n]*max-width: 760px[\s\S]*?\.home-quote-slide/);
});
