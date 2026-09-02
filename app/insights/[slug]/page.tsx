import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StructuredData } from '@/components/structured-data';
import { absoluteUrl, createPageMetadata } from '@/lib/site';
import { PageHero } from '../../_components/page-hero';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';
import { insights } from '../content';

export function generateStaticParams() { return insights.map((article) => ({ slug: article.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = insights.find((item) => item.slug === slug);
  return article ? createPageMetadata({ title: article.title, description: article.summary, path: `/insights/${article.slug}`, image: article.image, type: 'article' }) : {};
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = insights.find((item) => item.slug === slug);
  if (!article) notFound();
  const related = insights.filter((item) => item.slug !== article.slug).slice(0, 3);
  const datePublished = new Date(article.date).toISOString().slice(0, 10);
  const articleSchema = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: article.title, description: article.summary, image: absoluteUrl(article.image), datePublished, dateModified: datePublished, mainEntityOfPage: absoluteUrl(`/insights/${article.slug}`), author: { '@type': 'Organization', name: 'Indian Infotech Editorial Team', url: absoluteUrl('/about-us') }, publisher: { '@type': 'Organization', name: 'Indian Infotech', logo: { '@type': 'ImageObject', url: absoluteUrl('/indian-infotech-logo.png') } } };
  return <main>
    <SiteHeader />
    <StructuredData data={articleSchema} />
    <PageHero eyebrow={`${article.category} · ${article.date}`} title={article.title} description={article.summary} marker="II / ARTICLE" breadcrumbs={[{ label: 'News & insights', href: '/insights' }, { label: article.title }]} path={`/insights/${article.slug}`} />
    <article className="insight-article">
      <div className="insight-article-image"><Image src={article.image} alt={`Illustration for ${article.title}`} fill priority sizes="(max-width: 900px) 100vw, 72vw" /></div>
      <div className="insight-article-body"><p className="insight-byline">By Indian Infotech Editorial Team · Published {article.date}</p>{article.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p>{section.points ? section.ordered ? <ol>{section.points.map((point) => <li key={point}>{point}</li>)}</ol> : <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul> : null}</section>)}
        {article.sourceUrl ? <aside><p>Original publication</p><span>This article is an edited overview. Read the original Indian Infotech publication for the complete source material.</span><a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">Read original article ↗</a></aside> : <aside><p>Work smarter with AI</p><span>Curious how AI could help your team work smarter?</span><Link href="/contact">Talk to Indian Infotech ↗</Link></aside>}
        <section aria-labelledby="related-insights-title"><h2 id="related-insights-title">Related insights</h2><div className="route-link-list">{related.map((item) => <Link href={`/insights/${item.slug}`} key={item.slug}>{item.title}<span aria-hidden="true">↗</span></Link>)}</div></section>
        <Link className="text-link" href="/insights">← All news & insights</Link>
      </div>
    </article>
    <SiteFooter />
  </main>;
}
