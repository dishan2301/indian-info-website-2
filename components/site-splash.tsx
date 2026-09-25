'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export function SiteSplash() {
  const [phase, setPhase] = useState<'visible' | 'exiting' | 'revealing' | 'hidden'>('visible');

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const exitTimer = window.setTimeout(() => setPhase('exiting'), 1200);
    const revealTimer = window.setTimeout(() => setPhase('revealing'), 1650);
    const removeTimer = window.setTimeout(() => setPhase('hidden'), 1950);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(revealTimer);
      window.clearTimeout(removeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div className={`site-splash${phase === 'exiting' ? ' site-splash-exiting' : ''}${phase === 'revealing' ? ' site-splash-revealing' : ''}`} role="status" aria-label="Loading Indian Infotech">
      <Image src="/indian-infotech-logo.png" alt="Indian Infotech" width={1200} height={199} priority />
    </div>
  );
}
