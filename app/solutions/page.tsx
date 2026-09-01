import type { Metadata } from 'next';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { RouteCardGrid } from '../_components/enterprise-route';
import { solutionProfiles } from '../content';

export const metadata: Metadata = createPageMetadata({ title: 'Workforce, Access & Workplace Solutions', description: 'Explore workforce, biometric attendance, access, entrance, visitor, and canteen operating solutions.', path: '/solutions' });

export default function SolutionsPage() {
  return <main><SiteHeader /><PageHero eyebrow="Solutions" title="Start with the operating problem, then connect the right system." description="Indian Infotech solutions bring together verified hardware, software, site conditions, and support ownership. Every recommendation is confirmed during solution design." marker="II / SOLUTIONS" />
    <section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Problem-led discovery</p><h2>From attendance events to managed entry.</h2></div><p>Choose a starting point for workforce, security, or workplace operations. We will confirm the product, software, and deployment fit with your team.</p></div><RouteCardGrid cards={solutionProfiles.map((item) => ({ title: item.name, description: item.summary, href: `/solutions/${item.slug}`, eyebrow: 'Operating solution' }))} /></section>
    <section className="route-feature-band"><div><p className="section-kicker light">Need a recommendation?</p><h2>Build a system around your people, locations, and entry conditions.</h2><p>Use the guided brief to share your context with a solution engineer.</p></div><Link className="button button-primary" href="/solution-builder">Build your solution <span aria-hidden="true">↗</span></Link></section>
    <SiteFooter /></main>;
}
