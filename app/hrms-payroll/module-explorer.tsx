'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { hrmsModules } from '../content';
import { hrmsDetails } from './content';
import styles from './module-explorer.module.css';

const stages = [
  { name: 'Hire & welcome', slugs: ['recruitment', 'onboarding', 'visitors'] },
  { name: 'Time & attendance', slugs: ['attendance', 'leave', 'timesheet'] },
  { name: 'Pay & self-service', slugs: ['core-hris-payroll', 'expense', 'ess'] },
  { name: 'Grow & transition', slugs: ['pms', 'hr-help-desk', 'off-boarding', 'performance-linked-benefits', 'training-induction'] },
] as const;

export default function ModuleExplorer() {
  const [active, setActive] = useState(0);
  const modules = stages[active].slugs.map((slug) => hrmsModules.find((module) => module.slug === slug)!).filter(Boolean);

  return <section className={`section ${styles.explorer}`} id="modules" aria-labelledby="modules-heading">
    <div className={styles.heading}><p className="section-kicker">THE EMPLOYEE JOURNEY</p><h2 id="modules-heading">Four stages. One connected HR suite.</h2><p>Choose a stage to explore the workflows that help your people and HR teams move forward.</p></div>
    <div className={styles.stages} role="group" aria-label="Employee journey stage">
      {stages.map((stage, index) => <button key={stage.name} type="button" aria-pressed={active === index} onClick={() => setActive(index)}><span>0{index + 1}</span><strong>{stage.name}</strong><small>{stage.slugs.length} modules</small></button>)}
    </div>
    <div className={styles.cards}>
      {modules.map((module) => <article className={styles.card} key={module.slug}>
        <div className={styles.cardTop}><span>HRMS MODULE</span><ArrowUpRight size={20} aria-hidden="true" /></div>
        <h3>{module.name}</h3><p>{module.summary}</p>
        <ul>{hrmsDetails[module.slug].features.slice(0, 3).map(([name]) => <li key={name}><Check size={15} aria-hidden="true" />{name}</li>)}</ul>
        <Link href={`/hrms-payroll/${module.slug}`}>Explore {module.name}<ArrowUpRight size={16} aria-hidden="true" /></Link>
      </article>)}
    </div>
  </section>;
}
