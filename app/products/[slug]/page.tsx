import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '../../_components/page-hero';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';
import { ProductViewer } from '../../../components/catalog/product-viewer';
import { StructuredData } from '../../../components/structured-data';
import { absoluteUrl, createPageMetadata } from '@/lib/site';
import { products } from '../../content';

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return {};
  return createPageMetadata({ title: `${product.name} ${product.family}`, description: product.description, path: `/products/${product.slug}`, image: product.image ?? null });
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
    model: product.name,
    description: product.description,
    brand: { '@type': 'Brand', name: 'Indian Infotech' },
    category: product.family,
    image: images.map((image) => absoluteUrl(image)),
    url: absoluteUrl(`/products/${product.slug}`),
  };
  const productFaqs = [
    { question: `What is the ${product.name} used for?`, answer: `${product.description} Its primary published application is ${product.application.toLowerCase()}.` },
    { question: `How does the ${product.name} authenticate users?`, answer: `The published authentication category is ${product.authentication.toLowerCase()}. Exact enrollment and operating capability must be confirmed for the selected configuration.` },
    { question: `Which software works with the ${product.name}?`, answer: `${product.softwareCompatibility}. Indian Infotech confirms the software, connectivity, data flow, and version requirements during solution design.` },
    { question: `How should the ${product.name} be selected and deployed?`, answer: `${product.deployment}. Review the users, entry point, environment, power, network, workflow, and support needs before purchase.` },
  ];
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: productFaqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };

  return (
    <main>
      <SiteHeader />
      <StructuredData data={productSchema} />
      <StructuredData data={faqSchema} />
      <PageHero eyebrow={product.family} title={product.name} description={product.description} marker="II / PRODUCT" breadcrumbs={[{ label: 'Products', href: '/products' }, { label: product.name }]} path={`/products/${product.slug}`} />

      <section className="product-detail section">
        <ProductViewer name={product.name} images={images} />

        <div className="product-detail-copy">
          <p className="section-kicker">Selection overview</p>
          <h2>Choose this device in the context of the complete operating workflow.</h2>
          <p>{product.description} Indian Infotech can help assess the entry point, user flow, operating environment, and software requirements before final selection.</p>
          <dl className="product-summary-list">
            <div><dt>Product family</dt><dd>{product.family}</dd></div>
            <div><dt>Authentication</dt><dd>{product.authentication}</dd></div>
            <div><dt>Primary application</dt><dd>{product.application}</dd></div>
            <div><dt>Connectivity</dt><dd>{product.connectivity}</dd></div>
            <div><dt>Compatible software</dt><dd>{product.softwareCompatibility}</dd></div>
            <div><dt>Deployment environment</dt><dd>{product.deployment}</dd></div>
            <div><dt>Catalogue status</dt><dd>{product.status}</dd></div>
          </dl>
          <div className="hero-actions product-actions">
            <Link className="button button-primary" href={`/contact?product=${product.slug}`}>Request a quote <span aria-hidden="true">↗</span></Link>
            <Link className="button outline-button" href={`/compare?products=${product.slug}#product-comparison`}>Compare this product</Link>
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

      <section className="section product-resources-section">
        <div className="section-heading split-heading"><div><p className="section-kicker">Downloads and support</p><h2>Request the approved material for this configuration.</h2></div><p>No generic or outdated file is offered as a current specification. Documents are released after the exact model and configuration are confirmed.</p></div>
        <div className="product-resource-grid">
          <article><span>01 / SPECIFICATION</span><h3>Published specification summary</h3><p>Download the current catalogue fields shown on this page, with configuration limits stated clearly.</p><a href={`/products/${product.slug}/specification`} download>Download summary ↓</a></article>
          <article><span>02 / MANUAL</span><h3>Installation or user manual</h3><p>Availability and version must be confirmed against the supplied equipment.</p><Link href={`/contact?product=${product.slug}&resource=manual`}>Request manual ↗</Link></article>
          <article><span>03 / SOFTWARE</span><h3>Compatibility guidance</h3><p>Confirm supported software, integration method, and deployment requirements.</p><Link href={`/contact?product=${product.slug}&resource=compatibility`}>Verify compatibility ↗</Link></article>
          <article><span>04 / DATASHEET</span><h3>Approved manufacturer datasheet</h3><p>Request the current model- and variant-specific source before procurement.</p><Link href={`/contact?product=${product.slug}&resource=datasheet`}>Request datasheet ↗</Link></article>
        </div>
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
      <section className="section seo-faq"><div className="section-heading"><p className="section-kicker">Frequently asked questions</p><h2>Confirm the product in its deployment context.</h2></div><div>{productFaqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
      <SiteFooter />
    </main>
  );
}
