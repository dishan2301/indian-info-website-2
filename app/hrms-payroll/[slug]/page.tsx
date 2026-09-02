import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../../_components/page-hero';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';
import { WorkflowBand } from '../../_components/enterprise-route';
import { hrmsModules } from '../../content';

export function generateStaticParams() { return hrmsModules.map((item) => ({ slug: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const item = hrmsModules.find((candidate) => candidate.slug === slug); return item ? createPageMetadata({ title: `${item.name} HRMS Module`, description: item.summary, path: `/hrms-payroll/${item.slug}`, image: null }) : {}; }

export default async function HrmsModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = hrmsModules.find((candidate) => candidate.slug === slug);
  if (!item) notFound();
  return <main>
    <SiteHeader />
    <PageHero eyebrow="HRMS & Payroll" title={item.name} description={item.summary} marker="II / HRMS MODULE" breadcrumbs={[{ label: 'HRMS & Payroll', href: '/hrms-payroll' }, { label: item.name }]} path={`/hrms-payroll/${item.slug}`} />
    <section className="software-detail section"><div className="software-interface-pending"><div className="software-window large" aria-hidden="true"><div><i /><i /><i /></div><span>Approved production interface required</span><ol><li><b>01</b>Records and roles</li><li><b>02</b>Workflow configuration</li><li><b>03</b>Review and reporting</li></ol></div><p>Current screenshots and module-specific documentation will be added when approved source media is supplied.</p></div><div className="software-detail-copy"><p className="section-kicker">Module scope</p><h2>Map the decisions, records, and owners inside the workflow.</h2><p>{item.summary}</p><ul><li>Define roles, permissions, and approval ownership</li><li>Confirm related attendance and HRMS inputs</li><li>Document reporting, integration, and support requirements</li><li>Validate the production module before rollout</li></ul><Link className="button button-primary" href={`/contact?hrms=${item.slug}`}>Discuss this module <span aria-hidden="true">↗</span></Link></div></section>
    <section className="route-dark-section"><div className="section-heading split-heading"><div><p className="section-kicker light">Lifecycle context</p><h2>Connect the module to the next decision.</h2></div><p>HRMS modules are most useful when the employee, manager, HR, payroll, and support handoffs are explicit.</p></div><WorkflowBand steps={['Identify the people and records in scope', 'Define the approved workflow and responsibilities', 'Confirm attendance, payroll, or lifecycle connections', 'Review the production module and support path']} /></section>
    <section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Related platform</p><h2>Continue with HRMS & Payroll.</h2></div><Link className="outline-link" href="/hrms-payroll">View all modules ↗</Link></div></section>
    <SiteFooter />
  </main>;
}
