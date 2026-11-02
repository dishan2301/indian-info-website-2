import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { StructuredData } from '@/components/structured-data';
import { createPageMetadata } from '@/lib/site';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { SolutionHero, SolutionHeading, SolutionFaq } from '../_components/solution-page-parts';
import s from '../_components/solution-detail.module.css';

export const metadata: Metadata = createPageMetadata({
  title: 'Contract Labour Management System',
  description: 'Connect contractor rosters, worker assignments, shift attendance, site access and approved payroll inputs in a clearly defined contract workforce process.',
  path: '/contract-labour-management',
  image: '/campaign/product-moments/contract-workforce-v3.png',
});

const steps = [
  ['Set up the assignment', 'Record the contractor, worker identity, assigned site, supervisor and working period. Agree the information and approvals needed before a worker starts.'],
  ['Capture the working day', 'Assign shifts and record punches through selected attendance devices or supported software workflows. Keep the worker and contractor context attached to the record.'],
  ['Resolve the exceptions', 'Review missing punches, late arrivals, leave and overtime requests with the responsible supervisor. HR checks the approved record before the period closes.'],
  ['Prepare the handoff', 'Summarize reviewed days and hours for the agreed payroll or contractor reconciliation process. Match exports with the receiving team and resolve differences.'],
];
const faqs = [
  ['How is contract labour management different from basic attendance?', 'Attendance records when a person clocks in and out. A contract workforce process adds contractor ownership, site assignment, shift context, review responsibility and the handoff of approved records to the next team. The modules required depend on how your site operates.'],
  ['Can we manage several contractors at one site?', 'The workflow can be scoped around contractor-wise rosters and reporting. During the demo, review how your worker groups, site assignments, supervisors and report filters will be configured in the proposed software.'],
  ['Does a valid attendance punch automatically allow site entry?', 'Attendance and access are separate decisions. A worker may have an attendance record while still needing permission for a particular gate or area. Where integration is required, access rules and compatible devices are planned together.'],
  ['Can the reviewed records be sent to payroll?', 'Reviewed attendance can prepare inputs for an agreed payroll workflow. Export fields, identifiers, period cutoffs and any software interface must be confirmed for your receiving system. Payroll calculations and contractor settlements follow the rules approved by your organization.'],
  ['What happens when a worker moves to a different site or contractor?', 'Agree who can end the old assignment, create the new one and update permissions. Review effective dates, worker identifiers and reporting requirements so that attendance stays associated with the correct working period and assignment.'],
  ['What should we bring to a demonstration?', 'Bring an anonymized roster, a shift example, a sample attendance report, the exception approval process and the format your payroll or contractor reconciliation team needs. Include site count and existing device models.'],
] as const;

export default function ContractLabourManagementPage() {
  return <main className={s.page}>
    <SiteHeader />
    <StructuredData data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) }} />
    <SolutionHero eyebrow="Contract labour management" title="Know who’s assigned. Who arrived. What’s approved." description="Bring contractor rosters, site assignments, attendance and supervisor review into one connected process. Give HR, operations and security the context they need for every working day." image="/campaign/product-moments/contract-workforce-v3.png" alt="Site supervisor checking a contractor roster as workers arrive at an industrial entrance" action="Discuss your workforce" topic="contract-workforce">
      <div><strong>Contractor & worker context</strong><span>Know which agency, site and supervisor own the assignment.</span></div><div><strong>Attendance with review</strong><span>Connect shifts and punches with exception approvals.</span></div><div><strong>Clear payroll handoff</strong><span>Prepare reviewed inputs for the receiving team.</span></div>
    </SolutionHero>

    <section className={s.section} id="how-it-works"><SolutionHeading label="From roster to reviewed records" title="A working process for the whole shift." text="The roster starts the process. Each working day adds attendance, review and an agreed next step, with an owner at every stage." /><ol className={s.steps}>{steps.map(([title, text], i) => <li key={title}><span className={s.number}>0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></section>

    <section className={`${s.section} ${s.tint} ${s.split}`}>
      <div className={s.explanation}><p className={s.eyebrow}>Before the first shift</p><h2>Start with a roster your site can use.</h2><p>A worker’s name is only part of the picture. Site teams also need to know the contractor responsible, the approved assignment and who can review the worker’s records.</p><ul className={s.checkList}><li><b>Worker identity:</b> agree a consistent identifier so records can be matched across devices, sites and reports.</li><li><b>Assignment details:</b> define the contractor, work location, department, shift and assignment dates.</li><li><b>Readiness checks:</b> identify the documents, induction steps and approvals your organization requires.</li><li><b>Ownership:</b> assign responsibility for roster changes, attendance corrections and assignment closure.</li></ul></div>
      <figure className={s.photo}><Image src="/campaign/product-moments/contract-workforce-v2.png" alt="Supervisor reviewing arriving workers at a factory gate" fill sizes="(max-width: 800px) 90vw, 45vw" /></figure>
    </section>

    <section className={s.section}><SolutionHeading label="Attendance is the starting point" title="Turn punches into records HR can review." text="A device records an event. Shift rules, supervisor decisions and period review give that event its working context." /><div className={s.cards}>
      <article className={s.card}><span className={s.number}>CAPTURE</span><h3>Shifts & daily attendance</h3><p>Associate working records with the assigned shift and location. Review arrival and departure times alongside late arrivals, absent workers and missing punches.</p><Link href="/solutions/attendance-automation">Explore attendance automation ↗</Link></article>
      <article className={s.card}><span className={s.number}>REVIEW</span><h3>Exceptions & approvals</h3><p>Give supervisors a defined route for corrections and overtime review. HR works from the reviewed record, with clear responsibility for unresolved items.</p><Link href="/software/easytime-online">Explore Easytime Online ↗</Link></article>
      <article className={s.card}><span className={s.number}>HANDOFF</span><h3>Payroll inputs & reconciliation</h3><p>Prepare attendance summaries for the agreed pay period. Confirm worker identifiers, payable-day treatment, approved hours and export fields with the receiving team.</p><Link href="/hrms-payroll">Explore HRMS & Payroll ↗</Link></article>
    </div></section>

    <section className={`${s.section} ${s.tint}`}><SolutionHeading label="A typical site scenario" title="One missing punch. A clear route to resolution." text="At shift end, a worker has an arrival record but no departure punch. Each team has a specific job before that record reaches payroll." /><div className={s.tableWrap}><table className={s.table}><thead><tr><th scope="col">Team</th><th scope="col">What they review</th><th scope="col">What moves forward</th></tr></thead><tbody>
      <tr><td>Site supervisor</td><td>Checks the shift, actual working time and the reason for the missing punch.</td><td>A correction request with the agreed supporting information.</td></tr>
      <tr><td>HR / attendance team</td><td>Reviews the correction against the attendance policy and approval process.</td><td>A reviewed record, or a pending item returned for clarification.</td></tr>
      <tr><td>Payroll / reconciliation</td><td>Checks the approved period summary against the expected worker and contractor totals.</td><td>Accepted inputs for the agreed payroll or settlement process.</td></tr>
    </tbody></table></div><p className={s.note}>This is an example operating process. Approval levels, records and software configuration are agreed for your deployment.</p></section>

    <section className={`${s.section} ${s.split}`}>
      <figure className={s.photo}><Image src="/campaign/solutions/attendance-desktop-v2.webp" alt="Worker recording attendance at an entrance-mounted biometric device" fill sizes="(max-width: 800px) 90vw, 45vw" /></figure>
      <div className={s.explanation}><p className={s.eyebrow}>Attendance + site access</p><h2>Connect the record to the right workplace.</h2><p>A valid roster, an attendance punch and permission to enter a restricted area serve different purposes. Plan how these decisions connect at your gate.</p><ul className={s.checkList}><li><b>Security</b> needs the approved entry rules and a process for workers whose assignment is not active.</li><li><b>Operations</b> needs attendance visibility by shift and site to follow up on staffing gaps.</li><li><b>HR</b> needs reviewed working records and a clear process for changes or disputes.</li></ul><div className={s.actions}><Link className={s.secondary} href="/entrance-control-system">Explore entrance control ↗</Link></div></div>
    </section>

    <section className={`${s.section} ${s.tint}`}><SolutionHeading label="Scope the rollout" title="Build around the way your contractors work." /><div className={s.cards}>
      <article className={s.card}><h3>Map your current process</h3><p>List contractors, sites, worker groups and shift patterns. Bring a sample roster and explain how workers join, transfer and leave an assignment.</p></article>
      <article className={s.card}><h3>Confirm the system connections</h3><p>Review existing attendance devices, access equipment and payroll formats. Agree which data must move between systems and who owns each transfer.</p></article>
      <article className={s.card}><h3>Validate one complete period</h3><p>Walk through roster setup, a normal shift, a missed punch and period-end review. Check the resulting report with the team receiving the records.</p></article>
    </div></section>
    <section className={s.section}><SolutionHeading label="Common questions" title="Before you choose a contract workforce system." /><SolutionFaq items={faqs} /></section>
    <section className={s.section}><div className={s.cta}><div><h2>Bring a real shift to your demo.</h2><p>Show us your contractor roster, attendance process and reporting needs. We’ll work through how the proposed setup can support your site.</p></div><Link className={s.primary} href="/contact?solution=contract-workforce">Plan a workforce demo ↗</Link></div></section>
    <SiteFooter />
  </main>;
}
