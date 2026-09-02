'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

export function RoiCalculator() {
  const [employees, setEmployees] = useState(500);
  const [hours, setHours] = useState(24);
  const [corrections, setCorrections] = useState(35);
  const estimate = useMemo(() => {
    const monthlyHours = hours + corrections * 0.25;
    const savedHours = Math.round(monthlyHours * 0.35);
    return { savedHours, annualHours: savedHours * 12, employeeBand: employees < 500 ? 'small' : employees < 2000 ? 'mid-size' : 'large' };
  }, [corrections, employees, hours]);

  return <section className="roi-calculator" id="roi-calculator" aria-labelledby="roi-calculator-title">
    <div><p className="section-kicker">Estimate, not a quote</p><h2 id="roi-calculator-title">Model administrative time that could be recovered.</h2><p>This directional model uses transparent assumptions. It does not promise savings, pricing, or payback; validate the inputs with your team.</p></div>
    <div className="roi-controls">
      <label>Employees<input type="number" min="1" max="100000" value={employees} onChange={(event) => setEmployees(Number(event.target.value) || 1)} /></label>
      <label>Manual attendance hours / month<input type="number" min="0" max="10000" value={hours} onChange={(event) => setHours(Number(event.target.value) || 0)} /></label>
      <label>Corrections / month<input type="number" min="0" max="10000" value={corrections} onChange={(event) => setCorrections(Number(event.target.value) || 0)} /></label>
    </div>
    <div className="roi-result" aria-live="polite"><span>Illustrative estimate for a {estimate.employeeBand} workforce</span><strong>{estimate.savedHours} hours / month</strong><p>Potential administrative time avoided under the model assumptions, or approximately {estimate.annualHours} hours / year.</p><small>Assumption: 35% of manual administration and correction time may be recoverable. This is not a guaranteed outcome.</small><Link className="button button-primary" href={`/contact?topic=roi&employees=${employees}`}>Validate this estimate <span aria-hidden="true">↗</span></Link></div>
  </section>;
}
