'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const workforceScenes = [
  { title: 'EasyTime Online Attendance', eyebrow: 'Best-selling workforce system', text: 'Multi-company attendance, shifts, leave, reporting, and real-time data flow for distributed workforces.', image: '/campaign/core-systems/easytime-desktop-v2.webp', alt: 'Employees using a biometric attendance terminal at a workplace entrance', href: '/software/easytime-online', cta: 'Explore EasyTime' },
  { title: 'HRMS & Payroll', eyebrow: 'People operations', text: 'A connected suite spanning attendance, leave, employee self-service, payroll, recruitment, and lifecycle workflows.', image: '/campaign/core-systems/hrms-payroll-desktop-v2.webp', alt: 'HR team reviewing workforce and payroll reports', href: '/software/hrms-payroll', cta: 'Explore HRMS' },
  { title: 'Easy Visit VMS', eyebrow: 'Visitor operations', text: 'Preregistration, approvals, secure check-in, communication, and live visitor oversight for every workplace.', image: '/campaign/core-systems/easy-visit-desktop-v2.webp', alt: 'Visitor completing a digital check-in at a reception desk', href: '/software/visitor-management', cta: 'Explore Easy Visit' },
  { title: 'Entrance Control', eyebrow: 'Secure movement', text: 'Flap barriers, turnstiles, and boom barriers for controlled pedestrian and vehicle movement.', image: '/campaign/core-systems/entrance-control-desktop-v2.webp', alt: 'Employees entering through controlled barriers and turnstiles', href: '/products#entrance-management', cta: 'Explore entrance control' },
  { title: 'Clean-room Access', eyebrow: 'Regulated facilities', text: 'Interlocking and multi-door access control for security-sensitive operating environments.', image: '/campaign/core-systems/door-interlock-desktop-v2.webp', alt: 'Engineers working in a controlled industrial facility', href: '/industries/pharma', cta: 'Explore clean-room access' },
] as const;

export function HeroPoster() {
  const [activePanel, setActivePanel] = useState(0);

  return <section className="poster-hero workforce-screen" aria-label="Indian Infotech workforce systems">
    <div className="workforce-screen-grid" aria-label="Explore workforce systems">
      {workforceScenes.map((scene, index) => <Link className="workforce-screen-card" data-active={activePanel === index} href={scene.href} onMouseEnter={() => setActivePanel(index)} onFocus={() => setActivePanel(index)} onClick={() => setActivePanel(index)} key={scene.title}>
        <Image src={scene.image} alt={scene.alt} fill sizes="(max-width: 760px) 100vw, 60vw" quality={90} priority={index === 0} />
        <span className="workforce-screen-card-copy"><small>{String(index + 1).padStart(2, '0')} · {scene.eyebrow}</small><strong>{scene.title}</strong><em>{scene.text}</em><b>{scene.cta} <i aria-hidden="true">↗</i></b></span>
      </Link>)}
    </div>
  </section>;
}
