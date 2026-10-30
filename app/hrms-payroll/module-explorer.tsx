'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Check } from 'lucide-react';
import { hrmsModules } from '../content';
import { hrmsDetails } from './content';
import styles from './module-explorer.module.css';

const stages = [
  { name: 'Hire & join', slugs: ['recruitment', 'onboarding', 'visitors'] },
  { name: 'Time & work', slugs: ['attendance', 'leave', 'timesheet'] },
  { name: 'Pay & support', slugs: ['core-hris-payroll', 'expense', 'ess', 'hr-help-desk'] },
  { name: 'Grow & transition', slugs: ['pms', 'performance-linked-benefits', 'training-induction', 'off-boarding'] },
];

export default function ModuleExplorer() {
  const [stage, setStage] = useState(0);
  return <section className={`section ${styles.explorer}`} id="modules" aria-labelledby="modules-heading">
    <div className={styles.heading}>
      <p className="section-kicker">Explore the HR suite</p>
      <h2 id="modules-heading">The workflows behind every stage of work.</h2>
      <p>Explore each module to see its capabilities, workflow, and the questions to discuss with our team.</p>
    </div>
    <div className={styles.stages} aria-label="Employee journey stages">
      {stages.map((item, index) => <button type="button" key={item.name} aria-pressed={stage === index} onClick={() => setStage(index)}><span>0{index + 1}</span><strong>{item.name}</strong><small>{item.slugs.length} modules</small></button>)}
    </div>
    <div className={styles.cards}>
      {hrmsModules.filter((module) => stages[stage].slugs.includes(module.slug)).map((module) => { const index = hrmsModules.indexOf(module); return (
        <article className={styles.card} key={module.slug}>
          <Link className={styles.image} href={`/hrms-payroll/${module.slug}`} tabIndex={-1} aria-hidden="true">
            <Image src={module.image} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" />
            <span>MODULE {String(index + 1).padStart(2, '0')}</span>
          </Link>
          <div className={styles.copy}>
            <div className={styles.cardTop}><span>HRMS MODULE</span><ArrowUpRight size={19} aria-hidden="true" /></div>
            <h3><Link href={`/hrms-payroll/${module.slug}`}>{module.name}</Link></h3>
            <p>{module.summary}</p>
            <ul>{hrmsDetails[module.slug].features.slice(0, 3).map(([name]) => <li key={name}><Check size={15} aria-hidden="true" />{name}</li>)}</ul>
            <Link className={styles.cardLink} href={`/hrms-payroll/${module.slug}`}>Explore {module.name}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </article>
      ); })}
    </div>
  </section>;
}

