import type { Metadata } from 'next';
import { ProductComparison } from '@/components/catalog/product-comparison';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { products } from '../content';

export const metadata: Metadata = {
  title: 'Compare Products | Indian Infotech',
  description: 'Compare Indian Infotech access-control, attendance, and entrance-management products.',
  alternates: { canonical: '/compare' },
  openGraph: { title: 'Compare Products | Indian Infotech', description: 'Compare product families and shortlist devices for a site assessment.', url: '/compare' },
};

export default function ComparePage() {
  return <main><SiteHeader /><PageHero eyebrow="Product comparison" title="Compare the portfolio before confirming the specification." description="Select up to four products and compare their published positioning. Configuration-level specifications remain subject to technical confirmation." marker="II / COMPARE" /><section className="section compare-section"><ProductComparison products={products} /></section><SiteFooter /></main>;
}
