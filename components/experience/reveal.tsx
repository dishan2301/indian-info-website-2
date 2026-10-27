'use client';
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export default function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reduced ? undefined : { y: [14, 0], opacity: [.7, 1] }} viewport={{ once: true, amount: .12 }} transition={{ duration: .45, delay, ease: 'easeOut' }}>{children}</motion.div>;
}
