import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = { title: 'System Status | Indian Infotech', description: 'Indian Infotech service status and incident communication.', alternates: { canonical: '/status' } };
export default function StatusPage() { return <main><SiteHeader /><PageHero eyebrow="System status" title="Service communication should be easy to find." description="A public incident feed and historical uptime page will be connected here when service monitoring ownership and publishing workflow are enabled." marker="II / STATUS" /><section className="section"><div className="status-panel"><span className="status-dot" aria-hidden="true" /><div><p className="section-kicker">Current publication state</p><h2>Status feed not connected.</h2><p>No live availability claim is made on this page. For an active support issue, share product, site, version, and impact details.</p><Link className="button button-primary" href="/contact?topic=support">Report an issue <span aria-hidden="true">↗</span></Link></div></div></section><SiteFooter /></main>; }
