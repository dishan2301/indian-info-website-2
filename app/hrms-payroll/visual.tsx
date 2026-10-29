'use client';

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CalendarCheck2,
  Check,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  Clock3,
  CreditCard,
  LayoutDashboard,
  Search,
  Settings2,
  UserPlus,
  Users,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import styles from './visual.module.css';

export function HrmsVisual() {
  return <div className={styles.visual} aria-hidden="true">
    <div className={styles.dashboard}>
      <div className={styles.topbar}>
        <span className={styles.brand}><i /> indian<span>infotech</span><b>PEOPLE</b></span>
        <label className={styles.search}><Search /><span>Search people, requests...</span><kbd>⌘ K</kbd></label>
        <span className={styles.topActions}><span className={styles.online}><i /> All systems normal</span><Bell /><span className={styles.avatar}>II</span></span>
      </div>
      <div className={styles.dashboardBody}>
        <aside className={styles.sidebar}>
          <span className={styles.navActive}><LayoutDashboard /><small>Overview</small></span>
          <span><Users /><small>People</small></span>
          <span><Clock3 /><small>Time</small></span>
          <span><CreditCard /><small>Payroll</small></span>
          <span><ClipboardList /><small>Requests</small></span>
          <span className={styles.navBottom}><Settings2 /><small>Settings</small></span>
        </aside>
        <div className={styles.workspace}>
          <div className={styles.workspaceHeading}>
            <div><small>WORKFORCE / OVERVIEW</small><strong>Workforce overview</strong><span>Good morning. Here’s what’s happening across your organisation.</span></div>
            <button type="button" className={styles.datePicker}><CalendarCheck2 /> Today <ChevronDown /></button>
          </div>
          <div className={styles.sampleLabel}><span /> ILLUSTRATIVE DASHBOARD · SAMPLE DATA</div>
          <div className={styles.summaryCards}>
            <article><span className={styles.metricIcon}><Users /></span><small>ACTIVE EMPLOYEES</small><strong>1,284</strong><i><ArrowUpRight /> 4.8% <b>vs last month</b></i></article>
            <article><span className={styles.metricIcon}><Activity /></span><small>ATTENDANCE TODAY</small><strong>96.8%</strong><i><ArrowUpRight /> 1.2% <b>vs last week</b></i></article>
            <article><span className={styles.metricIcon}><CreditCard /></span><small>PAYROLL STATUS</small><strong>On track</strong><i className={styles.metricQuiet}><Check /> Next run · 30 Oct</i></article>
            <article><span className={styles.metricIcon}><ClipboardList /></span><small>TO REVIEW</small><strong>18 requests</strong><i className={styles.metricWarn}><ArrowDownRight /> 6 need attention</i></article>
          </div>
          <div className={styles.analytics}>
            <section className={styles.chart}>
              <div className={styles.panelHeading}><span><b>Workforce activity</b><small>Attendance trends across the organisation</small></span><button type="button">This week <ChevronDown /></button></div>
              <div className={styles.chartBody}>
                <div className={styles.axis}><span>100%</span><span>75%</span><span>50%</span><span>25%</span></div>
                <div className={styles.plot}>
                  <div className={styles.gridLines}><i /><i /><i /><i /></div>
                  <svg viewBox="0 0 450 130" preserveAspectRatio="none">
                    <defs><linearGradient id="attendance-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="var(--brand-primary)" stopOpacity=".24" /><stop offset="1" stopColor="var(--brand-primary)" stopOpacity="0" /></linearGradient></defs>
                    <path className={styles.chartArea} d="M0 94 C28 89 34 61 68 68 S106 88 136 62 S174 52 204 58 S244 33 272 43 S316 70 340 48 S386 29 410 42 S435 25 450 19 L450 130 L0 130Z" />
                    <path className={styles.chartLine} d="M0 94 C28 89 34 61 68 68 S106 88 136 62 S174 52 204 58 S244 33 272 43 S316 70 340 48 S386 29 410 42 S435 25 450 19" />
                    <circle cx="340" cy="48" r="4" />
                  </svg>
                  <div className={styles.axisDays}><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span></div>
                </div>
              </div>
            </section>
            <section className={styles.activity}>
              <div className={styles.panelHeading}><span><b>Needs your attention</b><small>Items waiting for a next step</small></span><CircleHelp /></div>
              <div className={styles.activityItem}><span className={styles.activityIcon}><CalendarCheck2 /></span><span><b>Leave requests</b><small>Review team requests</small></span><strong>08</strong></div>
              <div className={styles.activityItem}><span className={styles.activityIcon}><UserPlus /></span><span><b>New joiners</b><small>Joining tasks to complete</small></span><strong>05</strong></div>
              <div className={styles.activityItem}><span className={styles.activityIcon}><CreditCard /></span><span><b>Payroll review</b><small>Items before next run</small></span><strong>05</strong></div>
            </section>
          </div>
          <section className={styles.peopleTable}>
            <div className={styles.panelHeading}><span><b>Recent people activity</b><small>Updates across your teams</small></span><button type="button">View all <ArrowUpRight /></button></div>
            <div className={styles.tableHead}><span>EMPLOYEE</span><span>TEAM</span><span>ACTIVITY</span><span>STATUS</span></div>
            <div className={styles.tableRow}><span><i>AS</i><b>Aarav Shah<small>EMP-2048</small></b></span><span>Product</span><span>Profile updated</span><em>COMPLETED</em></div>
            <div className={styles.tableRow}><span><i className={styles.avatarGreen}>MP</i><b>Meera Patel<small>EMP-1982</small></b></span><span>People & Culture</span><span>Leave request</span><em className={styles.pending}>IN REVIEW</em></div>
          </section>
        </div>
      </div>
    </div>
    <div className={`${styles.toast} ${styles.toastOne}`}><span className={styles.toastIcon}><Check /></span><span><b>Leave request approved</b><small>Meera Patel · Just now</small></span><i /></div>
    <div className={`${styles.toast} ${styles.toastTwo}`}><span className={styles.toastIconBlue}><CreditCard /></span><span><b>Payroll is ready for review</b><small>October pay cycle · 2 min ago</small></span><i /></div>
    <div className={`${styles.toast} ${styles.toastThree}`}><span className={styles.toastIconGold}><UserPlus /></span><span><b>New joiner checklist started</b><small>Product team · 5 min ago</small></span><i /></div>
  </div>;
}

export function HrmsReveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reducedMotion = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reducedMotion ? undefined : { y: [20, 0], opacity: [0.65, 1] }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65, delay, ease: 'easeOut' }}>{children}</motion.div>;
}
