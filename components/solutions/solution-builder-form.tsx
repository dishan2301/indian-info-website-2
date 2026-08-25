'use client';

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';

const needs = ['Attendance', 'Access control', 'Visitors', 'HRMS / payroll', 'Canteen', 'Entrance security'];
const auth = ['Face', 'Fingerprint', 'RFID / card', 'QR', 'Need recommendation'];

export function SolutionBuilderForm() {
  const [need, setNeed] = useState('Attendance');
  const [size, setSize] = useState('100–500');
  const [locations, setLocations] = useState('Multi-location');
  const [authentication, setAuthentication] = useState('Need recommendation');
  const [deployment, setDeployment] = useState('Need recommendation');
  const [submitted, setSubmitted] = useState(false);
  const recommendation = useMemo(() => {
    if (need === 'Visitors' || need === 'Entrance security') return 'Visitor or entrance workflow + site assessment + connected access review';
    if (need === 'HRMS / payroll') return 'Easytime Online + HRMS & Payroll + attendance configuration review';
    if (need === 'Access control') return 'Access-control family + entrance assessment + operating rules review';
    if (need === 'Canteen') return 'Canteen Management + employee identification + entitlement workflow review';
    return 'Attendance device family + Easytime Online + workforce workflow review';
  }, [need]);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true); }
  return <section className="section builder-section"><form className="builder-form" onSubmit={submit}><div className="builder-field"><label htmlFor="need">What do you need first?</label><select id="need" value={need} onChange={(event) => setNeed(event.target.value)}>{needs.map((item) => <option key={item}>{item}</option>)}</select></div><div className="builder-field"><label htmlFor="size">Approximate workforce</label><select id="size" value={size} onChange={(event) => setSize(event.target.value)}><option>&lt;100</option><option>100–500</option><option>500–2000</option><option>2000+</option></select></div><div className="builder-field"><label htmlFor="locations">Locations</label><select id="locations" value={locations} onChange={(event) => setLocations(event.target.value)}><option>Single location</option><option>Multi-location</option><option>Planning a rollout</option></select></div><fieldset><legend>Authentication</legend><div className="builder-options">{auth.map((item) => <label key={item}><input type="radio" name="authentication" checked={authentication === item} onChange={() => setAuthentication(item)} />{item}</label>)}</div></fieldset><div className="builder-field"><label htmlFor="deployment">Deployment preference</label><select id="deployment" value={deployment} onChange={(event) => setDeployment(event.target.value)}><option>Cloud</option><option>On-premise</option><option>Hybrid / need recommendation</option><option>Need recommendation</option></select></div><div className="builder-result"><p className="section-kicker">Starting recommendation</p><h2>{recommendation}</h2><p>Configuration, compatibility, availability, and delivery requirements must be confirmed by an Indian Infotech solution engineer.</p><div className="builder-actions"><button className="button button-primary" type="submit">Prepare my brief <span aria-hidden="true">↗</span></button><Link className="button outline-button" href="/contact">Talk to an engineer</Link></div>{submitted ? <p className="builder-confirmation" role="status">Your brief is ready to continue. Use the engineer route to send these requirements with your contact details.</p> : null}</div></form></section>;
}
