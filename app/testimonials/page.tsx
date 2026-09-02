import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { approvedTestimonials, evidenceQueue } from '../proof-content';

export const metadata: Metadata = createPageMetadata({ title: 'Customer Testimonials', description: 'Named, permission-backed customer testimonials for Indian Infotech workforce and access systems.', path: '/testimonials' });

export default function TestimonialsPage() {
  const requirement = evidenceQueue.find((item) => item.id === 'testimonials');
  return <main>
    <SiteHeader />
    <PageHero eyebrow="Customer testimonials" title="Attribution and permission come before publication." description="Every published testimonial must identify the person, role, company, relevant system, and result context, with a photo or approved company logo." marker="II / TESTIMONIALS" />
    <section className="section">
      {approvedTestimonials.length ? <div className="home-quote-grid">{approvedTestimonials.map((item) => <blockquote key={item.id}><div>{item.photo ? <Image src={item.photo} alt={`${item.person}, ${item.title} at ${item.company}`} width={96} height={96} /> : <Image src={item.logo} alt={`${item.company} logo`} width={120} height={48} />}</div><p>{item.quote}</p><cite>— {item.person}, {item.title}, {item.company}</cite><small>{item.industry} · {item.product}</small></blockquote>)}</div> : <div className="proof-evidence-queue"><span>TESTIMONIALS / EVIDENCE QUEUE</span><h2>No permission-backed named testimonial is published yet.</h2><p>{requirement?.requirement}. Owner: {requirement?.owner}.</p><Link className="button button-primary" href="/contact?topic=testimonial-evidence">Submit approved testimonial evidence <span aria-hidden="true">↗</span></Link></div>}
    </section>
    <SiteFooter />
  </main>;
}
