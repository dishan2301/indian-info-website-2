import {insights, type Insight} from '@/app/insights/content';
import {getPublishedInsights, getPublishedInsight, type SanityInsight} from '@/lib/sanity/content';

export type Article = {
  source: 'static' | 'sanity'; slug: string; title: string; summary: string;
  category: string; date: string; publishedAt: string; image?: string; imageAlt: string;
  author?: SanityInsight['author']; body?: unknown[]; seo?: SanityInsight['seo'];
  staticArticle?: Insight;
};
export type ArticleCard = Article;
export function canonicalSlug(slug: string) {
  try { return decodeURIComponent(slug).normalize('NFC').replace(/^\/+|\/+$/g, ''); } catch { return slug; }
}
export function isArticleSlug(slug: string) {
  return slug.length <= 200 && /^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u.test(slug);
}
export function articlePath(slug: string) { return `/insights/${encodeURIComponent(slug)}`; }
export function articleDate(value: string) {
  return new Date(value).toLocaleDateString('en-IN', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata'});
}
function normalizeSanity(item: SanityInsight, now: number): Article | null {
  const slug = canonicalSlug(item.slug || '');
  const time = Date.parse(item.publishedAt);
  if (!isArticleSlug(slug) || !Number.isFinite(time) || time > now || item._id.startsWith('drafts.') || item._id.startsWith('versions.') || !['blogPost', 'companyNews', 'researchArticle'].includes(item._type)) return null;
  return {source: 'sanity', slug, title: item.title?.trim() || 'Untitled article', summary: item.summary || '', category: item._type === 'companyNews' ? 'Company update' : item._type === 'researchArticle' ? 'Research article' : 'Blog', publishedAt: new Date(time).toISOString(), date: articleDate(item.publishedAt), image: item.mainImage?.asset?.url, imageAlt: item.mainImage?.alt || '', author: item.author, body: Array.isArray(item.body) ? item.body : [], seo: item.seo};
}
function normalizeStatic(item: Insight): Article {
  // Original publication dates are calendar dates; parse at UTC midnight deterministically.
  const publishedAt = new Date(`${item.date} 00:00:00 GMT`).toISOString();
  return {source: 'static', slug: item.slug, title: item.title, summary: item.summary, category: item.category, date: item.date, publishedAt, image: item.image, imageAlt: `Illustration for ${item.title}`, staticArticle: item};
}
// Original URLs retain their content. CMS ties resolve by newest publication, then ID.
export function mergeInsights(cms: SanityInsight[], now = Date.now()): Article[] {
  const articles = new Map<string, Article>();
  for (const item of [...cms].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt) || a._id.localeCompare(b._id))) {
    const article = normalizeSanity(item, now);
    if (article && !articles.has(article.slug)) articles.set(article.slug, article);
  }
  for (const item of insights) articles.set(item.slug, normalizeStatic(item));
  return [...articles.values()].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt) || a.slug.localeCompare(b.slug));
}
export async function getPublishedArticles(): Promise<Article[]> {
  // The Sanity adapter logs upstream errors and permits a static-only listing.
  return mergeInsights(await getPublishedInsights());
}
export async function getPublishedArticleBySlug(value: string): Promise<Article | null> {
  const slug = canonicalSlug(value);
  if (!isArticleSlug(slug)) return null;
  const original = insights.find(item => item.slug === slug);
  if (original) return normalizeStatic(original);
  // Service errors propagate: an outage must not become a cached "not found".
  const item = await getPublishedInsight(slug);
  return item ? normalizeSanity(item, Date.now()) : null;
}
export async function getLatestArticles(limit: number): Promise<Article[]> {
  return (await getPublishedArticles()).slice(0, Math.max(0, Math.floor(limit)));
}
export const getAllInsights = getPublishedArticles;
