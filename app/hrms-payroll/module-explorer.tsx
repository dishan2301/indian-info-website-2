'use client';

import { useState } from 'react';
import Link from 'next/link';

const stages = [
  { name: 'All workflows', indexes: null },
  { name: 'Hire & Join', indexes: [0, 1, 12] },
  { name: 'Time & Leave', indexes: [5, 6, 8] },
  { name: 'Pay & Self-Service', indexes: [2, 3, 4, 7, 10, 15] },
  { name: 'Grow & Exit', indexes: [9, 11, 13, 14] },
];

export function ModuleExplorer({ modules }: { modules: string[][] }) {
  const [stage, setStage] = useState(0);
  const visible = modules.map((module, index) => ({ module, index })).filter(({ index }) => stages[stage].indexes?.includes(index) ?? true);
  return <div className="hrms-explorer">
    <div className="hrms-explorer-filters" role="group" aria-label="Filter modules by employee lifecycle stage">
      {stages.map((item, index) => <button type="button" key={item.name} aria-pressed={stage === index} onClick={() => setStage(index)}>{item.name}</button>)}
    </div>
    <p className="hrms-explorer-status" role="status">{visible.length} workflows · {stages[stage].name}</p>
    <div className="hrms-module-grid">{visible.map(({ module: [title, description, href], index }) => <Link className="hrms-module-card" href={href} key={href + title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{description}</p><b>Explore workflow <i aria-hidden="true">↗</i></b></Link>)}</div>
  </div>;
}
