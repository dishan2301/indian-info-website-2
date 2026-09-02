'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Product } from '@/app/content';

const familyOptions = ['All', 'Access control', 'Attendance', 'Entrance management'] as const;
const authenticationOptions = ['All', 'Face', 'Fingerprint', 'Biometric', 'Connected access system', 'Connected controller', 'Screening'] as const;
const applicationOptions = ['All', 'Personnel access', 'Attendance & access', 'Vehicle entry', 'Pedestrian entry', 'Security screening'] as const;

export function ProductCatalogue({ products }: { products: readonly Product[] }) {
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState<(typeof familyOptions)[number]>('All');
  const [authentication, setAuthentication] = useState<(typeof authenticationOptions)[number]>('All');
  const [application, setApplication] = useState<(typeof applicationOptions)[number]>('All');
  const [media, setMedia] = useState<'All' | 'Available' | 'Pending'>('All');
  const [comparison, setComparison] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesQuery = normalized.length === 0 || `${product.name} ${product.description} ${product.family} ${product.authentication} ${product.application}`.toLowerCase().includes(normalized);
      return matchesQuery && (family === 'All' || product.family === family) && (authentication === 'All' || product.authentication === authentication) && (application === 'All' || product.application === application) && (media === 'All' || (media === 'Available' ? Boolean(product.image) : !product.image));
    });
  }, [application, authentication, family, media, products, query]);
  const comparedProducts = products.filter((product) => comparison.includes(product.slug));

  function clearFilters() { setQuery(''); setFamily('All'); setAuthentication('All'); setApplication('All'); setMedia('All'); }
  function toggleComparison(slug: string) {
    setComparison((current) => current.includes(slug) ? current.filter((item) => item !== slug) : current.length < 3 ? [...current, slug] : current);
  }

  return (
    <div className="catalogue-tool">
      <div className="catalogue-controls">
        <label className="catalogue-search"><span>Search catalogue</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search model, family, or application…" /></label>
        <label><span>Product family</span><select value={family} onChange={(event) => setFamily(event.target.value as typeof family)}>{familyOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
        <label><span>Authentication</span><select value={authentication} onChange={(event) => setAuthentication(event.target.value as typeof authentication)}>{authenticationOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
        <label><span>Application</span><select value={application} onChange={(event) => setApplication(event.target.value as typeof application)}>{applicationOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
        <label><span>Approved media</span><select value={media} onChange={(event) => setMedia(event.target.value as typeof media)}><option>All</option><option>Available</option><option>Pending</option></select></label>
      </div>
      <div className="catalogue-toolbar"><p aria-live="polite">{filtered.length} of {products.length} products · {comparison.length} selected to compare</p>{comparison.length > 0 && <a href="#product-comparison">Compare selected</a>}<button type="button" onClick={clearFilters}>Clear filters</button></div>
      {filtered.length > 0 ? <div className="catalogue-results">{filtered.map((product) => (
        <article className="catalog-card" key={product.slug}>
          <Link href={`/products/${product.slug}`} aria-label={`View ${product.name} product details`}>
            <div className="catalog-visual">{product.image ? <Image src={product.image} alt={`${product.name} ${product.family} product`} width={420} height={420} /> : <span className="media-pending">Approved media pending</span>}</div>
            <div className="catalog-card-copy"><div className="catalog-card-status"><span>{product.status}</span><i className={product.image ? 'available' : ''}>{product.image ? 'Media available' : 'Media pending'}</i></div><p>{product.family}</p><h2>{product.name}</h2><span>{product.description}</span><dl><div><dt>Authentication</dt><dd>{product.authentication}</dd></div><div><dt>Application</dt><dd>{product.application}</dd></div></dl><b>View product ↗</b></div>
          </Link>
          <button className="comparison-toggle" type="button" aria-pressed={comparison.includes(product.slug)} disabled={comparison.length === 3 && !comparison.includes(product.slug)} onClick={() => toggleComparison(product.slug)}>{comparison.includes(product.slug) ? 'Remove from comparison' : comparison.length === 3 ? 'Comparison full' : 'Compare product'}</button>
        </article>
      ))}</div> : <div className="resource-empty"><h2>No products match these filters.</h2><p>Clear the filters or broaden the search.</p><button type="button" onClick={clearFilters}>Reset catalogue</button></div>}
      {comparedProducts.length > 0 && <section className="product-comparison" id="product-comparison" aria-labelledby="product-comparison-title">
        <div><p className="section-kicker">Side-by-side comparison</p><h2 id="product-comparison-title">Compare up to three products.</h2><button type="button" onClick={() => setComparison([])}>Clear comparison</button></div>
        <div className="comparison-scroll"><table><thead><tr><th scope="col">Specification</th>{comparedProducts.map((product) => <th scope="col" key={product.slug}><Link href={`/products/${product.slug}`}>{product.name} ↗</Link></th>)}</tr></thead><tbody>
          <tr><th scope="row">Family</th>{comparedProducts.map((product) => <td key={product.slug}>{product.family}</td>)}</tr>
          <tr><th scope="row">Authentication</th>{comparedProducts.map((product) => <td key={product.slug}>{product.authentication}</td>)}</tr>
          <tr><th scope="row">Application</th>{comparedProducts.map((product) => <td key={product.slug}>{product.application}</td>)}</tr>
          <tr><th scope="row">Price range</th>{comparedProducts.map((product) => <td key={product.slug}>Contact for pricing</td>)}</tr>
          <tr><th scope="row">Deployment</th>{comparedProducts.map((product) => <td key={product.slug}>{product.deployment}</td>)}</tr>
          <tr><th scope="row">Connectivity</th>{comparedProducts.map((product) => <td key={product.slug}>{product.connectivity}</td>)}</tr>
          <tr><th scope="row">Software compatibility</th>{comparedProducts.map((product) => <td key={product.slug}>{product.softwareCompatibility}</td>)}</tr>
          <tr><th scope="row">Evidence status</th>{comparedProducts.map((product) => <td key={product.slug}>{product.status}</td>)}</tr>
          <tr><th scope="row">Specification</th>{comparedProducts.map((product) => <td key={product.slug}><a href={`/products/${product.slug}/specification`} download>Download published summary ↓</a></td>)}</tr>
          <tr><th scope="row">Approved datasheet</th>{comparedProducts.map((product) => <td key={product.slug}><Link href={`/contact?product=${product.slug}&resource=datasheet`}>Request current datasheet ↗</Link></td>)}</tr>
        </tbody></table></div>
      </section>}
    </div>
  );
}
