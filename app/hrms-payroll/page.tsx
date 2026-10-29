import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ModuleExplorer } from './module-explorer';
import { createPageMetadata } from '@/lib/site';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = createPageMetadata({ title: 'HRMS & Payroll', description: 'Explore Indian Infotech HRMS and payroll workflows for recruitment, employee records, attendance, leave, payroll, and lifecycle operations.', path: '/hrms-payroll' });

const suiteModules = [
  ['Recruitment', 'Hiring needs, candidate information, interview stages and offers.', '/hrms-payroll/recruitment'],
  ['On-Boarding', 'Joining information, responsibilities and new-joiner progress.', '/hrms-payroll/onboarding'],
  ['Core HRIS', 'Employee and organizational records through the employee lifecycle.', '/hrms-payroll/core-hr-payroll'],
  ['Payroll & Compliance', 'Payroll inputs and statutory requirements to review for your organization.', '/hrms-payroll/hris-payroll'],
  ['Employee Self-Service', 'Employee access to relevant records and approved self-service actions.', '/hrms-payroll/employee-self-service'],
  ['Leave', 'Leave rules, requests, balances and approval planning.', '/hrms-payroll/leave-management'],
  ['Time & Attendance', 'Attendance records and shift workflows, with device scope confirmed during planning.', '/hrms-payroll/time-attendance'],
  ['Expense', 'Expense claims and review responsibilities.', '/hrms-payroll/expense'],
  ['Timesheet', 'Project and task time capture requirements.', '/hrms-payroll/timesheet'],
  ['Performance Management (PMS)', 'Goals, review cycles and appraisal requirements.', '/hrms-payroll/performance-management'],
  ['HR Help Desk', 'A place to scope employee requests and HR service workflows.', '/hrms-payroll/help-desk'],
  ['Off-Boarding', 'Exit steps, clearance responsibilities and employee handoffs.', '/hrms-payroll/exit-process'],
  ['Visitors', 'Visitor records and entry workflows; authentication options need confirmation.', '/hrms-payroll/visitors'],
  ['Performance Linked Benefits', 'Production-linked or piece-rate requirements to review with the team.', '/hrms-payroll/performance-linked-benefits'],
  ['Training & Induction', 'Induction and training information through the employee journey.', '/hrms-payroll/training-induction'],
  ['Claims & Reimbursement', 'Reimbursement categories and approval workflow requirements.', '/hrms-payroll/claim-reimbursement'],
];

const benefits = [
  ['Lifecycle context', 'Connect the conversations around hiring, joining, employee records and exit.'],
  ['Modular scope', 'Start with the workforce processes that matter to your organization.'],
  ['Clear ownership', 'Map who provides information, reviews it and approves each step.'],
  ['Employee access', 'Explore employee-facing workflows and access needs for your team.'],
  ['Operational visibility', 'Identify the records and reports managers need to make decisions.'],
  ['Integration planning', 'Review existing attendance, payroll and business systems before confirming scope.'],
];

export default function HrmsPayrollPage() {
  return <main className="hrms-suite-page"><SiteHeader />
    <section className="hrms-hero">
      <div className="hrms-hero-copy"><p className="section-kicker">Workforce software / HRMS &amp; Payroll</p><h1>One HR suite. Every stage of working life.</h1><p>Explore Indian Infotech’s HRMS and payroll workflows for hiring, employee records, attendance and lifecycle operations. Module availability and configuration are confirmed during product discovery.</p><div className="hrms-hero-actions"><Link className="button button-primary" href="/contact?solution=hrms-payroll">Discuss your requirements <span aria-hidden="true">↗</span></Link><a className="outline-link" href="#modules">Explore modules <span aria-hidden="true">↓</span></a></div><div className="hrms-hero-note"><span>Modular workflow scope</span><span>Hire through employee lifecycle</span><span>Built around your operation</span></div></div>
      <div className="hrms-hero-art"><Image src="/campaign/core-systems/hrms-payroll-desktop-v2.webp" alt="HR team reviewing connected employee and payroll workflows" fill priority sizes="(max-width: 800px) 100vw, 45vw" /></div>
    </section>
    <section className="hrms-intro section"><div className="hrms-intro-copy"><p className="section-kicker">A connected workforce conversation</p><h2>Bring the people process into focus.</h2><p>Map the records, responsibilities and handoffs behind hiring, attendance, payroll and employee lifecycle workflows. Start with the modules your team needs to evaluate.</p><Link className="button button-primary" href="/contact?product=hrms-payroll">Discuss your requirements <span aria-hidden="true">↗</span></Link></div><div className="hrms-flow-art"><div className="hrms-flow-label">WORKFORCE JOURNEY</div><div className="hrms-flow-line"><span>01</span><i /><span>02</span><i /><span>03</span><i /><span>04</span></div><b>Hire → Join → Support → Grow</b><small>Illustrative journey · confirm module scope</small></div></section>
    <section id="modules" className="hrms-feature-section section"><div className="section-heading"><p className="section-kicker">HRMS ecosystem</p><h2>Explore the workflows your team can scope.</h2><p>Explore the employee lifecycle by workflow. Module availability and specific functions are confirmed during product discovery.</p></div><ModuleExplorer modules={suiteModules} /></section>
    <section className="hrms-benefits section"><div className="section-heading"><p className="section-kicker">Plan with clarity</p><h2>Start from the decisions your operation needs to make.</h2></div><div className="hrms-benefit-grid">{benefits.map(([title, description], i) => <article key={title}><span>{String(i + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
    <section className="hrms-highlights section"><div className="section-heading"><p className="section-kicker">Explore dedicated workflows</p><h2>Go deeper on hiring and joining.</h2></div><div className="hrms-module-grid hrms-featured-modules"><Link className="hrms-module-card" href="/hrms-payroll/recruitment"><span>01 / TALENT</span><h3>Recruitment</h3><p>Review vacancy, candidate, interview and hiring workflow topics.</p><b>Explore recruitment <i aria-hidden="true">↗</i></b></Link><Link className="hrms-module-card" href="/hrms-payroll/onboarding"><span>02 / LIFECYCLE</span><h3>On-Boarding</h3><p>Explore pre-joining, joining information, task ownership and progress topics.</p><b>Explore onboarding <i aria-hidden="true">↗</i></b></Link></div></section>
    <section className="route-feature-band hrms-cta"><div><p className="section-kicker light">Scope your HRMS</p><h2>Build the conversation around your current process.</h2><p>Share your workforce context and the workflows you want to evaluate.</p></div><Link className="button button-primary" href="/contact?product=hrms-payroll">Contact Indian Infotech <span aria-hidden="true">↗</span></Link></section><SiteFooter /></main>;
}
