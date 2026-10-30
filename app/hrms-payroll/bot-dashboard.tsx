'use client';
import type { VerticalTabService } from '@/components/ui/vertical-tabs';
import s from './bot-dashboard.module.css';
const metrics = [
 ['Open vacancies','24','Candidates','186','Interviews','32'],['Joining this month','18','Documents ready','94%','Tasks completed','72'],['Employees','1,248','Payroll ready','98%','Salary total','₹48.7L'],['Active employees','1,186','Requests','42','Resolved','96%'],['Available days','156','Pending requests','12','Approved','38'],['Present today','1,208','On time','96.8%','Late punches','24'],['Claims submitted','84','Awaiting review','16','Reimbursed','₹2.4L'],['Logged hours','8,420','Active projects','24','Approved hours','94%'],['Reviews completed','86%','Goals on track','142','Check-ins','68'],['Open tickets','18','Resolved today','32','Response time','2.4h'],['Exits this month','8','Clearances done','92%','Interviews','6'],['Visitors today','42','Checked in','18','Pre-approved','24'],['Production units','12,840','Eligible staff','248','Benefits total','₹3.2L'],['Active learners','186','Courses','24','Completion','89%'],
];
export function BotDashboard({feature,index}:{feature:VerticalTabService;index:number}){
 const m=metrics[index%metrics.length];
 return <div className={s.screen} key={feature.id} aria-label={`${feature.title} illustrative dashboard`}>
  <aside><b>II</b>{['Overview','People','Workflows','Reports'].map(x=><span key={x}>{x}</span>)}</aside>
  <div className={s.main}><header><span>WORKSPACE / {feature.title.toUpperCase()}</span><small>Sample data · This month</small></header><h3>{feature.title}</h3>
  <div className={s.metrics}>{[0,2,4].map(n=><div key={n}><small>{m[n]}</small><strong>{m[n+1]}</strong><em>Updated just now</em></div>)}</div>
  <div className={s.charts}><section><b>{feature.title} overview</b><div className={s.bars}>{Array.from({length:12},(_,i)=><i key={i} style={{height:`${25+(i*17+index*13)%70}%`}}/>)}</div><small>MON　 TUE　 WED　 THU　 FRI</small></section><section><b>Workflow status</b><div className={s.donut}><strong>{78+index%17}%</strong></div><small>● Complete　● In progress</small></section></div>
  <div className={s.table}><b>Recent workflow activity</b>{feature.points.slice(0,3).map(([label],i)=><div key={label}><span>{label}</span><small>HR team · Today</small><em>{i===1?'In review':'Completed'}</em></div>)}</div>
  </div></div>;
}
