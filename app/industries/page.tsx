import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/site';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { industryProfiles } from '../content';
import { industryStudies } from './research/content';
import { SolutionHeading } from '../_components/solution-page-parts';
import s from '../_components/solution-detail.module.css';
import i from './research/industry-study.module.css';

export const metadata: Metadata = createPageMetadata({ title: 'Industry Guides: Workforce, Devices & Access Systems', description: 'Research-informed guides for manufacturing, offices, pharma, healthcare, education and logistics. Explore industry workflows, relevant devices and Indian Infotech software.', path: '/industries' });

export default function IndustriesPage() {
  return <><SiteHeader /><main className={`${s.page} ${i.page}`} data-industry-directory>
    <section className={`${s.section} ${i.directoryHero}`}><nav className={s.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Industries</span></nav><p className={s.eyebrow}>Built for your environment</p><h1>Start with the workplace.<br />Build the right system around it.</h1><p>Six detailed guides connect industry operating needs with attendance, access, entrance hardware and people software. Explore the workflows, evidence and product considerations before planning your setup.</p><div className={i.directoryTags}><span>Industry research</span><span>Device selection</span><span>Software workflows</span></div></section>
    <section className={`${s.section} ${s.tint}`}><SolutionHeading label="Explore the guides" title="Six environments. Six different operating stories." text="Each guide includes linked references, an area-by-area map, relevant catalogue devices, software responsibilities and a worked example." /><div className={i.directoryGrid}>{Object.values(industryStudies).map(study => <article className={s.product} key={study.slug}><Link className={i.directoryImage} href={`/industries/${study.slug}`} aria-label={`Read the ${study.name} industry guide`}><Image src={`/campaign/industries/${study.slug}-desktop-v2.webp`} alt={study.heroAlt} fill sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 30vw" /></Link><div className={s.productBody}><small>Industry guide</small><h2>{study.name}</h2><p>{study.summary}</p><Link href={`/industries/${study.slug}`}>Read the detailed guide ↗</Link></div></article>)}</div></section>
    <section className={s.section}><SolutionHeading label="Other workplace contexts" title="Find your part of the portfolio." text="For a different operating environment, explore the existing overview or bring your requirements to our team." /><div className={i.otherIndustries}>{industryProfiles.filter(profile => !industryStudies[profile.slug]).map(profile => <Link href={`/industries/${profile.slug}`} key={profile.slug}>{profile.name} ↗</Link>)}</div></section>
    <section className={s.section}><div className={s.cta}><div><h2>Your site deserves a specific plan.</h2><p>Bring your layout, shift patterns, entry points and existing systems. We’ll help connect the requirements to a practical configuration.</p></div><Link className={s.primary} href="/contact">Discuss your environment ↗</Link></div></section>
  </main><SiteFooter /></>;
}
