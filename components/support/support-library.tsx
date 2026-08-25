'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type SupportItem = { title: string; description: string; category: 'Products' | 'Software' | 'Knowledge' | 'Service'; type: 'Manual' | 'Driver' | 'Firmware' | 'Guide' | 'FAQ' | 'Request'; href?: string };

const supportItems: readonly SupportItem[] = [
  { title: 'Product manuals', description: 'Request the approved installation or user manual for the exact product and configuration.', category: 'Products', type: 'Manual', href: '/contact?topic=support&resource=manual' },
  { title: 'Product datasheets', description: 'Request the current datasheet for the selected model or product family.', category: 'Products', type: 'Guide', href: '/resources' },
  { title: 'Drivers and firmware', description: 'Availability and version must be checked against the installed device before release.', category: 'Products', type: 'Driver', href: '/contact?topic=support&resource=driver' },
  { title: 'Firmware requests', description: 'Firmware is supplied only after model, version, and support ownership are confirmed.', category: 'Products', type: 'Firmware', href: '/contact?topic=support&resource=firmware' },
  { title: 'Software setup guidance', description: 'Start with the software workflow, device context, and rollout requirements.', category: 'Software', type: 'Guide', href: '/software' },
  { title: 'Integration guidance', description: 'Share the data flow and connected systems for a technical integration review.', category: 'Software', type: 'Guide', href: '/integrations' },
  { title: 'Common setup questions', description: 'A knowledge base and FAQ set is being assembled from approved support material.', category: 'Knowledge', type: 'FAQ', href: '/contact?topic=support&resource=faq' },
  { title: 'Raise a support request', description: 'Provide product or software, location, and issue details so the request can be routed correctly.', category: 'Service', type: 'Request', href: '/contact?topic=support' },
] as const;

const filters = ['All', 'Products', 'Software', 'Knowledge', 'Service'] as const;

export function SupportLibrary() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const filtered = useMemo(() => { const needle = query.trim().toLowerCase(); return supportItems.filter((item) => (filter === 'All' || item.category === filter) && (!needle || `${item.title} ${item.description} ${item.category} ${item.type}`.toLowerCase().includes(needle))); }, [filter, query]);
  return <div className="support-library"><div className="resource-controls"><label><span>Search support</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search manuals, firmware, setup, FAQs…" /></label><fieldset><legend>Filter by area</legend>{filters.map((item) => <button type="button" className={filter === item ? 'active' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)} key={item}>{item}</button>)}</fieldset></div><p className="resource-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'support result' : 'support results'}</p><div className="resource-grid">{filtered.map((item) => { const content = <><span>{item.type} · {item.category}</span><h2>{item.title}</h2><p>{item.description}</p><b>{item.href ? 'Open support route ↗' : 'Approval pending'}</b></>; return item.href ? <Link className="resource-card" href={item.href} key={item.title}>{content}</Link> : <article className="resource-card archived" key={item.title}>{content}</article>; })}</div>{filtered.length === 0 ? <div className="resource-empty"><h2>No support results</h2><p>Try a broader search or choose another support area.</p></div> : null}</div>;
}
