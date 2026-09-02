import type { Metadata } from 'next';
import Link from 'next/link';
import { companyProfile } from '@/lib/company-profile';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = createPageMetadata({ title: 'Cookie Policy', description: 'How the Indian Infotech website uses essential storage and optional measurement technologies.', path: '/cookies' });

export default function CookiePolicyPage() {
  return <main>
    <SiteHeader />
    <PageHero eyebrow="Legal" title="Cookie policy" description="A clear explanation of browser storage and optional website measurement on Indian Infotech’s website." marker="II / COOKIES" />
    <section className="legal-copy">
      <h2>Current website use</h2>
      <p>The public website does not require advertising cookies to browse its product, software, solution, or company information. Essential browser features may store short-lived technical information needed for security, navigation, or form behavior.</p>
      <h2>Optional analytics</h2>
      <p>Performance-friendly analytics may be enabled only after an approved measurement identifier and the appropriate consent process are configured. When enabled, analytics helps Indian Infotech understand page use and actions such as demo, phone, email, WhatsApp, and enquiry clicks.</p>
      <h2>Your choices</h2>
      <p>You can control cookies through your browser. Blocking essential browser storage may affect some interactive features. For questions, contact <a href={`mailto:${companyProfile.email}`}>{companyProfile.email}</a>.</p>
      <p><Link href="/privacy">Read the privacy policy →</Link></p>
    </section>
    <SiteFooter />
  </main>;
}
