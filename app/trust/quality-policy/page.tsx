import type { Metadata } from 'next';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../../_components/page-hero';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';

export const metadata: Metadata = createPageMetadata({ title: 'Quality Policy Publication Status', description: 'Publication and verification status for the Indian Infotech quality policy.', path: '/trust/quality-policy' });

export default function QualityPolicyPage() {
  return <main><SiteHeader /><PageHero eyebrow="Trust center" title="Quality policy publication status." description="A corporate quality policy must be approved by company leadership; it cannot be inferred from a badge or drafted as if already adopted." marker="II / QUALITY POLICY" breadcrumbs={[{ label: 'Trust center', href: '/trust' }, { label: 'Quality policy' }]} path="/trust/quality-policy" /><section className="section"><div className="proof-evidence-queue"><span>STATUS / AWAITING APPROVED SOURCE</span><h2>No approved quality-policy document was supplied.</h2><p>Publication requires the current policy text or PDF, accountable approver, effective date, review date, version, and permission to publish. Until then, this page deliberately makes no policy claim.</p><Link className="button button-primary" href="/contact?topic=quality-policy">Provide or request the approved policy <span aria-hidden="true">↗</span></Link></div></section><SiteFooter /></main>;
}
