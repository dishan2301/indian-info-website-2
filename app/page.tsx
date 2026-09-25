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

export default function Home() {
  return <main id="home">
    <SiteHeader />
    <HeroPoster />
    <section className="home-journey-section" aria-labelledby="home-primary-heading">
      <div className="home-journey-intro">
        <p className="section-kicker">Our road so far</p>
        <h2 id="home-primary-heading">A practical journey from time-office systems to connected workplaces.</h2>
        <p>Indian Infotech keeps building around the real movement of people, places, and work—from the first entry point to the next operational decision.</p>
      </div>
      <div className="home-journey-road" aria-label="Indian Infotech company journey">
        <svg className="home-journey-road-map" viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden="true">
          <path className="home-journey-road-base" d="M125 330 C180 330 245 390 375 330 S545 40 625 50 S760 100 875 50" />
          <path className="home-journey-road-marking" d="M125 330 C180 330 245 390 375 330 S545 40 625 50 S760 100 875 50" />
        </svg>
        <ol>
          <li className="home-journey-stop home-journey-stop-low">
            <div className="home-journey-image"><Image src="/company/about-banner.webp" alt="Indian Infotech workplace systems" fill sizes="(max-width: 760px) 100vw, 30vw" /></div>
            <div className="home-journey-copy"><span className="home-journey-year">2011 · Ahmedabad</span><h3>We started with a simple hope.</h3><p>To help workplaces become safer, more secure, and easier for people to run every day.</p></div>
          </li>
          <li className="home-journey-stop home-journey-stop-low">
            <div className="home-journey-image"><Image src="/campaign/core-systems/easy-visit-desktop-v2.webp" alt="Visitor management at a modern workplace entrance" fill sizes="(max-width: 760px) 100vw, 30vw" /></div>
            <div className="home-journey-copy"><span className="home-journey-year">The next turn · Connected workplaces</span><h3>One useful system became many connected solutions.</h3><p>Attendance, visitors, access, entrance management, and workplace services began working together.</p></div>
          </li>
          <li className="home-journey-stop">
            <div className="home-journey-image home-journey-image-certification"><Image src="/iso-9001-certified.webp" alt="ISO 9001 certified" fill sizes="(max-width: 760px) 100vw, 30vw" /></div>
            <div className="home-journey-copy"><span className="home-journey-year">A mark of trust · ISO 9001</span><h3>We put quality into the way we deliver.</h3><p>Certification gave our customers another reason to trust the process behind the promise.</p><Link href="/certification">See what it means <span aria-hidden="true">↗</span></Link></div>
          </li>
          <li className="home-journey-stop">
            <div className="home-journey-image"><Image src="/campaign/hero/workforce-desktop-v2.webp" alt="Connected workforce operations for growing organizations" fill sizes="(max-width: 760px) 100vw, 30vw" /></div>
            <div className="home-journey-copy"><span className="home-journey-year">Today · 2,500+ clients · 7+ countries</span><h3>Now, the road is shared by growing organizations.</h3><p>What began with one belief now supports teams across industries and countries—and we are still moving forward.</p><Link href="/contact">Start your next step <span aria-hidden="true">↗</span></Link></div>
          </li>
        </ol>
      </div>
    </section>
    <CompanyOverview />
    <IndustriesAndClients />
    <QuotesAndNews />
    <SiteFooter />
  </main>;
}
