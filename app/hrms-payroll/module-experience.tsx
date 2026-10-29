import Link from 'next/link';
import { moduleWorkflows } from './module-workflows';
import { BadgeCheck, Briefcase, CalendarDays, ChartColumn, ClipboardList, FileSearch, FileText, GitBranch, Layers3, ListChecks, QrCode, Search, SlidersHorizontal, Sparkles, UsersRound } from 'lucide-react';

type Feature = { title: string; description: string };
type Highlight = { title: string; description: string; points: string[]; visual: string };

const experiences: Record<'recruitment' | 'onboarding', {
  eyebrow: string; title: string; summary: string; features: Feature[]; highlights: Highlight[]; faqs: { question: string; answer: string }[];
}> = {
  recruitment: {
    eyebrow: 'Recruitment workflow',
    title: 'Bring every hiring decision into view.',
    summary: 'A considered hiring process starts with a clear vacancy and ends with a confident handoff. Map the stages, owners and information your team needs from requisition through selection.',
    features: [
      ['Recruitment Budgeting', 'Plan hiring spend and headcount around approved roles and positions.'],
      ['Vacancy Request Board', 'Keep requests, open roles and approval status visible to the people involved.'],
      ['User-Defined Candidate Fields', 'Capture candidate details that matter to your roles and evaluation process.'],
      ['Career Portal Integration', 'Plan career-page and sourcing connections around the channels your team uses.'],
      ['QR Code-Based Referrals', 'Give employees a simple way to share an opportunity with potential applicants.'],
      ['Resume Parser', 'Reduce repetitive profile entry by organizing information from candidate resumes.'],
      ['AI Resume Screening', 'Treat automated candidate matching as a capability to confirm for your deployment; keep people responsible for hiring decisions.'],
      ['Hiring Dashboard', 'Review hiring stages, pending actions and open positions in one place.'],
      ['Multi-Panel Interview Mapping', 'Coordinate interview rounds, panel members and structured feedback.'],
      ['Offer Letter Generation', 'Prepare offer documents from approved role and candidate details.'],
      ['Candidate Offer Acceptance', 'Give candidates a clear route to respond to an offer, subject to the configured workflow.'],
      ['Configurable Approval Workflows', 'Set decision ownership and approval stages to match internal hiring policy.'],
      ['Dynamic Report Builder', 'Review hiring activity with the fields and filters your team needs.'],
    ].map(([title, description]) => ({ title, description })),
    highlights: [
      { title: 'A clearer path from request to interview', description: 'Make the hiring sequence easier to follow by connecting open roles, candidate progress, interview plans and the next action.', points: ['Keep role requests and hiring stages visible', 'Coordinate interview ownership and feedback', 'Review progress before the next decision'], visual: '01 / HIRING PIPELINE' },
      { title: 'One workspace for candidate context', description: 'Bring candidate details, role information and communication milestones together so hiring teams can work from a shared view.', points: ['Organize candidate profiles around role needs', 'Keep selection notes with the hiring process', 'Prepare a consistent handoff to the joining team'], visual: '02 / CANDIDATE REVIEW' },
    ],
    faqs: [
      { question: 'How can a team find candidates for a role?', answer: 'Candidate search fields and filters depend on the information captured and the configured recruitment workflow. Confirm the available filters against your deployment.' },
      { question: 'Can interviews be scheduled and coordinated?', answer: 'Interview stages and panel ownership can be mapped as part of the hiring process. Calendar connections and automated reminders should be confirmed for the proposed setup.' },
      { question: 'How do hiring teams follow candidate progress?', answer: 'A defined set of candidate stages helps teams review status and pending actions. The exact dashboard and reporting fields should be validated in a product walkthrough.' },
      { question: 'Does the workflow include resume parsing or AI screening?', answer: 'These are capability topics to verify with Indian Infotech before relying on them. Any automated screening should support human review and should not make hiring decisions on its own.' },
      { question: 'Can approvals and reports match our process?', answer: 'Approval ownership, hiring reports and available configuration depend on the selected product scope. Share your process so the team can confirm fit.' },
    ],
  },
  onboarding: {
    eyebrow: 'New joiner experience',
    title: 'Give every new joiner a more considered start.',
    summary: 'Coordinate joining information, responsibilities and progress around the way your organization welcomes people. The right workflow makes the next step clear to HR, managers and new employees.',
    features: [
      ['Digitalized Onboarding Process', 'Organize joining documents, information and review steps in a defined process.'],
      ['Pre-Onboard & Pre-Joined Status', 'Keep the period between offer acceptance and the joining date visible.'],
      ['Employee Joining Kit', 'Bring key joining information and checklist items together for a new employee.'],
      ['Task Assignment & Role-Based Access', 'Clarify who owns each onboarding action across HR and relevant teams.'],
      ['Automated Notifications & Reminders', 'Plan timely prompts for pending steps, subject to the configured workflow.'],
      ['HR Dashboard for New Joiners', 'Review joining progress, outstanding items and upcoming start dates.'],
    ].map(([title, description]) => ({ title, description })),
    highlights: [
      { title: 'A joining process people can follow', description: 'Give new employees and internal teams a shared view of the documents, checks and tasks that form the joining journey.', points: ['Make required steps easier to understand', 'Clarify document review and task ownership', 'Track items that need attention before day one'], visual: '01 / JOINING CHECKLIST' },
      { title: 'Prepare before the first day', description: 'Use the pre-joining period to set expectations and coordinate the information a new employee needs to get started.', points: ['Share the right joining information at the right time', 'Coordinate HR and manager responsibilities', 'Give new joiners a clearer sense of what comes next'], visual: '02 / BEFORE DAY ONE' },
    ],
    faqs: [
      { question: 'How can a digital onboarding process be organized?', answer: 'A joining workflow can bring together employee information, documents, assigned tasks and review steps. The exact process depends on the organization’s policies and product configuration.' },
      { question: 'Can HR track a new joiner’s progress?', answer: 'Progress can be organized around the joining steps and responsibilities selected for your process. Confirm the available dashboard and status views during a walkthrough.' },
      { question: 'Can joining information be shared before the start date?', answer: 'Pre-joining communication can be planned around your organization’s process. Confirm which employee-facing access and materials are supported in your deployment.' },
      { question: 'Can onboarding steps reflect company policy?', answer: 'The joining process should be mapped to your policies, roles and approval needs. Available configuration is confirmed during solution scoping.' },
      { question: 'Can new joiners provide feedback?', answer: 'Feedback collection is not assumed as a standard capability. Discuss the requirement with Indian Infotech to confirm whether it is supported in your product scope.' },
    ],
  },
};

const featureIcons = {
  recruitment: [Briefcase, ClipboardList, SlidersHorizontal, Layers3, QrCode, FileSearch, Sparkles, ChartColumn, UsersRound, FileText, BadgeCheck, GitBranch, Search],
  onboarding: [FileText, CalendarDays, ListChecks, UsersRound, BadgeCheck, ChartColumn],
};

export function ModuleExperience({ kind }: { kind: string }) {
  const page = experiences[kind as keyof typeof experiences] ?? moduleWorkflows[kind as keyof typeof moduleWorkflows];
  const icons = featureIcons[kind as keyof typeof featureIcons] ?? featureIcons.onboarding;
  return <>
    <section className="hrms-intro section"><div className="hrms-intro-copy"><p className="section-kicker">{page.eyebrow}</p><h2>{page.title}</h2><p>{page.summary}</p><Link className="button button-primary" href={`/contact?hrms=${kind}`}>Discuss your workflow <span aria-hidden="true">↗</span></Link></div><div className="hrms-flow-art" aria-label="Illustrative workflow showing a sequence of team decisions"><div className="hrms-flow-label">INDIAN INFOTECH · HRMS</div><div className="hrms-flow-line"><span>01</span><i /><span>02</span><i /><span>03</span></div><b>{kind === 'recruitment' ? 'Role → Review → Decision' : kind === 'onboarding' ? 'Prepare → Coordinate → Welcome' : 'Record → Review → Handoff'}</b><small>Illustrative process · confirm available product functions</small></div></section>
    <section className="hrms-feature-section section" aria-labelledby="hrms-features-title"><div className="section-heading"><p className="section-kicker">Workflow capabilities</p><h2 id="hrms-features-title">The details that move the process forward.</h2><p>Discuss these workflow topics with the Indian Infotech team and confirm fit against your product scope.</p></div><div className={`hrms-feature-grid ${kind === 'onboarding' ? 'hrms-feature-grid-six' : ''}`}>{page.features.map((feature, i) => { const Icon = icons[i % icons.length]; return <article className="hrms-feature-card" key={feature.title}><div className="hrms-feature-mark"><Icon aria-hidden="true" /><span>{String(i + 1).padStart(2, '0')}</span></div><h3>{feature.title}</h3><p>{feature.description}</p></article>; })}</div></section>
    <section className="hrms-highlights section"><div className="section-heading"><p className="section-kicker">Designed around handoffs</p><h2>Make the next step easier to see.</h2></div>{page.highlights.map((highlight, i) => <article className={`hrms-highlight ${i % 2 ? 'hrms-highlight-reverse' : ''}`} key={highlight.title}><div className="hrms-highlight-visual" aria-hidden="true"><WorkflowIllustration kind={kind} index={i} label={highlight.visual} /></div><div className="hrms-highlight-copy"><p className="section-kicker">0{i + 1} / Workflow</p><h3>{highlight.title}</h3><p>{highlight.description}</p><ul>{highlight.points.map((point) => <li key={point}>{point}</li>)}</ul></div></article>)}</section>
    <section className="hrms-faq section" aria-labelledby="hrms-faq-title"><div className="section-heading"><p className="section-kicker">Questions to scope</p><h2 id="hrms-faq-title">Start with the process you need to support.</h2></div><div className="hrms-faq-list">{page.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
    <section className="route-feature-band hrms-cta"><div><p className="section-kicker light">Plan your HRMS workflow</p><h2>Bring your process and the questions your team needs answered.</h2><p>Indian Infotech can review the requirement and confirm the relevant product scope with you.</p></div><Link className="button button-primary" href={`/contact?hrms=${kind}`}>Talk to our team <span aria-hidden="true">↗</span></Link></section>
  </>;
}

function WorkflowIllustration({ kind, index, label }: { kind: string; index: number; label: string }) {
  const steps = kind === 'onboarding'
    ? index === 0 ? ['Joining details', 'Document review', 'HR verification'] : ['Welcome information', 'Team introduction', 'Induction plan']
    : kind === 'recruitment'
      ? index === 0 ? ['Role request', 'Candidate review', 'Interview plan'] : ['Candidate profile', 'Panel feedback', 'Selection handoff']
      : ['Record information', 'Team review', 'Approved handoff'];
  const Icon = kind === 'onboarding' ? index === 0 ? FileText : CalendarDays : kind === 'recruitment' ? index === 0 ? GitBranch : UsersRound : ClipboardList;
  return <div className="hrms-visual-window"><span>{label}</span><div className="hrms-illustration-heading"><Icon /><b>{kind === 'onboarding' ? index === 0 ? 'Joining documents' : 'Before the first day' : kind === 'recruitment' ? index === 0 ? 'Hiring journey' : 'Candidate context' : 'Workflow overview'}</b></div><ol className="hrms-illustration-steps">{steps.map((step, i) => <li key={step}><span>{String(i + 1).padStart(2, '0')}</span>{step}<i /></li>)}</ol><small>Illustrative workflow</small></div>;
}
