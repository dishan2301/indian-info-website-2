import {sanityClient, sanityConfigured} from './client';
import {publishedInsightQuery, publishedInsightsQuery} from './queries';
import {EDITORIAL_TAG, EDITORIAL_REVALIDATE_SECONDS, editorialSlugTag} from './cache';

export type SanityInsight = { _id: string; _type: string; title?: string; slug: string; summary?: string; publishedAt: string; featured?: boolean; mainImage?: {asset?: {url?: string}; alt?: string}; author?: {name?: string; role?: string}; body?: unknown[]; seo?: {title?: string; description?: string; noIndex?: boolean} };

export class SanityContentError extends Error {
  constructor() { super('Editorial content is temporarily unavailable'); this.name = 'SanityContentError'; }
}
function logFailure(operation: string, error: unknown) {
  // Do not log request headers, tokens, payloads, or upstream response bodies.
  const statusCode = error && typeof error === 'object' && 'statusCode' in error ? error.statusCode : undefined;
  console.error('Sanity editorial fetch failed', {operation, statusCode});
}

export async function getPublishedInsights(): Promise<SanityInsight[]> {
  if (!sanityConfigured) { console.error('Sanity editorial configuration is missing'); return []; }
  try {
    return await sanityClient.fetch<SanityInsight[]>(publishedInsightsQuery, {}, {next: {revalidate: EDITORIAL_REVALIDATE_SECONDS, tags: [EDITORIAL_TAG]}});
  } catch (error) { logFailure('listing', error); return []; }
}

export async function getPublishedInsight(slug: string): Promise<SanityInsight | null> {
  if (!sanityConfigured) { console.error('Sanity editorial configuration is missing'); throw new SanityContentError(); }
  try {
    return await sanityClient.fetch<SanityInsight | null>(publishedInsightQuery, {slug}, {next: {revalidate: EDITORIAL_REVALIDATE_SECONDS, tags: [EDITORIAL_TAG, editorialSlugTag(slug)]}});
  } catch (error) { logFailure('detail', error); throw new SanityContentError(); }
}
