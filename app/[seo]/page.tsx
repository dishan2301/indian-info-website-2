import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StructuredData } from '@/components/structured-data';
import { absoluteUrl, createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { seoLandingPages } from '../seo-landing-content';

type SeoPageProps = { params: Promise<{ seo: string }> };

export function generateStaticParams() {
  return seoLandingPages.map((page) => ({ seo: page.slug }));
}

export async function generateMetadata({ params }: SeoPageProps): Promise<Metadata> {
  const { seo } = await params;
  const page = seoLandingPages.find((item) => item.slug === seo);
  if (!page) return {};
  return createPageMetadata({ title: page.title, description: page.description, path: `/${page.slug}`, image: page.image });
}

export default async function SeoLandingPage({ params }: SeoPageProps) {
  const { seo } = await params;
  const page = seoLandingPages.find((item) => item.slug === seo);
  if (!page) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  };
  const offeringSchema = page.schemaType === 'SoftwareApplication'
    ? { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: page.title, description: page.description, applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: absoluteUrl(`/${page.slug}`), provider: { '@type': 'Organization', name: 'Indian Infotech', url: absoluteUrl('/') } }
    : { '@context': 'https://schema.org', '@type': 'Service', name: page.title, description: page.description, serviceType: page.primaryKeyword, areaServed: { '@type': 'Country', name: 'India' }, url: absoluteUrl(`/${page.slug}`), provider: { '@type': 'Organization', name: 'Indian Infotech', url: absoluteUrl('/') } };

  return (
    <main>
      <SiteHeader />
      <StructuredData data={offeringSchema} />
      <StructuredData data={faqSchema} />
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} marker="II / SOLUTION" breadcrumbs={[{ label: 'Solutions', href: '/solutions' }, { label: page.title }]} path={`/${page.slug}`} />

      <section className="section route-detail-intro seo-introduction">
        <div><p className="section-kicker">Solution overview</p><h2>What is a {page.primaryKeyword}?</h2></div>
        <div>{page.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<Link className="button button-primary" href={`/contact?solution=${page.slug}`}>Book a demo <span aria-hidden="true">↗</span></Link></div>
      </section>

      <section className="route-dark-section">
        <div className="section-heading split-heading"><div><p className="section-kicker light">Core capabilities</p><h2>Plan the complete operating workflow.</h2></div><p>Every capability is confirmed against the selected products, software, site conditions, and deployment scope.</p></div>
        <div className="readiness-grid seo-feature-grid">{page.features.map((feature, index) => <article key={feature.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{feature.title}</h3><p>{feature.body}</p></article>)}</div>
      </section>

      <section className="section seo-benefits">
        <div className="section-heading split-heading"><div><p className="section-kicker">Business outcomes</p><h2>Benefits for responsible teams.</h2></div><p>Outcomes depend on policy, adoption, configuration, data quality, and the real operating environment.</p></div>
        <ul>{page.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
      </section>

      <section className="architecture-panel seo-integration">
        <div><p className="section-kicker light">Connected ecosystem</p><h2>From input to an approved operating record.</h2></div>
        <p>{page.integration}</p>
      </section>

      <section className="section seo-industries">
        <div className="section-heading"><p className="section-kicker">Industries</p><h2>Adapt the system to the workplace—not the other way around.</h2></div>
        <ul>{page.industries.map((industry) => <li key={industry}>{industry}</li>)}</ul>
      </section>

      <section className="section seo-related">
        <div className="section-heading"><p className="section-kicker">Related guidance</p><h2>Continue planning the connected system.</h2></div>
        <div className="route-link-list">{page.related.map((item) => <Link href={item.href} key={item.href}>{item.label}<span aria-hidden="true">↗</span></Link>)}</div>
      </section>

      <section className="section seo-faq">
        <div className="section-heading"><p className="section-kicker">Frequently asked questions</p><h2>Practical answers before a solution discussion.</h2></div>
        <div>{page.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
      </section>

      <section className="decision-band"><div><p className="section-kicker light">Next step</p><h2>Bring your workforce, site, and integration requirements.</h2></div><Link className="button button-primary" href={`/contact?solution=${page.slug}`}>Request a consultation <span aria-hidden="true">↗</span></Link></section>
      <SiteFooter />
    </main>
  );
}
