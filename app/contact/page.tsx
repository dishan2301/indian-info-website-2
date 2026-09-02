import type { Metadata } from 'next';
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

      <section className="contact-card-section"><EnquiryBrief initialContext={context} /></section>

      <section className="brief-section">
        <div><p className="section-kicker">A useful first message</p><h2>Include these details for a faster response.</h2></div>
        <ol><li><span>01</span>Number and type of sites</li><li><span>02</span>Approximate workforce size</li><li><span>03</span>Entry points and authentication needs</li><li><span>04</span>Attendance, HRMS, visitor, or entrance requirements</li></ol>
      </section>
      <section className="section seo-faq" aria-labelledby="buyer-faq-title">
        <div className="section-heading"><p className="section-kicker">Buyer FAQ</p><h2 id="buyer-faq-title">Pricing, timing, and integration questions.</h2></div>
        <div>{buyerFaqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
      </section>
      <SiteFooter />
    </main>
  );
}
