import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { industries, platformPillars } from '../content';

export const metadata: Metadata = {
  title: 'Workforce & Workplace Platform | Indian Infotech',
  description: 'Explore Indian Infotech systems for HRMS, attendance, access control, entrance, visitor, and canteen operations.',
  alternates: { canonical: '/platform' },
  openGraph: { title: 'Workforce & Workplace Platform | Indian Infotech', description: 'Practical systems for people, identity, entry, and workplace operations.', url: '/platform' },
};

const capabilities = [
  {
    id: 'workforce',
    label: 'Workforce operations',
    title: 'Manage people, time, and workforce workflows.',
    text: 'Support HRMS, payroll, attendance, leave, employee self-service, recruitment, performance, training, documents, assets, and employee lifecycle processes.',
    items: ['Core HR & payroll', 'Time & attendance', 'Leave management', 'Employee self-service', 'Recruitment', 'Employee lifecycle'],
  },
  {
    id: 'security',
    label: 'Workplace security',
    title: 'Control entry around workplace needs.',
    text: 'Use face, fingerprint, RFID, access-control terminals, flap barriers, turnstiles, boom barriers, and screening devices to support managed entry points.',
    items: ['Biometric identity', 'Access-control terminals', 'Flap barriers', 'Full-height turnstiles', 'Boom barriers', 'Metal detection'],
  },
  {
    id: 'services',
    label: 'Workplace services',
    title: 'Bring structure to daily facility operations.',
    text: 'Support visitor check-in, canteen transactions, and online attendance needs with focused workplace software.',
    items: ['Visitor management', 'Canteen management', 'Easytime Online', 'Operational reports'],
  },
] as const;

export default function PlatformPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero eyebrow="Platform" title="Workforce and workplace systems, scoped around your operation." description="Start with a focused requirement or plan a broader system across attendance, access, HRMS, entrance management, visitors, and workplace services." marker="II / PLATFORM" />

      <section className="section compact-section">
        <div className="pillar-grid">
          {platformPillars.map((pillar) => (
            <a className="pillar-card" href={`#${pillar.number === '01' ? 'workforce' : pillar.number === '02' ? 'security' : 'services'}`} key={pillar.number}>
              <span className="card-number">{pillar.number}</span><h2>{pillar.title}</h2><p>{pillar.description}</p>
              <span className="text-link">See capabilities <b aria-hidden="true">↓</b></span>
            </a>
          ))}
        </div>
      </section>

      <section className="capability-stack">
        {capabilities.map((capability, index) => (
          <article className="capability-row" id={capability.id} key={capability.id}>
            <div className="capability-index">0{index + 1}</div>
            <div className="capability-copy">
              <p className="section-kicker">{capability.label}</p><h2>{capability.title}</h2><p>{capability.text}</p>
            </div>
            <ul>{capability.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </section>

      <section className="section" id="industries">
        <div className="section-heading split-heading"><div><p className="section-kicker">Industry context</p><h2>One portfolio. Different operating realities.</h2></div><p>Every recommendation begins with site conditions, workforce patterns, entry points, and reporting requirements.</p></div>
        <div className="industry-grid">
          {industries.map((industry, index) => (
            <Link className={`industry-card ${industry.featured ? 'featured' : ''}`} href={industry.href} key={industry.name}>
              <span className="card-number">0{index + 1}</span><h3>{industry.name}</h3><p>{industry.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="decision-band"><div><p className="section-kicker light">Start with the requirement</p><h2>Hardware, software, or a multi-site operating workflow?</h2></div><Link className="button button-primary" href="/contact">Scope your project <span aria-hidden="true">↗</span></Link></section>
      <SiteFooter />
    </main>
  );
}
