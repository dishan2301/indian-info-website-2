import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const files = {
  content: await readFile('lib/sanity/content.ts', 'utf8'),
  home: await readFile('app/page.tsx', 'utf8'),
  listing: await readFile('app/insights/page.tsx', 'utf8'),
  detail: await readFile('app/insights/[slug]/page.tsx', 'utf8'),
};

test('Sanity editorial reads use ISR and a shared invalidation tag', () => {
  assert.match(files.content, /revalidate:\s*SANITY_CONTENT_REVALIDATE_SECONDS/);
  assert.match(files.content, /tags:\s*\[SANITY_INSIGHTS_TAG\]/);
  assert.doesNotMatch(files.content, /cache:\s*['"]no-store['"]/);
});

test('Sanity fallback handling preserves Next control-flow errors', () => {
  assert.match(files.content, /unstable_rethrow\(error\)/);
});

test('all editorial surfaces use the shared Sanity helpers', () => {
  assert.match(files.home, /export const revalidate = 300/);
  assert.match(files.listing, /export const revalidate = 300/);
  assert.match(files.detail, /export const revalidate = 300/);
  assert.match(files.home, /getPublishedInsights\(\)/);
  assert.match(files.listing, /getPublishedInsights\(\)/);
  assert.equal((files.detail.match(/getPublishedInsight\(slug\)/g) || []).length, 2);
});

test('published-only and scheduled publishing filters remain in GROQ', async () => {
  const queries = await readFile('lib/sanity/queries.ts', 'utf8');
  assert.match(queries, /_type in \["blogPost", "companyNews", "researchArticle"\]/);
  assert.match(queries, /dateTime\(coalesce\(publishedAt, _createdAt\)\) <= dateTime\(now\(\)\)/);
});
