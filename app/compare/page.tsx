import type { Metadata } from 'next';
import { ProductCatalogue } from '@/components/catalog/product-catalogue';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { products } from '../content';

export const metadata: Metadata = createPageMetadata({ title: 'Compare Biometric & Access Control Products', description: 'Compare two or three Indian Infotech attendance, access-control, entrance, and screening products side by side.', path: '/compare' });

export default function ComparePage() {
  return <main>
    <SiteHeader />
    <PageHero eyebrow="Product comparison" title="Shortlist and compare up to three products." description="Filter by product family, authentication, or application, then compare use-case fit, deployment guidance, connectivity, pricing route, and datasheet status side by side." marker="II / COMPARE" />
    <section className="section"><ProductCatalogue products={products} /></section>
    <SiteFooter />
  </main>;
}
