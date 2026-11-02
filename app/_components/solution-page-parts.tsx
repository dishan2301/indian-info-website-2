import Image from 'next/image';
import Link from 'next/link';
import s from './solution-detail.module.css';
import { StructuredData } from '@/components/structured-data';
import { absoluteUrl } from '@/lib/site';

export function SolutionHero({ eyebrow, title, description, image, alt, action, topic, children }: { eyebrow: string; title: string; description: string; image: string; alt: string; action: string; topic: string; children: React.ReactNode }) {
  const path = topic === 'contract-workforce' ? '/contract-labour-management' : '/entrance-control-system';
  return <>
    <StructuredData data={{ '@context': 'https://schema.org', '@graph': [
      { '@type': 'Service', name: eyebrow, description, url: absoluteUrl(path), provider: { '@type': 'Organization', name: 'Indian Infotech', url: absoluteUrl('/') } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') }, { '@type': 'ListItem', position: 2, name: 'Solutions', item: absoluteUrl('/solutions') }, { '@type': 'ListItem', position: 3, name: eyebrow, item: absoluteUrl(path) }] },
    ] }} />
    <div className={s.hero}>
      <div className={s.heroCopy}>
        <nav className={s.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/solutions">Solutions</Link><span>/</span><span aria-current="page">{eyebrow}</span></nav>
        <p className={s.eyebrow}>{eyebrow}</p><h1>{title}</h1><p className={s.lead}>{description}</p>
        <div className={s.actions}><Link className={s.primary} href={`/contact?solution=${topic}`}>{action} <span aria-hidden="true">↗</span></Link><a className={s.secondary} href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a></div>
      </div>
      <figure className={s.heroVisual}><Image src={image} alt={alt} fill priority sizes="(max-width: 800px) 100vw, 52vw" /><figcaption>From Indian Infotech · Built around your site</figcaption></figure>
    </div>
    <div className={s.summary}>{children}</div>
  </>;
}

export function SolutionHeading({ label, title, text }: { label: string; title: string; text?: string }) {
  return <div className={s.heading}><div><p className={s.eyebrow}>{label}</p><h2>{title}</h2></div>{text && <p>{text}</p>}</div>;
}

export function SolutionFaq({ items }: { items: readonly (readonly [string, string])[] }) {
  return <div className={s.faq}>{items.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>;
}
