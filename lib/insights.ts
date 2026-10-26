import { insights } from '@/app/insights/content';
import { getPublishedInsights, type SanityInsight } from '@/lib/sanity/content';

export type ArticleCard = { slug: string; title: string; summary: string; category: string; date: string; publishedAt: string; image?: string; imageAlt: string };
export function canonicalSlug(slug: string) {
  try { return decodeURIComponent(slug).normalize('NFC').replace(/^\/+|\/+$/g, ''); } catch { return slug; }
}

// Original URLs always retain their original content. CMS collisions are resolved by newest date, then ID.
export function mergeInsights(cms: SanityInsight[], now = Date.now()): ArticleCard[] {
  const articles = new Map<string, ArticleCard>();
  for (const item of [...cms].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt) || a._id.localeCompare(b._id))) {
    const slug = canonicalSlug(item.slug || '');
    const time = Date.parse(item.publishedAt);
    if (!slug || !Number.isFinite(time) || time > now || item._id.startsWith('drafts.') || articles.has(slug)) continue;
    articles.set(slug, { slug, title: item.title, summary: item.summary, category: item._type === 'companyNews' ? 'Company update' : item._type === 'researchArticle' ? 'Research article' : 'Blog', publishedAt: new Date(time).toISOString(), date: new Date(time).toLocaleDateString('en-IN', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'}), image: item.mainImage?.asset?.url, imageAlt: item.mainImage?.alt || '' });
  }
  for (const item of insights) articles.set(canonicalSlug(item.slug), { ...item, publishedAt: new Date(item.date).toISOString(), imageAlt: `Illustration for ${item.title}` });
  return [...articles.values()].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt) || a.slug.localeCompare(b.slug));
}

export async function getAllInsights(): Promise<ArticleCard[]> {
  try { return mergeInsights(await getPublishedInsights()); }
  catch { return mergeInsights([]); }
}
