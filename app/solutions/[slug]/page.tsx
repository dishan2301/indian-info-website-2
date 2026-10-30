import { readFileSync } from 'node:fs';
import type { Metadata } from 'next';
import Script from 'next/script';
import { EasytimeScript } from '../../_components/easytime-script';
import { notFound } from 'next/navigation';
import { solutionProfiles } from '../../content';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';
import { EasytimeStyles, scopeEasytimeCss } from '../../_components/easytime-styles';
import { EasytimeSpacing } from '../../_components/easytime-spacing';
import { DoorInterlockPage } from '../../_components/door-interlock-page';
import { VisitorManagementPage } from '../../_components/visitor-management-page';
import { EasytimeCursorTour } from '../../_components/easytime-cursor-tour';

export function generateStaticParams() { return solutionProfiles.map((item) => ({ slug: item.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === 'door-interlock-system') return { title: 'Door Interlock System | Indian Infotech', description: 'Explore coordinated door release, industry applications, interlock controllers, door hardware and entrance management products.', alternates: { canonical: '/solutions/door-interlock-system' } };
  if (slug === 'visitor-management') return { title: 'Visitor Management | Indian Infotech', description: 'Plan visitor registration, authority approval, visitor passes, controlled entry and return checkout, with industry workflows and device options.', alternates: { canonical: '/solutions/visitor-management' } };
  return slug === 'attendance-automation' ? { title: 'EasyTime Online — Indian Infotech', description: 'Biometric devices record every punch. EasyTime Online connects attendance, requests, approvals, payroll inputs, reports and employee self-service in one workspace.' } : {};
}

const easyTimeStyles = ['styles.css', 'partner-logos.css', 'company-marks.css', 'pricing-experience.css', 'logo-rail-polish.css', 'testimonial-readability.css', 'partner-motion.css', 'testimonial-columns.css', 'real-dashboard-preview.css', 'brand-logo.css', 'phone-tour.css', 'landing-content.css', 'how-steps.css', 'benefit-outcomes.css', 'client-logo-hover.css', 'billing-celebration.css', 'pricing-redesign.css', 'billing-celebration-boost.css', 'comparison-redesign.css', 'hero-word-cycle.css', 'contact-form.css', 'contact-orbit.css', 'saas-showcase.css', 'saas-fix.css', 'easytime-workspace.css', 'faq-readability.css', 'section-atmosphere.css', 'responsive-fixes.css'];

function easyTimeBody() {
  const html = readFileSync(`${process.cwd()}/public/easytime/index.html`, 'utf8');
  return (html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? '')
    .replace(/<div class="loading-screen"[\s\S]*?<\/div>\s*<header class="nav"[\s\S]*?<\/header>/i, '')
    .replace(/<section[^>]*id="pricing"[\s\S]*?<\/section>/i, '')
    .replace(/<footer class="site-footer">[\s\S]*?<\/footer>/i, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<link[^>]*rel="stylesheet"[^>]*>/gi, '')
    .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (_, css: string) => `<style>${scopeEasytimeCss(css)}</style>`);
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === 'door-interlock-system') return <DoorInterlockPage />;
  if (slug === 'visitor-management') return <VisitorManagementPage />;
  if (slug !== 'attendance-automation') notFound();
  return <>
    <base href="/easytime/" />
    <SiteHeader />
    <EasytimeStyles files={easyTimeStyles} />
    <div className="easytime-page" dangerouslySetInnerHTML={{ __html: easyTimeBody() }} />
    <EasytimeSpacing />
    <EasytimeCursorTour />
    <Script src="/easytime/hero-word-cycle.js" strategy="afterInteractive" />
    <Script src="/easytime/contact-form.js" strategy="afterInteractive" />
    <EasytimeScript />
    <Script src="/easytime/phone-tour.js" strategy="afterInteractive" />
    <SiteFooter />
  </>;
}
