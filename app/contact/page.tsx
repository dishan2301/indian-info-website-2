import type { Metadata } from 'next';
import { EnquiryBrief } from '@/components/contact/enquiry-brief';
import { StructuredData } from '@/components/structured-data';
import { sanitizeQueryValue } from '@/lib/security.mjs';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = createPageMetadata({ title: 'Contact Indian Infotech in Ahmedabad', description: 'Contact Indian Infotech for biometric attendance, access control, entrance management, HRMS, payroll, and workplace software.', path: '/contact' });

type ContactPageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const query = await searchParams;
  const context = [
    sanitizeQueryValue(query.product) && `Product: ${sanitizeQueryValue(query.product)}`,
    sanitizeQueryValue(query.software) && `Software: ${sanitizeQueryValue(query.software)}`,
    sanitizeQueryValue(query.hrms) && `HRMS module: ${sanitizeQueryValue(query.hrms)}`,
    sanitizeQueryValue(query.solution) && `Solution: ${sanitizeQueryValue(query.solution)}`,
    sanitizeQueryValue(query.solutions) && `Solution modules: ${sanitizeQueryValue(query.solutions)}`,
    sanitizeQueryValue(query.workforce) && `Workforce: ${sanitizeQueryValue(query.workforce)}`,
    sanitizeQueryValue(query.locations) && `Locations: ${sanitizeQueryValue(query.locations)}`,
    sanitizeQueryValue(query.authentication) && `Authentication: ${sanitizeQueryValue(query.authentication)}`,
    sanitizeQueryValue(query.deployment) && `Deployment: ${sanitizeQueryValue(query.deployment)}`,
    sanitizeQueryValue(query.industry) && `Industry: ${sanitizeQueryValue(query.industry)}`,
    sanitizeQueryValue(query.topic) && `Topic: ${sanitizeQueryValue(query.topic)}`,
    sanitizeQueryValue(query.resource) && `Requested material: ${sanitizeQueryValue(query.resource)}`,
  ].filter(Boolean).join(' · ');
  const localBusinessSchema = {
    '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Indian Infotech',
    url: 'https://indianinfotech.org/contact', telephone: '+91-76000-66770', email: 'sales@indianinfotech.org',
    address: { '@type': 'PostalAddress', streetAddress: '429, 425, 403 Gala Empire, Opp. Doordarshan Kendra, Thaltej', addressLocality: 'Ahmedabad', addressRegion: 'Gujarat', postalCode: '380054', addressCountry: 'IN' },
    areaServed: ['Ahmedabad', 'Gujarat', 'India'],
  };

  return (
    <main className="contact-page">
      <SiteHeader />
      <StructuredData data={localBusinessSchema} />
      <PageHero eyebrow="Contact" title="Bring us the operating problem—not just a product name." description="Share your site, workforce, entry-point, attendance, or HRMS requirements. We’ll help shape a clearer starting scope." marker="II / AHMEDABAD" />

      <section className="contact-card-section"><EnquiryBrief initialContext={context} /></section>

      <section className="brief-section">
        <div><p className="section-kicker">A useful first message</p><h2>Include these details for a faster response.</h2></div>
        <ol><li><span>01</span>Number and type of sites</li><li><span>02</span>Approximate workforce size</li><li><span>03</span>Entry points and authentication needs</li><li><span>04</span>Attendance, HRMS, visitor, or entrance requirements</li></ol>
      </section>
      <SiteFooter />
    </main>
  );
}
