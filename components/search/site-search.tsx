'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

export type SearchEntry = { title: string; description: string; type: string; href: string; keywords: string };

export function SiteSearch({ entries }: { entries: readonly SearchEntry[] }) {
  const [query, setQuery] = useState('');
  const normalized = query.trim().toLowerCase();
  const results = useMemo(() => normalized.length < 2 ? [] : entries.filter((entry) => `${entry.title} ${entry.description} ${entry.type} ${entry.keywords}`.toLowerCase().includes(normalized)), [entries, normalized]);

  return (
    <div className="site-search-tool">
      <label htmlFor="site-search"><span>Search products, software, industries, and resources</span><input id="site-search" type="search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try attendance, access control, pharma…" /></label>
      <div className="search-status" aria-live="polite">{normalized.length < 2 ? 'Enter at least two characters' : `${results.length} ${results.length === 1 ? 'result' : 'results'}`}</div>
      {results.length > 0 && <div className="search-results">{results.map((entry) => <Link href={entry.href} key={`${entry.type}-${entry.href}`}><span>{entry.type}</span><h2>{entry.title}</h2><p>{entry.description}</p><b>Open result →</b></Link>)}</div>}
      {normalized.length >= 2 && results.length === 0 && <div className="resource-empty"><h2>No matching content</h2><p>Try a product name, software module, workflow, or industry.</p></div>}
    </div>
  );
}
