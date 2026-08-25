import type { Metadata } from 'next';
import { HeroPosterCarousel } from '@/components/homepage/hero-poster-carousel';
import { CompanyOverview, IndustriesAndClients, QuotesAndNews } from '@/components/homepage/home-curated-sections';
import { SiteFooter } from './_components/site-footer';
import { SiteHeader } from './_components/site-header';

export const metadata: Metadata = {
  title: 'Indian Infotech | Workforce and Workplace Systems',
  description: 'Biometric attendance, access control, entrance management, workforce software, and HRMS systems from Indian Infotech.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Indian Infotech | Workforce and Workplace Systems', description: 'Biometric attendance, access control, workforce software, and HRMS systems.', url: '/', type: 'website', images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Indian Infotech workforce and workplace systems' }] },
};

export default function Home() {
  return <main>
    <SiteHeader />
    <HeroPosterCarousel />
    <CompanyOverview />
    <IndustriesAndClients />
    <QuotesAndNews />
    <SiteFooter />
  </main>;
}
