'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { IndustryProfile, Product, SolutionProfile, SoftwarePlatform } from '@/app/content';

type CompanySlide = { eyebrow: string; title: string; text: string; href: string; cta: string; image: string; alt: string };
const companySlides: readonly CompanySlide[] = [
  { eyebrow: 'Company', title: 'Workforce and workplace systems, grounded in Ahmedabad.', text: 'Since 2011, Indian Infotech has built a published portfolio across biometric devices, access, entrance, workforce software, and HRMS workflows.', href: '/company', cta: 'Explore company', image: '/company/ai-cover-workplace.png', alt: 'AI-generated modern workplace entrance with biometric access control' },
  { eyebrow: 'Trust', title: 'Capability shown through the systems you can inspect.', text: 'Explore real product media, software routes, customer roster, support paths, and evidence standards across the site.', href: '/about', cta: 'Read about Indian Infotech', image: '/company/support-cta.png', alt: 'Indian Infotech support team' },
  { eyebrow: 'Portfolio', title: 'From identity at the edge to workforce operations.', text: 'Connect attendance, controlled entry, visitor workflows, canteen operations, HRMS, and payroll planning around your facility.', href: '/platform', cta: 'See the platform', image: '/products/ai-60/angle.png', alt: 'AI 60 face recognition device' },
  { eyebrow: 'Consultation', title: 'Start with the operating problem.', text: 'Bring workforce size, sites, entry points, software, and support needs to a practical solution conversation.', href: '/contact', cta: 'Talk to the team', image: '/products/fht2300/model-l.png', alt: 'FHT2300 full-height turnstile' },
];

export function CompanyShowcase() {
  const [active, setActive] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActive((current) => (current + 1) % companySlides.length), 6500); return () => window.clearInterval(timer); }, []);
  const slide = companySlides[active];
  return <section className="home-company-showcase" aria-labelledby="home-company-title"><div className="home-company-copy"><p className="section-kicker light">{slide.eyebrow}</p><h2 id="home-company-title">{slide.title}</h2><p>{slide.text}</p><Link className="button button-primary" href={slide.href}>{slide.cta} <span aria-hidden="true">↗</span></Link></div><div className="home-company-image"><Image key={slide.image} src={slide.image} alt={slide.alt} width={1000} height={720} priority={active === 0} /></div></section>;
}

function AutoTrack({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const timer = window.setInterval(() => {
      const node = track.current;
      if (!node || node.matches(':hover, :focus-within')) return;
      const card = node.querySelector<HTMLElement>('.showcase-card');
      if (!card) return;
      const next = node.scrollLeft + card.offsetWidth + 16;
      node.scrollTo({ left: next >= node.scrollWidth - node.clientWidth - 4 ? 0 : next, behavior: 'smooth' });
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);
  return <div className={`showcase-track ${className}`} ref={track}>{children}</div>;
}

type TechnologyItem = { title: string; text: string; image: string; href: string; status?: string };
const technologyItems: readonly TechnologyItem[] = [
  { title: 'Face recognition', text: 'Published across AI-series attendance and access-control products.', image: '/products/ai-60/detail.png', href: '/technologies#identity' },
  { title: 'Fingerprint recognition', text: 'Published across access-control and attendance device offerings.', image: '/products/i-18.jpg', href: '/technologies#identity' },
  { title: 'RFID / card authentication', text: 'Review credential and access requirements during solution design.', image: '/products/is-500/main.png', href: '/technologies#identity' },
  { title: '3D structured-light facial recognition', text: 'Technology topic for technical review; product availability must be confirmed.', image: '/technology/ai-structured-light.png', href: '/technologies#identity', status: 'Review topic' },
  { title: 'Finger vein recognition', text: 'Technology topic for technical review; not presented as a published product claim.', image: '/products/ai-60/source-detail.png', href: '/technologies#identity', status: 'Review topic' },
  { title: 'Controlled entrance technology', text: 'Flap barriers, turnstiles, boom barriers, and screening equipment.', image: '/products/fbl-300/main.png', href: '/technologies#connected-systems' },
  { title: 'Attendance workflow technology', text: 'Device capture, software review, shifts, leave, and operational records.', image: '/products/mini-ai-10/front.png', href: '/technologies#workflow' },
];

export function TechnologyShowcase() { return <section className="home-showcase home-technology-showcase" aria-labelledby="home-technology-title"><div className="showcase-heading"><p className="section-kicker">Technology</p><h2 id="home-technology-title">Identity and entry technology, shown with evidence status.</h2><p>Explore published capability and clearly marked technical review topics.</p><Link className="outline-link" href="/technologies">Explore technologies ↗</Link></div><AutoTrack>{technologyItems.map((item) => <Link className="showcase-card" href={item.href} key={item.title}><Image src={item.image} alt="" width={420} height={300} /><div><span>{item.status ?? 'Published portfolio'}</span><h3>{item.title}</h3><p>{item.text}</p><b>View technology ↗</b></div></Link>)}</AutoTrack></section>; }

export function ProductPosterShowcase({ products }: { products: readonly Product[] }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % products.length), 6000);
    return () => window.clearInterval(timer);
  }, [products.length]);
  const product = products[active];
  return <section className="product-poster-showcase" aria-labelledby="home-products-title" aria-live="polite">
    <div className="product-poster-visual" key={product.slug}>
      <Image src={`/posters/${product.slug}.png`} alt={`AI-generated poster scene for ${product.name}`} fill sizes="100vw" />
    </div>
    <div className="product-poster-overlay" />
    <div className="product-poster-copy" key={`${product.slug}-copy`}>
      <p className="section-kicker light">Product spotlight</p>
      <p className="product-poster-family">{product.family}</p>
      <h2 id="home-products-title">{product.name}</h2>
      <p>{product.description}</p>
      <dl className="product-poster-specs">
        <div><dt>Authentication</dt><dd>{product.authentication}</dd></div>
        <div><dt>Application</dt><dd>{product.application}</dd></div>
        <div><dt>Deployment</dt><dd>{product.deployment}</dd></div>
      </dl>
      <Link className="button button-primary" href={`/products/${product.slug}`}>View product <span aria-hidden="true">↗</span></Link>
    </div>
  </section>;
}

export function SolutionShowcase({ solutions }: { solutions: readonly SolutionProfile[] }) { return <section className="section home-showcase" aria-labelledby="home-solutions-title"><div className="showcase-heading"><p className="section-kicker">Solutions</p><h2 id="home-solutions-title">Choose a solution around the work that needs to happen.</h2><p>Each card opens a real solution route with problem, workflow, hardware family, and software context.</p><Link className="outline-link" href="/solutions">View all solutions ↗</Link></div><AutoTrack className="light-track">{solutions.map((item) => <Link className="showcase-card solution-card" href={`/solutions/${item.slug}`} key={item.slug}><h3>{item.name}</h3><p>{item.summary}</p><b>Explore solution ↗</b></Link>)}</AutoTrack></section>; }

export function SoftwareShowcase({ software, products }: { software: readonly SoftwarePlatform[]; products: readonly Product[] }) { const serviceLinks = [['Deployment and implementation', '/engineering'], ['Integration review', '/integrations'], ['Support and training', '/support'], ['HRMS and payroll workflows', '/software/hrms-payroll']] as const; return <section className="home-showcase home-software-showcase" aria-labelledby="home-software-title"><div className="showcase-heading"><p className="section-kicker light">Software + services</p><h2 id="home-software-title">More than devices: software, implementation, and support.</h2><p>Explore software routes, then move into engineering, integration, support, and training conversations.</p></div><AutoTrack className="software-showcase-grid"><div className="software-showcase-panel showcase-card"><span>Software platforms</span>{software.map((item) => <Link href={`/software/${item.slug}`} key={item.slug}><strong>{item.name}</strong><small>{item.modules.slice(0, 3).join(' · ')}</small><b>Open ↗</b></Link>)}</div><div className="software-showcase-panel showcase-card"><span>Services</span>{serviceLinks.map(([label, href]) => <Link href={href} key={label}><strong>{label}</strong><small>Scope with responsible team</small><b>Open ↗</b></Link>)}<small className="software-product-note">{products.length} published product routes support solution design.</small></div></AutoTrack></section>; }

export function IndustryShowcase({ industries }: { industries: readonly IndustryProfile[] }) { return <section className="section home-showcase" aria-labelledby="home-industries-title"><div className="showcase-heading"><p className="section-kicker">Industries</p><h2 id="home-industries-title">Operating context changes by industry.</h2><p>Start with site reality: shifts, visitors, controlled areas, contractors, people movement, and support ownership.</p><Link className="outline-link" href="/industries">Explore industries ↗</Link></div><AutoTrack className="industry-track">{industries.map((item) => <Link className="showcase-card industry-showcase-card" href={`/industries/${item.slug}`} key={item.slug}><h3>{item.name}</h3><p>{item.context}</p><b>Explore industry ↗</b></Link>)}</AutoTrack></section>; }
