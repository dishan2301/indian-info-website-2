import Image from 'next/image';
import Link from 'next/link';
import d from './device-hero.module.css';
import { Activity, Check, WalletCards } from 'lucide-react';
import { FeatureBotShowcase } from './feature-bot-showcase';
import { hrmsFeatureTabs } from './feature-tabs-data';

export function DeviceHero() {
 return (
 <section className={d.hero} aria-labelledby="device-hero-title">
 <p className={d.eyebrow}>Indian Infotech · People, connected.</p>
 <h2 id="device-hero-title" className={d.title}>People. Payroll.<br/>All in sync.</h2>
 <input className={d.motionToggle} id="pause-hero-motion" type="checkbox" />
 <label className={d.motionLabel} htmlFor="pause-hero-motion">Pause animation</label>
 <div className={d.devices}>
 <div className={d.deviceFloat} data-travel-device><Image src="/campaign/hrms-device-hero.png" alt="HR and payroll dashboards on a tablet with keyboard and a smartphone" width={1536} height={1024} sizes="(max-width:650px) 125vw,85vw" /></div>
 <div className={d.featureLayer} aria-hidden="true">
  <div className={`${d.popCard} ${d.attendanceCard}`}><div className={d.cardSurface}><span className={d.cardIcon}><Activity size={14}/></span><span className={d.cardEyebrow}>ATTENDANCE</span><strong>Today at a glance</strong><div className={d.miniStat}><b>96.8%</b><span>On-time attendance <i>↗ 4.2%</i></span></div></div></div>
  <div className={`${d.popCard} ${d.leaveCard}`}><div className={d.cardSurface}><span className={d.cardIcon}><Check size={14}/></span><span className={d.cardEyebrow}>LEAVE REQUEST</span><strong>Approved in seconds</strong><div className={d.miniPerson}><i>MP</i><span>Meera Patel<small>3 days · Casual leave</small></span><b>✓</b></div></div></div>
  <div className={`${d.popCard} ${d.payrollCard}`}><div className={d.cardSurface}><span className={d.cardIcon}><WalletCards size={14}/></span><span className={d.cardEyebrow}>PAYROLL</span><strong>Payday, ready.</strong><div className={d.miniPay}><b>₹48,72,500</b><span><i/> Payroll reviewed</span></div></div></div>
 </div>
 <FeatureBotShowcase features={hrmsFeatureTabs} />
</div>
 <div className={d.bottom}><div className={d.copy}><h2>One HRMS for the whole<br/>employee journey.</h2><p>Connect hiring, time, pay and people workflows in one platform.</p></div><div><Link className={d.cta} href="/contact?solution=hrms-payroll">Request a demo ↗</Link><p className={d.note}>EXPLORE THE FEATURES BELOW ↓</p></div></div>
 </section>
 );
}
