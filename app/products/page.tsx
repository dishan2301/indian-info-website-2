import type { Metadata } from 'next';
import Link from 'next/link';
import { ProductCatalogue } from '@/components/catalog/product-catalogue';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { products } from '../content';

export const metadata: Metadata = {
  title: 'Biometric & Access Control Products | Indian Infotech',
  description: 'Explore 12+ Indian Infotech products for biometric attendance, access control, and entrance management in Ahmedabad, Gujarat.',
  alternates: { canonical: '/products' },
  openGraph: { title: 'Biometric & Access Control Products | Indian Infotech', description: 'Access control, attendance, and entrance-management devices for real workplaces.', url: '/products' },
};

export default function ProductsPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero eyebrow="Product portfolio" title="Purpose-built devices for identity, attendance, and entry." description="Explore Indian Infotech’s access-control, attendance, and entrance-management portfolio. Final selection should follow a site and workflow assessment." marker="II / 12+ PRODUCTS" />

      <section className="section product-catalog">
        <div className="section-heading split-heading"><div><p className="section-kicker">Product discovery</p><h2>Filter by the operating requirement.</h2></div><p>Connectivity, exact software compatibility, capacity, and deployment fit remain configuration-dependent and must be confirmed before purchase.</p></div>
        <ProductCatalogue products={products} />
      </section>

      <section className="selection-note"><div><p className="section-kicker light">Choose with context</p><h2>Capacity, authentication method, connectivity, entry point, and environment all matter.</h2><p>Share your site details before finalizing a device. The team can help shortlist products around operating conditions and deployment needs.</p></div><Link className="button button-primary" href="/contact">Request product guidance <span aria-hidden="true">↗</span></Link></section>
      <SiteFooter />
    </main>
  );
}
