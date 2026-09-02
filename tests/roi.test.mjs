import assert from 'node:assert/strict';
import test from 'node:test';
import { estimateAttendanceRoi } from '../lib/roi.mjs';

test('ROI model exposes its arithmetic and bounds unsafe inputs', () => {
  const estimate = estimateAttendanceRoi({ employees: 500, manualHours: 24, corrections: 35, correctionMinutes: 15, recoveryRate: 35, hourlyCost: 500, investment: 250000 });
  assert.equal(estimate.monthlyAdminHours, 32.75);
  assert.equal(estimate.annualCapacityValue, 68775);
  assert.ok(Math.abs(estimate.paybackMonths - 43.6205) < 0.001);

  const bounded = estimateAttendanceRoi({ employees: -1, manualHours: -5, corrections: 'bad', correctionMinutes: 999, recoveryRate: 140, hourlyCost: -1, investment: 0 });
  assert.equal(bounded.employees, 1);
  assert.equal(bounded.monthlySavedHours, 0);
  assert.equal(bounded.paybackMonths, null);
});
