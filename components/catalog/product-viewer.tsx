'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';

type ProductViewerProps = { name: string; images: readonly string[]; frames?: readonly string[] };

export function ProductViewer({ name, images, frames = [] }: ProductViewerProps) {
  const [active, setActive] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const sequence = frames.length >= 12 ? frames : images;
  const is360 = frames.length >= 12;
  const total = sequence.length;
  const move = useCallback((direction: number) => setActive((current) => (current + direction + total) % total), [total]);
  if (!total) return <div className="product-media-missing"><span>Media review</span><strong>Approved product photography pending.</strong><p>We will not substitute a generic or AI-generated device image.</p></div>;
  return <div className="product-viewer" role="region" aria-label={`${name} ${is360 ? '360 degree product explorer' : 'multi-angle product explorer'}`}>
    <div className="product-viewer-stage" onPointerDown={(event) => { pointerStart.current = event.clientX; }} onPointerUp={(event) => { if (pointerStart.current === null) return; const delta = event.clientX - pointerStart.current; if (Math.abs(delta) > 18) move(delta < 0 ? Math.max(1, Math.round(Math.abs(delta) / 28)) : -Math.max(1, Math.round(Math.abs(delta) / 28))); pointerStart.current = null; }}>
      <Image src={sequence[active]} alt={`${name} ${is360 ? '360 degree frame' : 'product view'} ${active + 1} of ${total}`} width={900} height={900} priority={active === 0} />
      <span className="product-viewer-badge">{is360 ? '360° FRAME' : 'ANGLE'} {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </div>
    <div className="product-viewer-controls"><button type="button" onClick={() => move(-1)} aria-label={`Previous ${name} view`}>←</button><span>{is360 ? 'Drag, scrub, or use controls to rotate the approved frame sequence' : 'Swipe or use controls to inspect the approved views'}</span><button type="button" onClick={() => move(1)} aria-label={`Next ${name} view`}>→</button></div>
    {is360 ? <label className="product-viewer-scrub"><span>Rotate product</span><input type="range" min="0" max={total - 1} value={active} onChange={(event) => setActive(Number(event.target.value))} aria-label={`Rotate ${name} 360 degree view`} /></label> : null}
    <div className="product-viewer-thumbs" aria-label="Product views">{sequence.map((image, index) => <button className={index === active ? 'active' : ''} type="button" onClick={() => setActive(index)} key={`${image}-${index}`} aria-label={`Show ${name} view ${index + 1}`} aria-pressed={index === active}><Image src={image} alt="" width={96} height={96} /></button>)}</div>
    <p className="product-viewer-note"><strong>{is360 ? 'Approved 360° sequence' : 'Multi-angle gallery'}</strong> {is360 ? 'This frame sequence is supplied for interactive product rotation.' : 'Available approved still views are shown here. A true 36/48-frame 360° sequence will be activated when approved frame photography is supplied.'}</p>
  </div>;
}
