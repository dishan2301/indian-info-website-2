import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StructuredData } from '@/components/structured-data';
import { absoluteUrl, createPageMetadata } from '@/lib/site';
import { PageHero } from '../../_components/page-hero';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';
import { RouteCardGrid, WorkflowBand } from '../../_components/enterprise-route';
import { MotionReveal } from '../../_components/motion-reveal';
import { industryProfiles, products, solutionProfiles } from '../../content';
import { industryMedia, solutionMedia } from '../../route-media';
import { industryEditorial } from '../../route-editorial';
import styles from '../../discovery-pages.module.css';
import { approvedCaseStudies } from '../../proof-content';

export function generateStaticParams() { return industryProfiles.map((item) => ({ slug: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const item = industryProfiles.find((candidate) => candidate.slug === slug); return item ? createPageMetadata({ title: `${item.name} Workforce & Access Solutions`, description: item.context, path: `/industries/${item.slug}`, image: null }) : {}; }

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = industryProfiles.find((candidate) => candidate.slug === slug);
  if (!item) notFound();
  const editorial = industryEditorial[item.slug];
  const solutions = solutionProfiles.filter((solution) => item.solutionSlugs.includes(solution.slug));
  const recommendedProducts = editorial.productSlugs
    .map((productSlug) => products.find((product) => product.slug === productSlug))
    .filter((product) => product !== undefined);
  const caseStudies = approvedCaseStudies.filter((study) => study.industry.toLowerCase() === item.name.toLowerCase());
  const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', name: `${item.name} workforce and access solutions`, description: item.context, areaServed: { '@type': 'Country', name: 'India' }, url: absoluteUrl(`/industries/${item.slug}`), provider: { '@type': 'Organization', name: 'Indian Infotech', url: absoluteUrl('/') } };
  return <main className={styles.page}>
    <SiteHeader />
    <StructuredData data={serviceSchema} />
    <PageHero eyebrow="Industries" title={item.name} description={item.context} marker="II / INDUSTRY" breadcrumbs={[{ label: 'Industries', href: '/industries' }, { label: item.name }]} path={`/industries/${item.slug}`} media={industryMedia[item.slug]} />
    <section className="section route-detail-intro"><div><p className="section-kicker">{editorial.introLabel}</p><h2>{editorial.introTitle}</h2></div><div><p>{editorial.introDescription}</p><Link className="button button-primary" href={`/contact?industry=${item.slug}`}>Discuss this workplace <span aria-hidden="true">↗</span></Link></div></section>
    <section className="route-dark-section"><div className="section-heading split-heading"><div><p className="section-kicker">{editorial.workflowLabel}</p><h2>{editorial.workflowTitle}</h2></div><p>{editorial.workflowDescription}</p></div><MotionReveal><WorkflowBand steps={item.workflow} /></MotionReveal></section>
    <section className="section"><div className="section-heading"><p className="section-kicker">{editorial.solutionsLabel}</p><h2>{editorial.solutionsTitle}</h2><p>{editorial.solutionsDescription}</p></div><MotionReveal><RouteCardGrid cards={solutions.map((solution, index) => ({ title: solution.name, description: `${solution.summary} A useful first step is to ${solution.workflow[index % solution.workflow.length].toLowerCase()}.`, href: `/solutions/${solution.slug}`, eyebrow: 'Explore this workflow', image: solutionMedia[solution.slug]?.desktop, imageAlt: solutionMedia[solution.slug]?.alt }))} /></MotionReveal></section>
    <section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">{editorial.productsLabel}</p><h2>{editorial.productsTitle}</h2></div><p>{editorial.productsDescription}</p></div><MotionReveal><RouteCardGrid cards={recommendedProducts.map((product) => ({ title: product.name, description: `${product.description} ${product.deployment}.`, href: `/products/${product.slug}`, eyebrow: product.family, image: product.image, imageAlt: `${product.name}, a ${product.family.toLowerCase()} device` }))} /></MotionReveal></section>
    <section className="section">{caseStudies.length ? <><div className="section-heading"><p className="section-kicker">Customer stories</p><h2>See what teams in {item.name.toLowerCase()} have shared.</h2><p>Only approved, permission-backed customer evidence is shown here.</p></div><MotionReveal><RouteCardGrid cards={caseStudies.map((study) => ({ title: study.client, description: study.outcome, href: `/case-studies/${study.slug}`, eyebrow: 'Approved case study' }))} /></MotionReveal></> : <div className="proof-evidence-queue"><span>{item.name.toUpperCase()} / CUSTOMER EVIDENCE</span><h2>Customer story coming soon.</h2><p>We only publish a customer name or result after getting written permission and checking the details.</p><Link className="button button-primary" href={`/contact?topic=case-study&industry=${item.slug}`}>Share an approved story <span aria-hidden="true">↗</span></Link></div>}</section>
    <section className="decision-band"><div><p className="section-kicker light">{editorial.contactLabel}</p><h2>{editorial.contactTitle}</h2></div><Link className="button button-primary" href={`/contact?industry=${item.slug}`}>{editorial.contactAction} <span aria-hidden="true">↗</span></Link></section>
    <SiteFooter />
  </main>;
}
