const bound = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, Number.isFinite(Number(value)) ? Number(value) : minimum));

export function estimateAttendanceRoi(input) {
  const employees = bound(input.employees, 1, 100000);
  const manualHours = bound(input.manualHours, 0, 10000);
  const corrections = bound(input.corrections, 0, 10000);
  const correctionMinutes = bound(input.correctionMinutes, 0, 240);
  const recoveryRate = bound(input.recoveryRate, 0, 100);
  const hourlyCost = bound(input.hourlyCost, 0, 100000);
  const investment = bound(input.investment, 0, 1000000000);
  const monthlyAdminHours = manualHours + (corrections * correctionMinutes / 60);
  const monthlySavedHours = monthlyAdminHours * recoveryRate / 100;
  const annualSavedHours = monthlySavedHours * 12;
  const annualCapacityValue = annualSavedHours * hourlyCost;

  return {
    employees,
    manualHours,
    corrections,
    correctionMinutes,
    recoveryRate,
    hourlyCost,
    investment,
    monthlyAdminHours,
    monthlySavedHours,
    annualSavedHours,
    annualCapacityValue,
    paybackMonths: investment > 0 && annualCapacityValue > 0 ? investment / (annualCapacityValue / 12) : null,
    firstYearReturn: investment > 0 ? (annualCapacityValue - investment) / investment * 100 : null,
  };
}
