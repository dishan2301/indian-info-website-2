import type { Metadata } from 'next';
import Link from 'next/link';
import { companyProfile } from '@/lib/company-profile';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../../_components/page-hero';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';

export const metadata: Metadata = createPageMetadata({ title: 'Report a Security Vulnerability', description: 'How to report a suspected Indian Infotech website, product, or service vulnerability responsibly.', path: '/trust/responsible-disclosure' });

const reportItems = ['Affected website, product, service, model, and version if known', 'Clear description of the suspected issue and its potential impact', 'Reproduction steps, URLs, request details, screenshots, or logs with secrets removed', 'Your preferred contact details and whether public disclosure is planned'] as const;

export default function ResponsibleDisclosurePage() {
  const subject = encodeURIComponent('Responsible security disclosure');
  return <main><SiteHeader /><PageHero eyebrow="Trust center · Reporting" title="Report a suspected security vulnerability." description="Send enough evidence for the support team to identify the affected surface and route the report. This page publishes a reporting path; it does not promise a response or remediation deadline." marker="II / DISCLOSURE" breadcrumbs={[{ label: 'Trust center', href: '/trust' }, { label: 'Vulnerability reporting' }]} path="/trust/responsible-disclosure" />
    <section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">What to include</p><h2>Make the report specific and safe to handle.</h2></div><p>Do not include passwords, private keys, personal data, production database contents, or other unnecessary confidential material.</p></div><ol className="trust-report-list">{reportItems.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ol><div className="hero-actions"><a className="button button-primary" href={`mailto:${companyProfile.supportEmail}?subject=${subject}`}>Email security report <span aria-hidden="true">↗</span></a><Link className="button outline-button" href="/support">Open support guidance</Link></div></section>
    <section className="evidence-note"><span>Safety</span><div><h2>Avoid disruption while validating an issue.</h2><p>Do not access data that is not yours, degrade availability, impersonate users, use social engineering, introduce malware, or continue testing after demonstrating the suspected issue. Preserve evidence and report it privately.</p></div></section><SiteFooter /></main>;
}
