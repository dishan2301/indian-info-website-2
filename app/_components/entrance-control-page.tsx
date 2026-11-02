import Image from 'next/image';
import Link from 'next/link';
import { StructuredData } from '@/components/structured-data';
import { products } from '../content';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';
import { SolutionHero, SolutionHeading, SolutionFaq } from './solution-page-parts';
import s from './solution-detail.module.css';

const equipment = [
  { slug: 'fbl-200', type: 'Office & reception', title: 'Flap barriers', text: 'Guide pedestrian entry through a defined lane. Pair the selected barrier with a compatible reader and controller for staff and visitor authorization.' },
  { slug: 'ts200-series', type: 'Staff & contractor entry', title: 'Tripod turnstiles', text: 'Organize individual pedestrian passage at supervised entry points. Plan lane capacity around shift arrivals and provide a separate accessible route.' },
  { slug: 'fht2300-series', type: 'Perimeter entry', title: 'Full-height turnstiles', text: 'Create a physically defined pedestrian passage at controlled boundaries. Review supervision, weather exposure and emergency exit arrangements.' },
  { slug: 'cmp-200', type: 'Vehicle gates', title: 'Boom barriers', text: 'Control a vehicle lane at the gate. Define who authorizes entry, how vehicles are detected, and how pedestrians cross the area safely.' },
];
const steps = [
  ['Identify the person', 'A person presents a supported credential to the reader. The selected device may use a card or biometric method; visitors follow the agreed check-in process.'],
  ['Check the permission', 'The access system checks the assigned gate, permitted time and authorization rules. An attendance punch alone does not define where someone may enter.'],
  ['Release the lane', 'A compatible controller sends the release signal to the barrier or turnstile. Lane operation, passage sensing and supervision depend on the chosen equipment.'],
  ['Review the event', 'Security reviews denied entries and operational exceptions. Where configured, access events can support reporting alongside attendance and visitor records.'],
];
const faqs = [
  ['What is the difference between access control and entrance control?', 'Access control decides whether a person is allowed to enter. Entrance control is the physical lane or barrier that manages passage. A complete installation coordinates the reader, controller and gate hardware with the site’s operating rules.'],
  ['Can the same biometric device support attendance and gate entry?', 'Some devices support both attendance and access functions. Reader outputs, controller connections, software support and gate interfaces must be checked for the exact models. We confirm the proposed combination before installation.'],
  ['How do you choose the number of lanes?', 'Start with the number of people arriving during the busiest interval, the credential-check process, queue space and any screening steps. Also plan an accessible passage and a route for visitors, deliveries or people needing assistance.'],
  ['What happens during a power failure or emergency?', 'The response must be designed for the selected hardware and site. Review power backup, manual release, emergency inputs, evacuation routes and staff procedures, then test the agreed behavior during commissioning.'],
  ['Can existing gates or readers be reused?', 'Often a site assessment can identify equipment worth retaining. Share model numbers, wiring information, current software and photographs of the lanes. Compatibility and equipment condition determine what can be reused.'],
] as const;

export function EntranceControlPage() {
  return <main className={s.page}>
    <SiteHeader />
    <StructuredData data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) }} />
    <SolutionHero eyebrow="Entrance control" title="The right entry. For every person and vehicle." description="Connect identity checks with flap barriers, turnstiles and boom barriers. Build a clear route from arrival to authorized passage, with equipment and entry rules matched to your workplace." image="/campaign/solutions/entrance-desktop-v2.webp" alt="Workplace gate with a vehicle boom barrier and separate pedestrian entrance" action="Plan your entrance" topic="entrance-control-system">
      <div><strong>Pedestrian movement</strong><span>Reception lanes, staff gates and controlled boundaries.</span></div><div><strong>Vehicle movement</strong><span>Managed entry for cars, deliveries and service vehicles.</span></div><div><strong>Connected decisions</strong><span>Readers, permissions, gate release and event review.</span></div>
    </SolutionHero>

    <section className={s.section} id="equipment">
      <SolutionHeading label="Choose the physical entry point" title="Different entrances need different hardware." text="Start with the people and vehicles using the entrance. Then match the lane, access method and operating process to that movement." />
      <div className={s.productGrid}>{equipment.map(item => { const product = products.find(p => p.slug === item.slug)!; return <article className={s.product} key={item.slug}><div className={s.productImage}><Image src={product.image!} alt={`${product.name} ${item.title.toLowerCase()} entrance hardware`} fill sizes="(max-width: 480px) 90vw, (max-width: 1050px) 45vw, 23vw" /></div><div className={s.productBody}><small>{item.type}</small><h3>{item.title}</h3><p>{item.text}</p><Link href={`/products/${item.slug}`}>View {product.name} ↗</Link></div></article>; })}</div>
    </section>

    <section className={`${s.section} ${s.tint}`} id="how-it-works">
      <SolutionHeading label="How the system works" title="One entry event. Four connected steps." text="The reader identifies, the access system decides, and the entrance hardware manages passage. Each part has a distinct job." />
      <ol className={s.steps}>{steps.map(([title, text], i) => <li key={title}><span className={s.number}>0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
    </section>

    <section className={`${s.section} ${s.split}`}>
      <figure className={s.photo}><Image src="/campaign/solutions/attendance-desktop-v2.webp" alt="Employee authenticating at a biometric reader beside a workplace entrance" fill sizes="(max-width: 800px) 90vw, 45vw" /></figure>
      <div className={s.explanation}><p className={s.eyebrow}>More than a gate opening</p><h2>Connect the entry point to the people using it.</h2><p>A staff member, a contractor and a visitor may use the same building with different permissions. Define their routes and approval owners before connecting devices.</p><ul className={s.checkList}><li><b>Employees:</b> match credentials to assigned entry points and working schedules.</li><li><b>Contract workers:</b> tie site access to approved assignments and authorized working periods.</li><li><b>Visitors:</b> agree host approval, reception checks and escorted or permitted areas.</li><li><b>Vehicles:</b> define security checks, driver authorization and pedestrian separation.</li></ul></div>
    </section>

    <section className={`${s.section} ${s.tint}`}>
      <SolutionHeading label="Installation planning" title="Design the lane before placing the device." text="A good installation considers daily traffic, the physical site and the people who will operate it." />
      <div className={s.cards}>
        <article className={s.card}><span className={s.number}>01 / MOVEMENT</span><h3>Traffic & layout</h3><p>Review peak shift arrivals, queues, direction of travel, visitors and deliveries. Decide lane positions, clear widths, an accessible route and how pedestrians stay separate from vehicles.</p></article>
        <article className={s.card}><span className={s.number}>02 / INFRASTRUCTURE</span><h3>Power & connections</h3><p>Check mounting surfaces, foundations, weather exposure, power, network points and cable routes. Confirm the reader, controller and barrier interfaces as one proposed configuration.</p></article>
        <article className={s.card}><span className={s.number}>03 / OPERATIONS</span><h3>Release & supervision</h3><p>Agree normal entry, denied entry, manual operation and emergency response. Assign an operator, document escalation steps and test the complete lane before handover.</p></article>
      </div>
    </section>

    <section className={s.section}><SolutionHeading label="Before you decide" title="Practical questions about entrance control." /><SolutionFaq items={faqs} /></section>
    <section className={s.section}><div className={s.cta}><div><h2>Let’s map your entrance.</h2><p>Share gate photographs, expected peak traffic and whether you need pedestrian, vehicle or combined entry. We’ll help scope the equipment and workflow.</p></div><Link className={s.primary} href="/contact?solution=entrance-control-system">Discuss your site ↗</Link></div><div className={s.actions}><Link className={s.secondary} href="/access-control-system">Explore access control ↗</Link><Link className={s.secondary} href="/solutions/visitor-management">Visitor management ↗</Link><Link className={s.secondary} href="/contract-labour-management">Contract workforce ↗</Link></div></section>
    <SiteFooter />
  </main>;
}
