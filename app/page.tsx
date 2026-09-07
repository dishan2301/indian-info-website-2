import type { Metadata } from 'next';
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
    <section className="home-seo-positioning section" aria-labelledby="home-primary-heading">
      <p className="section-kicker">Connected workforce and workplace systems</p>
      <h1 id="home-primary-heading">Access Control &amp; Attendance Products for Modern Businesses</h1>
      <p>One connected ecosystem for biometric attendance, HRMS, payroll, access control, visitor management, and workplace operations across India.</p>
      <div className="hero-actions"><Link className="button button-primary" href="/solutions">Explore solutions <span aria-hidden="true">↗</span></Link><Link className="button outline-button" href="/resources#roi-calculator">Estimate ROI</Link><Link className="button outline-button" href="/contact?topic=pricing">Get pricing</Link></div>
    </section>
    <CompanyOverview />
    <IndustriesAndClients />
    <QuotesAndNews />
    <SiteFooter />
  </main>;
}
