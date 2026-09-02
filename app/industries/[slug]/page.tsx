import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StructuredData } from '@/components/structured-data';
import { absoluteUrl, createPageMetadata } from '@/lib/site';
import { PageHero } from '../../_components/page-hero';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';
import { RouteCardGrid, WorkflowBand } from '../../_components/enterprise-route';
import { industryProfiles, products, solutionProfiles } from '../../content';
import { approvedCaseStudies } from '../../proof-content';

export function generateStaticParams() { return industryProfiles.map((item) => ({ slug: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const item = industryProfiles.find((candidate) => candidate.slug === slug); return item ? createPageMetadata({ title: `${item.name} Workforce & Access Solutions`, description: item.context, path: `/industries/${item.slug}`, image: null }) : {}; }

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = industryProfiles.find((candidate) => candidate.slug === slug);
  if (!item) notFound();
  const solutions = solutionProfiles.filter((solution) => item.solutionSlugs.includes(solution.slug));
  const families = new Set(solutions.flatMap((solution) => solution.hardwareFamilies));
  const recommendedProducts = products.filter((product) => families.has(product.family)).slice(0, 3);
  const caseStudies = approvedCaseStudies.filter((study) => study.industry.toLowerCase() === item.name.toLowerCase());
  const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', name: `${item.name} workforce and access solutions`, description: item.context, areaServed: { '@type': 'Country', name: 'India' }, url: absoluteUrl(`/industries/${item.slug}`), provider: { '@type': 'Organization', name: 'Indian Infotech', url: absoluteUrl('/') } };
  return <main>
    <SiteHeader />
    <StructuredData data={serviceSchema} />
    <PageHero eyebrow="Industries" title={item.name} description={item.context} marker="II / INDUSTRY" breadcrumbs={[{ label: 'Industries', href: '/industries' }, { label: item.name }]} path={`/industries/${item.slug}`} />
    <section className="section route-detail-intro"><div><p className="section-kicker">Planning questions</p><h2>Make the workforce and entry journey explicit.</h2></div><div><p>Use the sequence below to frame discovery. It is intentionally practical and avoids promising a result before the site, policy, and compatibility review.</p><Link className="button button-primary" href={`/contact?industry=${item.slug}`}>Discuss this context <span aria-hidden="true">↗</span></Link></div></section>
    <section className="route-dark-section"><div className="section-heading split-heading"><div><p className="section-kicker light">Discovery sequence</p><h2>Plan from the ground up.</h2></div><p>Map people, locations, entry points, software responsibilities, and support ownership before selecting a stack.</p></div><WorkflowBand steps={item.workflow} /></section>
    <section className="section"><div className="section-heading"><p className="section-kicker">Relevant solution patterns</p><h2>Routes to explore next.</h2></div><RouteCardGrid cards={solutions.map((solution) => ({ title: solution.name, description: solution.summary, href: `/solutions/${solution.slug}`, eyebrow: 'Solution pattern' }))} /></section>
    <section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Recommended systems</p><h2>Products that fit this operating context.</h2></div><p>These are starting points based on the relevant solution families. Site conditions, capacity, compatibility, and final configuration still require review.</p></div><RouteCardGrid cards={recommendedProducts.map((product) => ({ title: product.name, description: `${product.description} ${product.deployment}.`, href: `/products/${product.slug}`, eyebrow: product.family }))} /></section>
    <section className="section">{caseStudies.length ? <RouteCardGrid cards={caseStudies.map((study) => ({ title: study.client, description: study.outcome, href: `/case-studies/${study.slug}`, eyebrow: 'Approved case study' }))} /> : <div className="proof-evidence-queue"><span>{item.name.toUpperCase()} / CUSTOMER EVIDENCE</span><h2>Industry case study awaiting client approval.</h2><p>No client name, deployment size, or outcome is published for this industry without written permission and supporting evidence.</p><Link className="button button-primary" href={`/contact?topic=case-study&industry=${item.slug}`}>Submit approved evidence <span aria-hidden="true">↗</span></Link></div>}</section>
    <section className="decision-band"><div><p className="section-kicker light">Industry specialist</p><h2>Talk to our {item.name.toLowerCase()} solutions team.</h2></div><Link className="button button-primary" href={`/contact?industry=${item.slug}`}>Discuss {item.name.toLowerCase()} requirements <span aria-hidden="true">↗</span></Link></section>
    <SiteFooter />
  </main>;
}
