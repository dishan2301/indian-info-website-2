'use client';

import { useEffect, useRef, useState } from 'react';
import { BookOpen, CalendarDays, ClipboardCheck, FileCheck, FileText, Fingerprint, GraduationCap, Headphones, LogOut, Receipt, Target, Timer, UserCheck, Users, Wallet, type LucideIcon } from 'lucide-react';
import styles from './animated-feature-scene.module.css';

const icons: Record<string, [LucideIcon, LucideIcon, LucideIcon]> = {
  recruitment: [FileText, Users, UserCheck], onboarding: [FileText, ClipboardCheck, UserCheck],
  'core-hris-payroll': [Users, Timer, Wallet], ess: [Users, CalendarDays, FileText],
  leave: [CalendarDays, ClipboardCheck, UserCheck], attendance: [Fingerprint, Timer, ClipboardCheck],
  expense: [Receipt, ClipboardCheck, Wallet], timesheet: [Timer, ClipboardCheck, FileText],
  pms: [Target, Users, FileCheck], 'performance-linked-benefits': [Target, ClipboardCheck, Wallet],
  'hr-help-desk': [FileText, Headphones, FileCheck], 'training-induction': [BookOpen, Users, GraduationCap],
  'off-boarding': [LogOut, ClipboardCheck, Wallet], visitors: [Users, UserCheck, FileCheck],
};

function StageDetail({ module, stage }: { module: string; stage: number }) {
  const patterns: Record<string, string[]> = {
    recruitment: ['profile', 'checklist', 'document'], 'core-hris-payroll': ['profile', 'report', 'payment'], ess: ['profile', 'checklist', 'document'],
    leave: ['calendar', 'checklist', 'calendar'], attendance: ['clock', 'checklist', 'payment'],
    expense: ['document', 'checklist', 'payment'], timesheet: ['folder', 'clock', 'checklist'],
    pms: ['report', 'message', 'report'], 'performance-linked-benefits': ['report', 'checklist', 'payment'],
    'hr-help-desk': ['document', 'message', 'checklist'], 'off-boarding': ['document', 'checklist', 'payment'],
    visitors: ['message', 'checklist', 'profile'],
  };
  const pattern = patterns[module]?.[stage];
  if (pattern) return <svg className={styles.pilotDetail} viewBox="0 0 64 38" fill="none" stroke="#137b72" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {pattern === 'profile' && <><rect x="10" y="4" width="44" height="30" rx="4"/><circle cx="23" cy="15" r="5"/><path d="M16 27c1-6 13-6 14 0M36 14h12M36 19h9M36 24h12"/></>}
    {pattern === 'calendar' && <><rect x="8" y="5" width="48" height="29" rx="3"/><path d="M8 13h48M17 3v5M47 3v5M17 19h5M29 19h5M41 19h5M17 26h5M29 26h5"/><circle cx="44" cy="26" r="3" fill="#bfe2ce"/></>}
    {pattern === 'checklist' && <><rect x="13" y="4" width="38" height="31" rx="3"/><path d="m20 13 2 2 4-4M30 13h14M20 23l2 2 4-4M30 23h14"/></>}
    {pattern === 'document' && <><path d="M14 4h28l8 8v22H14zM42 4v8h8M21 16h22M21 21h18M21 26h14"/></>}
    {pattern === 'payment' && <><rect x="9" y="6" width="46" height="27" rx="3"/><path d="M9 14h46M15 22h12M15 27h8M39 25h10"/><circle cx="44" cy="24" r="5"/></>}
    {pattern === 'report' && <><path d="M10 31h44M15 26V16h8v10M28 26V10h8v16M41 26V5h8v21"/><path d="m14 8 9-4 8 2 15-4"/></>}
    {pattern === 'clock' && <><circle cx="32" cy="19" r="15"/><path d="M32 9v10l7 5M32 4v3M17 19h3M44 19h3"/></>}
    {pattern === 'folder' && <><path d="M6 12h22l5 5h25v17H6zM8 12V7h18l4 5M15 24h17M15 28h12"/></>}
    {pattern === 'message' && <><path d="M8 6h30v19H21l-7 6v-6H8zM27 29h17l6 5v-5h6V11H42M14 13h18M14 18h12"/></>}
  </svg>;
  if (!['training-induction', 'recruitment', 'onboarding'].includes(module)) return null;
  return <svg className={styles.pilotDetail} viewBox="0 0 64 38" fill="none" stroke="#137b72" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {module === 'training-induction' && (stage === 0 ? <><path d="M7 7c9-3 17-2 25 3v21c-8-5-16-6-25-3zM57 7c-9-3-17-2-25 3v21c8-5 16-6 25-3z"/><path d="M12 13h12M12 18h10M40 13h12M42 18h10"/></> : stage === 1 ? <><rect x="8" y="5" width="48" height="29" rx="3"/><path d="M8 13h48M17 3v5M47 3v5M17 19h5M29 19h5M41 19h5M17 26h5M29 26h5"/><circle cx="44" cy="26" r="3" fill="#bfe2ce"/></> : <><path d="M10 31h44M15 26V16h8v10M28 26V10h8v16M41 26V5h8v21"/><path d="m14 8 9-4 8 2 15-4"/></>)}
    {module === 'recruitment' && (stage === 0 ? <><rect x="12" y="3" width="40" height="32" rx="3"/><circle cx="23" cy="14" r="4"/><path d="M17 25c1-5 11-5 12 0M34 12h12M34 17h9M34 22h12"/></> : stage === 1 ? <><path d="M8 6h30v19H21l-7 6v-6H8zM27 29h17l6 5v-5h6V11H42"/><path d="M14 13h18M14 18h12"/></> : <><path d="M14 4h28l8 8v22H14zM42 4v8h8M21 16h22M21 21h18"/><path d="m24 28 4 3 8-7"/></>)}
    {module === 'onboarding' && (stage === 0 ? <><path d="M6 12h22l5 5h25v17H6zM8 12V7h18l4 5"/><path d="M15 24h17M15 28h12"/></> : stage === 1 ? <><rect x="13" y="4" width="38" height="31" rx="3"/><path d="m20 13 2 2 4-4M30 13h14M20 23l2 2 4-4M30 23h14"/></> : <><rect x="10" y="4" width="44" height="30" rx="4"/><circle cx="23" cy="15" r="5"/><path d="M16 27c1-6 13-6 14 0M36 14h12M36 19h9M36 24h12"/></>)}
  </svg>;
}

export function FeatureReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.dataset.entered = 'true'; observer.disconnect(); }
    }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`${className || ''} ${styles.reveal}`}>{children}</div>;
}

export function AnimatedFeatureScene({ module, stages, variant = 0 }: { module: string; stages: string[]; variant?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const sceneIcons = icons[module] || [FileText, ClipboardCheck, FileCheck];
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!('IntersectionObserver' in window)) { setLoaded(true); return; }
    const observer = new IntersectionObserver(([entry]) => { node.dataset.visible = String(entry.isIntersecting); if (entry.isIntersecting) setLoaded(true); }, { rootMargin: '200px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={styles.scene} data-visible="true" aria-hidden="true">
    {loaded && <><svg className={styles.platform} viewBox="0 0 500 330" fill="none">
      <path d="M44 230 250 116 456 230 250 320 44 230Z" fill="#cde5d9" />
      <path d="M44 230v20l206 72v-22L44 230Z" fill="#a4c9b8" />
      <path d="M456 230v20l-206 72v-22l206-70Z" fill="#7fb4a0" />
      <path d="M91 229 250 143l159 86-159 68-159-68Z" stroke="#fff" strokeWidth="2" strokeDasharray="5 7" />
      <path d="M155 226 250 179l95 47" stroke="#79ac9b" strokeWidth="3" strokeDasharray="5 7" />
      <circle className={styles.signal} cx="155" cy="226" r="6" fill="#137b72" />

    </svg>
    {variant ? <div className={styles.capabilityPanel}><span>IN PRACTICE</span><strong>Connected capabilities</strong>{stages.map((stage, index) => <div key={stage} style={{ animationDelay: `${index * .5}s` }}><ClipboardCheck size={20} strokeWidth={1.7} /><span>{stage}</span></div>)}</div> : <>
    <div className={`${styles.card} ${styles.first}`}><span className={styles.icon}>{(() => { const Icon = sceneIcons[0]; return <Icon size={27} strokeWidth={1.6} />; })()}</span><small>01</small><strong>{stages[0]}</strong><StageDetail module={module} stage={0} /><i /><div className={styles.cardDetail}><b /><b /><b /></div></div>
    <div className={`${styles.card} ${styles.second}`}><span className={styles.icon}>{(() => { const Icon = sceneIcons[1]; return <Icon size={27} strokeWidth={1.6} />; })()}</span><small>02</small><strong>{stages[1]}</strong><StageDetail module={module} stage={1} /><i /><div className={styles.cardDetail}><b /><b /><b /></div></div>
    <div className={`${styles.card} ${styles.third}`}><span className={styles.icon}>{(() => { const Icon = sceneIcons[2]; return <Icon size={27} strokeWidth={1.6} />; })()}</span><small>03</small><strong>{stages[2]}</strong><StageDetail module={module} stage={2} /><i /><div className={styles.cardDetail}><b /><b /><b /></div></div>
    <div className={styles.badge}><ClipboardCheck size={20} strokeWidth={1.7} /><span>{variant ? 'Connected' : 'Process review'}</span><span className={styles.complete}>✓</span></div></>}</>}
  </div>;
}
