import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { RouteCardGrid } from '../_components/enterprise-route';
import { MotionReveal } from '../_components/motion-reveal';
import { industryProfiles } from '../content';
import { industryMedia } from '../route-media';
import styles from '../discovery-pages.module.css';

export const metadata: Metadata = createPageMetadata({ title: 'Industry Workforce & Access Solutions', description: 'Explore workforce, biometric attendance, access, visitor, and entrance solutions across priority industries.', path: '/industries' });

export default function IndustriesPage() { return <main className={`${styles.page} industries-page`}><SiteHeader /><PageHero eyebrow="Industries" title="Start with the place where your people work." description="A factory, office, campus, and hospital each work differently. Choose your kind of workplace to see the questions and systems worth planning first." marker="II / INDUSTRIES" /><section className="section industries-directory-section"><div className="section-heading split-heading"><div><p className="section-kicker">Choose a workplace</p><h2>See the everyday needs in your industry.</h2></div><p>These guides help your team start a useful conversation. The final setup is confirmed for your site.</p></div><MotionReveal><RouteCardGrid cards={industryProfiles.map((item) => ({ title: item.name, description: item.context, href: `/industries/${item.slug}`, eyebrow: 'Explore this workplace', image: industryMedia[item.slug]?.desktop, imageAlt: industryMedia[item.slug]?.alt }))} /></MotionReveal></section><SiteFooter /></main>; }
