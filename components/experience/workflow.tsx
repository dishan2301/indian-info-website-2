'use client';
import { useId, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import styles from './experience.module.css';

type Step = { title: string; text: string };
export default function Workflow({ steps, label = 'How it works' }: { steps: readonly Step[]; label?: string }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  return <div className={styles.workflow}>
    <div className={styles.stepTabs} role="tablist" aria-label={label}>{steps.map((step, index) => <button key={step.title} ref={el => { tabs.current[index] = el; }} type="button" role="tab" aria-selected={active === index} aria-controls={`${id}-panel-${index}`} id={`${id}-tab-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
      let next = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % steps.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + steps.length - 1) % steps.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = steps.length - 1;
      else return;
      event.preventDefault(); setActive(next); tabs.current[next]?.focus();
    }}><span>{index < active ? <Check size={16} /> : String(index + 1).padStart(2, '0')}</span><strong>{step.title}</strong><ArrowRight size={16} aria-hidden="true" /></button>)}</div>
    {steps.map((step, index) => <div key={step.title} role="tabpanel" id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`} hidden={active !== index} tabIndex={0} className={styles.stepPanel}>
      {active === index && <motion.div initial={false} animate={reduced ? undefined : { y: [8, 0], opacity: [.6, 1] }} transition={{ duration: .3 }}><span className={styles.kicker}>STEP {String(index + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}</span><h3>{step.title}</h3><p>{step.text}</p><div className={styles.stepProgress} aria-hidden="true">{steps.map((_, i) => <i key={i} data-active={i <= active} />)}</div></motion.div>}
    </div>)}
  </div>;
}
