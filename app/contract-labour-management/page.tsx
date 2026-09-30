import type { Metadata } from 'next';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = createPageMetadata({
  title: 'Contract Labour Management System',
  description: 'Plan contract workforce rosters, attendance, shifts, site access, exception review, and payroll handoffs with connected workforce systems.',
  path: '/contract-labour-management',
});

export default function ContractLabourManagementPage() {
  return <main>
    <SiteHeader />
    <PageHero eyebrow="Contract workforce" title="Coordinate contract labour across sites and shifts." description="Bring contractor assignments, attendance, access approvals, exceptions, and payroll review into a workflow with clear owners at each handoff." marker="II / CONTRACT WORKFORCE" path="/contract-labour-management" />
    <section className="section route-detail-intro">
      <div><p className="section-kicker">Contract labour management</p><h2>Keep every workforce handoff visible.</h2></div>
      <div><p>Plan the contractor journey from roster and site assignment through shift attendance, access approval, exception review, and approved payroll inputs. Confirm the modules, integrations, and site requirements during solution design.</p><div className="hero-actions"><Link className="button button-primary" href="/contact?topic=contract-workforce">Discuss contract workforce <span aria-hidden="true">↗</span></Link><Link className="button outline-button" href="/software/easytime-online">Explore attendance software <span aria-hidden="true">↗</span></Link></div></div>
    </section>
    <section className="route-dark-section">
      <div className="section-heading split-heading"><div><p className="section-kicker light">Connected operations</p><h2>Link the roster to the right next step.</h2></div><p>Attendance, access, and payroll each have distinct approval owners. Map how contractor records move between them.</p></div>
      <div className="route-link-list"><div>Contractor roster and site assignment</div><div>Shift attendance and exception review</div><div>Approved access and entry workflow</div><div>Reviewed payroll handoff</div></div>
    </section>
    <section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Related systems</p><h2>Continue with HRMS, payroll, or access control.</h2></div><p>Choose the next part of your workforce and site workflow.</p></div><div className="hero-actions"><Link className="button outline-button" href="/hrms-payroll">HRMS & Payroll <span aria-hidden="true">↗</span></Link><Link className="button outline-button" href="/access-control-system">Access control <span aria-hidden="true">↗</span></Link><Link className="button outline-button" href="/products#entrance-management">Entrance management <span aria-hidden="true">↗</span></Link></div></section>
    <SiteFooter />
  </main>;
}
