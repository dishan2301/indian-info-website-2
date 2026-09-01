import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { RouteCardGrid } from '../_components/enterprise-route';
import { industryProfiles } from '../content';

export const metadata: Metadata = createPageMetadata({ title: 'Industry Workforce & Access Solutions', description: 'Explore workforce, biometric attendance, access, visitor, and entrance solutions across priority industries.', path: '/industries' });

export default function IndustriesPage() { return <main><SiteHeader /><PageHero eyebrow="Industries" title="Different operating realities. One disciplined way to scope the system." description="Explore the workforce, entry, visitor, and workplace questions that shape a useful Indian Infotech recommendation." marker="II / INDUSTRIES" /><section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Industry context</p><h2>Begin with how the site actually works.</h2></div><p>These pages are planning guides, not generic industry claims. Product fit, compliance context, and outcomes are confirmed with the customer.</p></div><RouteCardGrid cards={industryProfiles.map((item) => ({ title: item.name, description: item.context, href: `/industries/${item.slug}`, eyebrow: 'Operating context' }))} /></section><SiteFooter /></main>; }
