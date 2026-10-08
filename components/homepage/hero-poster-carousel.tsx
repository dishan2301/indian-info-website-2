'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const workforceScenes = [
  { title: 'Contract Labour Management System', eyebrow: 'Workforce operations', text: 'Coordinate contractor teams, attendance, shifts, and workforce visibility across your sites.', image: '/campaign/product-moments/contract-workforce-v3.png', alt: 'A supervisor coordinating contractors beside Indian Infotech branded entrance control devices at a manufacturing campus', href: '/contract-labour-management', cta: 'Explore contract labour management' },
  { title: 'HRMS & Payroll', eyebrow: 'People operations', text: 'A connected suite spanning attendance, leave, employee self-service, payroll, recruitment, and lifecycle workflows.', image: '/campaign/product-moments/hrms-payroll-v2.png', alt: 'HR and payroll specialists connecting attendance, payroll approval, and employee self-service', href: '/hrms-payroll', cta: 'Explore HRMS & Payroll' },
  { title: 'Entrance Management System', eyebrow: 'Secure movement', text: 'Manage pedestrian entry with coordinated barriers and a smoother, controlled arrival experience.', image: '/campaign/product-moments/entrance-control-v2.png', alt: 'Pedestrian turnstiles, vehicle barrier, and security console working together at a campus entrance', href: '/products#entrance-management', cta: 'Explore entrance systems' },
  { title: 'Access Control & Door Interlock', eyebrow: 'Controlled access', text: 'Coordinate secure entry points and interlocking doors for offices and controlled environments.', image: '/campaign/product-moments/door-interlock-v1.png', alt: 'Pharmaceutical technician entering a cleanroom interlock corridor', href: '/access-control-system', cta: 'Explore access control' },
  { title: 'More Workplace Software', eyebrow: 'Connected operations', text: 'Discover practical software for visitors, canteens, attendance, and everyday workforce operations.', image: '/campaign/product-moments/visitor-management-v2.png', alt: 'Visitor using QR check-in while a host approval workflow updates at a corporate reception', href: '/software', cta: 'Explore all software', more: ['EasyTime Online Attendance', 'Easy Visit Visitor Management', 'Canteen Management'] },
] as const;

function ScreenTitle({ index, title }: { index: number; title: string }) {
  return index === 0
    ? <h1 className="workforce-screen-title">{title}</h1>
    : <h2 className="workforce-screen-title">{title}</h2>;
}

export function HeroPoster() {
  const hero = useRef<HTMLElement>(null);
  const [activePanel, setActivePanel] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const node = hero.current;
    if (!node) return;
    let frame = 0;
    let disposed = false;
    const measure = () => {
      frame = 0;
      const copy = node.querySelector<HTMLElement>('[data-active="true"] .workforce-screen-card-copy');
      if (!copy) return;
      const top = parseFloat(getComputedStyle(copy).top) || 0;
      const verticalTitles = [...node.querySelectorAll<HTMLElement>('.workforce-screen-title')].filter((title) => getComputedStyle(title).writingMode === 'vertical-rl');
      const height = `${Math.ceil(Math.max(top + copy.scrollHeight + 32, ...verticalTitles.map((title) => title.scrollHeight + 32)))}px`;
      if (node.style.getPropertyValue('--hero-content-height') !== height) node.style.setProperty('--hero-content-height', height);
    };
    const schedule = () => { if (!disposed && !frame) frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    node.querySelectorAll('.workforce-screen-grid, .workforce-screen-card-copy').forEach((element) => observer.observe(element));
    window.addEventListener('resize', schedule);
    window.visualViewport?.addEventListener('resize', schedule);
    document.fonts.ready.then(schedule);
    schedule();
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', schedule);
      window.visualViewport?.removeEventListener('resize', schedule);
    };
  }, []);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 760px) and (hover: none) and (pointer: coarse)');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: number | undefined;
    const sync = () => {
      window.clearInterval(timer);
      if (focused || (!mobile.matches && hovered) || motion.matches) return;
      timer = window.setInterval(() => setActivePanel((current) => (current + 1) % workforceScenes.length), 3000);
    };
    sync();
    motion.addEventListener('change', sync);
    mobile.addEventListener('change', sync);
    return () => {
      window.clearInterval(timer);
      motion.removeEventListener('change', sync);
      mobile.removeEventListener('change', sync);
    };
  }, [hovered, focused]);

  return <section ref={hero} className="poster-hero workforce-screen" aria-label="Indian Infotech workforce systems">
    <div className="workforce-screen-grid" aria-label="Explore workforce systems" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      {workforceScenes.map((scene, index) => <Link className="workforce-screen-card" data-active={activePanel === index} data-more={index === 4} data-scene={['contract-labor', 'hrms-payroll', 'entrance-control', 'door-interlock', 'workplace-software'][index]} href={scene.href} onMouseEnter={() => setActivePanel(index)} onFocus={() => setActivePanel(index)} onClick={() => setActivePanel(index)} key={scene.title}>
        <Image src={scene.image} alt={scene.alt} fill sizes={activePanel === index ? '(max-width: 760px) 100vw, 68vw' : '(max-width: 760px) 100vw, 10vw'} quality={82} priority={index === 0} />
        <span className="workforce-screen-card-copy"><small>{String(index + 1).padStart(2, '0')} · {scene.eyebrow}</small><ScreenTitle index={index} title={scene.title} /><em>{scene.text}</em>{'more' in scene && <span className="workforce-screen-more-list">{scene.more.map((item) => <span key={item}>{item}</span>)}</span>}<b>{scene.cta} <i aria-hidden="true">↗</i></b></span>
      </Link>)}
    </div>
  </section>;
}
