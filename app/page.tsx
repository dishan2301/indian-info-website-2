import { getLatestArticles } from '@/lib/insights';
import { getPublicTestimonials } from '@/lib/sanity/testimonials';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HeroPoster } from '@/components/homepage/hero-poster-carousel';
import { CompanyOverview, IndustriesAndClients, QuotesAndNews } from '@/components/homepage/home-curated-sections';
import { createPageMetadata } from '@/lib/site';
import { SiteFooter } from './_components/site-footer';
import { SiteHeader } from './_components/site-header';

export const metadata: Metadata = createPageMetadata({
  title: 'Access Control & Attendance Products | Indian Infotech',
  description: 'Explore Indian Infotech access control, biometric attendance, HRMS, payroll, and workplace products for businesses across India.',
  path: '/',
});

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [articles, testimonials] = await Promise.all([getLatestArticles(5), getPublicTestimonials()]);
  return <main id="home">
    <SiteHeader />
    <HeroPoster />
    <section className="home-journey-section" aria-labelledby="home-primary-heading">
      <div className="home-journey-intro">
        <p className="section-kicker">Your journey with Indian Infotech</p>
        <h2 id="home-primary-heading">It starts at your gate. It helps your whole company.</h2>
        <p>Imagine a growing company with several gates, shifts, employees, contractors, and visitors. Here is how one everyday arrival becomes useful information for the people running it.</p>
      </div>
      <div className="home-journey-road" aria-label="Customer journey from devices to workplace operations">
        <ol>
          <li data-step="01" className="home-journey-stop">
            <div className="home-journey-image"><Image src="/products/face-ai-80-pro/product-render-v1.png" alt="Biometric attendance and access device" fill sizes="(max-width: 760px) 100vw, 30vw" /></div>
            <div className="home-journey-copy"><span className="home-journey-year">First, we listen</span><h3>“We need to know who is coming in.”</h3><p>You tell us about your gates, people, shifts, and current challenges. Together, we choose the devices that fit each entry point.</p><Link href="/products">See the devices <span aria-hidden="true">↗</span></Link></div>
          </li>
          <li data-step="02" className="home-journey-stop">
            <div className="home-journey-image"><Image src="/campaign/core-systems/entrance-control-desktop-v2.webp" alt="Workplace entrance with controlled access" fill sizes="(max-width: 760px) 100vw, 30vw" /></div>
            <div className="home-journey-copy"><span className="home-journey-year">Then, at your site</span><h3>The devices go where work begins.</h3><p>We place attendance and access devices at the gates and doors people actually use, with entry rules planned for your site.</p><Link href="/solutions/entrance-management">See entrance systems <span aria-hidden="true">↗</span></Link></div>
          </li>
          <li data-step="03" className="home-journey-stop">
            <div className="home-journey-image"><Image src="/campaign/solutions/attendance-desktop-v2.webp" alt="Employee using attendance at a workplace" fill sizes="(max-width: 760px) 100vw, 30vw" /></div>
            <div className="home-journey-copy"><span className="home-journey-year">Every working day</span><h3>People arrive. The record starts.</h3><p>An employee clocks in for a shift. A contractor enters an approved area. Visitors follow their own check-in path.</p><Link href="/solutions/attendance-automation">See attendance flow <span aria-hidden="true">↗</span></Link></div>
          </li>
          <li data-step="04" className="home-journey-stop">
            <div className="home-journey-image"><Image src="/campaign/core-systems/easytime-desktop-v2.webp" alt="Workforce attendance software" fill sizes="(max-width: 760px) 100vw, 30vw" /></div>
            <div className="home-journey-copy"><span className="home-journey-year">In one place</span><h3>Your team can see what happened.</h3><p>Easytime Online gathers attendance across locations. Managers review shifts, leave, missed punches, and reports before using the records further.</p><Link href="/software/easytime-online">Explore Easytime <span aria-hidden="true">↗</span></Link></div>
          </li>
        </ol>
      </div>
      <div className="home-journey-outcomes">
        <div><span className="home-journey-year">After review</span><h3>One source of information. The right view for each team.</h3><p>Approved records can support the next part of your operation, according to the modules and integrations your company uses.</p></div>
        <div className="home-journey-outcome-links"><Link href="/hrms-payroll"><strong>HR &amp; payroll</strong><span>People records, attendance, and payroll inputs ↗</span></Link><Link href="/contract-labour-management"><strong>Contract labour</strong><span>Rosters, site attendance, and approvals ↗</span></Link><Link href="/solutions/entrance-management"><strong>Entrance management</strong><span>Controlled movement at gates and doors ↗</span></Link></div>
      </div>
    </section>
    <CompanyOverview />
    <IndustriesAndClients />
    <QuotesAndNews articles={articles} testimonials={testimonials} />
    <SiteFooter />
  </main>;
}
