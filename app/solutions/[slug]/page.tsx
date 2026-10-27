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
import { products, solutionProfiles, softwarePlatforms } from '../../content';
import { solutionMedia, softwareMedia } from '../../route-media';
import { solutionEditorial } from '../../route-editorial';
import styles from '../../discovery-pages.module.css';

export function generateStaticParams() { return solutionProfiles.map((item) => ({ slug: item.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const item = solutionProfiles.find((candidate) => candidate.slug === slug);
  return item ? createPageMetadata({ title: item.name, description: item.summary, path: `/solutions/${item.slug}`, image: null }) : {};
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const item = solutionProfiles.find((candidate) => candidate.slug === slug); if (!item) notFound();
  const editorial = solutionEditorial[item.slug];
  const relatedProducts = products.filter((product) => item.hardwareFamilies.includes(product.family)).slice(0, 4);
  const relatedSoftware = softwarePlatforms.filter((software) => item.softwareSlugs.includes(software.slug));
  const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', name: item.name, description: item.summary, serviceType: item.name, areaServed: { '@type': 'Country', name: 'India' }, url: absoluteUrl(`/solutions/${item.slug}`), provider: { '@type': 'Organization', name: 'Indian Infotech', url: absoluteUrl('/') } };
  return <main className={styles.page}><SiteHeader /><StructuredData data={serviceSchema} /><PageHero eyebrow="Solutions" title={item.name} description={item.summary} marker="II / SOLUTION" breadcrumbs={[{ label: 'Solutions', href: '/solutions' }, { label: item.name }]} path={`/solutions/${item.slug}`} media={solutionMedia[item.slug]} />
    <section className="section route-detail-intro"><div><p className="section-kicker">{editorial.introLabel}</p><h2>{item.problem}</h2></div><div><p>{editorial.plainExplanation} The exact setup is checked with your team and site.</p><Link className="button button-primary" href={`/contact?solution=${item.slug}`}>Talk to a solution engineer <span aria-hidden="true">↗</span></Link></div></section>
    <section className="route-dark-section"><div className="section-heading split-heading"><div><p className="section-kicker">How {item.name.toLowerCase()} works</p><h2>{editorial.workflowTitle}</h2></div><p>{editorial.workflowDescription}</p></div><MotionReveal><WorkflowBand steps={item.workflow} /></MotionReveal></section>
    <section className="section"><div className="section-heading"><p className="section-kicker">The pieces that work together</p><h2>{editorial.componentsTitle}</h2><p>See the devices and software that could support this workflow. Your team can help confirm what fits your site.</p></div><div className="route-related-grid">
      <div><h3>{editorial.productLabel}</h3><ul>{item.hardwareFamilies.map((family) => <li key={family}>{family}</li>)}</ul><RouteCardGrid cards={relatedProducts.map((product) => ({ title: product.name, description: product.description, href: `/products/${product.slug}`, eyebrow: product.family, image: product.image, imageAlt: `${product.name}, a ${product.family.toLowerCase()} device` }))} /></div>
      <div><h3>{editorial.softwareLabel}</h3><ul>{relatedSoftware.map((software) => <li key={software.slug}>{software.name}</li>)}</ul><RouteCardGrid cards={relatedSoftware.map((software) => ({ title: software.name, description: software.summary, href: `/software/${software.slug}`, eyebrow: software.category, image: softwareMedia[software.slug]?.image, imageAlt: softwareMedia[software.slug]?.alt }))} /></div>
    </div></section>
    <section className="decision-band"><div><p className="section-kicker light">Your next step</p><h2>{editorial.nextTitle}</h2></div><Link className="button button-primary" href={`/contact?solution=${item.slug}`}>{editorial.nextAction} <span aria-hidden="true">↗</span></Link></section><SiteFooter /></main>;
}
