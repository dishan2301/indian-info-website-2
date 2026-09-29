import type { Metadata } from 'next';
import { Clock3, Mail, Phone } from 'lucide-react';
import { EnquiryBrief } from '@/components/contact/enquiry-brief';
import { StructuredData } from '@/components/structured-data';
import { sanitizeQueryValue } from '@/lib/security.mjs';
import { createPageMetadata } from '@/lib/site';
import { companyProfile, postalAddressSchema } from '@/lib/company-profile';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = createPageMetadata({ title: 'Contact Indian Infotech in Ahmedabad', description: 'Contact Indian Infotech for biometric attendance, access control, entrance management, HRMS, payroll, and workplace software.', path: '/contact' });

type ContactPageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const buyerFaqs = [
  { question: 'How much does a biometric attendance or access-control system cost?', answer: 'Pricing depends on devices, workforce size, locations, entry points, software modules, integrations, installation conditions, training, and support. Share the operating scope for a configuration-based quote.' },
  { question: 'How long does implementation take?', answer: 'The timeline depends on site readiness, hardware quantity, data preparation, policies, integrations, testing, training, and rollout sequence. Indian Infotech confirms a practical timeline after the requirements and site conditions are reviewed.' },
  { question: 'Can Indian Infotech integrate with our existing HR or payroll system?', answer: 'Integration depends on the existing system, available APIs or import and export formats, required fields, synchronization direction, security, and error handling. Bring those details to an engineering review before compatibility is confirmed.' },
] as const;

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const query = await searchParams;
  const context = [
    sanitizeQueryValue(query.product) && `Product: ${sanitizeQueryValue(query.product)}`,
    sanitizeQueryValue(query.products) && `Product shortlist: ${sanitizeQueryValue(query.products)}`,
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
    '@context': 'https://schema.org', '@type': 'LocalBusiness', name: companyProfile.name,
    url: 'https://indianinfotech.org/contact', telephone: companyProfile.phoneSchema, email: companyProfile.email,
    address: postalAddressSchema,
    areaServed: ['Ahmedabad', 'Gujarat', 'India'],
  };
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: buyerFaqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };

  return (
    <main className="contact-page">
      <SiteHeader />
      <StructuredData data={localBusinessSchema} />
      <StructuredData data={faqSchema} />
      <PageHero eyebrow="Contact" title="Bring us the operating problem—not just a product name." description="Share your site, workforce, entry-point, attendance, or HRMS requirements. We’ll help shape a clearer starting scope." marker="II / AHMEDABAD" />

      <section className="contact-details-section" aria-labelledby="contact-details-title">
        <div className="contact-details-heading"><p className="section-kicker">Contact details</p><h2 id="contact-details-title">We are here to help you plan the right system.</h2><p>Talk to our sales team for a new requirement, or contact support when you need help with an existing Indian Infotech product or deployment.</p></div>
        <div className="contact-details-grid">
          <a className="contact-detail-card" href={`mailto:${companyProfile.email}`}><span className="contact-detail-icon"><Mail aria-hidden="true" /></span><span><b>Sales enquiries</b><strong>{companyProfile.email}</strong><small>Product selection, solution planning, and quotations</small></span></a>
          <a className="contact-detail-card" href={`mailto:${companyProfile.supportEmail}`}><span className="contact-detail-icon"><Phone aria-hidden="true" /></span><span><b>Technical support</b><strong>{companyProfile.supportEmail}</strong><small>Product, software, and deployment assistance</small></span></a>
          <div className="contact-detail-card"><span className="contact-detail-icon"><Clock3 aria-hidden="true" /></span><span><b>Working hours</b><strong>Monday to Saturday</strong><small>09:30 AM to 6:30 PM · Sunday closed</small></span></div>
        </div>
        <div className="contact-location-map-large"><iframe title="Indian Infotech at 429, 425, 403 Gala Empire, Opp. Doordarshan Kendra, Nilmani Society, Thaltej, Ahmedabad, Gujarat 380054" src="https://www.google.com/maps?q=Indian+Infotech,+429,+425,+403+Gala+Empire,+Opp.+Doordarshan+Kendra,+Nilmani+Society,+Thaltej,+Ahmedabad,+Gujarat+380054&z=17&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
      </section>

      <section className="contact-card-section"><EnquiryBrief initialContext={context} /></section>

      <section className="section seo-faq" aria-labelledby="buyer-faq-title">
        <div className="section-heading"><p className="section-kicker">Buyer FAQ</p><h2 id="buyer-faq-title">Pricing, timing, and integration questions.</h2></div>
        <div>{buyerFaqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
      </section>
      <SiteFooter />
    </main>
  );
}
