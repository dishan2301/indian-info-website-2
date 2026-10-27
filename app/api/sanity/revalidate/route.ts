import {revalidatePath, revalidateTag} from 'next/cache';
import {isValidSignature, SIGNATURE_HEADER_NAME} from '@sanity/webhook';
import {setTimeout as delay} from 'node:timers/promises';
import {articlePath, canonicalSlug, isArticleSlug} from '@/lib/insights';
import {EDITORIAL_TAG, editorialSlugTag} from '@/lib/sanity/cache';

export const runtime = 'nodejs';
const allowedTypes = new Set(['blogPost', 'companyNews', 'researchArticle', 'author', 'category', 'testimonial']);
const allowedOperations = new Set(['create', 'update', 'delete', 'publish', 'unpublish']);
const maxBytes = 16_384;
function json(body: object, status = 200) {
  return Response.json(body, {status, headers: {'Cache-Control': 'no-store'}});
}
async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return '';
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) { await reader.cancel(); return null; }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return Buffer.concat(chunks).toString('utf8');
}
export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) { console.error('Sanity revalidation secret is not configured'); return json({error: 'Revalidation unavailable'}, 503); }
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  if (!signature) return json({error: 'Invalid signature'}, 401);
  const body = await readBody(request);
  if (body === null) return json({error: 'Payload too large'}, 413);
  let valid = false;
  try { valid = await isValidSignature(body, signature, secret); } catch { /* Malformed signatures are unauthorized. */ }
  if (!valid) return json({error: 'Invalid signature'}, 401);

  let payload;
  try { payload = JSON.parse(body); } catch { return json({error: 'Invalid JSON'}, 400); }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload) || !allowedTypes.has(payload._type) || !allowedOperations.has(payload.operation) || typeof payload._id !== 'string') return json({error: 'Invalid event'}, 400);
  if (payload.projectId !== (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rmgfsayz') || payload.dataset !== (process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')) return json({error: 'Unexpected project or dataset'}, 400);
  if (payload._id.startsWith('drafts.') || payload._id.startsWith('versions.')) return json({ignored: true});

  const slugs = new Set<string>();
  if (!['author', 'category', 'testimonial'].includes(payload._type)) {
    for (const value of [payload.beforeSlug, payload.afterSlug]) {
      if (value === null || value === undefined) continue;
      if (typeof value !== 'string' || !isArticleSlug(canonicalSlug(value))) return json({error: 'Invalid slug'}, 400);
      slugs.add(canonicalSlug(value));
    }
  }
  try {
    // Sanity's official webhook helper waits 3s for Content Lake consistency too.
    // Fetches use the live API, so a lagging CDN cannot refill the expired cache.
    await delay(3000);
    revalidateTag(EDITORIAL_TAG, {expire: 0});
    for (const slug of slugs) revalidateTag(editorialSlugTag(slug), {expire: 0});
    revalidatePath('/');
    if (payload._type === 'testimonial') revalidatePath('/testimonials');
    revalidatePath('/insights');
    // Includes related articles, author edits, category edits, and cached 404s.
    revalidatePath('/insights/[slug]', 'page');
    for (const slug of slugs) revalidatePath(articlePath(slug));
    console.info('Sanity editorial revalidation completed', {type: payload._type, operation: payload.operation, slugCount: slugs.size});
    return json({revalidated: true});
  } catch {
    console.error('Sanity editorial cache invalidation failed');
    return json({error: 'Revalidation failed'}, 500);
  }
}
