import type { Metadata } from 'next';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = {
  title: 'Contact Indian Infotech | Ahmedabad',
  description: 'Contact Indian Infotech in Ahmedabad for biometric attendance, access control, entrance management, HRMS, and workplace software.',
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact Indian Infotech | Ahmedabad', description: 'Discuss your workforce and workplace technology requirements.', url: '/contact' },
};

const contactOptions = [
  { label: 'Sales', value: 'sales@indianinfotech.org', href: 'mailto:sales@indianinfotech.org?subject=Workforce%20and%20workplace%20consultation' },
  { label: 'Support', value: 'support@indianinfotech.org', href: 'mailto:support@indianinfotech.org' },
  { label: 'Phone', value: '+91 76000 66770', href: 'tel:+917600066770' },
  { label: 'WhatsApp', value: '+91 77780 66770', href: 'https://wa.me/917778066770' },
] as const;

export default function ContactPage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Indian Infotech',
    url: 'https://indianinfotech.org/contact', telephone: '+91-76000-66770', email: 'sales@indianinfotech.org',
    address: { '@type': 'PostalAddress', streetAddress: '429, 425, 403 Gala Empire, Opp. Doordarshan Kendra, Thaltej', addressLocality: 'Ahmedabad', addressRegion: 'Gujarat', postalCode: '380054', addressCountry: 'IN' },
    areaServed: ['Ahmedabad', 'Gujarat', 'India'],
  };

  return (
    <main>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <PageHero eyebrow="Contact" title="Bring us the operating problem—not just a product name." description="Share your site, workforce, entry-point, attendance, or HRMS requirements. We’ll help shape a clearer starting scope." marker="II / AHMEDABAD" />

      <section className="contact-section">
        <div className="contact-options">
          {contactOptions.map((option) => <a href={option.href} key={option.label}><span>{option.label}</span><strong>{option.value}</strong><b aria-hidden="true">↗</b></a>)}
        </div>
        <div className="contact-office">
          <p className="section-kicker light">Head office</p><h2>Ahmedabad, Gujarat</h2>
          <address>429, 425, 403 Gala Empire<br />Opp. Doordarshan Kendra, Thaltej<br />Ahmedabad 380054<br />Gujarat, India</address>
          <a className="button button-primary" href="https://maps.app.goo.gl/77cgnPHz1p1tyUyb6">Open in Google Maps <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="brief-section">
        <div><p className="section-kicker">A useful first message</p><h2>Include these details for a faster response.</h2></div>
        <ol><li><span>01</span>Number and type of sites</li><li><span>02</span>Approximate workforce size</li><li><span>03</span>Entry points and authentication needs</li><li><span>04</span>Attendance, HRMS, visitor, or entrance requirements</li></ol>
      </section>
      <SiteFooter />
    </main>
  );
}
