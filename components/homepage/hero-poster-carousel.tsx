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
  textTone: 'light' | 'dark';
  overlay: 'left-light' | 'left-dark';
};

const heroSlides: readonly HeroPosterSlide[] = [
  {
    id: 'identity-technology',
    eyebrow: 'Identity technology',
    title: 'Identity that moves at the speed of business.',
    description: 'Biometric attendance, access control, and workplace systems designed around real people, sites, and operating needs.',
    desktopMedia: '/campaign/hero/identity-desktop-v2.webp',
    mobileMedia: '/campaign/hero/identity-mobile-v2.webp',
    alt: 'Modern office entrance with an integrated biometric access terminal',
    href: '/technologies',
    cta: 'Explore technology',
    textTone: 'dark',
    overlay: 'left-light',
  },
  {
    id: 'access-control',
    eyebrow: 'Access control',
    title: 'Secure every point of entry.',
    description: 'Connected access systems for offices, factories, campuses, and critical facilities—planned around the way people move.',
    desktopMedia: '/campaign/hero/access-desktop-v2.webp',
    mobileMedia: '/campaign/hero/access-mobile-v2.webp',
    alt: 'Employees moving through intelligent access-control gates',
    href: '/solutions/physical-access-control',
    cta: 'Explore access control',
    textTone: 'light',
    overlay: 'left-dark',
  },
  {
    id: 'workforce',
    eyebrow: 'Workforce operations',
    title: 'Attendance without the complexity.',
    description: 'Accurate workforce identity and attendance across teams, shifts, branches, and locations.',
    desktopMedia: '/campaign/hero/workforce-desktop-v2.webp',
    mobileMedia: '/campaign/hero/workforce-mobile-v2.webp',
    alt: 'Employees arriving at a modern workplace attendance point',
    href: '/solutions/attendance-automation',
    cta: 'Explore attendance',
    textTone: 'dark',
    overlay: 'left-light',
  },
  {
    id: 'integrated-security',
    eyebrow: 'Integrated security',
    title: 'One intelligent view of your facility.',
    description: 'Bring devices, locations, identity, and security events together through one connected operating ecosystem.',
    desktopMedia: '/campaign/hero/security-desktop-v2.webp',
    mobileMedia: '/campaign/hero/security-mobile-v2.webp',
    alt: 'Integrated facility security operations environment',
    href: '/platform',
    cta: 'View the platform',
    textTone: 'light',
    overlay: 'left-dark',
  },
  {
    id: 'innovation',
    eyebrow: 'Innovation',
    title: 'Built for what comes next.',
    description: 'Edge intelligence, computer vision, and connected identity technology engineered for tomorrow’s environments.',
    desktopMedia: '/campaign/hero/innovation-desktop-v2.webp',
    mobileMedia: '/campaign/hero/innovation-mobile-v2.webp',
    alt: 'Engineer testing biometric identity technology in a modern lab',
    href: '/technologies',
    cta: 'Discover innovation',
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
    const timer = window.setInterval(() => setActive((current) => (current + 1) % heroSlides.length), 7200);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="poster-hero"
      aria-roledescription="carousel"
      aria-label="Indian Infotech capabilities"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
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
            <Link className="poster-link" href={slide.href} tabIndex={index === active ? undefined : -1}>{slide.cta}<span aria-hidden="true">↗</span></Link>
          </div>
        </article>
      ))}
    </section>
  );
}
