import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import Link from 'next/link';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { customerOrganizations } from '../content';
import { approvedCaseStudies, evidenceQueue } from '../proof-content';

export const metadata: Metadata = createPageMetadata({ title: 'Customer Deployments', description: 'Approved customer deployment stories and evidence-led case studies from Indian Infotech.', path: '/case-studies' });
export default function CaseStudiesPage() {
  const requirement = evidenceQueue.find((item) => item.id === 'case-studies');
  return <main><SiteHeader /><PageHero eyebrow="Customer proof" title="Real deployment stories, published when the evidence is approved." description="The legacy website publishes customer logos. Named challenges, architecture, products used, outcomes, quotes, and deployment photography are published here only with permission and supporting material." marker="II / PROOF" /><section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Case study standard</p><h2>Customer. Challenge. Architecture. Outcome.</h2></div><p>Each story explains the operating problem, hardware and software used, integration context, rollout, deployment size, and approved measurable outcome.</p></div>{approvedCaseStudies.length ? <div className="route-card-grid">{approvedCaseStudies.map((item) => <Link className="route-card" href={`/case-studies/${item.slug}`} key={item.slug}><span>{item.industry}</span><h2>{item.client}</h2><p>{item.outcome}</p><b>Read case study ↗</b></Link>)}</div> : <div className="proof-evidence-queue"><span>CASE STUDIES / EVIDENCE QUEUE</span><h2>No approved deployment stories published yet.</h2><p>{requirement?.requirement}. Owner: {requirement?.owner}.</p><Link className="button button-primary" href="/case-studies/contribute">Prepare approved evidence <span aria-hidden="true">↗</span></Link></div>}</section><section className="section customer-roster"><div className="section-heading"><p className="section-kicker">Published legacy customer roster</p><h2>Organizations displayed on the current website.</h2></div><div className="customer-roster-grid">{customerOrganizations.map((customer) => <div key={customer.name}><span>{customer.name}</span><small>Logo source retained; case-study permission pending</small></div>)}</div></section><SiteFooter /></main>;
}
