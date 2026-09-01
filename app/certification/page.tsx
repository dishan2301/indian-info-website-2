import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = createPageMetadata({ title: 'ISO 9001 Certification Information', description: 'Understand what ISO 9001 quality management certification means and how to request current Indian Infotech certificate details.', path: '/certification' });

const benefits = [
  { number: '01', title: 'Consistent processes', text: 'A quality management system gives teams a repeatable framework for controlling work and reviewing results.' },
  { number: '02', title: 'Customer focus', text: 'ISO 9001 places customer requirements, feedback, and satisfaction within the management system.' },
  { number: '03', title: 'Continual improvement', text: 'Monitoring, internal audits, corrective action, and evidence-based review help organizations improve over time.' },
] as const;

export default function CertificationPage() {
  return <main>
    <SiteHeader />
    <PageHero eyebrow="Quality management" title="Why ISO 9001 certification matters." description="A clear guide to the quality-management framework shown in Indian Infotech’s company brochure—and what customers should verify." marker="II / QUALITY" />
    <section className="certification-overview">
      <div className="certification-badge"><Image src="/iso-9001-certified.webp" alt="ISO 9001 certification mark shown in the Indian Infotech brochure" width={440} height={160} /></div>
      <div><p className="section-kicker">What it means</p><h2>A framework for managing quality consistently.</h2><p>ISO 9001 defines requirements for a quality management system. It covers areas including leadership, customer focus, process control, performance evaluation, and continual improvement.</p><a className="text-link" href="https://www.iso.org/home/insights-news/resources/iso-9001-explained.html" target="_blank" rel="noreferrer">Read ISO’s official explanation ↗</a></div>
    </section>
    <section className="certification-benefits"><div className="section-heading"><p className="section-kicker light">Why organizations use it</p><h2>Structure that supports dependable delivery.</h2></div><div className="principle-grid">{benefits.map((item) => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
    <section className="certificate-verification"><div><p className="section-kicker">Verification matters</p><h2>Request the current certificate for procurement.</h2></div><div><p>Indian Infotech’s company brochure presents the company as ISO 9001 certified. Before relying on that status, customers should verify the current certificate, including the certification body, standard edition, scope, certificate number, issue date, and expiry date.</p><p>ISO develops the standard but does not certify organizations. Independent certification bodies perform certification audits.</p><Link className="button button-dark" href="/contact">Request certification details ↗</Link></div></section>
    <SiteFooter />
  </main>;
}
