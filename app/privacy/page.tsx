import type { Metadata } from 'next';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = { title: 'Privacy Policy | Indian Infotech', description: 'Indian Infotech website privacy policy.', alternates: { canonical: '/privacy' } };

export default function PrivacyPage() {
  return <main><SiteHeader /><PageHero eyebrow="Legal" title="Privacy policy" description="This page is reserved for Indian Infotech’s approved privacy policy before production launch." marker="II / PRIVACY" /><section className="legal-copy"><h2>Policy approval pending</h2><p>The current website privacy policy will be reviewed and migrated only after content and legal approval. No replacement terms have been invented.</p><p>For privacy questions, email <a href="mailto:sales@indianinfotech.org">sales@indianinfotech.org</a>.</p></section><SiteFooter /></main>;
}
