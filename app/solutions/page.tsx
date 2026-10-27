import type { Metadata } from 'next';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { RouteCardGrid } from '../_components/enterprise-route';
import { MotionReveal } from '../_components/motion-reveal';
import { solutionProfiles } from '../content';
import { solutionMedia } from '../route-media';
import styles from '../discovery-pages.module.css';

export const metadata: Metadata = createPageMetadata({ title: 'Workforce, Access & Workplace Solutions', description: 'Explore workforce, biometric attendance, access, entrance, visitor, and canteen operating solutions.', path: '/solutions' });

export default function SolutionsPage() {
  return <main className={styles.page}><SiteHeader /><PageHero eyebrow="Solutions" title="Start with the operating problem, then connect the right system." description="Explore practical ways to manage attendance, visitors, workplace access, and daily operations. Each solution connects people, equipment, and software around a real task." marker="II / SOLUTIONS" />
    <section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Find a starting point</p><h2>What do you need to make easier?</h2></div><p>Pick the job you want to solve. We will help confirm which devices and software fit your site.</p></div><MotionReveal><RouteCardGrid cards={solutionProfiles.map((item) => ({ title: item.name, description: item.summary, href: `/solutions/${item.slug}`, eyebrow: 'Explore this need', image: solutionMedia[item.slug]?.desktop, imageAlt: solutionMedia[item.slug]?.alt }))} /></MotionReveal></section>
    <section className="route-feature-band"><div><p className="section-kicker light">Need a recommendation?</p><h2>Build a system around your people, locations, and entry conditions.</h2><p>Use the guided brief to share your context with a solution engineer.</p></div><Link className="button button-primary" href="/solution-builder">Build your solution <span aria-hidden="true">↗</span></Link></section>
    <SiteFooter /></main>;
}
