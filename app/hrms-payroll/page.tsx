import type { Metadata } from 'next';
import styles from './faq.module.css';
import overviewStyles from './overview.module.css';
import benefitStyles from './benefits.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/site';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { hrmsModules } from '../content';
import { HrmsVisual, HrmsReveal } from './visual';
import EmployeeRecordVisual from './employee-record-visual';
import { Database, Layers3, Network, Route, UserRound, Headset } from 'lucide-react';

export const metadata: Metadata = createPageMetadata({
  title: 'HRMS & Payroll',
  description: 'Explore 14 connected HRMS and payroll workflows, from recruitment and onboarding to employee self-service and visitor management.',
  path: '/hrms-payroll',
});

const benefitIcons = [Database, Layers3, Network, Route, UserRound, Headset];

const moduleMarks = ['↗', '◷', '◎', '◇', '＋', '◉', '↗', '▤', '₹', '↗', '↘', '▦', '◌', '⌁'] as const;

export default function HrmsPayrollPage() {
  return (
    <main className="hrms-page">
      <SiteHeader />
      <section className="hrms-hero">
        <div className="hrms-hero-copy">
          <p className="section-kicker">Workforce software / HRMS & Payroll</p>
          <h1>One HR suite. Every stage of working life.</h1>
          <p>An integrated HRMS and HCM platform built in India, connecting your people, payroll, and everyday HR operations.</p>
          <div className="hrms-hero-actions">
            <Link className="button button-primary" href="/contact?solution=hrms-payroll">Book a Demo <span aria-hidden="true">↗</span></Link>
            <Link className="outline-link" href="#modules">Explore Modules <span aria-hidden="true">↓</span></Link>
          </div>
          <div className="hrms-hero-note">
            <span>{hrmsModules.length} connected features</span>
            <span>Hire to retire</span>
            <span>Built around your workflows</span>
          </div>
        </div>
        <HrmsVisual />
      </section>

      <section className={`section hrms-about ${overviewStyles.overview}`} aria-labelledby="hrms-about-heading">
        <div className="hrms-overview-banner"><div><p className="section-kicker">One connected people system</p><h2 id="hrms-about-heading">Your people.<br /><em>One connected story.</em></h2></div><p>Complete HR. From hire to retire.<br /><span>One employee database. Every team working from the same information.</span></p></div>
        <div className="hrms-overview-layout">
          <div className="hrms-overview-heading"><EmployeeRecordVisual /><div className="hrms-overview-caption"><span>01 — 14</span><p>Every module connected.<br /><strong>Every employee accounted for.</strong></p></div></div>
          <HrmsReveal className="hrms-overview-copy">
            <article className="hrms-story-card"><span className="hrms-editorial-label">01 / THE PLATFORM</span><p>Our HR Suite is an integrated HRMS and HCM software platform built in India that manages the complete hire-to-retire employee lifecycle — recruitment, onboarding, core HRIS, payroll, attendance, leave, performance, and offboarding — from a single system.</p></article>
            <article className="hrms-story-card"><span className="hrms-editorial-label">02 / A FLEXIBLE START</span><p>Explore the modules that match your team’s priorities, from employee records and attendance to payroll and performance. Discuss the right scope for your organisation with our team.</p></article>
            <article className="hrms-story-card"><span className="hrms-editorial-label">03 / ONE SHARED RECORD</span><p>The suite operates as an employee system of record, keeping worker profiles, compensation structures, and statutory identifiers together. Recruitment, payroll, attendance, and performance use the same connected dataset, giving your teams one consistent version of employee information.</p></article>
          </HrmsReveal>
        </div>
      </section>

      <section className="section hrms-modules" id="modules" aria-labelledby="hrms-modules-heading">
        <div className="section-heading split-heading">
          <div><p className="section-kicker">The employee lifecycle</p><h2 id="hrms-modules-heading">Integrated Modules</h2></div>
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

      <section className={`section hrms-benefits ${benefitStyles.benefits}`} aria-labelledby="hrms-benefits-heading">
        <div className="section-heading split-heading"><div><p className="section-kicker">Connected by design</p><h2 id="hrms-benefits-heading">Why Our HR Suite?</h2></div><p>Less reconciliation. Clearer responsibilities. A platform that grows with your people.</p></div>
        <div className="hrms-benefit-grid">{[
          ['One reliable employee database', 'Keep profiles, compensation, and statutory identifiers together so HR, attendance, and payroll work from consistent records.'],
          ['Modular, scalable rollout', 'Start with the modules you need and extend the same core as your organisation grows, without re-platforming.'],
          ['Vendor-independent integration', 'Connect existing finance systems and third-party HR tools without committing to a single ecosystem.'],
          ['Complete lifecycle coverage', 'Manage recruitment, onboarding, daily administration, performance, and offboarding in one connected suite.'],
          ['Employee self-service', 'Give people access to payslips, leave requests, and everyday HR information through a shared workflow.'],
          ['Implementation support', 'Plan configuration, integrations, training, and rollout around your policies and operating requirements.'],
        ].map(([title, description], index) => { const Icon = benefitIcons[index]; return <HrmsReveal key={title} className="hrms-benefit-reveal" delay={(index % 3) * .09}><article><div className="hrms-benefit-top"><span className="hrms-benefit-icon"><Icon size={25} strokeWidth={1.5} aria-hidden="true" /></span><span>0{index + 1} /</span></div><h3>{title}</h3><p>{description}</p><span className="hrms-benefit-line" aria-hidden="true" /></article></HrmsReveal>; })}</div>
      </section>

      <section className="section hrms-compliance" aria-labelledby="hrms-compliance-heading"><div className="section-heading split-heading"><div><p className="section-kicker">Capabilities to confirm</p><h2 id="hrms-compliance-heading">Bring your requirements to the conversation.</h2></div><p>Exact statutory, device, workflow, and integration support depends on configuration and should be confirmed for your deployment.</p></div><div className="hrms-check-table">{['PF / ESIC / PT payroll workflows','Shift and roster management','Biometric attendance integration','Mobile employee self-service','Multilevel workflow','Maker-checker controls','Payslip designer','Visitor management','Recruitment and performance workflows'].map((row) => <div key={row}><span>{row}</span><b>Confirm in demo</b></div>)}</div></section>

      <section className="section hrms-integrations"><div className="section-heading split-heading"><div><p className="section-kicker">Connected operations</p><h2>Meet the systems around your people.</h2></div><p>Discuss biometric devices, accounting tools, and Attendance Automation as part of a practical rollout plan.</p></div><div className="hrms-integration-grid"><article><h3>Biometric devices</h3><p>Bring approved attendance events into the workforce workflow.</p></article><article><h3>Accounting tools</h3><p>Map payroll and finance handoffs to the tools your team already uses.</p></article><Link href="/solutions/attendance-automation"><h3>Attendance Automation ↗</h3><p>Connect time capture, review, and attendance operations.</p></Link></div></section>

      <section className={`section hrms-faq ${styles.faq}`} aria-labelledby="hrms-main-faq-heading"><div className="hrms-faq-intro"><p className="section-kicker">Questions teams ask</p><h2 id="hrms-main-faq-heading">A little clarity.<br /><em>A better next step.</em></h2><p>Start with the process you want to improve. Here’s what to know before bringing your people workflows together.</p><div className="hrms-faq-contact"><span className="hrms-faq-contact-icon" aria-hidden="true">?</span><strong>Have a question of your own?</strong><p>Let’s talk through your team, policies, and priorities.</p><Link href="/contact?solution=hrms-payroll">Talk to our team <span aria-hidden="true">↗</span></Link></div></div><div className="hrms-faq-list">{[['Is this suitable for a small business?','The right starting point depends on your people processes and rollout scope. A demo can help identify a practical first phase.'],['How does it improve HR work?','Connected records and approvals reduce repeated handoffs and make current information easier to review.'],['How is pricing decided?','Pricing depends on the modules, users, configuration, and support scope. Request a quote for your requirements.'],['How do we get started?','Share your current workflow, locations, and priorities. The team can map the next step with you.'],['Can payroll and HR work in one system?','The suite is designed to connect employee records, workforce inputs, and payroll workflows. Exact scope should be confirmed for your setup.'],['Can it connect to our attendance setup?','Biometric and attendance integration options depend on the devices and configuration in scope.']].map(([question, answer], index) => <details key={question} name="hrms-faq"><summary><small>{String(index + 1).padStart(2, '0')}</small><strong>{question}</strong><span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="route-feature-band">
        <div><p className="section-kicker light">Plan around your operation</p><h2>Start with the people workflow that matters most.</h2><p>Tell us about your team, current process, and rollout goals. We’ll help map a practical next step.</p></div>
        <Link className="button button-primary" href="/contact?solution=hrms-payroll">Discuss HRMS & Payroll <span aria-hidden="true">↗</span></Link>
      </section>
      <SiteFooter />
    </main>
  );
}
