'use client';

import { motion, useReducedMotion } from 'motion/react';

export default function EmployeeRecordVisual() {
  const reducedMotion = useReducedMotion();
  return <div className="hrms-record-visual" role="img" aria-label="A shared employee record connects recruitment, attendance, payroll, and performance.">
    <div className="hrms-record-topline"><span>THE CONNECTED WORKFORCE</span><span><i /> ONE SOURCE OF TRUTH</span></div>
    <div className="hrms-record-orbit" aria-hidden="true"><div /><div /></div>
    <motion.div className="hrms-record-core" animate={reducedMotion ? undefined : { y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
      <span className="hrms-record-avatar">◎</span><strong>Employee record</strong><small>One profile. Every workflow.</small><div className="hrms-record-fields"><span>Profile &amp; documents</span><span>Compensation &amp; payroll</span><span>Attendance &amp; leave</span></div><b>✓ Connected across your suite</b>
    </motion.div>
    {['Recruitment', 'Attendance', 'Payroll', 'Performance'].map((label, i) => <motion.div className={`hrms-record-node hrms-record-node-${i}`} key={label} animate={reducedMotion ? undefined : { y: [0, i % 2 ? 5 : -5, 0] }} transition={{ duration: 4, delay: i * .4, repeat: Infinity, ease: 'easeInOut' }}><span>{['↗', '◷', '₹', '↗'][i]}</span>{label}<i /></motion.div>)}
    <p className="hrms-record-bottom">HIRE <span>→</span> ONBOARD <span>→</span> MANAGE <span>→</span> GROW</p>
  </div>;
}
