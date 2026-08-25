import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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
  return {
    title: `${software.name} | Indian Infotech Software`,
    description: software.summary,
    alternates: { canonical: `/software/${software.slug}` },
    openGraph: { title: `${software.name} | Indian Infotech`, description: software.summary, url: `/software/${software.slug}` },
  };
}

export default async function SoftwareDetailPage({ params }: SoftwarePageProps) {
  const { slug } = await params;
  const software = softwarePlatforms.find((item) => item.slug === slug);
  if (!software) notFound();

  return (
    <main>
      <SiteHeader />
      <PageHero eyebrow={`${software.category} software`} title={software.name} description={software.summary} marker="II / SOFTWARE" />
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/software">Software</Link><span aria-hidden="true">/</span><span aria-current="page">{software.name}</span></nav>

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

      <section className="decision-band"><h2>See the current software with your workflow in view.</h2><Link className="button button-primary" href={`/contact?software=${software.slug}`}>Book a guided demo <span aria-hidden="true">↗</span></Link></section>
      <SiteFooter />
    </main>
  );
}
