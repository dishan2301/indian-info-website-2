import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import { companyProfile } from '@/lib/company-profile';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = createPageMetadata({ title: 'Privacy Policy', description: 'Indian Infotech website privacy policy and information-handling commitments.', path: '/privacy' });

export default function PrivacyPage() {
  return <main><SiteHeader /><PageHero eyebrow="Legal" title="Privacy policy" description="How Indian Infotech handles information shared through its website and service conversations." marker="II / PRIVACY" /><section className="legal-copy"><h2>Our privacy commitment</h2><p>At Indian Infotech, we are committed to protecting your privacy. We collect basic personal information when you interact with our services, such as contact details and business data, to provide and improve our solutions.</p><h2>Website enquiries</h2><p>The contact form collects your name, email, phone number, optional organization, message, and relevant page context. It sends that information to Indian Infotech through FormSubmit, a third-party form-delivery service. Do not include passwords, access tokens, biometric records, production personal data, or other sensitive information in the form.</p><p>We do not share your information with third parties, except as necessary to deliver our services or comply with legal obligations.</p><p>For questions about your website enquiry or personal information, contact <a href={`mailto:${companyProfile.email}`}>{companyProfile.email}</a>. We may update this policy from time to time, so please check for changes regularly.</p></section><SiteFooter /></main>;
}
