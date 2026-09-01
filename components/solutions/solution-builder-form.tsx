'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

const needs = ['Attendance', 'Access control', 'Visitors', 'HRMS / payroll', 'Canteen', 'Entrance security'];
const auth = ['Face', 'Fingerprint', 'RFID / card', 'QR', 'Need recommendation'];

export function SolutionBuilderForm() {
  const [selectedNeeds, setSelectedNeeds] = useState(['Attendance']);
  const [size, setSize] = useState('100–500');
  const [locations, setLocations] = useState('Multi-location');
  const [authentication, setAuthentication] = useState('Need recommendation');
  const [deployment, setDeployment] = useState('Need recommendation');
  const architecture = useMemo(() => [
    `Workforce: ${size}`,
    `Locations: ${locations}`,
    `Modules: ${selectedNeeds.join(' + ') || 'Select at least one requirement'}`,
    `Identity: ${authentication}`,
    `Deployment: ${deployment}`,
    'Engineering review: devices, data flow, implementation, training, and support ownership',
  ], [authentication, deployment, locations, selectedNeeds, size]);
  const contactHref = useMemo(() => `/contact?${new URLSearchParams({
    topic: 'solution architecture and quote',
    solutions: selectedNeeds.join(', '), workforce: size, locations, authentication, deployment,
  })}`, [authentication, deployment, locations, selectedNeeds, size]);

  function toggleNeed(need: string) {
    setSelectedNeeds((current) => current.includes(need) ? current.filter((item) => item !== need) : [...current, need]);
  }

  function downloadSummary() {
    const text = ['Indian Infotech — Solution Architecture Brief', '', ...architecture.map((item, index) => `${index + 1}. ${item}`), '', 'This is a planning brief, not a compatibility confirmation or price quote.'].join('\n');
    const href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
    const link = document.createElement('a');
    link.href = href;
    link.download = 'indian-infotech-solution-brief.txt';
    link.click();
    URL.revokeObjectURL(href);
  }

  return <section className="section builder-section"><form className="builder-form" onSubmit={(event) => event.preventDefault()}><fieldset><legend>What should the solution include?</legend><div className="builder-options">{needs.map((item) => <label key={item}><input type="checkbox" checked={selectedNeeds.includes(item)} onChange={() => toggleNeed(item)} />{item}</label>)}</div></fieldset><div className="builder-field"><label htmlFor="size">Approximate workforce</label><select id="size" value={size} onChange={(event) => setSize(event.target.value)}><option>&lt;100</option><option>100–500</option><option>500–2000</option><option>2000+</option></select></div><div className="builder-field"><label htmlFor="locations">Locations</label><select id="locations" value={locations} onChange={(event) => setLocations(event.target.value)}><option>Single location</option><option>Multi-location</option><option>Planning a rollout</option></select></div><fieldset><legend>Authentication</legend><div className="builder-options">{auth.map((item) => <label key={item}><input type="radio" name="authentication" checked={authentication === item} onChange={() => setAuthentication(item)} />{item}</label>)}</div></fieldset><div className="builder-field"><label htmlFor="deployment">Deployment preference</label><select id="deployment" value={deployment} onChange={(event) => setDeployment(event.target.value)}><option>Cloud</option><option>On-premise</option><option>Hybrid / need recommendation</option><option>Need recommendation</option></select></div><div className="builder-result"><p className="section-kicker">Generated architecture</p><h2>A connected starting brief for engineering review.</h2><ol className="builder-architecture">{architecture.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ol><p>Configuration, compatibility, availability, implementation scope, and pricing must be confirmed by an Indian Infotech solution engineer.</p><div className="builder-actions"><Link className="button button-primary" href={contactHref}>Request architecture &amp; quote <span aria-hidden="true">↗</span></Link><button className="button outline-button" type="button" onClick={downloadSummary}>Download summary</button></div></div></form></section>;
}
