import Image from 'next/image';
import Link from 'next/link';
import { products } from '../content';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';
import styles from './visitor-management.module.css';

const steps = [
  ['Register the visitor', 'Capture visitor details, a photograph and ID proof. Schedule appointments with the host before arrival, or register the visitor at reception.', 'Registration received'],
  ['Request permission', 'Notify the host on arrival through SMS, email or WhatsApp and route the visit for approval. Plan the notification gateways as part of deployment.', 'Awaiting approval'],
  ['Authority reviews and approves', 'The authorised person reviews the purpose, visiting time and destination, then approves or declines. A declined request stays outside the entry workflow.', 'Approved / Declined'],
  ['Create the visitor pass', 'Print a visitor badge or pass in real time with the visitor’s photograph and visit details. Security uses the approved visit record for the reception handoff.', 'Pass issued'],
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
        <p className={styles.kicker}>EASYVISIT · ON-PREMISES VISITOR MANAGEMENT</p>
        <h1>Every visitor.<br />Approved, welcomed,<br /><em>accounted for.</em></h1>
        <p>EasyVisit connects visitor registration, host approval, photo badge printing and entry-exit records. Installed within your network, it keeps visitor data at your premises.</p>
        <div className={styles.actions}><Link className={styles.primary} href="/contact?solution=visitor-management">Book an EasyVisit demo ↗</Link><a href="#visitor-journey">Follow a visit ↓</a></div>
        <div className={styles.summary}><span>On-premises deployment</span><span>Local SQL Server storage</span><span>Web & Android access</span></div>
      </div>
      <div className={styles.heroVisual}><Image src="/campaign/product-moments/visitor-management-v2.png" alt="Visitor reception and check-in at a workplace" fill priority sizes="(max-width: 850px) 100vw, 52vw" /><div className={styles.visitCard}><span>THE VISIT LIFECYCLE</span><strong>Requested → Approved → On site</strong><p>Return pass. Record departure. Close the visit.</p><b>✓ Returned / Checked out</b></div></div>
    </section>

    <section className={styles.section} id="visitor-journey" aria-labelledby="journey-title">
      <p className={styles.kicker}>FROM ARRIVAL TO RETURN</p><h2 id="journey-title">A clear next step for everyone.</h2><p className={styles.intro}>A suggested workflow to configure around your approval rules, reception team and security policy.</p>
      <ol className={styles.timeline}>{steps.map(([title, description, status], index) => <li key={title}><span className={styles.number}>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{description}</p></div><span className={styles.status}>{status}</span></li>)}</ol>
    </section>

    <section className={styles.wash} aria-labelledby="visibility-title"><div className={styles.section}><p className={styles.kicker}>KEEP THE DAILY RECORD CLEAR</p><h2 id="visibility-title">Know who is waiting, on site, or returned.</h2><div className={styles.detailGrid}>
      <article><h3>Reception & security</h3><p>Use the real-time admin and security dashboard to monitor visitor movement, review visit details and track entry and exit.</p></article>
      <article><h3>Hosts & authorities</h3><p>Schedule appointments, receive arrival alerts by SMS, email or WhatsApp, and approve visits through the host-based workflow.</p></article>
      <article><h3>Visit records</h3><p>Generate visitor reports and export records in Excel, PDF or CSV. Produce an instant list of visitors on site for emergency evacuation reporting.</p></article>
    </div></div></section>

    <section className={styles.section} aria-labelledby="features-title">
      <p className={styles.kicker}>EASYVISIT CAPABILITIES</p><h2 id="features-title">From a scheduled visit to a live site overview.</h2>
      <div className={styles.detailGrid}>
        <article><h3>Registration & photo badges</h3><p>Capture personal details, a photograph and ID proof, then print a badge with the photo and visit details.</p></article>
        <article><h3>Blacklist & watchlist</h3><p>Maintain a blacklist or watchlist to help security identify and monitor unwanted visitors.</p></article>
        <article><h3>Multiple locations</h3><p>Manage visitor activity centrally across multiple office locations with multi-site support.</p></article>
        <article><h3>Browser & Android access</h3><p>Admin and security teams can use the web interface or Android app for visitor check-in and monitoring.</p></article>
        <article><h3>Role-based access</h3><p>Control system access through role-based access control (RBAC), with data stored locally at your premises.</p></article>
        <article><h3>Optional self check-in</h3><p>Add the self check-in kiosk module when visitors need to register themselves at reception.</p></article>
      </div>
    </section>

    <section className={styles.wash} aria-labelledby="package-title"><div className={styles.section}>
      <p className={styles.kicker}>THE EASYVISIT PACKAGE</p><h2 id="package-title">Software and reception essentials, together.</h2>
      <div className={styles.detailGrid}>
        <article><h3>Locally hosted software</h3><p>EasyVisit on-premises software license, web-based user interface and a locally hosted Microsoft SQL Server database.</p></article>
        <article><h3>Reception equipment</h3><p>A 10-inch Android display screen for security check, a web camera and a visitor badge printer.</p></article>
        <article><h3>Included access & licensing</h3><p>Admin dashboard access for 2 users and visitor license support for up to 1,000 users.</p></article>
      </div>
      <p className={styles.note}>Access device integration and the self check-in kiosk module are optional. Confirm the selected hardware, modules and licensing scope in your proposal.</p>
    </div></section>

    <section className={styles.section} aria-labelledby="deployment-title">
      <p className={styles.kicker}>DEPLOYMENT & SYSTEM REQUIREMENTS</p><h2 id="deployment-title">Hosted inside your network. Ready for your team.</h2>
      <p className={styles.intro}>EasyVisit is a browser-accessible application with local data storage and an Android app for check-in and monitoring. It supports the latest versions of Google Chrome and Microsoft Edge.</p>
      <dl className={styles.specifications}>
        {[['Deployment', 'On-premises, installed within the client’s network'], ['Database', 'Microsoft SQL Server, hosted locally'], ['Processor', 'Intel i7 (latest generation) or Xeon (4+ cores)'], ['Memory', '32 GB DDR4 RAM'], ['Storage', '1 TB SSD'], ['Operating system', 'Windows 11 Pro / Windows Server 2022 (or latest)'], ['Internet & gateway', 'Internet required for SMS and email notifications; gateway provided by the client']].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
      </dl>
      <p className={styles.note}>The server and minimum system requirements above are client-provided. Review network access, notification gateways and the Android deployment with our team before installation.</p>
    </section>

    <section className={styles.section} aria-labelledby="industries-title"><p className={styles.kicker}>WHERE IT FITS</p><h2 id="industries-title">Built around the place you welcome people.</h2><p className={styles.intro}>Use the same approval-to-return journey, with rules that reflect the people and areas at your site.</p><div className={styles.industryGrid}>{industries.map(([slug, title, description]) => <Link className={styles.industryCard} href={`/industries/${slug}`} key={slug}><div className={styles.industryImage}><Image src={`/campaign/industries/${slug}-desktop-v2.webp`} alt={`${title} workplace and visitor environment`} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" /></div><div><h3>{title} <span>↗</span></h3><p>{description}</p></div></Link>)}</div></section>

    <section className={styles.wash} aria-labelledby="devices-title"><div className={styles.section}><p className={styles.kicker}>EXPLORE ALONGSIDE EASYVISIT · ON-PREMISES VISITOR MANAGEMENT</p><h2 id="devices-title">Match the entrance to the visitor journey.</h2><p className={styles.intro}>Start with reception and approval, then consider the hardware your entrance needs. These are options to review with our team; software integration, supported credentials and pass validation depend on the selected configuration.</p><div className={styles.deviceGrid}>{deviceOptions.map(([slug, label, description]) => {
      const product = products.find(item => item.slug === slug);
      if (!product?.image) return null;
      return <article className={styles.deviceCard} key={slug}><Link href={`/products/${slug}`} className={styles.deviceImage}><Image src={product.image} alt={product.name} fill sizes="(max-width: 600px) 85vw, (max-width: 1000px) 40vw, 22vw" /></Link><p className={styles.kicker}>{label}</p><h3>{product.name}</h3><p>{description}</p><Link className={styles.textLink} href={`/products/${slug}`}>Explore device ↗</Link></article>;
    })}</div><p className={styles.note}>The package includes a 10-inch Android display, web camera and badge printer. Access device integration is optional; confirm the supported model and connection for any additional entrance hardware.</p></div></section>

    <section className={styles.section}><div className={styles.cta}><div><p className={styles.kicker}>PLAN YOUR RECEPTION & GATE</p><h2>Who approves a visit at your site?</h2><p>Tell us about your reception, office locations and host approval process. We’ll review the EasyVisit package, your local server and notification gateways, plus any optional kiosk or access-device integration.</p></div><div className={styles.ctaActions}><Link className={styles.primary} href="/contact?solution=visitor-management">Discuss your requirements ↗</Link><Link href="/software/visitor-management">Explore visitor software ↗</Link></div></div></section>
  </main><SiteFooter /></>;
}
