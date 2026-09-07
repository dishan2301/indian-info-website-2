import type { Metadata } from 'next';
import Image from 'next/image';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { clientQuotes } from '../content';

export const metadata: Metadata = createPageMetadata({ title: 'Customer Testimonials', description: 'Client quotes about Indian Infotech workforce, access, and workplace systems.', path: '/testimonials' });

export default function TestimonialsPage() {
  return <main>
    <SiteHeader />
    <PageHero eyebrow="Customer testimonials" title="Feedback from teams we support." description="Explore every client quote shown on the Indian Infotech homepage in one dedicated page." marker="II / TESTIMONIALS" />
    <section className="section" aria-labelledby="client-quotes-title">
      <div className="section-heading"><p className="section-kicker">Client quotes</p><h2 id="client-quotes-title">All client feedback in one place.</h2></div>
      <div className="home-quote-grid">{clientQuotes.map((item) => <blockquote key={item.company}><div><Image className="home-quote-logo" src={item.logo} alt={`${item.company} logo`} width={120} height={48} /></div><p>{item.quote}</p><cite>— {item.company}</cite></blockquote>)}</div>
    </section>
    <SiteFooter />
  </main>;
}
