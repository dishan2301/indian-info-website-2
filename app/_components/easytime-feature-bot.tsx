'use client';
import { useEffect, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import s from './easytime-callouts.module.css';

const slides = [
  [['Daily attendance', 'Check the attendance overview at a glance.', 18, 19], ['Team distribution', 'See employees across departments.', 67, 36], ['Arrival records', 'Review individual clock-in and clock-out times.', 68, 65]],
  [['My leave balance', 'See leave taken, available days and requests.', 68, 30], ['My attendance', 'Check today’s punch and recorded working time.', 18, 60], ['Working hours', 'Compare daily, weekly and monthly hour totals.', 45, 67]],
  [['Employee status', 'Review full-time, contract and probation groups.', 18, 25], ['Leave distribution', 'See sick, casual and unpaid leave together.', 21, 49], ['Attendance exceptions', 'Spot late arrivals and missed punches.', 56, 67]],
  [['Daily workforce totals', 'Compare present, absent and late employees.', 42, 25], ['Pending corrections', 'Find regularizations awaiting review.', 68, 43], ['Attendance trends', 'Follow attendance patterns across the year.', 23, 67]],
] as const;
const titles = ['Attendance overview', 'Employee self-service', 'HR approvals', 'Workforce reports'];

export function EasytimeFeatureBot() {
  const [host, setHost] = useState<Element | null>(null);
  const [step, setStep] = useState(0);
  useEffect(() => {
    const observer = new MutationObserver(find);
    function find() {
      const target = document.querySelector('.software-tour .saas-playback')?.parentElement;
      if (target) { setHost(target); observer.disconnect(); }
    }
    observer.observe(document.body, { childList: true, subtree: true });
    find();
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!host) return;
    const interval = setInterval(() => setStep((current) => (current + 1) % slides.length), 10000);
    return () => clearInterval(interval);
  }, [host, step]);
  useEffect(() => {
    if (host) window.dispatchEvent(new CustomEvent('easytime-feature-step', { detail: step }));
  }, [host, step]);
  return host ? createPortal(<section className={s.panel} aria-label="Dashboard feature highlights">
    <header className={s.heading}><div><small>EXPLORE THIS WORKSPACE · 0{step + 1} / 04</small><h3>{titles[step]}</h3></div><div className={s.navigation}>{titles.map((title, index) => <button key={title} type="button" aria-label={`Show ${title}`} aria-pressed={step === index} onClick={() => setStep(index)}><span /></button>)}</div></header>
    <div className={s.cards} key={step}>
      {slides[step].map(([title, description], index) => <article key={title} className={s.callout} style={{ '--delay': `${0.15 + index * 0.25}s`, '--tone': ['#087eae', '#15906d', '#ce7524'][index] } as CSSProperties}>
        <span className={s.marker} aria-hidden="true">0{index + 1}</span><div><strong>{title}</strong><p>{description}</p></div>
      </article>)}
    </div>
    <div className={s.progress} key={`progress-${step}`} aria-hidden="true"><span /></div>
  </section>, host) : null;
}
