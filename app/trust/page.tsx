import type { Metadata } from 'next';
import Link from 'next/link';
import { StructuredData } from '@/components/structured-data';
import { absoluteUrl, createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { trustEvidence } from './content';

export const metadata: Metadata = createPageMetadata({ title: 'Security & Trust Center', description: 'Security, privacy, availability, certification, and compliance evidence for Indian Infotech systems.', path: '/trust' });

const practices = [
  { title: 'Data handling', text: 'Define data categories, purpose, source of truth, authorized roles, location, retention, deletion, export, and support access for the proposed deployment.' },
  { title: 'Connected and cloud software', text: 'Confirm authentication, role boundaries, encryption, backups, logging, hosting region, subprocessors, availability, incident notification, and recovery ownership.' },
  { title: 'Industry review', text: 'Pharma, banking, healthcare, and other controlled environments require a customer-led review of applicable regulation, validation, records, physical safety, procedures, and audit evidence.' },
] as const;

export default function TrustPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Indian Infotech trust evidence register', url: absoluteUrl('/trust'), itemListElement: trustEvidence.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.title, url: absoluteUrl(item.href.split('?')[0]) })) };
  return <main><SiteHeader /><StructuredData data={schema} /><PageHero eyebrow="Trust center" title="Security questions deserve named owners and evidence." description="This public register separates material that can be inspected now from documents requiring a deployment review, an approved source, or an operational connection." marker="II / TRUST" path="/trust" />
    <section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Evidence register</p><h2>Know what is published, pending, or deployment-specific.</h2></div><p>Status labels describe public evidence availability—not a product certification, security rating, or guarantee.</p></div><div className="trust-register">{trustEvidence.map((item) => <Link href={item.href} key={item.title}><span data-status={item.status}>{item.status}</span><strong>{item.title}</strong><p>{item.evidence}</p><small>Owner: {item.owner}</small><b aria-hidden="true">↗</b></Link>)}</div></section>
    <section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Data, security, and compliance</p><h2>Turn broad assurances into deployment-specific answers.</h2></div><p>The review scope below is procurement guidance. A product feature is not itself a compliance certificate.</p></div><div className="route-related-grid">{practices.map((practice) => <article key={practice.title}><h3>{practice.title}</h3><p>{practice.text}</p></article>)}</div></section>
    <section className="route-feature-band"><div><p className="section-kicker light">Procurement review</p><h2>Need security or privacy documentation?</h2><p>Send your questionnaire and deployment context to the appropriate owner.</p></div><Link className="button button-primary" href="/contact?topic=security">Request trust review <span aria-hidden="true">↗</span></Link></section><SiteFooter /></main>;
}
