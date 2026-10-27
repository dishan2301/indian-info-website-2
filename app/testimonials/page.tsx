import type { Metadata } from 'next';
import Image from 'next/image';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { getPublicTestimonials } from '@/lib/sanity/testimonials';

export const metadata: Metadata = createPageMetadata({ title: 'Customer Testimonials', description: 'Client quotes about Indian Infotech workforce, access, and workplace systems.', path: '/testimonials' });

export const dynamic = 'force-dynamic';

export default async function TestimonialsPage() {
  const clientQuotes = await getPublicTestimonials();
  return <main>
    <SiteHeader />
    <PageHero eyebrow="Customer testimonials" title="Feedback from teams we support." description="Explore every client quote shown on the Indian Infotech homepage in one dedicated page." marker="II / TESTIMONIALS" />
    <section className="section" aria-labelledby="client-quotes-title">
      <div className="section-heading"><p className="section-kicker">Client quotes</p><h2 id="client-quotes-title">All client feedback in one place.</h2></div>
      {clientQuotes.length ? <div className="home-quote-grid">{clientQuotes.map((item) => <blockquote key={item.companyName}><div>{item.logoUrl && <Image className="home-quote-logo" src={item.logoUrl} alt={`${item.companyName} logo`} width={120} height={48} />}</div><p>{item.quote}</p><cite>— {item.customerName}, {item.designation} · {item.companyName}</cite></blockquote>)}</div> : <p>No permission-backed named testimonials are currently published.</p>}
    </section>
    <SiteFooter />
  </main>;
}
