import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../../_components/page-hero';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';
import { approvedCaseStudies } from '../../proof-content';

export function generateStaticParams() { return approvedCaseStudies.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = approvedCaseStudies.find((candidate) => candidate.slug === slug);
  return item ? createPageMetadata({ title: `${item.client} Case Study`, description: item.outcome, path: `/case-studies/${item.slug}`, image: item.logo }) : {};
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = approvedCaseStudies.find((candidate) => candidate.slug === slug);
  if (!item) notFound();
  return <main><SiteHeader /><PageHero eyebrow={`${item.industry} case study`} title={item.client} description={item.outcome} marker="II / CASE STUDY" breadcrumbs={[{ label: 'Case studies', href: '/case-studies' }, { label: item.client }]} path={`/case-studies/${item.slug}`} /><section className="section"><div className="customer-roster-grid"><article><Image src={item.logo} alt={`${item.client} logo`} width={160} height={80} /><h2>Problem</h2><p>{item.problem}</p></article><article><h2>Solution deployed</h2><p>{item.solution}</p></article><article><h2>Deployment size</h2><p>{item.deployment}</p></article><article><h2>Measured outcome</h2><p>{item.outcome}</p></article></div>{item.pdf ? <a className="button button-primary" href={item.pdf} download>Download case study PDF</a> : null}<Link className="text-link" href="/contact?topic=case-study">Discuss a similar requirement →</Link></section><SiteFooter /></main>;
}
