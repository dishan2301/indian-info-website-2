'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type ResourceItem = {
  title: string;
  description: string;
  type: 'Overview' | 'Guide' | 'Industry' | 'Archived topic';
  area: 'Products' | 'Software' | 'Industry' | 'Company';
  href?: string;
  requestHref?: string;
};

const resources: readonly ResourceItem[] = [
  { title: 'Product portfolio', description: 'Browse access-control, attendance, and entrance-management products with real product media.', type: 'Overview', area: 'Products', href: '/products' },
  { title: 'Product selection guidance', description: 'Review the operating questions that shape device and deployment selection.', type: 'Guide', area: 'Products', href: '/products' },
  { title: 'Software platform overview', description: 'Explore Easytime Online, HRMS and Payroll, visitor, and canteen workflows.', type: 'Overview', area: 'Software', href: '/software' },
  { title: 'Pharmaceutical workplace systems', description: 'Explore attendance, controlled-entry, visitor, and workforce considerations for pharmaceutical facilities.', type: 'Industry', area: 'Industry', href: '/industries/pharma' },
  { title: 'AI technology in production lines', description: 'Legacy article listing dated 23 August 2024. The original record currently contains no article body and is under editorial review.', type: 'Archived topic', area: 'Company', requestHref: '/contact?resource=ai-technology-production-lines' },
  { title: 'Rent-based cloud attendance management', description: 'Legacy Easytime article listing dated 23 August 2024. The original record currently contains no article body and is under editorial review.', type: 'Archived topic', area: 'Software', requestHref: '/contact?resource=rent-based-cloud-attendance' },
] as const;

const types = ['All', 'Overview', 'Guide', 'Industry', 'Archived topic'] as const;

export function ResourceLibrary() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<(typeof types)[number]>('All');
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return resources.filter((resource) => {
      const matchesType = type === 'All' || resource.type === type;
      const matchesQuery = normalizedQuery.length === 0 || `${resource.title} ${resource.description} ${resource.area}`.toLowerCase().includes(normalizedQuery);
      return matchesType && matchesQuery;
    });
  }, [query, type]);

  return (
    <div className="resource-library">
      <div className="resource-controls">
        <label><span>Search resources</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, software, industries…" /></label>
        <fieldset><legend>Filter by type</legend>{types.map((item) => <button type="button" className={type === item ? 'active' : ''} aria-pressed={type === item} onClick={() => setType(item)} key={item}>{item}</button>)}</fieldset>
      </div>
      <p className="resource-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'resource' : 'resources'} found</p>
      <div className="resource-grid">
        {filtered.map((resource) => {
          const content = <><span>{resource.type} · {resource.area}</span><h2>{resource.title}</h2><p>{resource.description}</p><b>{resource.href ? 'Open resource ↗' : resource.requestHref ? 'Request source material ↗' : 'Editorial review pending'}</b></>;
          if (resource.href) return <Link className="resource-card" href={resource.href} key={resource.title}>{content}</Link>;
          if (resource.requestHref) return <Link className="resource-card archived" id={resource.title === 'AI technology in production lines' ? 'legacy-editorial' : undefined} href={resource.requestHref} key={resource.title}>{content}</Link>;
          return <article className="resource-card archived" id={resource.title === 'AI technology in production lines' ? 'legacy-editorial' : undefined} key={resource.title}>{content}</article>;
        })}
      </div>
      {filtered.length === 0 && <div className="resource-empty"><h2>No matching resources</h2><p>Try a broader search or select another resource type.</p></div>}
    </div>
  );
}
