'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';

export function HrmsVisual() {
  return <div className="hrms-hero-art">
    <Image src="/campaign/core-systems/hrms-payroll-desktop-v2.webp" alt="HR team reviewing connected employee and payroll workflows" fill priority sizes="(max-width: 800px) 100vw, 45vw" />
    <div className="hrms-art-caption"><span>CONNECTED HR & PAYROLL</span><strong>People. Processes.<br />One shared view.</strong></div>
  </div>;
}

export function HrmsReveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reducedMotion = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reducedMotion ? undefined : { y: [20, 0], opacity: [0.65, 1] }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65, delay, ease: 'easeOut' }}>{children}</motion.div>;
}

