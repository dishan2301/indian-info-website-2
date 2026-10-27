import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/site';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { hrmsModules } from '../content';

export const metadata: Metadata = createPageMetadata({
  title: 'HRMS & Payroll',
  description: 'Explore 14 connected HRMS and payroll workflows, from recruitment and onboarding to employee self-service and visitor management.',
  path: '/hrms-payroll',
});

const moduleMarks = ['↗', '◷', '◎', '◇', '＋', '◉', '↗', '▤', '₹', '↗', '↘', '▦', '◌', '⌁'] as const;

export default function HrmsPayrollPage() {
  return (
    <main className="hrms-page">
      <SiteHeader />
      <section className="hrms-hero">
        <div className="hrms-hero-copy">
          <p className="section-kicker">Workforce software / HRMS & Payroll</p>
          <h1>Every people process, moving in the same direction.</h1>
          <p>Bring hiring, employee records, attendance, payroll, and the everyday employee experience into one connected HR suite.</p>
          <div className="hrms-hero-actions">
            <Link className="button button-primary" href="#modules">Explore HRMS features <span aria-hidden="true">↓</span></Link>
            <Link className="outline-link" href="/contact?solution=hrms-payroll">Talk to our team <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="hrms-hero-note">
            <span>{hrmsModules.length} connected features</span>
            <span>Hire to retire</span>
            <span>Built around your workflows</span>
          </div>
        </div>
        <div className="hrms-hero-art">
          <Image src="/campaign/core-systems/hrms-payroll-desktop-v2.webp" alt="HR team reviewing connected employee and payroll workflows" fill priority sizes="(max-width: 800px) 100vw, 55vw" />
          <div className="hrms-art-caption"><span>HRMS / 01</span><strong>One employee journey.<br />Clearer at every step.</strong></div>
        </div>
      </section>

      <section className="hrms-solutions section" aria-labelledby="hrms-products-heading">
        <div className="section-heading split-heading">
          <div><p className="section-kicker">Two workforce solutions</p><h2 id="hrms-products-heading">Choose the workflow you want to improve.</h2></div>
          <p>Attendance Automation supports time capture and review. HRMS & Payroll connects the wider employee lifecycle and its people operations.</p>
        </div>
        <div className="hrms-solution-grid">
          <Link href="/solutions/attendance-automation">
            <span>01 / TIME & ATTENDANCE</span>
            <h3>Attendance Automation</h3>
            <p>Connect biometric and web-based attendance capture with the shift and exception review your teams need.</p>
            <b>Explore attendance <span aria-hidden="true">↗</span></b>
            <Image src="/campaign/solutions/attendance-desktop-v2.webp" alt="Attendance automation for distributed workforces" width={840} height={540} />
          </Link>
          <Link href="#modules">
            <span>02 / PEOPLE OPERATIONS</span>
            <h3>HRMS & Payroll</h3>
            <p>Coordinate hiring, employee records, leave, payroll, performance, and everyday requests across one suite.</p>
            <b>Explore HRMS features <span aria-hidden="true">↘</span></b>
            <Image src="/campaign/core-systems/hrms-payroll-mobile-v2.webp" alt="HRMS and payroll employee workflows" width={840} height={540} />
          </Link>
        </div>
      </section>

      <section className="section hrms-modules" id="modules" aria-labelledby="hrms-modules-heading">
        <div className="section-heading split-heading">
          <div><p className="section-kicker">The employee lifecycle</p><h2 id="hrms-modules-heading">Explore the HRMS suite, one workflow at a time.</h2></div>
          <p>Choose a feature to understand its role in the employee journey, see the key workflows, and discuss your requirements.</p>
        </div>
        <div className="hrms-module-grid">
          {hrmsModules.map((module, index) => (
            <Link href={`/hrms-payroll/${module.slug}`} key={module.slug} className="hrms-module-card">
              <span className="hrms-module-image">
                <Image src={module.image} alt={module.imageAlt} width={600} height={360} />
              </span>
              <span className="hrms-module-number">{String(index + 1).padStart(2, '0')} / HRMS</span>
              <span className="hrms-module-mark" aria-hidden="true">{moduleMarks[index]}</span>
              <h3>{module.name}</h3>
              <p>{module.summary}</p>
              <span className="hrms-module-link">Explore feature <b aria-hidden="true">↗</b></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="hrms-lifecycle">
        <div>
          <p className="section-kicker light">From first contact to final handoff</p>
          <h2>Make every stage of the employee journey easier to follow.</h2>
          <p>Connected people workflows help teams move from one stage to the next with clearer ownership, timely information, and fewer manual handoffs.</p>
        </div>
        <ol>
          <li><span>01</span>Find and welcome talent</li>
          <li><span>02</span>Manage records and daily work</li>
          <li><span>03</span>Support, develop, and reward</li>
          <li><span>04</span>Plan transitions and exits</li>
        </ol>
      </section>

      <section className="route-feature-band">
        <div><p className="section-kicker light">Plan around your operation</p><h2>Start with the people workflow that matters most.</h2><p>Tell us about your team, current process, and rollout goals. We’ll help map a practical next step.</p></div>
        <Link className="button button-primary" href="/contact?solution=hrms-payroll">Discuss HRMS & Payroll <span aria-hidden="true">↗</span></Link>
      </section>
      <SiteFooter />
    </main>
  );
}
