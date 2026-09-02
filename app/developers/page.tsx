import type { Metadata } from 'next';
import Link from 'next/link';
import { StructuredData } from '@/components/structured-data';
import { absoluteUrl, createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = createPageMetadata({
  title: 'Developer & Integration Resource Center',
  description: 'Plan Indian Infotech device and workforce integrations with data-flow, identity, security, testing, cutover, and support guidance.',
  path: '/developers',
});

const lifecycle = [
  { title: 'Discover', text: 'Name the source of truth, employee or visitor identifier, systems, owners, data direction, timing, volumes, and regulatory constraints.' },
  { title: 'Design', text: 'Confirm the supported interface, authentication, network boundary, fields, mapping, validation, retries, reconciliation, retention, and version ownership.' },
  { title: 'Prove', text: 'Use representative test data to verify happy paths, duplicates, missing fields, late events, offline recovery, permissions, and audit evidence.' },
  { title: 'Operate', text: 'Document monitoring, alert ownership, support route, change control, backup, recovery, data correction, and exit or export requirements.' },
] as const;

const questions = [
  ['Is there a public API reference?', 'Not yet. Endpoint references, credentials, SDKs, rate limits, and sandbox access will be published only after the supported production interfaces and technical owner are approved.'],
  ['Can an integration be assessed now?', 'Yes. Share the systems, fields, identity key, direction, timing, volumes, security constraints, test approach, and rollout plan for a technical review.'],
  ['How should a tender describe an integration?', 'Specify the required business flow and acceptance result, then require the bidder to state the supported interface, assumptions, dependencies, evidence, and lifecycle ownership.'],
] as const;

export default function DevelopersPage() {
  const faq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: questions.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) };
  const article = { '@context': 'https://schema.org', '@type': 'TechArticle', headline: 'Developer and integration resource center', url: absoluteUrl('/developers'), publisher: { '@type': 'Organization', name: 'Indian Infotech' } };
  return <main><SiteHeader /><StructuredData data={faq} /><StructuredData data={article} /><PageHero eyebrow="Developer & integration center" title="Design the data contract before discussing endpoints." description="Use this public planning guide for attendance, HRMS, payroll, visitor, canteen, and device integration discovery. The API reference remains clearly gated until supported interfaces are approved." marker="II / DEVELOPERS" path="/developers" />
    <section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Integration lifecycle</p><h2>Give every handoff an owner and acceptance test.</h2></div><p>These steps apply whether the approved interface is an API, file exchange, device protocol, scheduled export, or another supported method.</p></div><div className="route-related-grid">{lifecycle.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
    <section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Reference status</p><h2>Public endpoint documentation is pending approval.</h2></div><p>No endpoint, credential flow, SDK, webhook, rate limit, or compatibility promise is published without a supported production source.</p></div><div className="route-link-list"><Link href="/developers/integration-reference">Published integration reference <span>Separate facts from open questions</span></Link><Link href="/resources/procurement">Tender specification guide <span>Print procurement checklist</span></Link><Link href="/resources#roi-calculator">ROI assumptions <span>Model administrative time</span></Link><Link href="/trust">Security and trust review <span>Prepare evidence questions</span></Link><Link href="/knowledge">Knowledge Center <span>Find published technical guidance</span></Link><Link href="/support">Support center <span>Route an existing issue</span></Link></div></section>
    <section className="section seo-faq"><div className="section-heading"><p className="section-kicker">Technical questions</p><h2>Know what is available before planning delivery.</h2></div><div>{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
    <section className="route-feature-band"><div><p className="section-kicker light">Technical review</p><h2>Bring one real data flow.</h2><p>Share systems, fields, timing, authentication requirements, acceptance criteria, and rollout constraints.</p></div><Link className="button button-primary" href="/contact?topic=integration">Start integration review <span aria-hidden="true">↗</span></Link></section><SiteFooter /></main>;
}
