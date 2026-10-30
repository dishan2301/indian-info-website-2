import Link from 'next/link';
import styles from './faq.module.css';

const faqs = [
  {
    question: 'What can we manage with this HRMS and payroll platform?',
    answer: [
      'The platform connects employee records, attendance, leave, payroll and employee self-service, with additional workflows for recruitment, onboarding, performance, expenses and exit administration. Your team can work from connected records rather than repeatedly updating separate spreadsheets.',
      'The modules and rollout order are agreed around your needs. During the demo, ask to follow a complete example—from employee setup and attendance to a manager approval and payroll review—so you can see how your daily work would fit.',
    ],
  },
  {
    question: 'Can we connect our biometric devices and let employees use their phones?',
    answer: [
      'Supported biometric inputs can feed attendance and payroll preparation. Compatibility depends on the device model, connection method and deployment, so share your existing device details and locations for a check before deciding whether any hardware needs to change.',
      'Supported mobile self-service gives employees access to personal HR information and everyday requests. Ask to see the exact phone journeys you need, such as checking attendance, requesting leave or opening an available payslip. Available actions depend on the modules and permissions configured for your setup.',
    ],
  },
  {
    question: 'How do attendance, leave and salary calculations work together?',
    answer: [
      'Payroll preparation brings employee information, configured salary structures and approved attendance and leave inputs together for the salary period. Your team reviews missing punches, shift exceptions, payable time and salary adjustments before checking earnings and deductions.',
      'After review, supported payslips, bank payment files and finance outputs can be prepared. Bring a sample salary structure and a typical monthly exception to the demo. Confirm your calculation rules, approval steps, required statutory outputs and bank formats before live processing.',
    ],
  },
  {
    question: 'Can we move our existing data, and will our team receive training?',
    answer: [
      'Employee master data can be imported from Excel and agreed sources after field mapping and validation. Agree which employee records, opening balances and historical information are included, then check a sample import before moving the full dataset.',
      'Implementation timing depends on your modules, data quality, policies and integrations. Include role-based training, payroll validation and support arrangements in the rollout plan. Confirm training sessions, support channels, service hours and escalation contacts in the proposal so everyone knows how to get help.',
    ],
  },
  {
    question: 'How much will it cost, and what should we prepare for a demo?',
    answer: [
      'Request a quotation based on your employee count, locations, required modules, attendance devices and integration needs. Ask for recurring charges, implementation, migration, training and support to be listed clearly, including any optional work and how future employee growth is handled.',
      'For a useful demo, bring your device models, current HR tools, a sample shift or leave policy and the reports you need each month. Use anonymized examples for employee and payroll cases. The session should finish with a clear scope, confirmed capabilities and a list of any open checks.',
    ],
  },
];

export function HrmsFaq() {
  return <div className="hrms-page">
    <section className={`section hrms-faq ${styles.section}`} aria-labelledby="hrms-faq-title" id="faq">
      <div className="hrms-faq-intro">
        <p className="section-kicker">Before you choose your HRMS</p>
        <h2 id="hrms-faq-title">Your questions.<br /><em>Practical answers.</em></h2>
        <p>From “will our devices connect?” to “how will payroll work?”—explore the details your HR, payroll and management teams need before getting started.</p>
        <div className="hrms-faq-contact">
          <strong>Have a specific workflow in mind?</strong>
          <p>Bring your policies, device details and sample reports. We’ll help you check the fit in a focused demonstration.</p>
          <Link href="/contact?solution=hrms-payroll">Discuss your requirements <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className="hrms-faq-list">{faqs.map((item, index) => <details key={item.question} open={index === 0}>
        <summary><strong>{item.question}</strong><span aria-hidden="true">+</span></summary>
        {item.answer.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </details>)}</div>
    </section>
  </div>;
}
