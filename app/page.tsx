import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CompanyShowcase, IndustryShowcase, ProductPosterShowcase, SoftwareShowcase, SolutionShowcase, TechnologyShowcase } from '@/components/homepage/homepage-showcases';
import { SiteFooter } from './_components/site-footer';
import { SiteHeader } from './_components/site-header';
import { companyFacts, industryProfiles, products, solutionProfiles, softwarePlatforms } from './content';

export const metadata: Metadata = {
  title: 'Indian Infotech | Workforce and Workplace Systems',
  description: 'Biometric attendance, access control, entrance management, workforce software, and HRMS systems from Indian Infotech.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Indian Infotech | Workforce and Workplace Systems', description: 'Biometric attendance, access control, workforce software, and HRMS systems.', url: '/', type: 'website', images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Indian Infotech workforce and workplace systems' }] },
};

export default function Home() {
  return <main>
    <SiteHeader />
    <CompanyShowcase />
    <section className="compact-hero">
      <div className="compact-hero-copy"><p className="eyebrow"><span /> Workforce + workplace systems</p><h1>Secure entry.<br /><em>Clearer operations.</em></h1><p>Indian Infotech connects biometric attendance, access control, entrance management, workforce software, and HRMS workflows.</p><div className="hero-actions"><Link className="button button-primary" href="/products">Explore products <span aria-hidden="true">↗</span></Link><Link className="button button-secondary" href="/contact">Talk to sales</Link></div></div>
      <div className="compact-hero-stage"><div className="compact-device compact-device-main"><Image src="/products/ai-60/angle.png" alt="AI 60 face recognition attendance device" width={720} height={720} priority /></div><div className="compact-device compact-device-side"><Image src="/products/fbl-200/main.png" alt="FBL 200 flap barrier" width={500} height={500} /></div><div className="compact-stage-label">AUTHENTICATE / CONTROL / OPERATE</div></div>
    </section>
    <section className="proof-strip compact-proof" aria-label="Company facts">{companyFacts.slice(0, 4).map((fact) => <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}</section>
    <ProductPosterShowcase products={products} />
    <TechnologyShowcase />
    <SolutionShowcase solutions={solutionProfiles} />
    <SoftwareShowcase software={softwarePlatforms} products={products} />
    <IndustryShowcase industries={industryProfiles} />
    <section className="compact-final-cta"><div><p className="section-kicker light">Start with the requirement</p><h2>Need a system that fits your site?</h2></div><Link className="button button-primary" href="/contact">Plan your solution <span aria-hidden="true">↗</span></Link></section>
    <SiteFooter />
  </main>;
}
