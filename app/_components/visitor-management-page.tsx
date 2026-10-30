import Image from 'next/image';
import Link from 'next/link';
import { products } from '../content';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';
import styles from './visitor-management.module.css';

const steps = [
  ['Register the visitor', 'Reception records the visitor’s name, organisation, contact details, person to meet and purpose of visit. An expected visitor can be registered before arrival.', 'Registration received'],
  ['Request permission', 'Send the visit request to the host or designated authority. Security can review the request while the visitor waits at reception.', 'Awaiting approval'],
  ['Authority reviews and approves', 'The authorised person reviews the purpose, visiting time and destination, then approves or declines. A declined request stays outside the entry workflow.', 'Approved / Declined'],
  ['Create the visitor pass', 'After approval, issue a visitor pass with the visitor’s details, host, permitted area and validity window. Choose a printed badge or digital pass for the site’s process.', 'Pass issued'],
  ['Verify and record entry', 'Security checks the approved pass and identity under site policy, records the arrival time and directs the visitor to the host. Add escort requirements where needed.', 'Checked in'],
  ['Meet the host and complete the work', 'The visitor attends the meeting or carries out the approved work. Keep the visit open until departure; changes to the destination or visit duration need the required authorisation.', 'On site'],
  ['Return the pass and check out', 'On return to security or reception, collect the reusable pass or badge, record the departure time and close the visit. Mark the status Returned / Checked out so the visitor no longer appears on site.', 'Returned / Checked out'],
] as const;

const industries = [
  ['corporate', 'Corporate offices', 'Welcome interview candidates, clients and service partners with host approval and a clear reception handoff.'],
  ['manufacturing', 'Manufacturing plants', 'Review vendor and maintenance visits, define the work area and record departure at the gate.'],
  ['pharma', 'Pharma & research', 'Route visits to the responsible authority and plan escort requirements for controlled areas.'],
  ['education', 'Schools & campuses', 'Coordinate parent, guest and supplier visits with the office or department they are meeting.'],
  ['healthcare', 'Hospitals & healthcare', 'Plan vendor and administrative visits around department permissions and local visitor rules.'],
  ['logistics', 'Warehouses & logistics', 'Coordinate delivery partners, contractors and site visits with the responsible operations team.'],
] as const;

const deviceOptions = [
  ['i-18', 'At controlled doors', 'Explore a door access reader for areas beyond reception when the approved visit requires controlled entry.'],
  ['ai-35', 'At identity checkpoints', 'Consider a face terminal where site policy calls for enrolled identity checks. Confirm visitor enrolment and data handling requirements.'],
  ['ts200-series', 'At pedestrian entrances', 'Consider a turnstile for a managed pedestrian lane with security supervision and an accessible alternate route.'],
  ['f1000-series-flap-barrier', 'At a reception lobby', 'Explore a flap barrier for a defined visitor entry lane after reception has verified the pass.'],
] as const;

export function VisitorManagementPage() {
  return <><SiteHeader /><main className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/solutions">Solutions</Link><span>/ Visitor management</span></nav>
        <p className={styles.kicker}>VISITOR MANAGEMENT</p>
        <h1>Every visitor.<br />Approved, welcomed,<br /><em>accounted for.</em></h1>
        <p>From the first permission request to the returned pass, give reception, security and your host one clear visitor journey.</p>
        <div className={styles.actions}><Link className={styles.primary} href="/contact?solution=visitor-management">Plan your visitor workflow ↗</Link><a href="#visitor-journey">Follow a visit ↓</a></div>
        <div className={styles.summary}><span>Host approval</span><span>Visitor passes</span><span>Entry & return records</span></div>
      </div>
      <div className={styles.heroVisual}><Image src="/campaign/product-moments/visitor-management-v2.png" alt="Visitor reception and check-in at a workplace" fill priority sizes="(max-width: 850px) 100vw, 52vw" /><div className={styles.visitCard}><span>THE VISIT LIFECYCLE</span><strong>Requested → Approved → On site</strong><p>Return pass. Record departure. Close the visit.</p><b>✓ Returned / Checked out</b></div></div>
    </section>

    <section className={styles.section} id="visitor-journey" aria-labelledby="journey-title">
      <p className={styles.kicker}>FROM ARRIVAL TO RETURN</p><h2 id="journey-title">A clear next step for everyone.</h2><p className={styles.intro}>A suggested workflow to configure around your approval rules, reception team and security policy.</p>
      <ol className={styles.timeline}>{steps.map(([title, description, status], index) => <li key={title}><span className={styles.number}>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{description}</p></div><span className={styles.status}>{status}</span></li>)}</ol>
    </section>

    <section className={styles.wash} aria-labelledby="visibility-title"><div className={styles.section}><p className={styles.kicker}>KEEP THE DAILY RECORD CLEAR</p><h2 id="visibility-title">Know who is waiting, on site, or returned.</h2><div className={styles.detailGrid}>
      <article><h3>Reception & security</h3><p>Review pending requests, check the approved visitor details, issue passes and confirm arrival and return times.</p></article>
      <article><h3>Hosts & authorities</h3><p>Review who wants to visit and why. Decide on permission before entry, and define the destination and visit window.</p></article>
      <article><h3>Visit records</h3><p>Plan records for the host, purpose, decision, pass reference, entry time, departure time and final status. Review overdue visits with security.</p></article>
    </div></div></section>

    <section className={styles.section} aria-labelledby="industries-title"><p className={styles.kicker}>WHERE IT FITS</p><h2 id="industries-title">Built around the place you welcome people.</h2><p className={styles.intro}>Use the same approval-to-return journey, with rules that reflect the people and areas at your site.</p><div className={styles.industryGrid}>{industries.map(([slug, title, description]) => <Link className={styles.industryCard} href={`/industries/${slug}`} key={slug}><div className={styles.industryImage}><Image src={`/campaign/industries/${slug}-desktop-v2.webp`} alt={`${title} workplace and visitor environment`} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" /></div><div><h3>{title} <span>↗</span></h3><p>{description}</p></div></Link>)}</div></section>

    <section className={styles.wash} aria-labelledby="devices-title"><div className={styles.section}><p className={styles.kicker}>EXPLORE ALONGSIDE VISITOR MANAGEMENT</p><h2 id="devices-title">Match the entrance to the visitor journey.</h2><p className={styles.intro}>Start with reception and approval, then consider the hardware your entrance needs. These are options to review with our team; software integration, supported credentials and pass validation depend on the selected configuration.</p><div className={styles.deviceGrid}>{deviceOptions.map(([slug, label, description]) => {
      const product = products.find(item => item.slug === slug);
      if (!product?.image) return null;
      return <article className={styles.deviceCard} key={slug}><Link href={`/products/${slug}`} className={styles.deviceImage}><Image src={product.image} alt={product.name} fill sizes="(max-width: 600px) 85vw, (max-width: 1000px) 40vw, 22vw" /></Link><p className={styles.kicker}>{label}</p><h3>{product.name}</h3><p>{description}</p><Link className={styles.textLink} href={`/products/${slug}`}>Explore device ↗</Link></article>;
    })}</div><p className={styles.note}>Also discuss reception tablets, QR readers and badge printers if your pass format needs them. Confirm the supported model and connection before purchase.</p></div></section>

    <section className={styles.section}><div className={styles.cta}><div><p className={styles.kicker}>PLAN YOUR RECEPTION & GATE</p><h2>Who approves a visit at your site?</h2><p>Tell us about your entrances, approving authorities, visitor types and pass-return process. We’ll help map the workflow and review suitable device options.</p></div><div className={styles.ctaActions}><Link className={styles.primary} href="/contact?solution=visitor-management">Discuss your requirements ↗</Link><Link href="/software/visitor-management">Explore visitor software ↗</Link></div></div></section>
  </main><SiteFooter /></>;
}
