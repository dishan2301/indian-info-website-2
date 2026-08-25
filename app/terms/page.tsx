import type { Metadata } from 'next';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = { title: 'Terms & Conditions | Indian Infotech', description: 'Indian Infotech website terms and conditions.', alternates: { canonical: '/terms' } };

export default function TermsPage() {
  return <main><SiteHeader /><PageHero eyebrow="Legal" title="Terms and conditions" description="This page is reserved for Indian Infotech’s approved website terms before production launch." marker="II / TERMS" /><section className="legal-copy"><h2>Terms approval pending</h2><p>The current website terms will be reviewed and migrated only after content and legal approval. No replacement legal language has been invented.</p><p>For questions, email <a href="mailto:sales@indianinfotech.org">sales@indianinfotech.org</a>.</p></section><SiteFooter /></main>;
}
