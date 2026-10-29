import type { Metadata } from 'next';
import styles from './overview.module.css';
import benefitStyles from './benefits.module.css';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/site';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { hrmsModules } from '../content';
import { HrmsVisual, HrmsReveal } from './visual';
import { AnimatedFeatureScene, FeatureReveal } from './animated-feature-scene';
import ModuleExplorer from './module-explorer';
import { Database, Layers3, Network, Route, UserRound, Headset } from 'lucide-react';

export const metadata: Metadata = createPageMetadata({
  title: 'HRMS & Payroll',
  description: 'Explore 14 connected HRMS and payroll workflows, from recruitment and onboarding to employee self-service and visitor management.',
  path: '/hrms-payroll',
});

const benefitIcons = [Database, Layers3, Network, Route, UserRound, Headset];

export default function HrmsPayrollPage() {
  return (
    <main className={`hrms-page ${styles.page}`}>
      <SiteHeader />
      <section className="hrms-hero">
        <div className="hrms-hero-copy">
          <p className="section-kicker">Workforce software / HRMS & Payroll</p>
          <h1>Every part of people operations, in view.</h1>
          <p>Explore HR and payroll workflows for hiring, joining, day-to-day employee support, and the work that keeps your organisation moving.</p>
          <div className="hrms-hero-actions">
            <Link className="button button-primary" href="/contact?solution=hrms-payroll">Request a Demo <span aria-hidden="true">↗</span></Link>
            <Link className="outline-link" href="#modules">Explore the modules <span aria-hidden="true">↓</span></Link>
          </div>
          <div className="hrms-hero-note">
            <span>{hrmsModules.length} connected modules</span>
            <span>One employee journey</span>
            <span>Scope confirmed for your setup</span>
          </div>
        </div>
        <HrmsVisual />
      </section>

      <section className={styles.workflows} aria-label="HRMS workflow highlights">
        <FeatureReveal className={styles.workflowRow}>
          <div className={styles.workflowCopy}>
            <p className="section-kicker">CORE HR & PAYROLL</p>
            <h2>Keep the everyday people workflow connected.</h2>
            <p>Bring employee information, payroll preparation, and employee services into a clearer operating picture.</p>
            <ul>{['Employee information and records', 'Payroll inputs and review', 'Employee requests and services'].map((item) => <li key={item}>{item}</li>)}</ul>
            <Link href="/hrms-payroll/core-hris-payroll">Explore Core HRIS & Payroll <span aria-hidden="true">↗</span></Link>
          </div>
          <AnimatedFeatureScene module="core-hris-payroll" stages={['Employee records', 'Payroll review', 'Employee services']} />
        </FeatureReveal>
        <FeatureReveal className={`${styles.workflowRow} ${styles.reverse}`}>
          <AnimatedFeatureScene module="onboarding" stages={['Joining details', 'Welcome checklist', 'Team handoff']} variant={1} />
          <div className={styles.workflowCopy}>
            <p className="section-kicker">FROM HIRE TO JOINING</p>
            <h2>Give each new joiner a more considered start.</h2>
            <p>See how recruitment and onboarding pages connect the steps from candidate selection to joining preparation.</p>
            <ul>{['Hiring and interview stages', 'Joining information and checklists', 'A handoff into employee workflows'].map((item) => <li key={item}>{item}</li>)}</ul>
            <Link href="/hrms-payroll/onboarding">Explore Recruitment & On-Boarding <span aria-hidden="true">↗</span></Link>
          </div>
        </FeatureReveal>
      </section>

      <section className={`section hrms-benefits ${benefitStyles.benefits}`} aria-labelledby="hrms-benefits-heading">
        <div className="section-heading split-heading"><div><p className="section-kicker">One connected HR suite</p><h2 id="hrms-benefits-heading">A clearer way to manage the employee journey.</h2></div><p>Bring people processes into one conversation—from the first hiring step through day-to-day work and employee transitions.</p></div>
        <div className="hrms-benefit-grid">{[
          ['A connected employee record', 'Keep key employee information available to the HR workflows that need it.'],
          ['Modules for each stage', 'Explore recruitment, joining, everyday HR, payroll, development, and exit workflows.'],
          ['Payroll alongside HR', 'Bring employee and payroll processes into a shared operating picture.'],
          ['Clearer process handoffs', 'Give teams a common view of requests, decisions, and the next step in a workflow.'],
          ['Employee-facing workflows', 'Explore self-service options for common employee information and requests.'],
          ['A rollout shaped around you', 'Confirm capabilities, integrations, and implementation scope with our team.'],
        ].map(([title, description], index) => { const Icon = benefitIcons[index]; return <HrmsReveal key={title} className="hrms-benefit-reveal" delay={(index % 3) * .09}><article><div className="hrms-benefit-top"><span className="hrms-benefit-icon"><Icon size={25} strokeWidth={1.5} aria-hidden="true" /></span><span>0{index + 1} /</span></div><h3>{title}</h3><p>{description}</p><span className="hrms-benefit-line" aria-hidden="true" /></article></HrmsReveal>; })}</div>
      </section>

      <ModuleExplorer />

      <section className={`section ${styles.questions}`} aria-labelledby="hrms-main-faq-heading">
        <div className={styles.questionsHeading}><p className="section-kicker">Questions teams ask</p><h2 id="hrms-main-faq-heading">A few things to know before you get started.</h2><p>Every organisation has its own policies, systems, and priorities. We’ll help you explore the right fit.</p><Link className="button button-primary" href="/contact?solution=hrms-payroll">Talk to our team <span aria-hidden="true">↗</span></Link></div>
        <div className="hrms-faq-list">{[['What does the HRMS suite include?','Explore 14 modules covering recruitment, onboarding, core HR and payroll, attendance, employee services, and other workforce workflows. Available scope depends on your setup.'],['Can we start with selected modules?','Discuss the processes you want to address first. Our team can help confirm available modules and a rollout approach for your requirements.'],['Can it connect with our existing systems?','Integration options depend on the systems, devices, and configuration involved. Share your requirements so they can be reviewed with our team.'],['How is pricing determined?','Pricing depends on the modules, user scope, configuration, and support requirements. Contact our team for a quote based on your needs.'],['How can I see the workflows?','Request a demo and tell us which processes matter most. We can focus the discussion on the relevant workflows and confirm product scope.']].map(([question, answer], index) => <details key={question} name="hrms-faq"><summary><small>{String(index + 1).padStart(2, '0')}</small><strong>{question}</strong><span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="route-feature-band">
        <div><p className="section-kicker light">Plan around your operation</p><h2>Start with the people workflow that matters most.</h2><p>Tell us about your team, current process, and rollout goals. We’ll help map a practical next step.</p></div>
        <Link className="button button-primary" href="/contact?solution=hrms-payroll">Discuss HRMS & Payroll <span aria-hidden="true">↗</span></Link>
      </section>
      <SiteFooter />
    </main>
  );
}
