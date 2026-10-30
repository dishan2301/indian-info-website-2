'use client';

import { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { VerticalTabService } from '@/components/ui/vertical-tabs';
import styles from './feature-bot-showcase.module.css';

interface FeatureBotShowcaseProps {
  features: readonly VerticalTabService[];
}

export function FeatureBotShowcase({ features }: FeatureBotShowcaseProps) {
  const [step, setStep] = useState(0);
  const [positionIndex, setPositionIndex] = useState(0);
  const advance = useCallback(() => {
    if (!features.length) return;
    const offset = 1 + Math.floor(Math.random() * 2);
    setPositionIndex((current) => (current + offset) % 3);
    setStep((current) => (current + 1) % features.length);
  }, [features.length]);

  useEffect(() => {
    const pauseToggle = document.getElementById('pause-hero-motion') as HTMLInputElement | null;
    let interval: ReturnType<typeof setInterval> | undefined;
    const play = () => {
      if (interval) clearInterval(interval);
      interval = setInterval(advance, 6000);
    };
    const sync = () => {
      if (pauseToggle?.checked) {
        if (interval) clearInterval(interval);
      } else play();
    };
    sync();
    pauseToggle?.addEventListener('change', sync);
    return () => {
      if (interval) clearInterval(interval);
      pauseToggle?.removeEventListener('change', sync);
    };
  }, [advance]);

  if (!features.length) return null;
  const feature = features[step];
  const tones = [styles.orange, styles.blue, styles.green];
  const tone = tones[step % tones.length];
  const positions = [styles.positionOne, styles.positionTwo, styles.positionThree];
  const position = positions[positionIndex];

  return <div className={styles.showcase} aria-label="Connected HRMS feature highlights">
    <button key={`orb-${feature.id}`} className={`${styles.orb} ${tone} ${position}`} type="button" aria-label={`Show next feature after ${feature.title}`} onClick={advance}>
      <span className={styles.face} aria-hidden="true"><i /><i /><b /></span>
    </button>
    <article className={`${styles.panel} ${tone} ${position}`} key={`panel-${feature.id}`} aria-live="polite">
      <span className={styles.label}>HRMS FEATURE · {String(step + 1).padStart(2, '0')} / 14</span>
      <div className={styles.content}>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
        <div className={styles.points}>{feature.points?.slice(0, 3).map(([label, detail]) => <span key={label}><strong>{label}</strong><small>{detail}</small></span>)}</div>
      </div>
      <span className={styles.tap}><ArrowUpRight size={11} aria-hidden="true" /> AUTO TOUR · TAP THE BOT</span>
    </article>
  </div>;
}
