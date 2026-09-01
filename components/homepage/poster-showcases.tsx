'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Product } from '@/app/content';

type PosterMedia = { desktop: string; mobile: string; alt: string };

function useAutomaticIndex(length: number, interval: number) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPaused(reducedMotion.matches || document.hidden);
    sync();
    reducedMotion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      reducedMotion.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  useEffect(() => {
    if (paused || length < 2) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % length), interval);
    return () => window.clearInterval(timer);
  }, [interval, length, paused]);

  return { active, pause: () => setPaused(true), resume: () => setPaused(false) };
}

const corePortfolio = [
  { slug: 'easytime', category: 'Attendance & identity', title: 'EasyTime Online', description: 'Attendance, shifts, leave, policy rules, reporting, and connected biometric capture for multi-location workforces.', features: ['60+ MIS reports', 'Multi-company and multi-location', 'ERP, payroll and SAP integration'], href: '/software/easytime-online', alt: 'Indian employees recording attendance at the start of a shift' },
  { slug: 'hrms-payroll', category: 'People operations', title: 'HRMS & Payroll', description: 'A broad employee platform covering core HR, payroll, self-service, recruitment, performance, and lifecycle workflows.', features: ['20 core HR modules', '400+ report formats', 'Statutory and maker-checker workflows'], href: '/software/hrms-payroll', alt: 'Indian HR team reviewing workforce and payroll operations' },
  { slug: 'easy-canteen', category: 'Workplace services', title: 'Easy Canteen', description: 'Paperless biometric canteen operations for cashless serving, entitlements, vendor billing, and usage reporting.', features: ['Prepaid and postpaid', 'Subsidy and meal scheduling', 'Payroll or ERP deductions'], href: '/software/canteen-management', alt: 'Employee using biometric authentication in a workplace canteen' },
  { slug: 'easy-visit', category: 'Visitor operations', title: 'Easy Visit VMS', description: 'Cloud-based preregistration, approvals, secure check-in, visitor communication, dashboards, and visit records.', features: ['Email, WhatsApp and SMS invites', 'QR code and gate-pass check-in', 'Live notifications and dashboards'], href: '/software/visitor-management', alt: 'Visitor checking in at a welcoming corporate reception' },
  { slug: 'mediaa-wave', category: 'Digital signage', title: 'Hexin Mediaa Wave', description: 'Centralized cloud media management for scheduling approved content across screens, locations, and industries.', features: ['Multi-user and multi-display', 'Images, video, PDF and live data', 'Remote scheduling and monitoring'], href: '/software/hexin-mediaa-wave', alt: 'Administrator coordinating digital signage across workplace screens' },
  { slug: 'entrance-control', category: 'Secure movement', title: 'Entrance Control', description: 'Flap barriers, tripod gates, full-height turnstiles, and boom barriers for people and vehicle entry points.', features: ['Emergency release options', 'SUS304 construction options', 'Third-party access integration'], href: '/products#entrance-management', alt: 'Pedestrian and vehicle entrance control at an industrial campus' },
  { slug: 'door-interlock', category: 'Clean-room security', title: 'Door Interlock & Access', description: 'Clean-room interlocking and multi-door access control with configurable permissions and occupancy rules.', features: ['2 to 16 interlocked doors', 'Touch and no-touch options', 'RFID, fingerprint and face'], href: '/industries/pharma', alt: 'Pharmaceutical clean-room staff using a no-touch interlocked door' },
  { slug: 'industrial-ai', category: 'Computer vision', title: 'Industrial AI Solutions', description: 'Visual inspection, safety monitoring, retail analytics, and predictive insight built around operational use cases.', features: ['Quality inspection', 'PPE, fire and smoke monitoring', 'Predictive maintenance'], href: '/technologies', alt: 'Engineers using computer vision on an Indian manufacturing line' },
] as const;

export function AutomaticCorePortfolio() {
  const motion = useAutomaticIndex(corePortfolio.length, 4000);
  return <section className="core-portfolio core-portfolio-showcase" aria-labelledby="core-portfolio-heading" onFocusCapture={motion.pause} onBlurCapture={motion.resume}>
    <div className="core-portfolio-intro"><div><p>Best-selling systems · brochure collection</p><h2 id="core-portfolio-heading">The solutions customers ask us about most.</h2></div><span>Eight core offerings from Indian Infotech’s company brochure. Artwork and matching details change automatically.</span></div>
    <div className="core-system-stage">
      {corePortfolio.map((item, index) => <article className="core-system-poster" data-active={index === motion.active} aria-hidden={index !== motion.active} key={item.slug}>
        <Image className="art-desktop" src={`/campaign/core-systems/${item.slug}-desktop-v2.webp`} alt={index === motion.active ? item.alt : ''} fill sizes="100vw" />
        <Image className="art-mobile" src={`/campaign/core-systems/${item.slug}-mobile-v2.webp`} alt="" fill sizes="100vw" aria-hidden="true" />
        <div className="core-system-shade" />
        <div className="core-system-copy"><p>{item.category}</p><h3>{item.title}</h3><span>{item.description}</span><ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><Link href={item.href} tabIndex={index === motion.active ? undefined : -1}>Explore system <b aria-hidden="true">↗</b></Link></div>
      </article>)}
    </div>
    <div className="poster-auto-labels" aria-hidden="true">{corePortfolio.map((item, index) => <span data-active={index === motion.active} key={item.slug}>{item.title}</span>)}</div>
  </section>;
}

const connectedCapabilities = [
  { title: 'Workforce attendance', eyebrow: 'Workforce', description: 'Capture time, shifts, and exceptions through one accountable attendance workflow.', href: '/solutions/attendance-automation', desktop: '/campaign/solutions/attendance-desktop-v2.webp', mobile: '/campaign/solutions/attendance-mobile-v2.webp', alt: 'Employees using attendance technology at work' },
  { title: 'Physical access', eyebrow: 'Security', description: 'Coordinate identities, permissions, readers, and secure entry points across the site.', href: '/solutions/physical-access-control', desktop: '/campaign/solutions/access-desktop-v2.webp', mobile: '/campaign/solutions/access-mobile-v2.webp', alt: 'Modern workplace physical access control' },
  { title: 'Visitor operations', eyebrow: 'Workplace', description: 'Connect preregistration, host approval, check-in, and visit records without friction.', href: '/software/visitor-management', desktop: '/campaign/solutions/visitor-desktop-v2.webp', mobile: '/campaign/solutions/visitor-mobile-v2.webp', alt: 'Visitor check-in at a corporate reception' },
  { title: 'HRMS & payroll', eyebrow: 'Software', description: 'Bring employee records, payroll, self-service, and lifecycle workflows into one platform.', href: '/hrms-payroll', desktop: '/campaign/core-systems/hrms-payroll-desktop-v2.webp', mobile: '/campaign/core-systems/hrms-payroll-mobile-v2.webp', alt: 'HR team reviewing workforce operations' },
  { title: 'Entrance management', eyebrow: 'Infrastructure', description: 'Plan pedestrian gates, turnstiles, vehicle barriers, and access logic as one system.', href: '/solutions/entrance-management', desktop: '/campaign/solutions/entrance-desktop-v2.webp', mobile: '/campaign/solutions/entrance-mobile-v2.webp', alt: 'Connected entrance management at an industrial campus' },
] as const;

export function AutomaticConnectedCapabilities() {
  const motion = useAutomaticIndex(connectedCapabilities.length, 3600);
  const style = { '--slide-index': motion.active, '--desktop-slide-index': Math.min(motion.active, connectedCapabilities.length - 3) } as CSSProperties;
  return <section className="poster-mosaic-section connected-capabilities" aria-labelledby="mosaic-heading" onFocusCapture={motion.pause} onBlurCapture={motion.resume}>
    <div className="poster-section-intro"><p>Connected capabilities</p><h2 id="mosaic-heading">One system starts with a real use case.</h2><span>Capabilities move together in one structured view. Each card opens the complete workflow.</span></div>
    <div className="capability-viewport">
      <div className="capability-track" style={style}>{connectedCapabilities.map((item, index) => <Link className="capability-card" data-current={index === motion.active} href={item.href} tabIndex={Math.abs(index - motion.active) <= 2 ? undefined : -1} key={item.title}>
        <div className="capability-media"><Image className="art-desktop" src={item.desktop} alt={item.alt} fill sizes="(max-width: 760px) 86vw, 33vw" /><Image className="art-mobile" src={item.mobile} alt="" fill sizes="86vw" aria-hidden="true" /></div>
        <div className="capability-copy"><span>{item.eyebrow}</span><h3>{item.title}</h3><p>{item.description}</p><b>Explore capability <i aria-hidden="true">↗</i></b></div>
      </Link>)}</div>
    </div>
    <div className="capability-progress" aria-hidden="true">{connectedCapabilities.map((item, index) => <span data-active={index === motion.active} key={item.title} />)}</div>
  </section>;
}

const technologies: readonly (PosterMedia & { title: string; description: string; href: string })[] = [
  { title: 'Face intelligence', description: 'Visible-light and structured-light topics connected to real attendance and access-control use cases.', href: '/technologies#identity', desktop: '/technology/ai-structured-light.webp', mobile: '/technology/ai-structured-light.webp', alt: 'Structured-light facial recognition technology visual' },
  { title: 'Fingerprint identity', description: 'Established biometric authentication for controlled entry and workforce attendance.', href: '/products#access-control', desktop: '/posters/i-18.webp', mobile: '/products/i-18.jpg', alt: 'Fingerprint access-control technology' },
  { title: 'Connected access', description: 'Readers, gates, barriers, and operating rules designed as one site-specific entry system.', href: '/solutions/physical-access-control', desktop: '/campaign/solutions/access-desktop-v2.webp', mobile: '/campaign/solutions/access-mobile-v2.webp', alt: 'Connected access-control gates in a corporate lobby' },
  { title: 'Edge intelligence', description: 'Device-side identity and computer-vision capabilities reviewed against product and deployment evidence.', href: '/technologies', desktop: '/campaign/hero/innovation-desktop-v2.webp', mobile: '/campaign/hero/innovation-mobile-v2.webp', alt: 'Engineer testing edge identity technology' },
  { title: 'Workforce workflows', description: 'Attendance events become useful when shifts, leave, review, and operational ownership connect.', href: '/software', desktop: '/campaign/hero/security-desktop-v2.webp', mobile: '/campaign/hero/security-mobile-v2.webp', alt: 'Connected workforce and facility operations environment' },
];

export function AutomaticTechnologyShowcase() {
  const motion = useAutomaticIndex(technologies.length, 3800);
  const item = technologies[motion.active];
  return <section className="poster-technology" aria-labelledby="technology-heading" onFocusCapture={motion.pause} onBlurCapture={motion.resume}>
    <div className="poster-section-intro"><p>Technology</p><h2 id="technology-heading">Built beneath the surface.</h2></div>
    <div className="poster-technology-stage">
      <div className="poster-technology-media" key={item.desktop}>
        <Image className="art-desktop" src={item.desktop} alt={item.alt} fill sizes="(max-width: 900px) 100vw, 65vw" />
        <Image className="art-mobile" src={item.mobile} alt="" fill sizes="100vw" aria-hidden="true" />
      </div>
      <div className="poster-technology-copy" key={item.title}>
        <p>Technology focus</p><h3>{item.title}</h3><span>{item.description}</span><Link href={item.href}>Explore technology <b aria-hidden="true">↗</b></Link>
      </div>
    </div>
    <div className="poster-auto-labels" aria-hidden="true">{technologies.map((technology, index) => <span data-active={index === motion.active} key={technology.title}>{technology.title}</span>)}</div>
  </section>;
}

const solutions: readonly (PosterMedia & { eyebrow: string; title: string; description: string; href: string; tone: 'light' | 'dark' })[] = [
  { eyebrow: 'Attendance automation', title: 'Every shift starts with a clear record.', description: 'Connect identity capture, shift context, exception review, and responsible ownership.', href: '/solutions/attendance-automation', desktop: '/campaign/solutions/attendance-desktop-v2.webp', mobile: '/campaign/solutions/attendance-mobile-v2.webp', alt: 'Employees using attendance systems at a manufacturing workplace', tone: 'dark' },
  { eyebrow: 'Physical access control', title: 'People move freely. Security stays deliberate.', description: 'Bring terminals, gates, credentials, and access rules together around each entry point.', href: '/solutions/physical-access-control', desktop: '/campaign/solutions/access-desktop-v2.webp', mobile: '/campaign/solutions/access-mobile-v2.webp', alt: 'Modern corporate access-control lobby', tone: 'dark' },
  { eyebrow: 'Visitor security', title: 'A warmer welcome with a stronger record.', description: 'Structure registration, host coordination, secure entry, and check-out without adding friction.', href: '/solutions/visitor-security', desktop: '/campaign/solutions/visitor-desktop-v2.webp', mobile: '/campaign/solutions/visitor-mobile-v2.webp', alt: 'Visitor welcome and security workflow at a corporate reception', tone: 'dark' },
  { eyebrow: 'Entrance management', title: 'Know who enters. Know where. Know when.', description: 'Coordinate pedestrian, vehicle, turnstile, barrier, and screening requirements around the site.', href: '/solutions/entrance-management', desktop: '/campaign/solutions/entrance-desktop-v2.webp', mobile: '/campaign/solutions/entrance-mobile-v2.webp', alt: 'Connected entrance management at an industrial campus', tone: 'dark' },
];

export function AutomaticSolutionPosters() {
  const motion = useAutomaticIndex(solutions.length, 4200);
  return <section className="solution-posters" aria-labelledby="solutions-heading" onFocusCapture={motion.pause} onBlurCapture={motion.resume}>
    <div className="poster-section-intro light"><p>Solutions</p><h2 id="solutions-heading">Designed around the work that needs to happen.</h2></div>
    <div className="solution-poster-stage">
      {solutions.map((slide, index) => <article className={`solution-poster solution-poster-${slide.tone}`} data-active={index === motion.active} aria-hidden={index !== motion.active} key={slide.eyebrow}>
        <Image className="art-desktop" src={slide.desktop} alt={index === motion.active ? slide.alt : ''} fill sizes="100vw" />
        <Image className="art-mobile" src={slide.mobile} alt="" fill sizes="100vw" aria-hidden="true" />
        <div className="solution-poster-shade" />
        <div className="solution-poster-copy"><p>{slide.eyebrow}</p><h3>{slide.title}</h3><span>{slide.description}</span><Link href={slide.href} tabIndex={index === motion.active ? undefined : -1}>Explore solution <b aria-hidden="true">↗</b></Link></div>
      </article>)}
    </div>
    <div className="poster-auto-labels light" aria-hidden="true">{solutions.map((solution, index) => <span data-active={index === motion.active} key={solution.title}>{solution.eyebrow}</span>)}</div>
  </section>;
}

export function AutomaticProductSpotlight({ products }: { products: readonly Product[] }) {
  const motion = useAutomaticIndex(products.length, 3800);
  const product = products[motion.active];
  return <section className="featured-product-poster" aria-labelledby="featured-product-heading" onFocusCapture={motion.pause} onBlurCapture={motion.resume}>
    <Image className="art-desktop" src={`/posters/${product.slug}.webp`} alt={`Campaign artwork for ${product.name}`} fill sizes="100vw" key={`${product.slug}-desktop`} />
    <Image className="art-mobile" src={`/posters/mobile/${product.slug}-v2.webp`} alt="" fill sizes="100vw" aria-hidden="true" key={`${product.slug}-mobile`} />
    <div className="featured-product-shade" />
    <div className="featured-product-copy" key={`${product.slug}-copy`}><p>Featured product · {product.family}</p><h2 id="featured-product-heading">{product.name}</h2><span>{product.description}</span><ul><li>{product.authentication}</li><li>{product.application}</li><li>{product.deployment}</li></ul><Link href={`/products/${product.slug}`}>Explore product <b aria-hidden="true">↗</b></Link></div>
  </section>;
}

const industryStories: readonly (PosterMedia & { name: string; headline: string; description: string; href: string })[] = [
  { name: 'Manufacturing', headline: 'Secure every shift and every controlled zone.', description: 'Bring workforce attendance, contractors, gates, and operating areas into one practical plan.', href: '/industries/manufacturing', desktop: '/campaign/industries/manufacturing-desktop-v2.webp', mobile: '/campaign/industries/manufacturing-mobile-v2.webp', alt: 'Secure workforce entry at a modern manufacturing facility' },
  { name: 'Corporate offices', headline: 'A workplace that welcomes people and protects access.', description: 'Coordinate employees, visitors, attendance, and secure areas without disrupting the arrival experience.', href: '/industries/corporate', desktop: '/campaign/industries/corporate-desktop-v2.webp', mobile: '/campaign/industries/corporate-mobile-v2.webp', alt: 'Corporate headquarters with integrated access control' },
  { name: 'Pharmaceutical & research', headline: 'Identity discipline for controlled environments.', description: 'Plan clean-room entry, workforce records, visitors, and interlocked access around the facility’s rules.', href: '/industries/pharma', desktop: '/campaign/industries/pharma-desktop-v2.webp', mobile: '/campaign/industries/pharma-mobile-v2.webp', alt: 'Secure clean-room access in a pharmaceutical facility' },
  { name: 'Healthcare', headline: 'Keep staff movement clear across sensitive spaces.', description: 'Connect shifts, staff entry, visitors, and restricted areas through site-specific operating workflows.', href: '/industries/healthcare', desktop: '/campaign/industries/healthcare-desktop-v2.webp', mobile: '/campaign/industries/healthcare-mobile-v2.webp', alt: 'Healthcare staff entering through a secure access point' },
  { name: 'Education', headline: 'One identity journey across the campus.', description: 'Support faculty, staff, visitors, and campus entry with attendance and access designed for institutional reality.', href: '/industries/education', desktop: '/campaign/industries/education-desktop-v2.webp', mobile: '/campaign/industries/education-mobile-v2.webp', alt: 'Modern education campus with secure access technology' },
  { name: 'Construction', headline: 'Account for every crew at every active site.', description: 'Connect workforce attendance, contractor identity, PPE-ready entry, and site access around construction operations.', href: '/industries/construction', desktop: '/campaign/industries/construction-desktop-v2.webp', mobile: '/campaign/industries/construction-mobile-v2.webp', alt: 'Construction workers entering a site through biometric access' },
  { name: 'Government', headline: 'Public workplaces that welcome and verify.', description: 'Coordinate staff attendance, citizen visits, and controlled areas with a clear, dignified arrival process.', href: '/industries/government', desktop: '/campaign/industries/government-desktop-v2.webp', mobile: '/campaign/industries/government-mobile-v2.webp', alt: 'Staff and visitors at a contemporary civic administration entrance' },
  { name: 'Banking', headline: 'Trust begins before the secure area.', description: 'Protect staff movement, restricted zones, and visitor journeys across branches and administrative offices.', href: '/industries/banking', desktop: '/campaign/industries/banking-desktop-v2.webp', mobile: '/campaign/industries/banking-mobile-v2.webp', alt: 'Banking professional using secure headquarters access' },
  { name: 'Logistics', headline: 'Coordinate people, vehicles, and every gate.', description: 'Bring warehouse shifts, loading access, vehicle barriers, and distributed operations into one entrance plan.', href: '/industries/logistics', desktop: '/campaign/industries/logistics-desktop-v2.webp', mobile: '/campaign/industries/logistics-mobile-v2.webp', alt: 'Warehouse workforce and vehicle access at a logistics campus' },
  { name: 'Retail', headline: 'Make every opening shift easier to manage.', description: 'Support store-team attendance, staff-only access, and distributed locations without slowing daily operations.', href: '/industries/retail', desktop: '/campaign/industries/retail-desktop-v2.webp', mobile: '/campaign/industries/retail-mobile-v2.webp', alt: 'Retail associate recording attendance before store opening' },
  { name: 'Hospitality', headline: 'Quiet security behind a warm welcome.', description: 'Coordinate staff attendance, service entrances, visitors, and sensitive areas around the guest experience.', href: '/industries/hospitality', desktop: '/campaign/industries/hospitality-desktop-v2.webp', mobile: '/campaign/industries/hospitality-mobile-v2.webp', alt: 'Hotel team member using discreet workplace access' },
];

export function IndustryStoryScroller() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const steps = root.current?.querySelectorAll<HTMLElement>('[data-industry-step]');
    if (!steps?.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number((visible.target as HTMLElement).dataset.industryStep));
    }, { threshold: [.35, .55, .75] });
    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return <section className="industry-story" ref={root} aria-labelledby="industry-story-heading">
    <div className="industry-story-intro"><p>Industries</p><h2 id="industry-story-heading">Different sites. Different realities.</h2></div>
    <div className="industry-story-desktop">
      <div className="industry-story-steps">{industryStories.map((story, index) => <article data-industry-step={index} key={story.name}><p>{story.name}</p><h3>{story.headline}</h3><span>{story.description}</span><Link href={story.href}>Explore industry <b aria-hidden="true">↗</b></Link></article>)}</div>
      <div className="industry-story-visual">{industryStories.map((story, index) => <Image src={story.desktop} alt={index === active ? story.alt : ''} fill sizes="55vw" data-active={index === active} key={story.name} />)}</div>
    </div>
    <div className="industry-story-mobile">{industryStories.map((story) => <article key={story.name}><div><Image src={story.mobile} alt={story.alt} fill sizes="100vw" /></div><p>{story.name}</p><h3>{story.headline}</h3><span>{story.description}</span><Link href={story.href}>Explore industry <b aria-hidden="true">↗</b></Link></article>)}</div>
  </section>;
}
