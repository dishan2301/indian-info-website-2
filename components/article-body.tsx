import Image from 'next/image';
import type { ReactNode } from 'react';

// Both editorial sources use the original article frame and its scoped typography.
export function ArticleBody({ image, children }: { image?: { src: string; alt: string }; children: ReactNode }) {
  return <article className="insight-article">
    {image ? <div className="insight-article-image"><Image src={image.src} alt={image.alt} fill priority sizes="(max-width: 900px) 100vw, 72vw" /></div> : null}
    <div className="insight-article-body">{children}</div>
  </article>;
}
