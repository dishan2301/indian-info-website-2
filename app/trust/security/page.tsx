import type { Metadata } from 'next';
import Link from 'next/link';
import { StructuredData } from '@/components/structured-data';
import { absoluteUrl, createPageMetadata } from '@/lib/site';
import { PageHero } from '../../_components/page-hero';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';
import { websiteSecurityControls } from '../content';

export const metadata: Metadata = createPageMetadata({ title: 'Website Security Controls', description: 'The verified browser and transport protections applied to the Indian Infotech public website.', path: '/trust/security' });

export default function WebsiteSecurityPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'TechArticle', headline: 'Indian Infotech public website security controls', description: metadata.description, url: absoluteUrl('/trust/security'), dateModified: '2026-09-02', publisher: { '@type': 'Organization', name: 'Indian Infotech' } };
  return <main><SiteHeader /><StructuredData data={schema} /><PageHero eyebrow="Trust center · Published" title="Verified controls for this public website." description="These controls protect the browser-facing Indian Infotech website. They do not automatically describe device firmware, customer-hosted systems, cloud products, customer networks, or a specific deployment." marker="II / WEB SECURITY" breadcrumbs={[{ label: 'Trust center', href: '/trust' }, { label: 'Website security' }]} path="/trust/security" />
    <section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Implemented scope</p><h2>Controls that can be verified in the live response policy.</h2></div><p>Configuration is enforced by the website application. The security test suite checks that framing, object embedding, inline handlers, production evaluation, and unsafe content interpretation remain blocked.</p></div><div className="route-related-grid">{websiteSecurityControls.map((control) => <article key={control.title}><h3>{control.title}</h3><p>{control.value}</p></article>)}</div></section>
    <section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Boundary</p><h2>Procurement still requires a deployment review.</h2></div><p>Ask separately about product architecture, hosting, authentication, encryption, logging, backups, recovery, subprocessors, retention, vulnerability handling, incident notification, and support ownership for the selected configuration.</p></div><div className="hero-actions"><Link className="button button-primary" href="/contact?topic=security">Request security review <span aria-hidden="true">↗</span></Link><Link className="button outline-button" href="/trust/responsible-disclosure">Report a vulnerability</Link></div></section><SiteFooter /></main>;
}
