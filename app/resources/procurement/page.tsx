import type { Metadata } from 'next';
import Link from 'next/link';
import { PrintButton } from '@/components/print-button';
import { StructuredData } from '@/components/structured-data';
import { absoluteUrl, createPageMetadata } from '@/lib/site';
import { PageHero } from '../../_components/page-hero';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';

export const metadata: Metadata = createPageMetadata({
  title: 'Consultant & Tender Specification Guide',
  description: 'A procurement-ready checklist for attendance, access control, entrance management, HRMS, visitor, and canteen system tenders.',
  path: '/resources/procurement',
});

const sections = [
  { title: 'Operating scope', items: ['Sites, entry points, shifts, users, visitors, vehicles, and transaction volumes', 'Current process, source systems, required outcomes, exclusions, and named owners', 'Indoor, outdoor, controlled-area, power, network, mounting, and civil-work constraints'] },
  { title: 'Functional requirements', items: ['Authentication methods and exception or fallback workflow', 'Attendance, access, visitor, canteen, payroll, and approval workflows in scope', 'Roles, permissions, audit records, reports, exports, notifications, and retention needs'] },
  { title: 'Integration requirements', items: ['System of record, field ownership, identifiers, direction, frequency, and reconciliation', 'Approved interface type, authentication, encryption, network boundaries, errors, retries, and version ownership', 'Acceptance test data, environments, migration, cutover, rollback, and support handoff'] },
  { title: 'Commercial response', items: ['Itemized hardware, software, licenses, services, travel, taxes, support, renewal, and optional costs', 'Delivery, installation, configuration, training, acceptance, warranty, SLA, and payment milestones', 'Assumptions, dependencies, deviations, validity period, and change-control process'] },
] as const;

export default function ProcurementResourcePage() {
  const schema = { '@context': 'https://schema.org', '@type': 'TechArticle', headline: 'Consultant and tender specification guide', description: metadata.description, url: absoluteUrl('/resources/procurement'), publisher: { '@type': 'Organization', name: 'Indian Infotech' } };
  return <main><SiteHeader /><StructuredData data={schema} /><PageHero eyebrow="Consultant & tender resource" title="Specify the operating outcome before the model number." description="Use this neutral checklist to structure an RFP, consultant schedule, budget estimate, or technical evaluation. It avoids unsupported capacities and leaves configuration-specific values for the approved technical submission." marker="II / PROCUREMENT" breadcrumbs={[{ label: 'Resources', href: '/resources' }, { label: 'Procurement guide' }]} path="/resources/procurement" />
    <section className="section procurement-guide"><div className="section-heading split-heading"><div><p className="section-kicker">Tender checklist</p><h2>A complete brief produces a comparable response.</h2></div><div className="print-actions"><PrintButton /><Link className="button button-primary" href="/contact?topic=tender">Request technical submission <span aria-hidden="true">↗</span></Link></div></div>
      <div className="route-related-grid">{sections.map((section) => <article key={section.title}><h3>{section.title}</h3><ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
    </section>
    <section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Evaluation method</p><h2>Compare compliance, evidence, and lifecycle cost.</h2></div><p>Ask each bidder to mark every line as compliant, partially compliant, not compliant, or clarification required—and attach the source that supports the answer.</p></div><dl className="product-summary-list"><div><dt>Technical fit</dt><dd>Requirement-by-requirement response with model and source reference</dd></div><div><dt>Evidence</dt><dd>Current datasheets, diagrams, certificates, test or acceptance records</dd></div><div><dt>Delivery</dt><dd>Scope boundaries, responsibilities, schedule, acceptance, and rollback</dd></div><div><dt>Lifecycle</dt><dd>Initial cost, recurring cost, support, spares, upgrades, and exit route</dd></div><div><dt>Risk</dt><dd>Assumptions, dependencies, deviations, security, privacy, and continuity</dd></div></dl></section>
    <section className="route-feature-band"><div><p className="section-kicker light">Next step</p><h2>Send the schedule before the deadline.</h2><p>Indian Infotech can return a scoped compliance response after the sites, workflows, integrations, and commercial format are clear.</p></div><Link className="button button-primary" href="/contact?topic=tender">Start tender review <span aria-hidden="true">↗</span></Link></section><SiteFooter /></main>;
}
