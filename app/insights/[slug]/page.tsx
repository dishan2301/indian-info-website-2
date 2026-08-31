import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '../../_components/page-hero';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';
import { insights } from '../content';

export function generateStaticParams() { return insights.map((article) => ({ slug: article.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = insights.find((item) => item.slug === slug);
  return article ? {
    title: `${article.title} | Indian Infotech`,
    description: article.summary,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: { title: article.title, description: article.summary, type: 'article', images: [article.image] },
    twitter: { card: 'summary_large_image', title: article.title, description: article.summary, images: [article.image] },
  } : {};
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = insights.find((item) => item.slug === slug);
  if (!article) notFound();
  return <main>
    <SiteHeader />
    <PageHero eyebrow={`${article.category} · ${article.date}`} title={article.title} description={article.summary} marker="II / ARTICLE" breadcrumbs={[{ label: 'News & insights', href: '/insights' }, { label: article.title }]} />
    <article className="insight-article">
      <div className="insight-article-image"><Image src={article.image} alt="" fill priority sizes="(max-width: 900px) 100vw, 72vw" /></div>
      <div className="insight-article-body">{article.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p>{section.points ? section.ordered ? <ol>{section.points.map((point) => <li key={point}>{point}</li>)}</ol> : <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul> : null}</section>)}
        {article.sourceUrl ? <aside><p>Original publication</p><span>This article is an edited overview. Read the original Indian Infotech publication for the complete source material.</span><a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">Read original article ↗</a></aside> : <aside><p>Work smarter with AI</p><span>Curious how AI could help your team work smarter?</span><Link href="/contact">Talk to Indian Infotech ↗</Link></aside>}
        <Link className="text-link" href="/insights">← All news & insights</Link>
      </div>
    </article>
    <SiteFooter />
  </main>;
}
