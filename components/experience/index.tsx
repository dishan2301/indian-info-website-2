import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Check, CircleHelp, FileCheck2, Fingerprint, Network, UsersRound, CalendarDays, ShieldCheck, ChartNoAxesCombined } from 'lucide-react';
import Reveal from './reveal';
import styles from './experience.module.css';
export { default as Workflow } from './workflow';
export { default as Reveal } from './reveal';
export { styles };
export type Scene = { src: string; alt: string };
export type Feature = { title: string; text: string };

export function ExperiencePage({ children }: { children: ReactNode }) { return <main className={styles.page}>{children}</main>; }
export function Hero({ eyebrow, title, description, scene, action = 'Talk to our team', href = '/contact', back, tags }: { eyebrow: string; title: string; description: string; scene: Scene; action?: string; href?: string; back?: { label: string; href: string }; tags?: readonly string[] }) {
  return <section className={styles.hero}>
    <Reveal className={styles.heroCopy}>{back && <Link className={styles.back} href={back.href}>← {back.label}</Link>}<p className={styles.kicker}>{eyebrow}</p><h1>{title}</h1><p className={styles.lead}>{description}</p><div className={styles.actions}><Link className={styles.primary} href={href}>{action}<ArrowUpRight size={17} aria-hidden="true" /></Link><a className={styles.quiet} href="#explore">See how it works <ArrowDown size={16} aria-hidden="true" /></a></div>{tags && <ul className={styles.tags}>{tags.map(tag => <li key={tag}><Check size={13} aria-hidden="true" />{tag}</li>)}</ul>}</Reveal>
    <Reveal className={styles.heroImage} delay={.08}><Image src={scene.src} alt={scene.alt} fill priority sizes="(max-width: 800px) 100vw, 50vw" /><span className={styles.imageMarker} aria-hidden="true"><i /> PEOPLE + TECHNOLOGY</span></Reveal>
  </section>;
}
export function Section({ kicker, title, description, children, tint = false, id, className = '' }: { kicker?: string; title?: string; description?: string; children?: ReactNode; tint?: boolean; id?: string; className?: string }) {
  return <section id={id} className={`${styles.section} ${tint ? styles.tint : ''} ${className}`}><div className={styles.inner}>{(title || kicker) && <div className={styles.heading}><div>{kicker && <p className={styles.kicker}>{kicker}</p>}{title && <h2>{title}</h2>}</div>{description && <p>{description}</p>}</div>}{children}</div></section>;
}
const icons = [UsersRound, CalendarDays, FileCheck2, Network, ShieldCheck, ChartNoAxesCombined, Fingerprint];
export function Features({ items }: { items: readonly Feature[] }) {
  return <div className={styles.features}>{items.map((item, i) => { const Icon = icons[i % icons.length]; return <Reveal key={item.title} delay={(i % 3) * .035}><article className={styles.feature}><span className={styles.featureIcon}><Icon size={22} strokeWidth={1.6} aria-hidden="true" /></span><div><h3>{item.title}</h3><p>{item.text}</p></div></article></Reveal>; })}</div>;
}
export function Story({ kicker, title, text, scene, points, reverse = false }: { kicker: string; title: string; text: string; scene: Scene; points?: readonly string[]; reverse?: boolean }) {
  return <div className={`${styles.story} ${reverse ? styles.reverse : ''}`}><Reveal className={styles.storyImage}><Image src={scene.src} alt={scene.alt} fill sizes="(max-width: 800px) 100vw, 45vw" /></Reveal><Reveal className={styles.storyCopy}><p className={styles.kicker}>{kicker}</p><h2>{title}</h2><p>{text}</p>{points && <ul className={styles.pointList}>{points.map(p => <li key={p}><Check size={16} aria-hidden="true" />{p}</li>)}</ul>}</Reveal></div>;
}
export function Example({ title, text, stages }: { title: string; text: string; stages: readonly string[] }) {
  return <Reveal className={styles.example}><div><p className={styles.kicker}>AN EVERYDAY EXAMPLE</p><h2>{title}</h2><p>{text}</p></div><ol>{stages.map((stage, i) => <li key={stage}><span>{String(i + 1).padStart(2, '0')}</span><strong>{stage}</strong>{i < stages.length - 1 && <ArrowDown size={16} aria-hidden="true" />}</li>)}</ol></Reveal>;
}
export function Faq({ items, title = 'Good questions. Clear answers.' }: { items: readonly { question: string; answer: string }[]; title?: string }) {
  return <Section kicker="Questions, answered" title={title} className={styles.faqSection}><div className={styles.faq}>{items.map((item, i) => <details key={item.question} name="experience-faq"><summary><span className={styles.faqIndex}>{String(i + 1).padStart(2, '0')}</span><strong>{item.question}</strong><CircleHelp size={19} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div></Section>;
}
export function LinkList({ items }: { items: readonly { title: string; text: string; href: string; image?: string }[] }) {
  return <div className={styles.links}>{items.map((item, i) => <Link href={item.href} key={item.href} className={styles.linkRow}>{item.image ? <span className={styles.linkImage}><Image src={item.image} alt="" fill sizes="100px" /></span> : <span className={styles.linkNumber}>{String(i + 1).padStart(2, '0')}</span>}<span><strong>{item.title}</strong><small>{item.text}</small></span><ArrowUpRight size={20} aria-hidden="true" /></Link>)}</div>;
}
export function PhotoDirectory({ items }: { items: readonly { title: string; text: string; href: string; scene: Scene; label?: string }[] }) {
  return <div className={styles.directory}>{items.map(item => <Reveal key={item.href}><Link className={styles.directoryItem} href={item.href}><div className={styles.directoryImage}><Image src={item.scene.src} alt={item.scene.alt} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" /><span><ArrowUpRight size={19} aria-hidden="true" /></span></div>{item.label && <span className={styles.kicker}>{item.label}</span>}<h3>{item.title}</h3><p>{item.text}</p></Link></Reveal>)}</div>;
}
