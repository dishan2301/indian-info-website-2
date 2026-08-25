'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type ComparisonProduct = {
  slug: string;
  name: string;
  family: string;
  description: string;
  image?: string;
};

export function ProductComparison({ products }: { products: readonly ComparisonProduct[] }) {
  const [selectedSlugs, setSelectedSlugs] = useState(() => products.slice(0, 3).map((product) => product.slug));
  const selected = selectedSlugs.map((slug) => products.find((product) => product.slug === slug)).filter((product): product is ComparisonProduct => Boolean(product));

  function toggleProduct(slug: string) {
    setSelectedSlugs((current) => current.includes(slug) ? current.filter((item) => item !== slug) : current.length < 4 ? [...current, slug] : current);
  }

  return (
    <div className="comparison-tool">
      <fieldset className="comparison-picker">
        <legend>Select two to four products</legend>
        <p>{selected.length} of 4 selected</p>
        <div>{products.map((product) => {
          const checked = selectedSlugs.includes(product.slug);
          const disabled = !checked && selectedSlugs.length >= 4;
          return <label className={checked ? 'selected' : ''} key={product.slug}><input type="checkbox" checked={checked} disabled={disabled} onChange={() => toggleProduct(product.slug)} /><span>{product.name}</span><small>{product.family}</small></label>;
        })}</div>
      </fieldset>

      {selected.length >= 2 ? (
        <div className="comparison-table-wrap" tabIndex={0} aria-label="Scrollable product comparison table">
          <table className="comparison-table">
            <caption>Selected product comparison. Technical configuration must be confirmed with Indian Infotech.</caption>
            <thead><tr><th scope="col">Compare</th>{selected.map((product) => <th scope="col" key={product.slug}><div className="compare-product-head">{product.image ? <Image src={product.image} alt={`${product.name} product`} width={180} height={180} /> : <span>Media pending</span>}<strong>{product.name}</strong><Link href={`/products/${product.slug}`}>Product details ↗</Link></div></th>)}</tr></thead>
            <tbody>
              <tr><th scope="row">Product family</th>{selected.map((product) => <td key={product.slug}>{product.family}</td>)}</tr>
              <tr><th scope="row">Published overview</th>{selected.map((product) => <td key={product.slug}>{product.description}</td>)}</tr>
              <tr><th scope="row">Product media</th>{selected.map((product) => <td key={product.slug}>{product.image ? 'Available' : 'Awaiting approved image'}</td>)}</tr>
              <tr><th scope="row">Authentication</th>{selected.map((product) => <td key={product.slug}>Confirm selected configuration</td>)}</tr>
              <tr><th scope="row">Connectivity</th>{selected.map((product) => <td key={product.slug}>Confirm selected configuration</td>)}</tr>
              <tr><th scope="row">Software compatibility</th>{selected.map((product) => <td key={product.slug}>Verify during solution design</td>)}</tr>
              <tr><th scope="row">Deployment fit</th>{selected.map((product) => <td key={product.slug}>Site assessment recommended</td>)}</tr>
            </tbody>
          </table>
        </div>
      ) : <div className="comparison-empty"><h2>Select at least two products.</h2><p>The comparison table will appear here.</p></div>}

      <div className="comparison-actions"><p>Need a specification-level comparison? Share the site, authentication, capacity, connectivity, and software requirements.</p><Link className="button button-primary" href={`/contact?products=${selectedSlugs.join(',')}`}>Request comparison help <span aria-hidden="true">↗</span></Link></div>
    </div>
  );
}
