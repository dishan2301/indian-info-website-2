import type { Metadata } from 'next';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = createPageMetadata({
  title: 'Careers at Indian Infotech',
  description: 'Explore career opportunities at Indian Infotech across workforce software, access systems, engineering, and customer delivery.',
  path: '/careers',
});

const teams = [
  { title: 'Software & product', text: 'Shape workforce, attendance, HR, and workplace tools around the needs of real teams.' },
  { title: 'Hardware & engineering', text: 'Build and support access, identity, and entrance systems that work in demanding environments.' },
  { title: 'Customer delivery', text: 'Help organizations plan deployments, connect workflows, and get dependable support.' },
];

export default function CareersPage() {
  return <main><SiteHeader />
    <PageHero eyebrow="Careers" title="Do work that helps workplaces work better." description="Indian Infotech brings software, access systems, and practical on-site delivery together. If you care about useful technology and dependable customer outcomes, tell us where you could contribute." marker="II / CAREERS" path="/careers" />
    <section className="section">
      <div className="section-heading split-heading"><div><p className="section-kicker">Find your place</p><h2>Different skills. One connected workplace.</h2></div><p>Our work spans product thinking, engineering, implementation, and ongoing customer relationships. Share the strengths and experience you would bring.</p></div>
      <div className="route-card-grid">{teams.map((team, index) => <article className="route-card" key={team.title}><span>0{index + 1} · Career area</span><h2>{team.title}</h2><p>{team.text}</p></article>)}</div>
    </section>
    <section className="route-feature-band"><div><p className="section-kicker light">Start a conversation</p><h2>Tell us what you do best.</h2><p>Share your experience, the kind of work you are interested in, and your contact details. Our team can follow up about relevant opportunities.</p></div><Link className="button button-primary" href="/contact?topic=Careers">Share your interest <span aria-hidden="true">↗</span></Link></section>
    <SiteFooter />
  </main>;
}
