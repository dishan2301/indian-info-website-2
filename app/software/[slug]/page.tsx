import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StructuredData } from '@/components/structured-data';
import { absoluteUrl, createPageMetadata } from '@/lib/site';
import { PageHero } from '../../_components/page-hero';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';
import { softwarePlatforms } from '../../content';

type SoftwarePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return softwarePlatforms.map((software) => ({ slug: software.slug }));
}

export async function generateMetadata({ params }: SoftwarePageProps): Promise<Metadata> {
  const { slug } = await params;
  const software = softwarePlatforms.find((item) => item.slug === slug);
  if (!software) return {};
  return createPageMetadata({ title: `${software.name} Software`, description: software.summary, path: `/software/${software.slug}` });
}

export default async function SoftwareDetailPage({ params }: SoftwarePageProps) {
  const { slug } = await params;
  const software = softwarePlatforms.find((item) => item.slug === slug);
  if (!software) notFound();
  const softwareSchema = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: software.name, description: software.summary, applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: absoluteUrl(`/software/${software.slug}`), provider: { '@type': 'Organization', name: 'Indian Infotech', url: absoluteUrl('/') } };
  const softwareFaqs = [
    { question: `What does ${software.name} help manage?`, answer: `${software.summary} The published module scope includes ${software.modules.slice(0, 4).join(', ')}.` },
    { question: `Can ${software.name} connect with existing systems?`, answer: 'Integration depends on the approved data flow, product version, devices, APIs or exports, security requirements, and connected system. These are confirmed during solution design.' },
    { question: `Can ${software.name} support multiple locations?`, answer: 'Location scope depends on the selected software, configuration, connectivity, roles, and rollout plan. Bring the required site structure to the guided demo.' },
    { question: `How does an implementation begin?`, answer: `Start by mapping users, roles, current records, the ${software.workflow[0].toLowerCase()} step, approvals, reports, integrations, training, and support ownership.` },
  ];
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: softwareFaqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };

  return (
    <main>
      <SiteHeader />
      <StructuredData data={softwareSchema} />
      <StructuredData data={faqSchema} />
      <PageHero eyebrow={`${software.category} software`} title={software.name} description={software.summary} marker="II / SOFTWARE" breadcrumbs={[{ label: 'Software', href: '/software' }, { label: software.name }]} path={`/software/${software.slug}`} />

      <section className="software-detail section">
        <div className="software-interface-pending">
          <div className="software-window large" aria-hidden="true"><div><i /><i /><i /></div><span>Current production interface required</span><ol>{software.modules.map((module, index) => <li key={module}><b>{String(index + 1).padStart(2, '0')}</b>{module}</li>)}</ol></div>
          <p>Interface area reserved for approved screenshots from the current product. A generic dashboard would misrepresent the software.</p>
        </div>
        <div className="software-detail-copy"><p className="section-kicker">Platform scope</p><h2>Build around the people and decisions inside the workflow.</h2><p>{software.summary}</p><ul>{software.modules.map((module) => <li key={module}>{module}</li>)}</ul><Link className="button button-primary" href={`/contact?software=${software.slug}`}>Request a demo <span aria-hidden="true">↗</span></Link></div>
      </section>

      <section className="software-workflow">
        <div><p className="section-kicker light">Operating flow</p><h2>A clear sequence from input to reviewed record.</h2></div>
        <ol>{software.workflow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong><p>Configuration and responsibilities are confirmed during solution design.</p></li>)}</ol>
      </section>

      <section className="section software-readiness">
        <div className="section-heading split-heading"><div><p className="section-kicker">Deployment readiness</p><h2>Confirm integration, roles, security, and support before rollout.</h2></div><p>These implementation topics remain explicit so technical stakeholders can validate the actual configuration instead of relying on generic feature claims.</p></div>
        <div className="readiness-grid">
          <article><span>01</span><h3>Users and roles</h3><p>Define administrators, managers, operators, employees, and approval responsibilities.</p></article>
          <article><span>02</span><h3>Hardware compatibility</h3><p>Confirm devices, entry points, connectivity, and synchronization requirements.</p></article>
          <article><span>03</span><h3>Data and integrations</h3><p>Document approved data flows, APIs, exports, and connected systems.</p></article>
          <article><span>04</span><h3>Deployment and support</h3><p>Agree rollout stages, training, exception handling, ownership, and support routes.</p></article>
        </div>
      </section>

      <section className="section seo-faq"><div className="section-heading"><p className="section-kicker">Frequently asked questions</p><h2>Plan the software around your real workflow.</h2></div><div>{softwareFaqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>

      <section className="decision-band"><h2>See the current software with your workflow in view.</h2><Link className="button button-primary" href={`/contact?software=${software.slug}`}>Book a guided demo <span aria-hidden="true">↗</span></Link></section>
      <SiteFooter />
    </main>
  );
}
