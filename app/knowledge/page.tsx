import type { Metadata } from 'next';
import Link from 'next/link';
import { StructuredData } from '@/components/structured-data';
import { absoluteUrl, createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { RouteCardGrid } from '../_components/enterprise-route';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { insights } from '../insights/content';

export const metadata: Metadata = createPageMetadata({
  title: 'Knowledge Center | Workforce & Workplace Guides',
  description: 'Find Indian Infotech product selection, integration, deployment, support, trust, ROI, and procurement guidance in one evidence-aware knowledge center.',
  path: '/knowledge',
});

const journeys = [
  { eyebrow: 'Select', title: 'Choose a system', description: 'Compare products and frame the workforce, entry-point, software, and site requirements that drive selection.', href: '/compare' },
  { eyebrow: 'Integrate', title: 'Plan a data flow', description: 'Define source systems, identity keys, direction, timing, security, testing, and operating ownership.', href: '/developers' },
  { eyebrow: 'Procure', title: 'Write an evidence-led brief', description: 'Structure operating scope, functional requirements, integrations, commercial response, and evaluation.', href: '/resources/procurement' },
  { eyebrow: 'Operate', title: 'Find support context', description: 'Route product documentation, software questions, setup topics, and existing deployment issues.', href: '/support' },
] as const;

const references = [
  ['/products', 'Product catalogue', 'Browse the approved portfolio'],
  ['/resources', 'Downloads and resources', 'Find current technical material'],
  ['/resources#roi-calculator', 'Business-case calculator', 'Test editable assumptions'],
  ['/developers/integration-reference', 'Integration reference', 'Review verified interface facts'],
  ['/trust', 'Trust Center', 'Review evidence and controls'],
  ['/case-studies', 'Customer evidence', 'Read permission-backed stories'],
] as const;

const questions = [
  ['What belongs in the Knowledge Center?', 'Published selection, integration, procurement, operating, support, and trust guidance. Product files remain in Resources, while active issues go through Support.'],
  ['Are all manuals and API references available here?', 'No. A manual, endpoint reference, credential flow, SDK, firmware file, or compatibility statement is linked only after its product or software version, owner, and source are approved.'],
  ['How do I request missing technical material?', 'Use the resource or support request route and include the product or software name, version, installed context, and the decision or issue the material needs to support.'],
] as const;

export default function KnowledgePage() {
  const itemList = { '@context': 'https://schema.org', '@type': 'ItemList', '@id': absoluteUrl('/knowledge#references'), name: 'Indian Infotech knowledge references', itemListElement: references.map(([href, name], index) => ({ '@type': 'ListItem', position: index + 1, name, url: absoluteUrl(href) })) };
  const collection = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Indian Infotech Knowledge Center', description: metadata.description, url: absoluteUrl('/knowledge'), mainEntity: { '@id': absoluteUrl('/knowledge#references') } };
  const faq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: questions.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) };

  return <main><SiteHeader /><StructuredData data={collection} /><StructuredData data={itemList} /><StructuredData data={faq} /><PageHero eyebrow="Knowledge Center" title="Start with the decision. Follow the evidence." description="Use one maintained route into product selection, integration planning, procurement, operating guidance, support, and trust material. Availability labels distinguish published evidence from material still awaiting an approved source." marker="II / KNOWLEDGE" path="/knowledge" />
    <section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Choose your task</p><h2>Move from question to the right working material.</h2></div><p>Each path reuses the current product and technical source instead of creating a conflicting copy.</p></div><RouteCardGrid cards={journeys} /></section>
    <section className="route-dark-section" id="references"><div className="section-heading split-heading"><div><p className="section-kicker light">Published reference map</p><h2>Current guidance, linked to its source.</h2></div><p>Configuration-specific claims remain on their product, software, or review route so their evidence boundary stays visible.</p></div><div className="route-link-list">{references.map(([href, title, detail]) => <Link href={href} key={href}>{title}<span>{detail}</span></Link>)}</div></section>
    <section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Recent explainers</p><h2>Go deeper into operating and technology decisions.</h2></div><p>Articles provide context; approved product specifications and project validation remain authoritative for a deployment.</p></div><RouteCardGrid cards={insights.map((item) => ({ eyebrow: item.category, title: item.title, description: item.summary, href: `/insights/${item.slug}`, image: item.image }))} /></section>
    <section className="section seo-faq"><div className="section-heading"><p className="section-kicker">Knowledge access</p><h2>Know what is published and where to ask.</h2></div><div>{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
    <section className="decision-band"><div><p className="section-kicker light">Missing context?</p><h2>Bring the product, version, site, and decision you need to make.</h2></div><Link className="button button-primary" href="/contact?topic=knowledge">Request technical guidance <span aria-hidden="true">↗</span></Link></section><SiteFooter /></main>;
}
