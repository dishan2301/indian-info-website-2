import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { insights } from './content';

export const metadata: Metadata = {
  title: 'News, Blogs & Insights | Indian Infotech',
  description: 'Indian Infotech company updates, workplace technology blogs, and practical guidance.',
  alternates: { canonical: '/insights' },
};

export default function InsightsPage() {
  return <main>
    <SiteHeader />
    <PageHero eyebrow="News & insights" title="Ideas for safer, clearer workplace operations." description="Company updates, product thinking, and practical articles about attendance, access, workforce systems, and connected facilities." marker="II / INSIGHTS" />
    <section className="section insights-index" aria-labelledby="latest-insights">
      <div className="section-heading split-heading"><div><p className="section-kicker">Latest articles</p><h2 id="latest-insights">From the Indian Infotech blog.</h2></div><p>Verified articles from Indian Infotech’s published library, presented with clearer technical and operating context.</p></div>
      <div className="insight-grid">{insights.map((article) => <article key={article.slug}>
        <Link className="insight-card-media" href={`/insights/${article.slug}`}><Image src={article.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" /></Link>
        <div><p>{article.category} · {article.date}</p><h2><Link href={`/insights/${article.slug}`}>{article.title}</Link></h2><span>{article.summary}</span><Link className="text-link" href={`/insights/${article.slug}`}>Read article ↗</Link></div>
      </article>)}</div>
    </section>
    <section className="insight-news-note"><p>Company news</p><h2>Verified updates belong here.</h2><span>New launches, partnerships, events, and company announcements will be added when publication details are approved.</span><Link href="/contact">Share an update with the web team ↗</Link></section>
    <SiteFooter />
  </main>;
}
