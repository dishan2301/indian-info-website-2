import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '../../_components/page-hero';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';
import { products } from '../../content';

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} ${product.family} | Indian Infotech`,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} | Indian Infotech`,
      description: product.description,
      url: `/products/${product.slug}`,
      images: product.image ? [{ url: product.image, alt: `${product.name} product` }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const images = product.images ?? [];
  const related = products.filter((item) => item.family === product.family && item.slug !== product.slug).slice(0, 3);
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: { '@type': 'Brand', name: 'Indian Infotech' },
    category: product.family,
    image: images.map((image) => `https://indianinfotech.org${image}`),
  };

  return (
    <main>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <PageHero eyebrow={product.family} title={product.name} description={product.description} marker="II / PRODUCT" />

      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/products">Products</Link><span aria-hidden="true">/</span><span aria-current="page">{product.name}</span>
      </nav>

      <section className="product-detail section">
        <div className="product-gallery" aria-label={`${product.name} product gallery`}>
          {images.length > 0 ? images.map((image, index) => (
            <figure className={index === 0 ? 'product-gallery-main' : ''} key={image}>
              <Image src={image} alt={`${product.name} product view ${index + 1}`} width={760} height={760} priority={index === 0} />
            </figure>
          )) : (
            <div className="product-media-missing"><span>Media review</span><strong>Approved product photography pending.</strong><p>We will not substitute a generic or AI-generated device image.</p></div>
          )}
        </div>

        <div className="product-detail-copy">
          <p className="section-kicker">Selection overview</p>
          <h2>Choose this device in the context of the complete operating workflow.</h2>
          <p>{product.description} Indian Infotech can help assess the entry point, user flow, operating environment, and software requirements before final selection.</p>
          <dl className="product-summary-list">
            <div><dt>Product family</dt><dd>{product.family}</dd></div>
            <div><dt>Authentication</dt><dd>Confirm for selected configuration</dd></div>
            <div><dt>Connectivity</dt><dd>Confirm for selected configuration</dd></div>
            <div><dt>Compatible software</dt><dd>Verify during solution design</dd></div>
            <div><dt>Deployment environment</dt><dd>Site assessment recommended</dd></div>
          </dl>
          <div className="hero-actions product-actions">
            <Link className="button button-primary" href={`/contact?product=${product.slug}`}>Request a quote <span aria-hidden="true">↗</span></Link>
            <Link className="button outline-button" href="/contact">Talk to an engineer</Link>
          </div>
        </div>
      </section>

      <section className="product-discovery">
        <div><p className="section-kicker light">Before specification</p><h2>Five questions shape the right selection.</h2></div>
        <ol>
          <li><span>01</span><strong>Who needs to authenticate?</strong><p>Employees, contractors, visitors, or mixed populations.</p></li>
          <li><span>02</span><strong>Where will it operate?</strong><p>Office, plant, gate, controlled room, or exposed entrance.</p></li>
          <li><span>03</span><strong>What must it connect to?</strong><p>Attendance, access, HRMS, visitor, or other approved systems.</p></li>
          <li><span>04</span><strong>How should exceptions work?</strong><p>Define fallback, approvals, offline operation, and support.</p></li>
          <li><span>05</span><strong>What rollout is practical?</strong><p>Single location, phased sites, or multi-location operation.</p></li>
        </ol>
      </section>

      {related.length > 0 && (
        <section className="section related-products">
          <div className="section-heading split-heading"><div><p className="section-kicker">Related products</p><h2>Continue comparing within the same family.</h2></div><Link className="outline-link" href="/products">View catalogue</Link></div>
          <div className="catalog-grid">
            {related.map((item) => (
              <Link className="catalog-card related-card" href={`/products/${item.slug}`} key={item.slug}>
                <div className="catalog-visual">{item.image ? <Image src={item.image} alt={`${item.name} product`} width={420} height={420} /> : <span className="media-pending">Media pending</span>}</div>
                <div className="catalog-card-copy"><p>{item.family}</p><h3>{item.name}</h3><span>{item.description}</span></div>
              </Link>
            ))}
          </div>
        </section>
      )}
      <SiteFooter />
    </main>
  );
}
