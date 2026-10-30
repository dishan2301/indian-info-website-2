import Image from 'next/image';
import Link from 'next/link';
import { products } from '../content';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';
import styles from './visitor-management.module.css';
import interlock from './door-interlock.module.css';

const journey = [
  ['Request access', 'A person requests entry at the first door using the selected reader or request button.', 'Access requested'],
  ['Check the connected door', 'The controller checks the configured door-status inputs. Normal release waits until the other door is confirmed closed.', 'Other door closed'],
  ['Release the permitted door', 'The approved door is released for passage while the connected door remains secured under the normal sequence.', 'One door released'],
  ['Close, confirm and continue', 'After passage, the door closes and its status is confirmed. The next release can then follow the configured sequence.', 'Ready for next request'],
] as const;
const industries = [
  ['pharma', 'Pharma & clean areas', 'Coordinate passage through changing rooms and airlock entrances, with door sequencing planned around the facility’s operating procedure.', 'Gowning rooms · Controlled transitions'],
  ['healthcare', 'Healthcare & laboratories', 'Define a controlled transition into selected laboratory or support areas, with clear permissions and responsibility for exceptions.', 'Laboratory access · Authorised staff'],
  ['manufacturing', 'Manufacturing & engineering', 'Manage movement between production areas, inspection rooms and spaces where two connected doors need a defined sequence.', 'Production zones · Inspection rooms'],
  ['banking', 'Banking & secure offices', 'Review an interlocked entrance for selected restricted areas where entry needs a coordinated door sequence and staff oversight.', 'Restricted rooms · Supervised entry'],
  ['corporate', 'Corporate & technical spaces', 'Plan entry to selected technical or restricted rooms while keeping everyday reception and employee entrances straightforward.', 'Technical rooms · Restricted zones'],
  ['logistics', 'Warehouses & logistics', 'Consider coordinated doors at selected secure transitions, alongside separate plans for loading routes, staff entry and vehicle movement.', 'Secure transitions · Site boundaries'],
] as const;
const coreDevices = ['door-interlock-system', 'door-interlock-card-mb01', 'em-lock-600lbs', 'gs03-go-stop-push-button'];
const entranceSlugs = ['cmp-200', 'fbl-200', 'fbl-300', 'fht2300-series', 'ts200-series', 'd4330-metal-detector', 'tripod-barrier-heavy', 'f1000-series-flap-barrier', 'ind-300sb'];
const entranceUses: Record<string, string> = {
  'cmp-200': 'Organise vehicle entry at the outer gate with a boom barrier and the selected entry-control arrangement.',
  'fbl-200': 'Create a defined flap-barrier lane for approved pedestrian entry at a reception or staff entrance.',
  'fbl-300': 'Explore a flap-barrier lane for a planned pedestrian route and the site’s access-checking process.',
  'fht2300-series': 'Review a full-height turnstile for a perimeter or restricted pedestrian checkpoint.',
  'ts200-series': 'Organise routine pedestrian entry with a tripod turnstile and an appropriate reader configuration.',
  'd4330-metal-detector': 'Add a staffed walk-through screening point where the site’s security procedure requires screening.',
  'tripod-barrier-heavy': 'Consider a tripod barrier for a supervised pedestrian checkpoint with a defined entry route.',
  'f1000-series-flap-barrier': 'Review a flap-barrier entrance for a managed pedestrian lane at a lobby or site entry.',
  'ind-300sb': 'Consider a swing-barrier lane for controlled pedestrian movement and the selected access system.',
};

function DeviceCards({ slugs, entrance = false }: { slugs: string[]; entrance?: boolean }) {
  return <div className={entrance ? interlock.productGrid : styles.deviceGrid}>{slugs.map(slug => {
    const product = products.find(item => item.slug === slug);
    if (!product?.image) return null;
    return <article className={styles.deviceCard} key={slug}><Link className={styles.deviceImage} href={`/products/${slug}`}><Image src={product.image} alt={product.name} fill sizes="(max-width: 600px) 85vw, (max-width: 1000px) 40vw, 28vw" /></Link><p className={styles.kicker}>{product.authentication} · {product.application}</p><h3>{product.name}</h3><p>{entrance ? entranceUses[slug] : product.description}</p><Link className={styles.textLink} href={`/products/${slug}`}>View product details ↗</Link></article>;
  })}</div>;
}

export function DoorInterlockPage() {
  return <><SiteHeader /><main className={`${styles.page} ${interlock.page}`}>
    <section className={`${styles.hero} ${interlock.hero}`}><div className={styles.heroCopy}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/solutions">Solutions</Link><span>/ Door interlock system</span></nav>
      <p className={styles.kicker}>CONTROLLED MOVEMENT · CONNECTED DOORS</p><h1>One coordinated<br />sequence.<br /><em>Every doorway.</em></h1><p>A door interlock coordinates the release of connected doors. Plan how people request entry, how door status is checked and when the next door can open.</p>
      <div className={styles.actions}><Link className={styles.primary} href="/contact?solution=door-interlock-system">Plan your door interlock ↗</Link><a href="#interlock-workflow">See how it works ↓</a></div><div className={styles.summary}><span>Door sequencing</span><span>Status feedback</span><span>Controlled transitions</span></div>
    </div><div className={`${styles.heroVisual} ${interlock.heroVisual}`}><Image src="/campaign/core-systems/door-interlock-explained-v3.webp" alt="Two-door interlock: a visitor enters through open Door A while Door B stays closed and locked" fill priority sizes="(max-width:850px) 100vw, 50vw" /></div></section>

    <section className={styles.section} aria-labelledby="purpose-title"><p className={styles.kicker}>WHY USE AN INTERLOCK?</p><h2 id="purpose-title">Make the transition between areas deliberate.</h2><p className={styles.intro}>An access reader decides whether an entry request is permitted. An interlock adds coordination between connected doors, so normal operation follows the planned sequence.</p><div className={styles.detailGrid}>
      <article><h3>Coordinate connected doors</h3><p>Help avoid simultaneous normal release at a transition where door sequencing matters to daily operations.</p></article><article><h3>Use actual door status</h3><p>Plan status contacts and lock feedback so the sequence responds to the configured inputs, with an agreed process for a door left open.</p></article><article><h3>Give staff a clear process</h3><p>Define requests, permissions, release indications and exception handling before selecting the controller and door hardware.</p></article>
    </div></section>

    <section className={styles.wash} id="interlock-workflow" aria-labelledby="workflow-title"><div className={styles.section}><p className={styles.kicker}>HOW IT WORKS</p><h2 id="workflow-title">Follow a person through the doors.</h2><div className={interlock.sequence} aria-label="Illustrative normal door interlock sequence"><div><span>01 / DOOR A</span><strong>Approved release</strong><small>Person enters the transition area</small></div><span aria-hidden="true">→</span><div><span>02 / TRANSITION</span><strong>Close & confirm</strong><small>Door A returns to its closed state</small></div><span aria-hidden="true">→</span><div><span>03 / DOOR B</span><strong>Next permitted release</strong><small>Continue into the approved area</small></div></div>
      <ol className={styles.timeline}>{journey.map(([title, description, status], index) => <li key={title}><span className={styles.number}>0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div><span className={styles.status}>{status}</span></li>)}</ol><p className={styles.note}>The final sequence depends on the controller, door hardware and site rules. Emergency release, fire-system interfaces, power-loss behaviour and accessible egress must be resolved during site design.</p>
    </div></section>

    <section className={styles.section} aria-labelledby="industries-title"><p className={styles.kicker}>WHERE IT FITS</p><h2 id="industries-title">Different workplaces. A defined transition.</h2><p className={styles.intro}>Start with the area and its operating procedure. These are examples to assess with your facilities and security teams.</p><div className={styles.industryGrid}>{industries.map(([slug, title, description, context]) => <Link className={styles.industryCard} key={slug} href={`/industries/${slug}`}><div className={styles.industryImage}><Image src={`/campaign/industries/${slug}-desktop-v2.webp`} alt={`${title} industry environment`} fill sizes="(max-width:600px) 100vw, (max-width:1000px) 50vw, 33vw" /></div><div><p className={styles.kicker}>{context}</p><h3>{title} <span>↗</span></h3><p>{description}</p></div></Link>)}</div></section>

    <section className={styles.wash} aria-labelledby="hardware-title"><div className={styles.section}><p className={styles.kicker}>AT THE DOOR</p><h2 id="hardware-title">Build around the controller and the opening.</h2><p className={styles.intro}>Review the interlock system, control card, locking hardware and request devices. Confirm door count, mounting, electrical requirements and supported inputs for the selected configuration.</p><DeviceCards slugs={coreDevices} /><p className={styles.note}>Door-status contacts, suitable power supplies, release interfaces and readers are selected during design. The products shown are options for review; they are not a preconfigured kit.</p></div></section>

    <section className={styles.section} id="entrance-products" aria-labelledby="entrance-title"><p className={styles.kicker}>PLAN THE WIDER ENTRANCE</p><h2 id="entrance-title">From the outer gate to the controlled door.</h2><p className={styles.intro}>A site may need vehicle barriers, flap barriers, turnstiles or screening before someone reaches an interlocked area. Explore these entrance management products as part of the wider site plan.</p><div className={interlock.callout}><strong>Choose equipment for each checkpoint.</strong><p>Flap barriers manage a pedestrian lane; interlocks coordinate connected doors. Use each where it fits the journey. Any connection between systems needs a compatibility review.</p></div><DeviceCards slugs={entranceSlugs} entrance /></section>

    <section className={styles.wash} aria-labelledby="planning-title"><div className={styles.section}><p className={styles.kicker}>BEFORE YOU SELECT DEVICES</p><h2 id="planning-title">Start with your doors, people and rules.</h2><div className={styles.detailGrid}><article><h3>Map the opening</h3><p>Share the number of doors, direction of travel, door material, existing locks and the area each doorway serves.</p></article><article><h3>Define daily operation</h3><p>Decide who requests access, who grants permission, what happens when a door stays open and which team manages exceptions.</p></article><article><h3>Review the complete entrance</h3><p>Include pedestrian lanes, accessible routes, vehicle entry and screening so each checkpoint has a clear purpose.</p></article></div></div></section>
    <section className={styles.section}><div className={styles.cta}><div><p className={styles.kicker}>LET’S REVIEW YOUR SITE</p><h2>Bring your doorway plan.<br />We’ll map the sequence.</h2><p>Tell us about the connected areas, door count and existing entry equipment. Our team can review the workflow and suitable hardware with you.</p></div><div className={styles.ctaActions}><Link className={styles.primary} href="/contact?solution=door-interlock-system">Discuss your requirements ↗</Link><Link href="/products">Explore the product catalogue ↗</Link></div></div></section>
  </main><SiteFooter /></>;
}
