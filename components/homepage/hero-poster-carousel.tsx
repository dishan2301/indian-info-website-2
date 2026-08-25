'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export type HeroPosterSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  desktopMedia: string;
  mobileMedia: string;
  alt: string;
  href: string;
  cta: string;
  highlights: readonly string[];
  textTone: 'light' | 'dark';
  overlay: 'left-light' | 'left-dark';
};

const heroSlides: readonly HeroPosterSlide[] = [
  {
    id: 'easytime-online',
    eyebrow: 'Best-selling workforce system',
    title: 'EasyTime Online Attendance.',
    description: 'Multi-company attendance, shifts, leave, reporting, and real-time data flow for distributed workforces.',
    desktopMedia: '/campaign/hero/workforce-desktop-v2.webp',
    mobileMedia: '/campaign/hero/workforce-mobile-v2.webp',
    alt: 'Employees arriving at a modern workplace attendance point',
    href: '/software/easytime-online',
    cta: 'Explore EasyTime',
    highlights: ['60+ functional MIS reports', 'Night, day and auto-shift logic', 'ERP, payroll and SAP integration'],
    textTone: 'dark',
    overlay: 'left-light',
  },
  {
    id: 'hrms-payroll',
    eyebrow: 'Best-selling people platform',
    title: 'HRMS & Payroll.',
    description: 'A connected people-operations suite spanning attendance, leave, employee self-service, payroll, recruitment, and lifecycle workflows.',
    desktopMedia: '/campaign/hero/security-desktop-v2.webp',
    mobileMedia: '/campaign/hero/security-mobile-v2.webp',
    alt: 'Connected workforce operations environment',
    href: '/software/hrms-payroll',
    cta: 'Explore HRMS',
    highlights: ['20 core HR modules', '400+ pre-designed reports', 'Maker-checker payroll control'],
    textTone: 'light',
    overlay: 'left-dark',
  },
  {
    id: 'easy-visit',
    eyebrow: 'Best-selling visitor platform',
    title: 'Easy Visit VMS.',
    description: 'Cloud visitor management for preregistration, approvals, secure check-in, communication, and live visitor oversight.',
    desktopMedia: '/campaign/solutions/visitor-desktop-v2.webp',
    mobileMedia: '/campaign/solutions/visitor-mobile-v2.webp',
    alt: 'Visitor welcome and security workflow at a corporate reception',
    href: '/software/visitor-management',
    cta: 'Explore Easy Visit',
    highlights: ['Email, WhatsApp and SMS invites', 'QR and gate-pass check-in', 'Security, employee and admin dashboards'],
    textTone: 'dark',
    overlay: 'left-light',
  },
  {
    id: 'entrance-control',
    eyebrow: 'Best-selling entrance systems',
    title: 'Entrance Control Systems.',
    description: 'Flap barriers, tripod and full-height turnstiles, and boom barriers for controlled pedestrian and vehicle movement.',
    desktopMedia: '/campaign/solutions/entrance-desktop-v2.webp',
    mobileMedia: '/campaign/solutions/entrance-mobile-v2.webp',
    alt: 'Connected entrance management at an industrial campus',
    href: '/products#entrance-management',
    cta: 'Explore entrance control',
    highlights: ['SUS304 stainless-steel options', 'Emergency release functions', 'Third-party access integration'],
    textTone: 'light',
    overlay: 'left-dark',
  },
  {
    id: 'door-interlock',
    eyebrow: 'Clean-room access systems',
    title: 'Door Interlock & Access Control.',
    description: 'Microprocessor-based clean-room interlocking and multi-door access control for regulated and security-sensitive facilities.',
    desktopMedia: '/campaign/hero/access-desktop-v2.webp',
    mobileMedia: '/campaign/hero/access-mobile-v2.webp',
    alt: 'Modern workplace with integrated access control',
    href: '/industries/pharma',
    cta: 'Explore clean-room access',
    highlights: ['Controls 2 to 16 interlocked doors', 'Touch and no-touch options', 'RFID, fingerprint and face access'],
    textTone: 'dark',
    overlay: 'left-light',
  },
  {
    id: 'industrial-ai',
    eyebrow: 'Industry intelligence',
    title: 'AI for Industry Excellence.',
    description: 'Computer vision for quality inspection, safety monitoring, operational analysis, and predictive maintenance.',
    desktopMedia: '/campaign/hero/innovation-desktop-v2.webp',
    mobileMedia: '/campaign/hero/innovation-mobile-v2.webp',
    alt: 'Engineer testing AI technology in a modern lab',
    href: '/technologies',
    cta: 'Explore industrial AI',
    highlights: ['Visual inspection and classification', 'PPE, fire and smoke monitoring', 'Real-time operational insight'],
    textTone: 'dark',
    overlay: 'left-light',
  },
];

export function HeroPosterCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setPaused(reducedMotion.matches || document.hidden);
    updateMotionPreference();
    reducedMotion.addEventListener('change', updateMotionPreference);
    document.addEventListener('visibilitychange', updateMotionPreference);
    return () => {
      reducedMotion.removeEventListener('change', updateMotionPreference);
      document.removeEventListener('visibilitychange', updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % heroSlides.length), 4200);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="poster-hero"
      aria-roledescription="carousel"
      aria-label="Indian Infotech capabilities"
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {heroSlides.map((slide, index) => (
        <article className={`poster-hero-slide poster-hero-${slide.textTone} poster-overlay-${slide.overlay}`} data-active={index === active} aria-hidden={index !== active} key={slide.id}>
          <div className="poster-hero-media poster-hero-media-desktop">
            <Image src={slide.desktopMedia} alt={index === active ? slide.alt : ''} fill priority={index === 0} sizes="100vw" />
          </div>
          <div className="poster-hero-media poster-hero-media-mobile" aria-hidden="true">
            <Image src={slide.mobileMedia} alt="" fill priority={index === 0} sizes="100vw" />
          </div>
          <div className="poster-hero-shade" />
          <div className="poster-hero-copy">
            <p className="poster-eyebrow"><span />{slide.eyebrow}</p>
            {index === 0 ? <h1 id="homepage-title"><span>{slide.title}</span></h1> : <h2><span>{slide.title}</span></h2>}
            <p className="poster-hero-description">{slide.description}</p>
            <ul className="poster-hero-highlights">{slide.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
            <Link className="poster-link" href={slide.href} tabIndex={index === active ? undefined : -1}>{slide.cta}<span aria-hidden="true">↗</span></Link>
          </div>
        </article>
      ))}
    </section>
  );
}
