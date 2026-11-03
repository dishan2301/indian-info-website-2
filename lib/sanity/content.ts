import {sanityClient, sanityConfigured} from './client'
import {publishedInsightQuery, publishedInsightsQuery} from './queries'
import {unstable_rethrow} from 'next/navigation'

export const SANITY_CONTENT_REVALIDATE_SECONDS = 300
export const SANITY_INSIGHTS_TAG = 'sanity:insights'

const sanityContentFetchOptions = {
  next: {
    revalidate: SANITY_CONTENT_REVALIDATE_SECONDS,
    tags: [SANITY_INSIGHTS_TAG],
  },
}

export type SanityInsight = { _id: string; _type: string; title: string; slug: string; summary: string; publishedAt: string; featured?: boolean; mainImage?: {asset?: {url?: string}; alt?: string}; author?: {name?: string; role?: string}; body?: unknown[]; seo?: {title?: string; description?: string; noIndex?: boolean} }

export async function getPublishedInsights(): Promise<SanityInsight[]> {
  if (!sanityConfigured) return []
  try { return await sanityClient.fetch<SanityInsight[]>(publishedInsightsQuery, {}, sanityContentFetchOptions) } catch (error) { unstable_rethrow(error); console.error('Sanity editorial listing failed', error); return [] }
}

export async function getPublishedInsight(slug: string): Promise<SanityInsight | null> {
  if (!sanityConfigured) return null
  try { return await sanityClient.fetch<SanityInsight | null>(publishedInsightQuery, {slug}, sanityContentFetchOptions) } catch (error) { unstable_rethrow(error); console.error('Sanity editorial detail failed', error); return null }
}
