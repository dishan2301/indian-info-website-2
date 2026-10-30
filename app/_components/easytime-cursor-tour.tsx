'use client';
import { useEffect, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { MousePointer2 } from 'lucide-react';
import s from './easytime-cursor-tour.module.css';

const tours = [
  [['Attendance overview', 'Review today’s attendance totals.', 23, 27], ['Departments', 'Compare attendance across your teams.', 81, 30], ['Clock-in records', 'Review employee arrival and departure times.', 80, 70]],
  [['Leave balance', 'Check leave taken and available days.', 87, 36], ['My attendance', 'See your punch and working time.', 27, 72], ['Hours summary', 'Follow daily, weekly and monthly hours.', 64, 69]],
  [['Employee status', 'See full-time, contract and probation groups.', 32, 29], ['Leave distribution', 'Review sick, casual and unpaid leave.', 32, 49], ['Missed punches', 'Find attendance exceptions for review.', 64, 81]],
  [['Present today', 'Review present and absent totals.', 55, 28], ['Pending corrections', 'Check regularizations awaiting review.', 84, 42], ['Attendance trends', 'Compare attendance patterns over time.', 44, 70]],
] as const;

export function EasytimeCursorTour() {
  const [host, setHost] = useState<Element | null>(null);
  const [slide, setSlide] = useState(0);
  const [point, setPoint] = useState(0);
  useEffect(() => {
    const observer = new MutationObserver(find);
    function find() {
      const target = document.querySelector('.software-tour .saas-playback');
      if (target) { setHost(target); observer.disconnect(); }
    }
    observer.observe(document.body, { childList: true, subtree: true }); find();
    const sync = (event: Event) => { setSlide((event as CustomEvent<number>).detail); setPoint(0); };
    window.addEventListener('easytime-slide-change', sync);
    return () => { observer.disconnect(); window.removeEventListener('easytime-slide-change', sync); };
  }, []);
  useEffect(() => {
    if (!host) return;
    const timer = setInterval(() => setPoint((current) => (current + 1) % 3), 3300);
    return () => clearInterval(timer);
  }, [host, slide]);
  const [title, description, x, y] = tours[slide % 4][point];
  return host ? createPortal(<div className={s.layer} aria-hidden="true" style={{ '--x': `${x}%`, '--y': `${y}%` } as CSSProperties}>
    <MousePointer2 className={s.cursor} fill="#087eae" />
    <span key={`pulse-${slide}-${point}`} className={s.click} />
    <article key={`${slide}-${point}`} className={`${s.detail} ${x > 65 ? s.left : ''} ${y > 60 ? s.above : ''}`}><small>EASYTIME · WORKFLOW PREVIEW</small><strong>{title}</strong><p>{description}</p><span>✓ Review in one workspace</span></article>
  </div>, host) : null;
}
