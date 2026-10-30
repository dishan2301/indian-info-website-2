'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Layers3, Pause, Play } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import styles from './vertical-tabs.module.css';

export type VerticalTabService = {
  id: string;
  title: string;
  description: string;
  image: string;
  fallbackImage: string;
  href: string;
  points: readonly (readonly [string, string])[];
};

const AUTO_PLAY_DURATION = 9000;

export function VerticalTabs({ services, enabled = true }: { services: readonly VerticalTabService[]; enabled?: boolean }) {
  const section = useRef<HTMLElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const wheelTime = useRef(0);
  const gallery = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const progress = useMotionValue(0);
  const inView = useInView(section, { amount: .3 });
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pointIndex, setPointIndex] = useState(0);
  const current = services[activeIndex];
  const running = enabled && inView && visible && !paused && !hovered && !focused && !reduced;

  const select = useCallback((index: number, nextDirection: number) => {
    if (!services.length) return;
    setDirection(nextDirection);
    setActiveIndex((index + services.length) % services.length);
    setPointIndex(0);
    elapsed.current = 0;
    progress.set(0);
  }, [services.length, progress]);

  useEffect(() => {
    const node=gallery.current;if(!node)return;
    const wheel=(event:WheelEvent)=>{
      const rect=node.getBoundingClientRect();
      if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)return;
      if(node.closest('[data-feature-ready="false"]'))return;
      if(Math.abs(event.deltaY)<3 || Math.abs(event.deltaX)>Math.abs(event.deltaY))return;
      const direction=event.deltaY>0?1:-1;
      if((direction<0&&activeIndex===0)||(direction>0&&activeIndex===services.length-1))return;
      event.preventDefault();
      if(performance.now()-wheelTime.current<650)return;
      wheelTime.current=performance.now();select(activeIndex+direction,direction);
    };
    window.addEventListener('wheel',wheel,{passive:false});
    return()=>window.removeEventListener('wheel',wheel);
  },[activeIndex,services.length,select]);

  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(() => {
    if (!running || !current) return;
    let last = performance.now();
    let frame: number;
    const tick = (now: number) => {
      elapsed.current += Math.min(now - last, 100);
      last = now;
      progress.set(Math.min(elapsed.current / AUTO_PLAY_DURATION, 1));
      setPointIndex(Math.min(current.points.length - 1, Math.floor(elapsed.current / 3000)));
      if (elapsed.current >= AUTO_PLAY_DURATION) {
        select(activeIndex + 1, 1);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex, current, running, progress, select]);

  useEffect(() => {
    const container = list.current;
    const tab = container?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    if (!container || !tab) return;
    const top = tab.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
    if (top < container.scrollTop || top + tab.offsetHeight > container.scrollTop + container.clientHeight) {
      container.scrollTo({ top: Math.max(0, top - 12), behavior: reduced ? 'instant' : 'smooth' });
    }
  }, [activeIndex, reduced]);

  if (!current) return null;
  const point = current.points[pointIndex] ?? current.points[0];

  return (
    <section ref={section} id="hrms-features" className={cn('w-full bg-white', styles.section)} aria-labelledby="hrms-features-title"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className={cn('mx-auto w-full', styles.inner)}>
        <header className={styles.heading}>
          <div><span>14 CONNECTED FEATURES · ONE PLATFORM</span><h2 id="hrms-features-title">HR &amp; payroll workflow features</h2></div>
          <p>From the first interview to the everyday essentials.<br />Explore everything your team needs to work better.</p>
        </header>
        <div className={styles.grid}>
          <div className={styles.content}>
            <div className={styles.listHeading}><span>SELECT A WORKFLOW</span><span className={styles.counter}>{String(activeIndex + 1).padStart(2, '0')} <i>/ {services.length}</i></span></div>
            <div ref={list} className={styles.tabs} role="tablist" aria-label="HR and payroll features" aria-orientation="vertical">
              {services.map((service, index) => {
                const active = index === activeIndex;
                return <button key={service.id} id={`feature-tab-${service.id}`} type="button" role="tab" aria-selected={active} aria-controls="hrms-feature-panel" tabIndex={active ? 0 : -1} data-index={index}
                  className={cn(styles.tab, active && styles.active)}
                  onClick={() => select(index, index > activeIndex ? 1 : -1)}
                  onKeyDown={event => {
                    const next = event.key === 'ArrowDown' ? (index + 1) % services.length : event.key === 'ArrowUp' ? (index - 1 + services.length) % services.length : event.key === 'Home' ? 0 : event.key === 'End' ? services.length - 1 : null;
                    if (next === null) return;
                    event.preventDefault(); select(next, next > index ? 1 : -1);
                    list.current?.querySelector<HTMLButtonElement>(`[data-index="${next}"]`)?.focus({ preventScroll: true });
                  }}>
                  <span className={styles.rail}>{active && <motion.i style={{ scaleY: progress }} />}</span>
                  <span className={styles.number}>/{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.tabCopy}><span className={styles.tabTitle}>{service.title}</span>
                    {active && <motion.span initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} className={styles.description}>{service.description}<span className={styles.keyPoints}>{service.points.map(([name]) => <span key={name}><Check size={11} />{name}</span>)}</span></motion.span>}
                  </span><ArrowUpRight className={styles.tabArrow} size={16} />
                </button>;
              })}
            </div>
            <div className={styles.listFooter}><span>Explore at your pace</span><button type="button" aria-label={paused ? 'Play automatic feature tour' : 'Pause automatic feature tour'} aria-pressed={paused} onClick={() => setPaused(v => !v)}>{paused || reduced ? <Play size={12} /> : <Pause size={12} />}{reduced ? 'Manual tour' : paused ? 'Play tour' : 'Auto tour'}</button></div>
          </div>
          <div id="hrms-feature-panel" role="tabpanel" aria-labelledby={`feature-tab-${current.id}`} className={styles.panel}>
            <div ref={gallery} data-laptop-screen className={styles.gallery}>
              <AnimatePresence initial={false} custom={direction} mode="sync">
                <motion.div key={current.id} custom={direction} className={styles.slide}
                  variants={{ enter: (d: number) => ({ y: reduced ? 0 : `${d * 30}%`, opacity: 0 }), center: { y: 0, opacity: 1 }, exit: (d: number) => ({ y: reduced ? 0 : `${d * -30}%`, opacity: 0 }) }}
                  initial="enter" animate="center" exit="exit" transition={{ duration: reduced ? 0 : .55, ease: [.22, 1, .36, 1] }}>
                  <img src={current.image} alt={`${current.title}: people working together`} onError={event => { const img = event.currentTarget; if (!img.dataset.fallback) { img.dataset.fallback = 'true'; img.src = current.fallbackImage; } }} />
                  <div className={styles.shade} />
                </motion.div>
              </AnimatePresence>
              <span className={styles.imageLabel}><Layers3 size={13} /> {current.title}</span>
              <div className={styles.popup} aria-live="off">
                <div className={styles.popupHeader}><span className={styles.popupIcon}><Check size={15} /></span><span>MADE FOR YOUR WORKDAY</span><i /></div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={`${current.id}-${pointIndex}`} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: reduced ? 0 : .2 }}>
                    <h3>{point?.[0]}</h3><p>{point?.[1]}</p>
                  </motion.div>
                </AnimatePresence>
                <div className={styles.popupSteps}>{current.points.map(([name], index) => <button type="button" key={name} aria-label={`Show ${name}`} aria-pressed={index === pointIndex} onClick={() => { setPointIndex(index); elapsed.current = index * 3000; progress.set(elapsed.current / AUTO_PLAY_DURATION); }} />)}</div>
              </div>
              <div className={styles.arrows}><button type="button" onClick={() => select(activeIndex - 1, -1)} aria-label="Previous feature"><ArrowLeft size={18} /></button><button type="button" onClick={() => select(activeIndex + 1, 1)} aria-label="Next feature"><ArrowRight size={18} /></button></div>
            </div>
            <div className={styles.panelFooter}><span>One connected employee experience.</span><Link href={current.href}>Explore {current.title} <ArrowUpRight size={14} /></Link></div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default VerticalTabs;
