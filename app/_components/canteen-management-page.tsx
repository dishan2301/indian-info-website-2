import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Check, Fingerprint, CreditCard, Smartphone, Utensils, ShieldCheck, ChartNoAxesCombined, Building2, FileSpreadsheet, Users, Wallet, ChevronRight } from 'lucide-react';
import { StructuredData } from '@/components/structured-data';
import { absoluteUrl } from '@/lib/site';
import { companyProfile } from '@/lib/company-profile';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';
import styles from './canteen-management-page.module.css';

const demo = '/contact?software=canteen-management&resource=guided-demo';
const capabilities = [
  { icon: Fingerprint, title: 'One identity. A simpler meal.', text: 'Identify employees through supported biometric, card or app workflows. Bring meal records back to the person who used the service.' },
  { icon: ShieldCheck, title: 'Your subsidy. Your rules.', text: 'Configure meal entitlements around company policies, employee groups and meal periods, so the benefit follows the right people.' },
  { icon: Utensils, title: 'Menus that match the shift.', text: 'Organize daily and meal-wise menus with configurable time zones. Keep breakfast, lunch and dinner service clearly separated.' },
  { icon: Wallet, title: 'Flexible ways to account.', text: 'Support prepaid and postpaid operations. Review employee contributions alongside consumption for a clearer settlement process.' },
  { icon: Building2, title: 'More sites. One clear picture.', text: 'Manage multi-company, multi-location and multi-vendor operations, with consumption views for departments, vendors and items.' },
  { icon: FileSpreadsheet, title: 'Records finance can work with.', text: 'Review consumption reports and export records to Excel or PDF. Discuss payroll or ERP deductions around your existing process.' },
];
const faqs = [
  { question: 'Can we use biometric devices or employee cards?', answer: 'The published system supports biometric, card-based and app-based workflows. We’ll review your existing devices and credentials to confirm compatibility before recommending a setup.' },
  { question: 'Can different employees have different meal benefits?', answer: 'Meal entitlements and customized benefits can be configured around company policies. In the demo, we’ll map your employee groups, meal periods, contribution rules and exceptions.' },
  { question: 'Does it work across multiple canteens and vendors?', answer: 'The published scope includes multiple companies, locations and vendors, with consumption tracking by employee, vendor, item and department.' },
  { question: 'Can meal deductions connect to payroll or ERP?', answer: 'Payroll and ERP deductions are part of the published integration scope. The supported connection, data fields, deduction cycle and reconciliation process are confirmed for your selected software version and existing system.' },
  { question: 'What happens if connectivity is interrupted?', answer: 'The legacy system describes local data storage during network interruptions. Offline behavior, supported terminals and synchronization need to be confirmed for the proposed deployment.' },
  { question: 'How is pricing decided?', answer: 'Your quote is based on employee count, service points, locations, identification devices, software configuration and integrations. Share your canteen requirements so our team can recommend an appropriate setup and commercial plan.' },
];

export function CanteenManagementPage() {
  return <main className={styles.page}>
    <SiteHeader />
    <StructuredData data={{ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Canteen Management System', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: absoluteUrl('/software/canteen-management'), description: 'Manage employee identification, meal entitlements, consumption records and canteen reconciliation with Indian Infotech.', provider: { '@type': 'Organization', name: 'Indian Infotech', url: absoluteUrl('/') } }} />
    <StructuredData data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) }} />
    <section className={styles.hero} aria-labelledby="canteen-title">
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span /> INDIAN INFOTECH / CANTEEN MANAGEMENT</p>
          <h1 id="canteen-title">Serve the meal.<br />Skip the paperwork.<br /><em>Know the cost.</em></h1>
          <p className={styles.lead}>Turn everyday meal service into a connected workflow—from employee identification to subsidies, consumption and reconciliation.</p>
          <div className={styles.actions}><Link className={styles.primary} href={demo}>Book a canteen demo <ArrowUpRight size={17} /></Link><a className={styles.secondary} href="#canteen-workflow">See how it works <span>↓</span></a></div>
          <div className={styles.heroChecks}><span><Check size={14} /> Paperless meal records</span><span><Check size={14} /> Policy-based entitlements</span><span><Check size={14} /> Multi-location visibility</span></div>
        </div>
        <div className={styles.productVisual}>
          <div className={styles.browser}><span><i /><i /><i /></span><small>CANTEEN WORKSPACE</small><ShieldCheck size={13} /></div>
          <div className={styles.workspace}>
            <aside className={styles.sidebar} aria-hidden="true"><b>ii<span>.</span></b><Utensils /><Users /><Wallet /><ChartNoAxesCombined /><Building2 /></aside>
            <div className={styles.dashboard}>
              <div className={styles.dashHeader}><div><small>OPERATIONS OVERVIEW</small><h2>A good day, served.</h2></div><span>Lunch service <i /></span></div>
              <div className={styles.metrics}>{[['Meals served', '842', 'Today’s consumption'], ['Company subsidy', '₹25,260', 'At ₹30 per meal'], ['Employee share', '₹16,840', 'At ₹20 per meal']].map(([label, value, note]) => <div key={label}><small>{label}</small><strong>{value}</strong><span>{note}</span></div>)}</div>
              <div className={styles.chartCard}><div><b>Meal service at a glance</b><span>Breakfast · Lunch · Dinner</span></div><div className={styles.chart} aria-hidden="true">{[30,48,39,57,70,53,83,95,76,60,43,28].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div><div className={styles.chartLabels}><span>07:00</span><span>12:00</span><span>15:00</span><span>20:00</span></div></div>
              <div className={styles.recordHeading}><b>Recent meal records</b><span>All service points <ChevronRight size={10} /></span></div>
              <div className={styles.records}>{[['AM', 'Aarav Mehta', 'Production', 'Lunch'], ['PS', 'Priya Shah', 'Administration', 'Lunch'], ['RK', 'Rohan Kumar', 'Maintenance', 'Lunch']].map(([initials, name, department, meal]) => <div key={name}><span className={styles.avatar}>{initials}</span><span><b>{name}</b><small>{department}</small></span><span>{meal}</span><strong>Recorded <Check size={10} /></strong></div>)}</div>
            </div>
          </div>
          <div className={styles.mealReceipt}><span className={styles.receiptIcon}><Fingerprint size={24} /></span><div><small>EMPLOYEE IDENTIFIED</small><strong>Lunch entitlement confirmed</strong><span>Meal recorded · Employee contribution ₹20</span></div><Check size={18} /></div>
          <p className={styles.caption}>Illustrative workspace and sample data. Final interface varies by configuration.</p>
        </div>
      </div>
    </section>
    <div className={styles.modeBar}><span>ONE CONNECTED MEAL WORKFLOW</span><span><Fingerprint /> Biometric</span><span><CreditCard /> Employee card</span><span><Smartphone /> App-based</span><span><Building2 /> Multiple locations</span></div>

    <section className={styles.section}>
      <div className={styles.sectionHeading}><p className={styles.kicker}>LESS ADMIN. MORE ACCOUNTABILITY.</p><h2>Your canteen feeds people.<br />It should also give you answers.</h2><p>Who used the service? Which subsidy applied? What should the vendor bill? Bring those answers into the same operating record.</p></div>
      <div className={styles.outcomes}>{[
        ['01', 'Move beyond paper coupons.', 'Replace manual coupon handling and scattered registers with identification and recorded meal transactions.'],
        ['02', 'Make every meal count.', 'Link consumption to employees, departments and meal periods. Give teams a clearer basis for planning and checking usage.'],
        ['03', 'Close the month with clarity.', 'Review employee contributions and vendor consumption from organized records, with reports your finance team can use.'],
      ].map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>

    <section className={styles.workflowSection} id="canteen-workflow">
      <div className={styles.workflowGrid}><div className={styles.workplaceImage}><Image src="/campaign/product-moments/canteen-management-v1.png" alt="Employee at a workplace canteen service point" fill sizes="(max-width: 850px) 100vw, 45vw" /><div><Utensils size={20} /><strong>From the first meal<br />to the final reconciliation.</strong></div></div><div className={styles.workflowCopy}><p className={styles.kicker}>A SIMPLE DAILY FLOW</p><h2>Identify. Validate.<br />Serve. Reconcile.</h2><ol>{[
        ['Identify the employee', 'Use a supported biometric, card or app workflow at the service point.'],
        ['Apply the meal policy', 'Check the meal period, entitlement and employee contribution.'],
        ['Record the meal', 'Capture consumption against the employee, item and vendor.'],
        ['Review and reconcile', 'Use reports to check totals and prepare the agreed settlement or deduction process.'],
      ].map(([title, text], index) => <li key={title}><span>{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></div>
    </section>

    <section className={styles.section} id="canteen-features"><div className={styles.sectionHeading}><p className={styles.kicker}>THE CONTROLS BEHIND A SMOOTHER SERVICE</p><h2>Built around the way<br />your canteen runs.</h2><p>Connect the people at the counter with the teams managing policies, costs and daily operations.</p></div><div className={styles.features}>{capabilities.map(({ icon: Icon, title, text }) => <article key={title}><span className={styles.featureIcon}><Icon size={23} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className={styles.teamSection}><div className={styles.section}><div className={styles.sectionHeading}><p className={styles.kicker}>A SHARED RECORD. A CLEARER DAY.</p><h2>Give every team<br />something useful.</h2></div><div className={styles.teams}>{[
      ['HR & administration', 'Benefits that follow your policy.', 'Organize employee meal entitlements and review consumption by department and location.', Users],
      ['Finance & management', 'A clearer view of the meal bill.', 'Review company subsidies, employee contributions and vendor usage before reconciliation.', ChartNoAxesCombined],
      ['Canteen & vendors', 'More focus on serving people.', 'Use meal-wise menus and recorded transactions to reduce manual handling at the service point.', Utensils],
    ].map(([label, title, text, Icon]) => { const TeamIcon = Icon as typeof Users; return <article key={String(label)}><TeamIcon size={24} /><small>{String(label)}</small><h3>{String(title)}</h3><p>{String(text)}</p></article>; })}</div></div></section>

    <section className={styles.section}><div className={styles.connected}><div><p className={styles.kicker}>PART OF YOUR CONNECTED WORKPLACE</p><h2>The meal record shouldn’t<br />be the end of the story.</h2><p>Discuss how canteen consumption can support your payroll or ERP deduction process. We’ll map the supported data flow, contribution rules and reconciliation cycle with your team.</p><Link className={styles.textLink} href="/contact?software=canteen-management&topic=payroll-erp-integration">Discuss your integration <ArrowUpRight size={16} /></Link></div><div className={styles.connectionFlow}><span><Utensils /> Canteen consumption</span><i>↓</i><span><ShieldCheck /> Reviewed contribution records</span><i>↓</i><span><FileSpreadsheet /> Payroll / ERP deduction process</span><p>Connection and compatibility confirmed during solution design.</p></div></div></section>

    <section className={`${styles.section} ${styles.faq}`}><div><p className={styles.kicker}>BEFORE YOU CHOOSE</p><h2>Your canteen.<br />Your questions.</h2><p>Let’s work through the details that matter to your people and service points.</p><a className={styles.textLink} href={companyProfile.phoneHref}>Talk to our team <ArrowUpRight size={16} /></a></div><div>{faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>

    <section className={styles.finalSection}><div className={styles.finalCta}><div><p className={styles.eyebrow}>MAKE YOUR NEXT MEAL SERVICE A BETTER ONE</p><h2>Bring your canteen workflow.<br />We’ll show you a clearer way.</h2><p>Tell us your employee count, locations, meal policies and current process. See how the right setup could work for your organization.</p><div className={styles.actions}><Link className={styles.primary} href={demo}>Book your canteen demo <ArrowUpRight size={17} /></Link><a className={styles.secondary} href={companyProfile.phoneHref}>{companyProfile.phoneDisplay}</a></div><small>Walk through identification, entitlements, reports and your integration requirements.</small></div><div className={styles.ctaArt} aria-hidden="true"><Utensils size={55} /><span>People → Meals → Records</span></div></div></section>
    <SiteFooter />
  </main>;
}
