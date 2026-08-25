import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '../../_components/page-hero';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';
import { WorkflowBand } from '../../_components/enterprise-route';
import { products, solutionProfiles, softwarePlatforms } from '../../content';

export function generateStaticParams() { return solutionProfiles.map((item) => ({ slug: item.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const item = solutionProfiles.find((candidate) => candidate.slug === slug);
  return item ? { title: `${item.name} | Indian Infotech`, description: item.summary, alternates: { canonical: `/solutions/${item.slug}` } } : {};
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const item = solutionProfiles.find((candidate) => candidate.slug === slug); if (!item) notFound();
  const relatedProducts = products.filter((product) => item.hardwareFamilies.includes(product.family)).slice(0, 4);
  const relatedSoftware = softwarePlatforms.filter((software) => item.softwareSlugs.includes(software.slug));
  return <main><SiteHeader /><PageHero eyebrow="Solutions" title={item.name} description={item.summary} marker="II / SOLUTION" breadcrumbs={[{ label: 'Solutions', href: '/solutions' }, { label: item.name }]} />
    <section className="section route-detail-intro"><div><p className="section-kicker">The operating problem</p><h2>{item.problem}</h2></div><div><p>We scope the complete operating context before recommending a device, software module, or rollout pattern. Compatibility and deployment details remain subject to site confirmation.</p><Link className="button button-primary" href={`/contact?solution=${item.slug}`}>Talk to a solution engineer <span aria-hidden="true">↗</span></Link></div></section>
    <section className="route-dark-section"><div className="section-heading split-heading"><div><p className="section-kicker light">Workflow</p><h2>Make the handoffs visible.</h2></div><p>Use this as a conversation starter, then adapt the steps to your policies and site conditions.</p></div><WorkflowBand steps={item.workflow} /></section>
    <section className="section"><div className="section-heading"><p className="section-kicker">Related system components</p><h2>Hardware and software to confirm during design.</h2></div><div className="route-related-grid"><div><h3>Product families</h3><ul>{item.hardwareFamilies.map((family) => <li key={family}>{family}</li>)}</ul>{relatedProducts.map((product) => <Link href={`/products/${product.slug}`} key={product.slug}>{product.name} <span aria-hidden="true">↗</span></Link>)}</div><div><h3>Software platforms</h3><ul>{relatedSoftware.map((software) => <li key={software.slug}>{software.name}</li>)}</ul>{relatedSoftware.map((software) => <Link href={`/software/${software.slug}`} key={software.slug}>{software.name} <span aria-hidden="true">↗</span></Link>)}</div></div></section>
    <section className="decision-band"><div><p className="section-kicker light">Next step</p><h2>Share the context. We will confirm the configuration.</h2></div><Link className="button button-primary" href={`/contact?solution=${item.slug}`}>Request a scoped conversation <span aria-hidden="true">↗</span></Link></section><SiteFooter /></main>;
}
