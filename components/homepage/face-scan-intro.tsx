'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Particle = { angle: number; distance: number; drift: number; size: number; phase: number };

export function FaceScanIntro() {
  const [dismissed, setDismissed] = useState(false);
  const section = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const wash = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = section.current;
    const stage = scene.current;
    const layer = canvas.current;
    const transition = wash.current;
    if (!root || !stage || !layer || !transition) return;
    const header = document.querySelector<HTMLElement>('.site-header');
    header?.removeAttribute('data-intro-finished');

    if (window.location.hash === '#home') {
      document.documentElement.dataset.faceIntro = 'complete';
      header?.setAttribute('data-intro-finished', 'true');
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
      const frame = requestAnimationFrame(() => {
        setDismissed(true);
        window.scrollTo(0, 0);
      });
      return () => {
        cancelAnimationFrame(frame);
        delete document.documentElement.dataset.faceIntro;
      };
    }

    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      document.documentElement.dataset.faceIntro = 'complete';
      return () => { delete document.documentElement.dataset.faceIntro; };
    }
    const context = layer.getContext('2d');
    if (!context) return;

    const particles: Particle[] = Array.from({ length: window.innerWidth < 760 ? 90 : 190 }, (_, index) => ({
      angle: ((index * 137.508) % 360) * Math.PI / 180,
      distance: .08 + ((index * 47) % 100) / 170,
      drift: .45 + ((index * 29) % 80) / 100,
      size: .7 + ((index * 17) % 16) / 10,
      phase: (index * .73) % (Math.PI * 2),
    }));

    let width = 0;
    let height = 0;
    let progress = 0;
    let animationFrame = 0;
    let finished = false;

    const resize = () => {
      const ratio = Math.min(devicePixelRatio, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      layer.width = width * ratio;
      layer.height = height * ratio;
      layer.style.width = `${width}px`;
      layer.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const updateScroll = () => {
      const travel = Math.max(1, root.offsetHeight - height);
      const nextProgress = Math.min(1, Math.max(0, -root.getBoundingClientRect().top / travel));
      progress = nextProgress;
      const dissolve = Math.max(0, (progress - .5) / .5);
      stage.style.transform = `scale(${1 + dissolve * .08})`;
      transition.style.opacity = `${Math.max(0, (progress - .58) / .42)}`;
      transition.style.transform = `scale(${.68 + dissolve * .44})`;
      document.documentElement.dataset.faceIntro = progress < .98 ? 'active' : 'complete';
      if (progress >= .995 && !finished) {
        finished = true;
        document.documentElement.dataset.faceIntro = 'complete';
        header?.setAttribute('data-intro-finished', 'true');
        setDismissed(true);
        requestAnimationFrame(() => {
          document.documentElement.dataset.faceIntro = 'complete';
          window.scrollTo(0, 0);
        });
      }
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const spread = Math.min(1, Math.max(0, (progress - .16) / .76));
      const mobile = width < 760 && height > width;
      const centerX = width * (mobile ? .82 : .64);
      const centerY = height * (mobile ? .5 : .47);
      const cameraX = width * (mobile ? .13 : .25);
      const cameraY = height * (mobile ? .44 : .35);

      context.lineCap = 'round';
      for (let index = 0; index < 11; index += 1) {
        const flicker = Math.max(0, Math.sin(time * .012 + index * 2.17));
        if (flicker < .38) continue;
        const angle = index * 2.4 + time * .0007;
        const length = (10 + (index % 4) * 5) * (1 + spread * 2.4) * flicker;
        const middleX = cameraX + Math.cos(angle) * length * .48;
        const middleY = cameraY + Math.sin(angle) * length * .48;
        context.beginPath();
        context.moveTo(cameraX, cameraY);
        context.lineTo(middleX + Math.sin(index) * 4, middleY);
        context.lineTo(cameraX + Math.cos(angle) * length, cameraY + Math.sin(angle) * length);
        context.strokeStyle = `rgba(235,253,255,${flicker * (.45 + spread * .45)})`;
        context.lineWidth = .7 + spread * 1.2;
        context.shadowColor = '#69e8ff';
        context.shadowBlur = 12 + spread * 18;
        context.stroke();
      }

      for (const particle of particles) {
        const pulse = .72 + Math.sin(time * .003 + particle.phase) * .28;
        const radius = Math.min(width, height) * particle.distance + spread * Math.max(width, height) * particle.drift * .2;
        const x = centerX + Math.cos(particle.angle) * radius;
        const y = centerY + Math.sin(particle.angle) * radius * .66;
        context.beginPath();
        context.fillStyle = `rgba(220,248,255,${(.22 + spread * .72) * pulse})`;
        context.shadowColor = '#72e4ff';
        context.shadowBlur = 8 + spread * 36;
        context.arc(x, y, particle.size + spread * 18, 0, Math.PI * 2);
        context.fill();
      }

      for (let index = 0; index < 7; index += 1) {
        const twinkle = Math.max(0, Math.sin(time * .006 + index * 1.9));
        const x = centerX + Math.cos(index * 2.3) * width * (.035 + index * .009);
        const y = centerY + Math.sin(index * 1.7) * height * .13;
        const radius = (2 + twinkle * 7) * (1 + spread * 1.8);
        context.beginPath();
        context.moveTo(x - radius, y);
        context.lineTo(x + radius, y);
        context.moveTo(x, y - radius);
        context.lineTo(x, y + radius);
        context.strokeStyle = `rgba(255,255,255,${twinkle * .9})`;
        context.lineWidth = 1;
        context.shadowColor = '#b9f5ff';
        context.shadowBlur = 14;
        context.stroke();
      }
      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    updateScroll();
    animationFrame = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateScroll);
      if (finished) {
        document.documentElement.dataset.faceIntro = 'complete';
        header?.setAttribute('data-intro-finished', 'true');
      }
      else delete document.documentElement.dataset.faceIntro;
    };
  }, []);

  if (dismissed) return null;

  return (
    <section ref={section} className="face-scan-intro" aria-label="Face recognition scanning introduction">
      <div ref={scene} className="face-scan-stage">
        <Image className="face-scan-art" src="/face-recognition-intro-v3.png" alt="Indian Infotech face recognition terminal scanning a digital face" fill priority sizes="100vw" />
        <div className="face-scan-background" aria-hidden="true" />
        <svg className="face-scan-rays" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g>{[350, 378, 406, 434, 462, 490, 518, 546].map((y, index) => <line key={y} x1="410" y1="325" x2="1115" y2={y} style={{ animationDelay: `${index * -180}ms` }} />)}</g>
        </svg>
        <canvas ref={canvas} className="face-scan-particles" aria-hidden="true" />
        <div className="face-scan-vignette" />
        <div ref={wash} className="face-scan-transition" aria-hidden="true" />
        <div className="face-scan-scroll" aria-hidden="true"><span><i /></span><b>Scroll down</b></div>
      </div>
    </section>
  );
}
