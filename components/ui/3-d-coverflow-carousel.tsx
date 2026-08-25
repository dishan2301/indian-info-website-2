'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

export type CustomerOrganization = { name: string; logo: string };

type CustomerCoverflowProps = {
  items: readonly CustomerOrganization[];
  autoplayDelay?: number;
};

function relativeOffset(index: number, current: number, total: number) {
  const forward = (index - current + total) % total;
  return forward > total / 2 ? forward - total : forward;
}

export function CustomerCoverflow({ items, autoplayDelay = 4200 }: CustomerCoverflowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const total = items.length;

  const nextSlide = useCallback(() => setCurrentIndex((current) => (current + 1) % total), [total]);
  const previousSlide = useCallback(
    () => setCurrentIndex((current) => (current - 1 + total) % total),
    [total],
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    media.addEventListener('change', updatePreference);
    return () => media.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (paused || hovered || reducedMotion || total <= 1) return;
    const interval = window.setInterval(nextSlide, autoplayDelay);
    return () => window.clearInterval(interval);
  }, [autoplayDelay, hovered, nextSlide, paused, reducedMotion, total]);

  if (total === 0) return null;
  const activeItem = items[currentIndex];

  return (
    <section className="customer-proof" aria-labelledby="customer-proof-title">
      <div className="customer-proof-heading">
        <div>
          <p className="section-kicker light">Organizations we serve</p>
          <h2 id="customer-proof-title">Trusted across demanding workplaces.</h2>
        </div>
        <p>
          A selection of organizations displayed on Indian Infotech&apos;s legacy website.
          Logos are presented as customer proof without adding unverified results.
        </p>
      </div>

      <div
        className="coverflow-shell"
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer organizations"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') { event.preventDefault(); previousSlide(); }
          if (event.key === 'ArrowRight') { event.preventDefault(); nextSlide(); }
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setHovered(false);
        }}
        onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }}
        onTouchEnd={(event) => {
          if (touchStartX.current === null) return;
          const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
          const difference = endX - touchStartX.current;
          if (Math.abs(difference) > 45) {
            if (difference < 0) nextSlide();
            else previousSlide();
          }
          touchStartX.current = null;
        }}
      >
        <div className="coverflow-grid" aria-hidden="true" />
        <div className="coverflow-stage">
          {items.map((item, index) => {
            const offset = relativeOffset(index, currentIndex, total);
            const visible = Math.abs(offset) <= 2;
            const active = offset === 0;

            return (
              <button
                className="customer-card"
                data-offset={visible ? offset : 'hidden'}
                key={item.name}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`${item.name}, customer ${index + 1} of ${total}`}
                aria-current={active ? 'true' : undefined}
                aria-hidden={!visible}
                tabIndex={visible ? 0 : -1}
              >
                <span className="customer-card-index">CUSTOMER / {String(index + 1).padStart(2, '0')}</span>
                <span className="customer-logo-frame">
                  <Image src={item.logo} alt={`${item.name} logo`} width={262} height={120} />
                </span>
                <span className="customer-card-name">{item.name}</span>
                <span className="customer-card-meta">Legacy customer showcase</span>
              </button>
            );
          })}
        </div>

        <div className="coverflow-status" aria-live="polite" aria-atomic="true">
          <span>{String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          <strong>{activeItem.name}</strong>
        </div>

        <div className="coverflow-controls">
          <button type="button" onClick={previousSlide} aria-label="Previous customer">←</button>
          <button className="coverflow-pause" type="button" onClick={() => setPaused((current) => !current)} aria-pressed={paused}>
            {paused ? 'Play rotation' : 'Pause rotation'}
          </button>
          <button type="button" onClick={nextSlide} aria-label="Next customer">→</button>
        </div>

        <div className="coverflow-progress" aria-hidden="true">
          {items.map((item, index) => <span className={index === currentIndex ? 'active' : ''} key={item.name} />)}
        </div>
      </div>

      <div className="customer-proof-note">
        <span>21 organizations</span>
        <p>Planning a multi-site workforce or workplace deployment?</p>
        <Link className="text-link light-link" href="/contact">Discuss your requirements <b aria-hidden="true">↗</b></Link>
      </div>
    </section>
  );
}
