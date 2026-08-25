'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';

type ProductViewerProps = { name: string; images: readonly string[] };

export function ProductViewer({ name, images }: ProductViewerProps) {
  const [active, setActive] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const total = images.length;
  const move = useCallback((direction: number) => setActive((current) => (current + direction + total) % total), [total]);
  if (!total) return <div className="product-media-missing"><span>Media review</span><strong>Approved product photography pending.</strong><p>We will not substitute a generic or AI-generated device image.</p></div>;
  return <div className="product-viewer" role="region" aria-label={`${name} multi-angle product explorer`}>
    <div className="product-viewer-stage" onPointerDown={(event) => { pointerStart.current = event.clientX; }} onPointerUp={(event) => { if (pointerStart.current === null) return; const delta = event.clientX - pointerStart.current; if (Math.abs(delta) > 36) move(delta < 0 ? 1 : -1); pointerStart.current = null; }}>
      <Image src={images[active]} alt={`${name} product view ${active + 1} of ${total}`} width={900} height={900} priority={active === 0} />
      <span className="product-viewer-badge">ANGLE {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </div>
    <div className="product-viewer-controls"><button type="button" onClick={() => move(-1)} aria-label={`Previous ${name} view`}>←</button><span>Swipe or use controls to inspect the approved views</span><button type="button" onClick={() => move(1)} aria-label={`Next ${name} view`}>→</button></div>
    <div className="product-viewer-thumbs" aria-label="Product views">{images.map((image, index) => <button className={index === active ? 'active' : ''} type="button" onClick={() => setActive(index)} key={image} aria-label={`Show ${name} view ${index + 1}`} aria-pressed={index === active}><Image src={image} alt="" width={96} height={96} /></button>)}</div>
    <p className="product-viewer-note"><strong>Multi-angle gallery</strong> Available approved still views are shown here. A true 36/48-frame 360° sequence will be activated when approved frame photography is supplied.</p>
  </div>;
}
