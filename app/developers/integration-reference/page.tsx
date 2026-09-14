import type { Metadata } from 'next';
import Link from 'next/link';
import { StructuredData } from '@/components/structured-data';
import { absoluteUrl, createPageMetadata } from '@/lib/site';
import { PageHero } from '../../_components/page-hero';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';
import { softwarePlatforms } from '../../content';

export const metadata: Metadata = createPageMetadata({
  title: 'Software Integration Reference',
  description: 'Review brochure-backed Indian Infotech software integration facts and the interface details that still require technical confirmation.',
  path: '/developers/integration-reference',
});

const referenceLabels = new Set(['Architecture', 'Reporting', 'Published integration scope']);
const references = softwarePlatforms.flatMap((software) => {
  const facts = software.publishedFacts?.filter((fact) => referenceLabels.has(fact.label)) ?? [];
  return facts.length ? [{ software, facts }] : [];
});

const unpublished = ['Interface mechanism and protocol', 'Authentication and authorization', 'Endpoint paths and methods', 'Request and response schemas', 'Error, retry, and idempotency behaviour', 'Rate and volume limits', 'Version and change policy', 'Sandbox and webhook availability'] as const;

export default function IntegrationReferencePage() {
  const article = { '@context': 'https://schema.org', '@type': 'TechArticle', headline: 'Indian Infotech software integration reference', description: metadata.description, url: absoluteUrl('/developers/integration-reference'), publisher: { '@type': 'Organization', name: 'Indian Infotech' } };
  const itemList = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Published software integration facts', itemListElement: references.map(({ software }, index) => ({ '@type': 'ListItem', position: index + 1, name: software.name, url: absoluteUrl(`/software/${software.slug}`) })) };

  return <main><SiteHeader /><StructuredData data={article} /><StructuredData data={itemList} /><PageHero eyebrow="Integration reference" title="Published interface facts—without invented API details." description="This reference separates brochure-backed integration scope from transport, authentication, endpoint, schema, and lifecycle details that still need a version-specific technical source." marker="II / REFERENCE" breadcrumbs={[{ label: 'Developers', href: '/developers' }, { label: 'Integration reference' }]} path="/developers/integration-reference" />
    <section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Verified publication scope</p><h2>What the supplied company brochure supports today.</h2></div><p>These facts describe published software scope. They do not prove that a REST API, SDK, webhook, or universal connector is available for a proposed version or deployment.</p></div><div className="route-related-grid">{references.map(({ software, facts }, index) => <article key={software.slug}><span>0{index + 1}</span><h3>{software.name}</h3><ul>{facts.map((fact) => <li key={fact.label}><strong>{fact.label}:</strong> {fact.value}</li>)}</ul><p>{software.evidenceSource}</p><Link className="text-link" href={`/software/${software.slug}`}>Review software specification <b aria-hidden="true">↗</b></Link></article>)}</div></section>
    <section className="route-dark-section"><div className="section-heading split-heading"><div><p className="section-kicker light">Not publicly documented</p><h2>Confirm these before implementation.</h2></div><p>An approved production reference must identify the exact product, software version, owner, and support boundary.</p></div><div className="route-link-list">{unpublished.map((item) => <div key={item}>{item}<span>Technical source required</span></div>)}</div></section>
    <section className="section route-detail-intro"><div><p className="section-kicker">Discovery brief</p><h2>Turn one real data flow into a reviewable contract.</h2></div><div><p>Capture the systems, business event, identity key, fields, direction, timing, volume, security constraints, tests, cutover, monitoring, and owners before asking engineering to confirm an interface.</p><div className="hero-actions"><a className="button button-primary" href="/developers/integration-brief" download>Download integration brief ↓</a><Link className="button outline-button" href="/contact?topic=integration&resource=discovery-brief">Start technical review</Link></div></div></section><SiteFooter /></main>;
}
