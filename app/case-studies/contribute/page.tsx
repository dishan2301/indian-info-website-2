import type { Metadata } from 'next';
import Link from 'next/link';
import { PrintButton } from '@/components/print-button';
import { StructuredData } from '@/components/structured-data';
import { absoluteUrl, createPageMetadata } from '@/lib/site';
import { PageHero } from '../../_components/page-hero';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';
import { caseStudyBriefSections } from '../../proof-content';

export const metadata: Metadata = createPageMetadata({ title: 'Contribute a Customer Case Study', description: 'Prepare evidence, attribution, measurable outcomes, assets, and publication permission for an Indian Infotech customer story.', path: '/case-studies/contribute' });

const workflow = ['Submit source material', 'Verify facts and calculations', 'Draft the customer story', 'Customer and evidence-owner approval', 'Publish approved channels only'] as const;

export default function ContributeCaseStudyPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to contribute an Indian Infotech case study', description: metadata.description, url: absoluteUrl('/case-studies/contribute'), step: workflow.map((name) => ({ '@type': 'HowToStep', name })) };
  return <main><SiteHeader /><StructuredData data={schema} /><PageHero eyebrow="Customer evidence" title="Turn a deployment into an approved customer story." description="Use this intake standard to preserve the source behind every name, quote, deployment fact, and outcome before publication." marker="II / CONTRIBUTE" breadcrumbs={[{ label: 'Case studies', href: '/case-studies' }, { label: 'Contribute' }]} path="/case-studies/contribute" />
    <section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Evidence brief</p><h2>Collect the facts once, with their source and owner.</h2></div><div className="print-actions"><a className="button button-primary" href="/case-studies/brief" download>Download brief ↓</a><PrintButton /></div></div><div className="route-related-grid">{caseStudyBriefSections.map((section) => <article key={section.title}><h3>{section.title}</h3><ul>{section.prompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ul></article>)}</div></section>
    <section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Publication workflow</p><h2>Approval happens before public use.</h2></div><p>Submission does not grant publication permission. The final copy, metrics, attribution, logo, images, channels, and permission reference must be recorded before the story enters the approved case-study array.</p></div><ol className="trust-report-list">{workflow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol><div className="hero-actions"><Link className="button button-primary" href="/contact?topic=case-study&resource=evidence-brief">Submit evidence <span aria-hidden="true">↗</span></Link><Link className="button outline-button" href="/testimonials">Review testimonial standard</Link></div></section>
    <section className="evidence-note" id="testimonial"><span>Quotes</span><div><h2>Named testimonials use the same permission gate.</h2><p>Include the exact approved quotation, person, role, company, relevant product or system, result context, approved photo or logo, permission reference, permitted channels, approval date, and withdrawal contact.</p></div></section><SiteFooter /></main>;
}
