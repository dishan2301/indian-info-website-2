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
  MousePointer2,
  Globe2,
  TrendingUp,
  GraduationCap,
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
          <span><UserPlus /><small>Hiring</small></span><span><TrendingUp /><small>Growth</small></span><span><Globe2 /><small>Global</small></span><span className={styles.navBottom}><Settings2 /><small>Settings</small></span>
        </aside>
        <div className={styles.workspace}>
          <div className={styles.workspaceHeading}>
            <div><small>GLOBAL PEOPLE OPERATIONS</small><strong>Your workforce. Worldwide.</strong><span>24 countries · 6 regions · One connected workspace</span></div>
            <button type="button" className={styles.datePicker}><CalendarCheck2 /> Today <ChevronDown /></button>
          </div>
          <div className={styles.sampleLabel}><span /> ILLUSTRATIVE DASHBOARD · SAMPLE DATA</div>
          <div className={styles.summaryCards}>
            <article><span className={styles.metricIcon}><Users /></span><small>ACTIVE EMPLOYEES</small><strong>12,840</strong><i><ArrowUpRight /> 4.8% <b>vs last month</b></i></article>
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
          <div className={styles.globalAnalytics}>
            <section className={styles.worldPanel}>
              <div className={styles.panelHeading}><span><b>People around the world</b><small>Regional workforce · Sample locations</small></span><Globe2 /></div>
              <svg className={styles.worldMap} viewBox="0 0 400 180" aria-hidden="true">
                <defs><pattern id="world-dots" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#b8cce8" /></pattern></defs>
                <g fill="url(#world-dots)"><path d="M25 40 55 22 100 20 131 37 120 59 99 61 85 80 70 83 63 67 42 64Z M80 84 110 88 126 112 114 144 99 166 90 139 92 118 78 100Z M157 24 179 15 194 28 182 46 165 45Z M180 49 202 35 227 42 238 56 227 67 206 65 190 72Z M192 76 224 68 247 88 232 125 211 143 199 118 185 92Z M231 35 274 23 327 32 369 51 355 76 321 72 300 99 279 91 268 111 250 88 247 65 229 60Z M313 120 339 113 362 129 357 150 329 151 311 137Z M288 97 304 99 316 113 304 119Z" /></g>
                <g className={styles.mapConnections} fill="none" stroke="#4098ee" strokeWidth="1"><path d="M77 54 Q175 -5 273 75"/><path d="M204 54 Q248 25 273 75"/><path d="M273 75 Q330 73 338 132"/><path d="M204 54 Q219 69 220 92"/><path d="M77 54 Q64 104 106 126"/></g>
                {[[77,54],[204,54],[273,75],[220,92],[338,132],[106,126]].map(([cx,cy],i)=><g key={i}><circle className={styles.mapPulse} cx={cx} cy={cy} r="8" style={{ animationDelay: `${i * .45}s` }}/><circle cx={cx} cy={cy} r="3" fill={i%2 ? '#18af80' : '#2687ed'} stroke="white" strokeWidth="1.5" /></g>)}
              </svg>
              <div className={styles.regionLegend}><span><i /> APAC <b>6,420</b></span><span><i /> EMEA <b>3,852</b></span><span><i /> Americas <b>2,568</b></span></div>
            </section>
            <section className={styles.costPanel}><div className={styles.panelHeading}><span><b>Payroll analytics</b><small>Cost by department</small></span><CreditCard /></div><div className={styles.costDonut}><span><b>$2.4m</b><small>Monthly cost</small></span></div><div className={styles.costLegend}><span><i /> Engineering <b>48%</b></span><span><i /> Operations <b>32%</b></span><span><i /> Other teams <b>20%</b></span></div></section>
          </div>
          <div className={styles.featureTicker}><span><Check /> Employee records</span><span><Check /> Expenses</span><span><Check /> Benefits</span><span><Check /> Timesheets</span><span><Check /> Learning</span></div>
          <section className={styles.peopleTable}>
            <div className={styles.panelHeading}><span><b>Recent people activity</b><small>Updates across your teams</small></span><button type="button">View all <ArrowUpRight /></button></div>
            <div className={styles.tableHead}><span>EMPLOYEE</span><span>TEAM</span><span>ACTIVITY</span><span>STATUS</span></div>
            <div className={styles.tableRow}><span><i>AS</i><b>Aarav Shah<small>EMP-2048</small></b></span><span>Product</span><span>Profile updated</span><em>COMPLETED</em></div>
            <div className={styles.tableRow}><span><i className={styles.avatarGreen}>MP</i><b>Meera Patel<small>EMP-1982</small></b></span><span>People & Culture</span><span>Leave request</span><em className={styles.pending}>IN REVIEW</em></div>
          </section>
        </div>
      </div>
      <div className={styles.tourLayer}>
        <div className={`${styles.detailPanel} ${styles.attendanceDetail}`}>
          <div className={styles.detailHeader}><span><Clock3 /> TIME & ATTENDANCE</span><b>×</b></div>
          <h3>Every workday, accounted for.</h3><p>Today’s attendance · 24 October</p>
          <div className={styles.detailMetrics}><span><b>96.8%</b>Attendance</span><span><b>12,429</b>Checked in</span><span><b>09:12</b>Avg. check-in</span></div>
          <div className={styles.detailBars}>{[48, 72, 61, 88, 76, 95, 86].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div>
          <div className={styles.detailRow}><span><i>AS</i> Aarav Shah</span><strong>09:02 · On time</strong></div>
          <div className={styles.detailRow}><span><i>MP</i> Meera Patel</span><strong>08:56 · On time</strong></div>
          <div className={styles.detailFooter}><Check /> Attendance synced across teams</div>
        </div>
        <div className={`${styles.detailPanel} ${styles.leaveDetail}`}>
          <div className={styles.detailHeader}><span><CalendarCheck2 /> LEAVE REQUEST</span><b>×</b></div>
          <h3>A little time to recharge.</h3><p>Review and approve in one place</p>
          <div className={styles.requestPerson}><i>MP</i><span><b>Meera Patel</b><small>People & Culture · EMP-1982</small></span><em>Pending review</em></div>
          <div className={styles.requestDates}><span>FROM<b>26 Oct</b></span><span>TO<b>28 Oct</b></span><span>DURATION<b>3 days</b></span></div>
          <div className={styles.requestNote}><small>REASON FOR LEAVE</small><p>Family time and personal commitments.</p><span>Casual leave balance: <b>12 days available</b></span></div>
          <div className={styles.requestActions}><span>Decline</span><b><Check /> Approve leave</b></div>
          <div className={styles.detailFooter}><Check /> Leave approved · Employee notified</div>
        </div>
        <div className={`${styles.detailPanel} ${styles.payrollDetail}`}>
          <div className={styles.detailHeader}><span><CreditCard /> PAYROLL WORKSPACE</span><b>×</b></div>
          <h3>Ready for payday.</h3><p>October payroll · Monthly processing</p>
          <div className={styles.payrollTotal}><small>NET PAYABLE · SAMPLE DATA</small><b>₹48,72,500</b><span>128 employees · All checks complete</span></div>
          <div className={styles.detailRow}><span>Gross earnings</span><strong>₹54,80,000</strong></div>
          <div className={styles.detailRow}><span>Tax & deductions</span><strong>₹6,07,500</strong></div>
          <div className={styles.payrollProgress}><span /><span /><span /><span /></div>
          <div className={styles.payrollSteps}><span>Attendance</span><span>Calculated</span><span>Reviewed</span><span>Payslips</span></div>
          <div className={styles.detailFooter}><Check /> Payslips generated · Ready to share</div>
        </div>
        <div className={`${styles.detailPanel} ${styles.hiringDetail}`}>
          <div className={styles.detailHeader}><span><UserPlus /> TALENT & ONBOARDING</span><b>×</b></div><h3>Great people. A great start.</h3><p>Global recruitment pipeline · 18 open roles</p>
          <div className={styles.hiringFunnel}>{[['Applied','248'],['Screened','86'],['Interview','32'],['Offer','12']].map(([label,value])=><span key={label}><b>{value}</b><small>{label}</small></span>)}</div>
          <div className={styles.detailRow}><span>Priya Sharma · Product designer</span><strong>Offer accepted</strong></div><div className={styles.detailRow}><span>James Wilson · Engineering</span><strong>Interview · 14:30</strong></div>
          <div className={styles.onboardingList}><span><Check /> Offer letter signed</span><span><Check /> Documents verified</span><span><Check /> IT workspace provisioned</span><span><GraduationCap /> Welcome session scheduled</span></div><div className={styles.detailFooter}><Check /> New hire ready for day one</div>
        </div>
        <div className={`${styles.detailPanel} ${styles.growthDetail}`}>
          <div className={styles.detailHeader}><span><TrendingUp /> PERFORMANCE & LEARNING</span><b>×</b></div><h3>Help every team grow.</h3><p>Quarterly goals · Skills · Career development</p>
          <div className={styles.detailMetrics}><span><b>87%</b>Goals on track</span><span><b>4.8/5</b>Team score</span><span><b>92%</b>Learning</span></div>
          <svg className={styles.growthGraph} viewBox="0 0 280 85"><path d="M0 70H280M0 40H280M0 10H280" stroke="#e5edf5" fill="none" strokeDasharray="3 4"/><path d="M0 72 Q30 69 50 55 T100 48 T150 30 T200 24 T280 8" fill="none" stroke="#2378ec" strokeWidth="3" pathLength="1"/><path d="M0 77 Q40 75 70 67 T140 48 T210 44 T280 22" fill="none" stroke="#18ad7a" strokeWidth="3" pathLength="1"/></svg>
          <div className={styles.goalTrack}><span>Leadership development <b>82%</b></span><i><b style={{width:'82%'}} /></i><span>Technical certification <b>94%</b></span><i><b style={{width:'94%'}} /></i></div><div className={styles.detailFooter}><Check /> Reviews completed · Growth plans updated</div>
        </div>
        <div className={`${styles.detailPanel} ${styles.globalDetail}`}>
          <div className={styles.detailHeader}><span><Globe2 /> GLOBAL PAYROLL OVERVIEW</span><b>×</b></div><h3>One world. One workspace.</h3><p>Regional payroll runs · Local currencies</p>
          <div className={styles.detailMetrics}><span><b>24</b>Countries</span><span><b>12</b>Currencies</span><span><b>6</b>Regions</span></div>
          <div className={styles.currencyTable}>{[['India','INR','₹48,72,500'],['United States','USD','$124,800'],['United Kingdom','GBP','£86,400'],['Singapore','SGD','S$72,600'],['United Arab Emirates','AED','AED 94,200']].map(([country,currency,total])=><div key={country}><span><b>{country}</b><small>{currency} · Monthly payroll</small></span><strong>{total}</strong><i><Check /></i></div>)}</div>
          <div className={styles.detailFooter}><Check /> Regional runs reviewed · Reports ready</div>
        </div>
        <MousePointer2 className={styles.tourCursor} />
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
