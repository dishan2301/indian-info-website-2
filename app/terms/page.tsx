import type { Metadata } from 'next';
import Link from 'next/link';
import { companyProfile } from '@/lib/company-profile';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = createPageMetadata({ title: 'Website Terms & Conditions', description: 'Terms for accessing and using the Indian Infotech website, its published information and enquiry tools.', path: '/terms' });

const sections = [
  ['scope', 'Scope and acceptance'], ['content', 'Website information'], ['use', 'Permitted use'], ['ownership', 'Content and intellectual property'],
  ['enquiries', 'Enquiries and customer agreements'], ['third-party', 'Third-party services'], ['availability', 'Availability and liability'], ['law', 'Governing law and contact'],
];

export default function TermsPage() {
  return <main><SiteHeader /><PageHero eyebrow="Legal · Website terms" title="Terms and conditions" description="The terms for using Indian Infotech’s public website and enquiry tools." marker="II / TERMS" />
    <article className="legal-copy legal-document">
      <p className="legal-policy-meta"><strong>Last updated:</strong> 24 September 2026 <span>·</span> <strong>Applies to:</strong> indianinfotech.org and its public website pages</p>
      <p>Please read these terms together with our <Link href="/privacy">Privacy policy</Link> and <Link href="/cookies">Cookie policy</Link>. If a separate written order, proposal or service agreement governs a product or service you purchase, that agreement controls where it conflicts with these website terms.</p>
      <nav className="legal-toc" aria-label="Terms contents"><strong>In these terms</strong><ul>{sections.map(([id, label], index) => <li key={id}><a href={`#${id}`}>{String(index + 1).padStart(2, '0')} · {label}</a></li>)}</ul></nav>

      <section id="scope" className="legal-section"><h2>1. Scope and acceptance</h2>
        <p>These terms apply when you access or use the public website operated under the name Indian Infotech. By continuing to use the website, you agree to follow these terms and applicable law. If you do not agree, stop using the website.</p>
        <p>The site is intended to provide general company, product, software, support and contact information. It is not a customer account portal or a channel for uploading operational records.</p>
      </section>

      <section id="content" className="legal-section"><h2>2. Website information</h2>
        <p>We work to keep the website useful and accurate, but descriptions, images, specifications, compatibility, availability, integrations and deployment guidance may be incomplete, illustrative or configuration-dependent. They can change without notice. Confirm the exact model, software version, scope, pricing, warranty and delivery terms with Indian Infotech before relying on them for a purchase or deployment.</p>
        <p>Website content is general information, not technical, security, legal, financial or professional advice. Decisions about site security, employee data, safety and system configuration require an assessment of your specific requirements and applicable obligations.</p>
      </section>

      <section id="use" className="legal-section"><h2>3. Permitted use</h2>
        <p>You may use the website for lawful information and business enquiry purposes. You must not misuse it, attempt unauthorized access, interfere with its operation, introduce malicious code, bypass security controls, submit another person’s information without authority, or use automated means to overload or extract site content without permission.</p>
        <p>You are responsible for keeping any information you submit accurate and for having the right to share it. Do not submit passwords, payment details, biometric records, employee files or confidential material through a general enquiry form.</p>
      </section>

      <section id="ownership" className="legal-section"><h2>4. Content and intellectual property</h2>
        <p>Unless a page identifies another owner, the website’s text, design, graphics, photographs, software and Indian Infotech branding are owned by or licensed to Indian Infotech and are protected by applicable intellectual-property laws. Third-party names, marks and customer logos remain the property of their respective owners.</p>
        <p>You may view and share links to public pages for ordinary business reference. Do not reproduce, modify, republish, sell or distribute substantial website content or branding without the relevant owner’s permission. Nothing in these terms transfers ownership to you.</p>
      </section>

      <section id="enquiries" className="legal-section"><h2>5. Enquiries and customer agreements</h2>
        <p>Sending an enquiry does not create a customer, supplier, agency, partnership or employment relationship, and does not guarantee a response, quote, product availability or service commitment. Any commercial commitment must be set out in an accepted written proposal, order or agreement.</p>
        <p>Products and services may have additional terms, configuration requirements, data-processing terms, warranties and support conditions. Those will be supplied separately where applicable. See our <Link href="/privacy">Privacy policy</Link> for how website enquiries are handled.</p>
      </section>

      <section id="third-party" className="legal-section"><h2>6. Third-party services and links</h2>
        <p>The website may link to or embed services operated by others, including Google Maps and FormSubmit. Those services have their own terms, privacy practices, availability and content. Indian Infotech does not control third-party sites or services; review their terms before using them. A link or embed does not imply endorsement beyond its stated purpose.</p>
      </section>

      <section id="availability" className="legal-section"><h2>7. Availability and liability</h2>
        <p>We may update, suspend or remove website pages or features to maintain, improve or protect the site. We aim for reliable access but do not guarantee that the website will always be available, uninterrupted, error-free or compatible with every device and browser.</p>
        <p>To the extent permitted by applicable law, Indian Infotech is not liable for indirect or consequential loss arising from your use of, or inability to use, this public website or your reliance on general website information. Nothing in these terms excludes or limits a liability or right that cannot lawfully be excluded or limited.</p>
      </section>

      <section id="law" className="legal-section"><h2>8. Governing law and contact</h2>
        <p>These website terms are governed by the laws of India. Courts in Ahmedabad, Gujarat will have jurisdiction, subject to any mandatory jurisdiction or consumer rights that apply by law.</p>
        <address className="legal-contact"><strong>Indian Infotech</strong><br /><a href={`mailto:${companyProfile.supportEmail}`}>{companyProfile.supportEmail}</a><br />{companyProfile.address.street}, {companyProfile.address.locality}, {companyProfile.address.region} {companyProfile.address.postalCode}, {companyProfile.address.country}</address>
        <p>Questions about these terms? Use the <Link href="/contact?topic=terms">contact form</Link>. Related pages: <Link href="/privacy">Privacy policy</Link> · <Link href="/cookies">Cookie policy</Link>.</p>
      </section>
    </article><SiteFooter /></main>;
}
