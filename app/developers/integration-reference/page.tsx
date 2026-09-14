import type { Metadata } from 'next';
import Link from 'next/link';
import { StructuredData } from '@/components/structured-data';
import { absoluteUrl, createPageMetadata } from '@/lib/site';
import { PageHero } from '../../_components/page-hero';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';

export const metadata: Metadata = createPageMetadata({
  title: 'Software Integration Reference',
  description: 'Review the interface details that need technical confirmation before a software integration is planned.',
  path: '/developers/integration-reference',
});

const unpublished = ['Interface mechanism and protocol', 'Authentication and authorization', 'Endpoint paths and methods', 'Request and response schemas', 'Error, retry, and idempotency behaviour', 'Rate and volume limits', 'Version and change policy', 'Sandbox and webhook availability'] as const;

export default function IntegrationReferencePage() {
  const article = { '@context': 'https://schema.org', '@type': 'TechArticle', headline: 'Indian Infotech software integration reference', description: metadata.description, url: absoluteUrl('/developers/integration-reference'), publisher: { '@type': 'Organization', name: 'Indian Infotech' } };
  return <main><SiteHeader /><StructuredData data={article} /><PageHero eyebrow="Integration reference" title="Plan integrations with version-specific technical details." description="Integration transport, authentication, endpoints, schemas, and lifecycle details need an approved technical source for the selected software version." marker="II / REFERENCE" breadcrumbs={[{ label: 'Developers', href: '/developers' }, { label: 'Integration reference' }]} path="/developers/integration-reference" />
    <section className="route-dark-section"><div className="section-heading split-heading"><div><p className="section-kicker light">Not publicly documented</p><h2>Confirm these before implementation.</h2></div><p>An approved production reference must identify the exact product, software version, owner, and support boundary.</p></div><div className="route-link-list">{unpublished.map((item) => <div key={item}>{item}<span>Technical source required</span></div>)}</div></section>
    <section className="section route-detail-intro"><div><p className="section-kicker">Discovery brief</p><h2>Turn one real data flow into a reviewable contract.</h2></div><div><p>Capture the systems, business event, identity key, fields, direction, timing, volume, security constraints, tests, cutover, monitoring, and owners before asking engineering to confirm an interface.</p><div className="hero-actions"><a className="button button-primary" href="/developers/integration-brief" download>Download integration brief ↓</a><Link className="button outline-button" href="/contact?topic=integration&resource=discovery-brief">Start technical review</Link></div></div></section><SiteFooter /></main>;
}
