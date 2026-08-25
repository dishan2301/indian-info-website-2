import type { Metadata } from 'next';
import Link from 'next/link';
import { ResourceLibrary } from '@/components/resources/resource-library';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = {
  title: 'Resources & Technical Guidance | Indian Infotech',
  description: 'Find Indian Infotech product, software, industry, and implementation resources.',
  alternates: { canonical: '/resources' },
  openGraph: { title: 'Resources | Indian Infotech', description: 'Product, software, industry, and implementation guidance.', url: '/resources' },
};

export default function ResourcesPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero eyebrow="Resource center" title="Find the right technical and operating context." description="Search current product, software, and industry guidance. Datasheets, manuals, integration guides, and case studies will appear only when approved source files are available." marker="II / RESOURCES" />
      <section className="section resources-section">
        <div className="section-heading split-heading"><div><p className="section-kicker">Knowledge and downloads</p><h2>Useful material, with its evidence status made clear.</h2></div><p>The library deliberately separates live resources from archived topics and documents still awaiting approval.</p></div>
        <ResourceLibrary />
      </section>
      <section className="resource-request"><div><p className="section-kicker light">Need a document?</p><h2>Ask for the product or software material relevant to your deployment.</h2></div><Link className="button button-primary" href="/contact">Request technical material <span aria-hidden="true">↗</span></Link></section>
      <SiteFooter />
    </main>
  );
}
