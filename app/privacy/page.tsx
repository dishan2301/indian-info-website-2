import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = createPageMetadata({ title: 'Privacy Policy', description: 'Indian Infotech website privacy policy and information-handling commitments.', path: '/privacy' });

export default function PrivacyPage() {
  return <main><SiteHeader /><PageHero eyebrow="Legal" title="Privacy policy" description="How Indian Infotech handles information shared through its website and service conversations." marker="II / PRIVACY" /><section className="legal-copy"><h2>Our privacy commitment</h2><p>At Indian Infotech, we are committed to protecting your privacy. We collect basic personal information when you interact with our services, such as contact details and business data, to provide and improve our solutions.</p><p>We do not share your information with third parties, except as necessary to deliver our services or comply with legal obligations.</p><p>For any questions regarding your data, please contact us at <a href="mailto:info@indianinfotech.org">info@indianinfotech.org</a>. We may update this policy from time to time, so please check for changes regularly.</p></section><SiteFooter /></main>;
}
