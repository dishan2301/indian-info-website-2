'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { estimateAttendanceRoi } from '@/lib/roi.mjs';

const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
const decimal = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 1 });

export function RoiCalculator() {
  const [employees, setEmployees] = useState(500);
  const [hours, setHours] = useState(24);
  const [corrections, setCorrections] = useState(35);
  const [correctionMinutes, setCorrectionMinutes] = useState(15);
  const [recoveryRate, setRecoveryRate] = useState(35);
  const [hourlyCost, setHourlyCost] = useState(500);
  const [investment, setInvestment] = useState(250000);
  const estimate = useMemo(() => estimateAttendanceRoi({ employees, manualHours: hours, corrections, correctionMinutes, recoveryRate, hourlyCost, investment }), [correctionMinutes, corrections, employees, hourlyCost, hours, investment, recoveryRate]);
  const summary = [
    'Indian Infotech — attendance administration business-case estimate', '',
    `Workforce: ${estimate.employees}`,
    `Manual attendance administration: ${estimate.manualHours} hours/month`,
    `Corrections: ${estimate.corrections}/month at ${estimate.correctionMinutes} minutes each`,
    `Recoverable-time assumption: ${estimate.recoveryRate}%`,
    `Loaded administrative cost: ${currency.format(estimate.hourlyCost)}/hour`,
    `Estimated project investment: ${currency.format(estimate.investment)}`, '',
    `Potential time recovered: ${decimal.format(estimate.monthlySavedHours)} hours/month (${decimal.format(estimate.annualSavedHours)} hours/year)`,
    `Annual capacity value: ${currency.format(estimate.annualCapacityValue)}`,
    `Indicative payback: ${estimate.paybackMonths === null ? 'Not modelled' : `${decimal.format(estimate.paybackMonths)} months`}`,
    `First-year modelled return: ${estimate.firstYearReturn === null ? 'Not modelled' : `${decimal.format(estimate.firstYearReturn)}%`}`, '',
    'This directional capacity-value model is not a quote, guarantee, or cash-flow forecast. It excludes financing, tax, recurring fees, hardware replacement, and implementation disruption. Validate all inputs and configuration costs with your team.',
  ].join('\n');

  return <section className="roi-calculator" id="roi-calculator" aria-labelledby="roi-calculator-title">
    <div><p className="section-kicker">Business-case calculator</p><h2 id="roi-calculator-title">Test the assumptions behind potential value.</h2><p id="roi-calculator-note">Enter your own operating costs and investment estimate. The result values recovered administrative capacity—not guaranteed cash savings.</p></div>
    <div className="roi-controls">
      <label>Employees<input aria-describedby="roi-calculator-note" type="number" min="1" max="100000" value={employees} onChange={(event) => setEmployees(Number(event.target.value) || 1)} /></label>
      <label>Manual admin hours / month<input type="number" min="0" max="10000" value={hours} onChange={(event) => setHours(Number(event.target.value) || 0)} /></label>
      <label>Corrections / month<input type="number" min="0" max="10000" value={corrections} onChange={(event) => setCorrections(Number(event.target.value) || 0)} /></label>
      <label>Minutes / correction<input type="number" min="0" max="240" value={correctionMinutes} onChange={(event) => setCorrectionMinutes(Number(event.target.value) || 0)} /></label>
      <label>Recoverable time (%)<input type="number" min="0" max="100" value={recoveryRate} onChange={(event) => setRecoveryRate(Number(event.target.value) || 0)} /></label>
      <label>Loaded admin cost (₹ / hour)<input type="number" min="0" max="100000" step="50" value={hourlyCost} onChange={(event) => setHourlyCost(Number(event.target.value) || 0)} /></label>
      <label>Estimated project investment (₹)<input type="number" min="0" max="1000000000" step="10000" value={investment} onChange={(event) => setInvestment(Number(event.target.value) || 0)} /></label>
    </div>
    <div className="roi-result" aria-live="polite"><span>Illustrative result for {estimate.employees} employees</span><dl><div><dt>Potential time recovered</dt><dd>{decimal.format(estimate.monthlySavedHours)} hours / month</dd></div><div><dt>Annual capacity value</dt><dd>{currency.format(estimate.annualCapacityValue)}</dd></div><div><dt>Indicative payback</dt><dd>{estimate.paybackMonths === null ? 'Not modelled' : `${decimal.format(estimate.paybackMonths)} months`}</dd></div><div><dt>First-year modelled return</dt><dd>{estimate.firstYearReturn === null ? 'Not modelled' : `${decimal.format(estimate.firstYearReturn)}%`}</dd></div></dl><small>Directional estimate only. Excludes financing, tax, recurring fees, hardware replacement, and implementation disruption. Validate every assumption and configuration cost.</small><div className="roi-actions"><a className="button button-secondary" href={`data:text/plain;charset=utf-8,${encodeURIComponent(summary)}`} download="attendance-business-case.txt">Download summary <span aria-hidden="true">↓</span></a><Link className="button button-primary" href={`/contact?topic=roi&resource=business-case&workforce=${estimate.employees}`}>Validate this estimate <span aria-hidden="true">↗</span></Link></div></div>
  </section>;
}
