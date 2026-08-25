import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
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

const families = ['Access control', 'Attendance', 'Entrance management'] as const;

export default function ProductsPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero eyebrow="Product portfolio" title="Purpose-built devices for identity, attendance, and entry." description="Explore Indian Infotech’s access-control, attendance, and entrance-management portfolio. Final selection should follow a site and workflow assessment." marker="II / 12+ PRODUCTS" />

      <section className="section product-catalog">
        {families.map((family, familyIndex) => (
          <div className="product-family" id={family.toLowerCase().replaceAll(' ', '-')} key={family}>
            <div className="family-heading"><span>0{familyIndex + 1}</span><div><p className="section-kicker">Product family</p><h2>{family}</h2></div></div>
            <div className="catalog-grid">
              {products.filter((product) => product.family === family).map((product) => (
                <article className="catalog-card" key={product.name}>
                  <Link href={`/products/${product.slug}`} aria-label={`View ${product.name} product details`}>
                    <div className="catalog-visual">
                      {product.image ? <Image src={product.image} alt={`${product.name} ${product.family} device`} width={420} height={420} /> : <span className="media-pending">Approved media pending</span>}
                    </div>
                    <div className="catalog-card-copy"><p>{product.family}</p><h3>{product.name}</h3><span>{product.description}</span><b>View product ↗</b></div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="selection-note"><div><p className="section-kicker light">Choose with context</p><h2>Capacity, authentication method, connectivity, entry point, and environment all matter.</h2><p>Share your site details before finalizing a device. The team can help shortlist products around operating conditions and deployment needs.</p></div><Link className="button button-primary" href="/contact">Request product guidance <span aria-hidden="true">↗</span></Link></section>
      <SiteFooter />
    </main>
  );
}
