import Link from 'next/link';
import { DeviceFeatureBridge } from './device-feature-bridge';
import { ClientTrustRail } from './client-trust-rail';
import { TestimonialsSection } from '@/components/ui/testimonials-with-marquee';
import { clientQuotes } from '../content';
import intro from './intro-hero.module.css';
import { HrmsVisual } from './visual';
import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { HrmsFaq } from './faq';

export const metadata: Metadata = createPageMetadata({
  title: 'HRMS Software & Payroll Platform | Indian Infotech',
  description: 'Connect people, payroll, attendance, leave and everyday HR in one cloud HRMS. Trusted by 2,500+ organizations across 7+ countries.',
  path: '/hrms-payroll',
});

export default function HrmsPayrollPage() {
  return (
    <main>
      <SiteHeader />
      <section className={intro.section} aria-labelledby="intro-title">
        <div className={intro.gridFloor} aria-hidden="true" />
        <div className={intro.main}>
          <div className={intro.copy}>
            <h1 id="intro-title">The HRMS that keeps people, payroll and work in sync.</h1>
            <p className={intro.description}>Bring employee records, attendance, payroll, leave and everyday people workflows together in one secure cloud platform—trusted by organizations across 7+ countries.</p>
            <div className={intro.proof} aria-label="Platform highlights"><span><strong>2,500+</strong><small>Clients served</small></span><i aria-hidden="true"/><span><strong>7+</strong><small>Countries</small></span><i aria-hidden="true"/><span><strong>14</strong><small>Connected HR workflows</small></span></div>
            <div className={intro.actions}><Link className={intro.primary} href="/contact?solution=hrms-payroll">Book a Demo Now <span aria-hidden="true">↗</span></Link><a className={intro.phoneLink} href="tel:+919157966855"><small>SAY HELLO</small> +91 91579 66855</a></div>
          </div>
          <div className={intro.art}>
            <input className={intro.tourPause} id="pause-dashboard-tour" type="checkbox" aria-label="Pause dashboard animation" />
            <label className={intro.tourControl} htmlFor="pause-dashboard-tour">Pause animation</label>
            <div className={intro.browserBar} aria-hidden="true"><i /><i /><i /></div>
            <div className={intro.dashboard} inert><HrmsVisual /></div>
            <p className={intro.caption}>Illustrative dashboards · Sample data</p>
          </div>
        </div>
      </section>
      <div className={intro.ratings} aria-label="Platform ratings">
        <div className={intro.ratingLabel}>Rated by Users<br />Across Platforms</div>
        {[['/ratings/google.svg', 'Google', '4.6'], ['/ratings/g2.svg', 'G2', '4.4'], ['/ratings/software-suggest.svg', 'Software Suggest', '4.6'], ['/ratings/techimply.svg', 'Techimply', '4.8'], ['/ratings/technology-counter.svg', 'Technology Counter', '4.4']].map(([logo, platform, score]) => <div key={platform}><span className={intro.ratingMark}><img src={logo} alt={`${platform} logo`} /></span><strong>{score} <i aria-hidden="true">★</i></strong><small>{platform}</small></div>)}
      </div>
      <DeviceFeatureBridge />
      <ClientTrustRail />
      <TestimonialsSection
        title="Trusted by teams running real-world workforces."
        description="From workforce visibility to dependable day-to-day operations, hear what organizations value in working with Indian Infotech."
        testimonials={clientQuotes.map((item) => ({
          author: { name: item.company, handle: 'Indian Infotech client', avatar: item.logo },
          text: item.quote,
        }))}
      />
      <HrmsFaq />
      <SiteFooter />
    </main>
  );
}
