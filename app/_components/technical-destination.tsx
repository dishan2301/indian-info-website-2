import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check, Download, FileCheck2, Headphones, Layers3, Search, ShieldCheck } from 'lucide-react';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';
import { technicalDetailGuides } from './technical-detail-content';

export type Destination = {
  theme: 'technology' | 'resources' | 'procurement' | 'support' | 'trust' | 'academy';
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  stats: { value: string; label: string }[];
  sectionTitle: string;
  sectionCopy: string;
  cards: { tag: string; title: string; text: string; href?: string; link?: string }[];
  stages: { title: string; text: string }[];
  faq: { question: string; answer: string }[];
};

const themeIcons = { technology: Layers3, resources: Search, procurement: FileCheck2, support: Headphones, trust: ShieldCheck, academy: Check };

export function TechnicalDestination({ page }: { page: Destination }) {
  const Icon = themeIcons[page.theme];
  const detailGuide = technicalDetailGuides[page.eyebrow];
  return <main className={`technical-destination technical-${page.theme}`}><SiteHeader />
    <section className="technical-hero">
      <div className="technical-hero-copy"><span><Icon aria-hidden="true" /> {page.eyebrow}</span><h1>{page.title}</h1><p>{page.description}</p><div className="technical-actions"><Link href={page.primary.href}>{page.primary.label}<ArrowUpRight aria-hidden="true" /></Link>{page.secondary && <Link className="is-secondary" href={page.secondary.href}>{page.secondary.label}</Link>}</div></div>
      <div className="technical-hero-image"><Image src={page.image} alt={page.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 52vw" /></div>
      <div className="technical-stat-rail">{page.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
    </section>

    <section className="technical-capabilities"><header><span>Explore the page</span><h2>{page.sectionTitle}</h2><p>{page.sectionCopy}</p></header><div className="technical-card-grid">{page.cards.map((card, index) => <article key={card.title}><i>{String(index + 1).padStart(2, '0')}</i><span>{card.tag}</span><h3>{card.title}</h3><p>{card.text}</p>{card.href && <Link href={card.href}>{card.link ?? 'Explore'}<ArrowUpRight aria-hidden="true" /></Link>}</article>)}</div></section>

    {page.theme === 'resources' && <section className="technical-resource-strip"><div><Download aria-hidden="true" /><span>Product and project material</span><h2>Find a guide by the decision it supports.</h2></div><nav><Link href="/products">Product catalogue</Link><Link href="/knowledge">Knowledge center</Link><Link href="/resources/procurement">Tender guide</Link><Link href="/support">Support center</Link></nav></section>}
    {page.theme === 'procurement' && <section className="technical-checklist"><div><span>Tender response structure</span><h2>Scope → compliance → evidence → commercials → acceptance</h2></div><ul>{['Site and operating scope','Functional compliance matrix','Integration and data ownership','Installation, training and handover','Warranty, support and lifecycle cost','Assumptions, exclusions and deviations'].map(item => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></section>}
    {page.theme === 'support' && <section className="technical-support-band"><div><Headphones aria-hidden="true" /><span>Existing deployment?</span><h2>Product, version, site, symptom, impact.</h2><p>Those five details give our team a useful starting point.</p></div><Link href="/contact?topic=support">Contact support <ArrowUpRight aria-hidden="true" /></Link></section>}
    {page.theme === 'trust' && <section className="technical-trust-band"><div><ShieldCheck aria-hidden="true" /><span>Evidence boundaries</span><h2>Website, product, cloud and customer deployment are reviewed separately.</h2></div><div><Link href="/trust/security">Website security controls</Link><Link href="/trust/responsible-disclosure">Report a vulnerability</Link><Link href="/contact?topic=security">Request security review</Link></div></section>}
    {page.theme === 'academy' && <section className="technical-academy-band"><div><span>Role-based learning</span><h2>Administrator. Technician. Implementation partner. Integration professional.</h2></div><Link href="/careers">Explore careers <ArrowUpRight aria-hidden="true" /></Link></section>}

    <section className="technical-detail-section"><header><span>Detailed planning guide</span><h2>{detailGuide.title}</h2><p>{detailGuide.intro}</p></header><div className="technical-detail-grid">{detailGuide.groups.map((group) => <article key={group.title}><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></article>)}</div></section>

    <section className="technical-stages"><header><span>How it works</span><h2>A practical path, with an owner at every step.</h2></header><ol>{page.stages.map((stage, index) => <li key={stage.title}><b>{String(index + 1).padStart(2, '0')}</b><div><h3>{stage.title}</h3><p>{stage.text}</p></div></li>)}</ol></section>

    <section className="technical-faq"><header><span>Common questions</span><h2>Clear answers before the next conversation.</h2></header><div>{page.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>

    <section className="technical-final"><div><span>{page.eyebrow}</span><h2>Bring the requirement. We’ll help shape the right next step.</h2></div><Link href={page.primary.href}>{page.primary.label}<ArrowUpRight aria-hidden="true" /></Link></section><SiteFooter /></main>;
}
