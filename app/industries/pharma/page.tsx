import type { Metadata } from 'next';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../../_components/page-hero';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';
import { RouteCardGrid } from '../../_components/enterprise-route';
import { MotionReveal } from '../../_components/motion-reveal';
import { products } from '../../content';
import { approvedCaseStudies } from '../../proof-content';
import { industryMedia } from '../../route-media';
import styles from '../../discovery-pages.module.css';

export const metadata: Metadata = createPageMetadata({ title: 'Pharma Access Control & Attendance', description: 'Access control, door interlocking, biometric attendance, visitor, and HRMS systems for pharmaceutical facilities in India.', path: '/industries/pharma', image: '/campaign/industries/pharma-desktop-v2.webp' });

const pharmaNeeds = [
  { number: '01', title: 'Entry to special rooms', text: 'Plan who may enter each room, when they may enter, and who checks the rules.' },
  { number: '02', title: 'Doors between rooms', text: 'Plan how connected doors work together and review the setup with the facility team.' },
  { number: '03', title: 'Staff time and shifts', text: 'Record when staff arrive and help managers review missed punches before the next payroll step.' },
  { number: '04', title: 'Visitor check-in', text: 'Record visitor details, tell the host, and track when each visit starts and ends.' },
] as const;

export default function PharmaPage() {
  const recommended = products.filter((product) => ['i-18', 'ai-60', 'fbl-200', 'fbl-300', 'fht2300-series'].includes(product.slug));
  const caseStudies = approvedCaseStudies.filter((study) => /pharma|research/i.test(study.industry));
  return (
    <main className={styles.page}>
      <SiteHeader />
      <PageHero eyebrow="Pharmaceutical operations" title="Help people move safely through a controlled workplace." description="Plan door interlocks, attendance, access, visitors, and workforce records around the way your pharmaceutical or research facility works." marker="II / PHARMA" breadcrumbs={[{ label: 'Industries', href: '/industries' }, { label: 'Pharmaceutical & research' }]} path="/industries/pharma" media={industryMedia.pharma} />

      <section className="pharma-intro">
        <div><p className="section-kicker">Start with the facility</p><h2>Who needs to go where?</h2></div>
        <p>Some rooms have extra entry rules. Start by listing who works there, which visitors arrive, and how people move between rooms. The facility team sets and checks its own safety and regulatory rules.</p>
      </section>

      <section aria-label="Important planning areas">
        <MotionReveal className="pharma-needs">
        {pharmaNeeds.map((need) => (
          <article key={need.number}><span>{need.number}</span><h2>{need.title}</h2><p>{need.text}</p></article>
        ))}
        </MotionReveal>
      </section>

      <section className="pharma-system">
        <div className="system-diagram" aria-label="Pharma system scope diagram">
          <div className="diagram-core">CONTROLLED<br />WORKPLACE</div>
          <div className="diagram-node node-one">IDENTITY</div><div className="diagram-node node-two">ENTRY</div><div className="diagram-node node-three">TIME</div><div className="diagram-node node-four">PEOPLE</div>
        </div>
        <div><p className="section-kicker light">See how the pieces connect</p><h2>From a person arriving to a clear work record.</h2><p>Decide who can enter each area, where staff check in, who reviews missed punches, and which team receives the records.</p><ul><li>Door entry devices</li><li>Connected door steps</li><li>Staff attendance tools</li><li>Gates and turnstiles</li><li>Visitor check-in</li><li>HR and payroll software</li></ul></div>
      </section>

      <section className="evidence-note"><span>Important</span><div><h2>A system does not prove that a site follows every rule.</h2><p>The facility team must check the design, setup, written steps, and records against the rules that apply to its site.</p></div></section>
      <section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Equipment to review</p><h2>Start with staff identity and room entry.</h2></div><p>The facility team should check room design, door setup, network, written steps, and staff training before choosing equipment.</p></div><MotionReveal><RouteCardGrid cards={recommended.map((product) => ({ title: product.name, description: product.description, href: `/products/${product.slug}`, eyebrow: product.family, image: product.image, imageAlt: `${product.name}, a ${product.family.toLowerCase()} device` }))} /></MotionReveal></section>
      <section className="section">{caseStudies.length ? <RouteCardGrid cards={caseStudies.map((study) => ({ title: study.client, description: study.outcome, href: `/case-studies/${study.slug}`, eyebrow: 'Approved pharma case study' }))} /> : <div className="proof-evidence-queue"><span>PHARMA / CUSTOMER EVIDENCE</span><h2>Named deployment story awaiting client approval.</h2><p>No pharma client result, deployment size, or quotation is published until written permission and supporting evidence are supplied.</p><Link className="button button-primary" href="/contact?topic=case-study&industry=pharma">Submit approved evidence <span aria-hidden="true">↗</span></Link></div>}</section>
      <section className="decision-band"><div><p className="section-kicker light">Discuss your facility</p><h2>Talk to our pharma solutions team.</h2></div><Link className="button button-primary" href="/contact?industry=pharma">Book a pharma consultation <span aria-hidden="true">↗</span></Link></section>
      <SiteFooter />
    </main>
  );
}
