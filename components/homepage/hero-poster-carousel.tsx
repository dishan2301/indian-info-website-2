'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const workforceScenes = [
  { title: 'Contract Labour Management System', eyebrow: 'Workforce operations', text: 'Coordinate contractor teams, attendance, shifts, and workforce visibility across your sites.', image: '/campaign/product-moments/contract-workforce-v1.png', alt: 'A supervisor coordinating contractors at a manufacturing campus entrance', href: '/software/easytime-online', cta: 'Explore workforce systems' },
  { title: 'HRMS & Payroll', eyebrow: 'People operations', text: 'A connected suite spanning attendance, leave, employee self-service, payroll, recruitment, and lifecycle workflows.', image: '/campaign/product-moments/hrms-payroll-v2.png', alt: 'HR and payroll specialists connecting attendance, payroll approval, and employee self-service', href: '/software/hrms-payroll', cta: 'Explore HRMS' },
  { title: 'Entrance Management System', eyebrow: 'Secure movement', text: 'Manage pedestrian entry with coordinated barriers and a smoother, controlled arrival experience.', image: '/campaign/product-moments/entrance-control-v2.png', alt: 'Pedestrian turnstiles, vehicle barrier, and security console working together at a campus entrance', href: '/products#entrance-management', cta: 'Explore entrance systems' },
  { title: 'Access Control & Door Interlock', eyebrow: 'Controlled access', text: 'Coordinate secure entry points and interlocking doors for offices and controlled environments.', image: '/campaign/product-moments/door-interlock-v1.png', alt: 'Pharmaceutical technician entering a cleanroom interlock corridor', href: '/industries/pharma', cta: 'Explore access control' },
  { title: 'More Workplace Software', eyebrow: 'Connected operations', text: 'Discover practical software for visitors, canteens, attendance, and everyday workforce operations.', image: '/campaign/product-moments/visitor-management-v2.png', alt: 'Visitor using QR check-in while a host approval workflow updates at a corporate reception', href: '/software', cta: 'Explore all software', more: ['EasyTime Online Attendance', 'Easy Visit Visitor Management', 'Canteen Management', 'HRMS & Payroll'] },
] as const;

export function HeroPoster() {
  const [activePanel, setActivePanel] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (hovered || focused) return;
    const timer = window.setInterval(() => {
      setActivePanel((current) => (current + 1) % workforceScenes.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [hovered, focused]);

  return <section className="poster-hero workforce-screen" aria-label="Indian Infotech workforce systems">
    <div className="workforce-screen-grid" aria-label="Explore workforce systems" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      {workforceScenes.map((scene, index) => <Link className="workforce-screen-card" data-active={activePanel === index} data-more={index === 4} data-scene={['contract-labor', 'hrms-payroll', 'entrance-control', 'door-interlock', 'workplace-software'][index]} href={scene.href} onMouseEnter={() => setActivePanel(index)} onFocus={() => setActivePanel(index)} onClick={() => setActivePanel(index)} key={scene.title}>
        <Image src={scene.image} alt={scene.alt} fill sizes={activePanel === index ? '(max-width: 760px) 100vw, 68vw' : '(max-width: 760px) 100vw, 10vw'} quality={82} priority={index === 0} />
        <span className="workforce-screen-card-copy"><small>{String(index + 1).padStart(2, '0')} · {scene.eyebrow}</small><strong>{scene.title}</strong><em>{scene.text}</em>{'more' in scene && <span className="workforce-screen-more-list">{scene.more.map((item) => <span key={item}>{item}</span>)}</span>}<b>{scene.cta} <i aria-hidden="true">↗</i></b></span>
      </Link>)}
    </div>
  </section>;
}
