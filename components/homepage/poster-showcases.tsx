'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
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

const technologies: readonly (PosterMedia & { title: string; description: string; href: string })[] = [
  { title: 'Face intelligence', description: 'Visible-light and structured-light topics connected to real attendance and access-control use cases.', href: '/technologies#identity', desktop: '/technology/ai-structured-light.png', mobile: '/technology/ai-structured-light.png', alt: 'Structured-light facial recognition technology visual' },
  { title: 'Fingerprint identity', description: 'Established biometric authentication for controlled entry and workforce attendance.', href: '/products#access-control', desktop: '/posters/i-18.png', mobile: '/products/i-18.jpg', alt: 'Fingerprint access-control technology' },
  { title: 'Connected access', description: 'Readers, gates, barriers, and operating rules designed as one site-specific entry system.', href: '/solutions/physical-access-control', desktop: '/campaign/solutions/access-desktop-v2.webp', mobile: '/campaign/solutions/access-mobile-v2.webp', alt: 'Connected access-control gates in a corporate lobby' },
  { title: 'Edge intelligence', description: 'Device-side identity and computer-vision capabilities reviewed against product and deployment evidence.', href: '/technologies', desktop: '/campaign/hero/innovation-desktop-v2.webp', mobile: '/campaign/hero/innovation-mobile-v2.webp', alt: 'Engineer testing edge identity technology' },
  { title: 'Workforce workflows', description: 'Attendance events become useful when shifts, leave, review, and operational ownership connect.', href: '/software', desktop: '/campaign/hero/security-desktop-v2.webp', mobile: '/campaign/hero/security-mobile-v2.webp', alt: 'Connected workforce and facility operations environment' },
];

export function AutomaticTechnologyShowcase() {
  const motion = useAutomaticIndex(technologies.length, 6200);
  const item = technologies[motion.active];
  return <section className="poster-technology" aria-labelledby="technology-heading" onMouseEnter={motion.pause} onMouseLeave={motion.resume} onFocusCapture={motion.pause} onBlurCapture={motion.resume}>
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
  const motion = useAutomaticIndex(solutions.length, 6800);
  return <section className="solution-posters" aria-labelledby="solutions-heading" onMouseEnter={motion.pause} onMouseLeave={motion.resume} onFocusCapture={motion.pause} onBlurCapture={motion.resume}>
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
  const motion = useAutomaticIndex(products.length, 6000);
  const product = products[motion.active];
  return <section className="featured-product-poster" aria-labelledby="featured-product-heading" onMouseEnter={motion.pause} onMouseLeave={motion.resume} onFocusCapture={motion.pause} onBlurCapture={motion.resume}>
    <Image className="art-desktop" src={`/posters/${product.slug}.png`} alt={`Campaign artwork for ${product.name}`} fill sizes="100vw" key={`${product.slug}-desktop`} />
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
