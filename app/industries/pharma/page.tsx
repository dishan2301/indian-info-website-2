import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '../../_components/page-hero';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';

export const metadata: Metadata = {
  title: 'Pharma Access Control & Attendance | Indian Infotech',
  description: 'Access control, door interlocking, biometric attendance, visitor, and HRMS systems for pharmaceutical facilities in India.',
  alternates: { canonical: '/industries/pharma' },
  openGraph: { title: 'Pharma Access Control & Attendance | Indian Infotech', description: 'Workplace and workforce systems for controlled pharmaceutical operations.', url: '/industries/pharma' },
};

const pharmaNeeds = [
  { number: '01', title: 'Controlled-area entry', text: 'Plan identity and entry workflows around restricted zones, personnel roles, and the facility’s approved operating procedures.' },
  { number: '02', title: 'Door interlocking', text: 'Support managed movement between connected spaces with door-interlock system planning appropriate to the site.' },
  { number: '03', title: 'Attendance & shifts', text: 'Capture attendance for shift-based teams and support exception handling before downstream HR or payroll processes.' },
  { number: '04', title: 'Visitor operations', text: 'Structure visitor requests, approvals, entry records, and host workflows for busy facilities.' },
] as const;

export default function PharmaPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero eyebrow="Pharmaceutical operations" title="Control entry. Track attendance. Support audit-ready workflows." description="Door interlocking, biometric attendance, access control, visitor management, and HRMS systems for pharmaceutical and research facilities." marker="II / PHARMA" />

      <section className="pharma-intro">
        <div><p className="section-kicker">Designed around controlled workplaces</p><h2>The facility comes first.</h2></div>
        <p>Pharmaceutical environments combine controlled areas, shift teams, contractors, visitors, and strict operating procedures. Indian Infotech scopes systems around those realities. Compliance remains the responsibility of the facility and its approved validation process.</p>
      </section>

      <section className="pharma-needs">
        {pharmaNeeds.map((need) => (
          <article key={need.number}><span>{need.number}</span><h2>{need.title}</h2><p>{need.text}</p></article>
        ))}
      </section>

      <section className="pharma-system">
        <div className="system-diagram" aria-label="Pharma system scope diagram">
          <div className="diagram-core">CONTROLLED<br />WORKPLACE</div>
          <div className="diagram-node node-one">IDENTITY</div><div className="diagram-node node-two">ENTRY</div><div className="diagram-node node-three">TIME</div><div className="diagram-node node-four">PEOPLE</div>
        </div>
        <div><p className="section-kicker light">Scope the full operating path</p><h2>From employee identity to workforce records.</h2><p>Map who needs access, where they enter, how attendance is captured, which exceptions require review, and what information downstream teams need.</p><ul><li>Access-control terminals</li><li>Door-interlock workflows</li><li>Biometric attendance</li><li>Entrance management</li><li>Visitor management</li><li>HRMS & payroll operations</li></ul></div>
      </section>

      <section className="evidence-note"><span>Important</span><div><h2>System capability is not a compliance certificate.</h2><p>Published claims will remain specific and evidence-based. Final compliance depends on facility design, installation, procedures, validation, documentation, and applicable regulatory requirements.</p></div></section>
      <section className="decision-band"><div><p className="section-kicker light">Discuss your facility</p><h2>Map doors, zones, shifts, visitors, and workforce workflows.</h2></div><Link className="button button-primary" href="/contact">Book a pharma consultation <span aria-hidden="true">↗</span></Link></section>
      <SiteFooter />
    </main>
  );
}
