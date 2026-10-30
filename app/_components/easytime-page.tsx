import { readFileSync } from 'node:fs';
import Script from 'next/script';
import { EasytimeScript, EasytimeContactScript } from './easytime-script';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';
import { EasytimeStyles, scopeEasytimeCss } from './easytime-styles';
import { EasytimeSpacing } from './easytime-spacing';
import { EasytimeCursorTour } from './easytime-cursor-tour';

const easyTimeStyles = [
  'styles.css', 'partner-logos.css', 'company-marks.css', 'pricing-experience.css',
  'logo-rail-polish.css', 'testimonial-readability.css', 'partner-motion.css',
  'testimonial-columns.css', 'real-dashboard-preview.css', 'brand-logo.css',
  'phone-tour.css', 'landing-content.css', 'how-steps.css', 'benefit-outcomes.css',
  'client-logo-hover.css', 'billing-celebration.css', 'pricing-redesign.css',
  'billing-celebration-boost.css', 'comparison-redesign.css', 'hero-word-cycle.css',
  'contact-form.css', 'contact-orbit.css', 'saas-showcase.css', 'saas-fix.css',
  'easytime-workspace.css', 'faq-readability.css', 'section-atmosphere.css',
  'responsive-fixes.css',
];

const pageFiles: Record<string, string> = {
  index: 'index.html',
  blog: 'blog.html',
  'blog-ai-growth-insights': 'blog-ai-growth-insights.html',
  'blog-actionable-insights': 'blog-actionable-insights.html',
  'blog-clarity': 'blog-clarity.html',
  newsletter: 'newsletter.html',
  'software-tour': 'software-tour.html',
};

export function EasytimePage({ slug }: { slug: string }) {
  const file = pageFiles[slug];
  if (!file) return null;
  const html = readFileSync(`${process.cwd()}/public/easytime/${file}`, 'utf8');
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? '';
  const content = body
    .replace(/<div class="loading-screen"[\s\S]*?<\/div>\s*<header[\s\S]*?<\/header>/i, '')
    .replace(/<header[\s\S]*?<\/header>/i, '')
    .replace(/<footer[\s\S]*?<\/footer>/i, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<link[^>]*rel="stylesheet"[^>]*>/gi, '')
    .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (_, css: string) => `<style>${scopeEasytimeCss(css)}</style>`);

  return <>
    <base href="/easytime/" />
    <SiteHeader />
    <EasytimeStyles files={easyTimeStyles} />
    <div className="easytime-page" dangerouslySetInnerHTML={{ __html: content }} />
    <EasytimeSpacing />
    <EasytimeCursorTour />
    <EasytimeContactScript />
    <EasytimeScript />
    <Script src="/easytime/phone-tour.js" strategy="afterInteractive" />
    <Script src="/easytime/hero-word-cycle.js" strategy="afterInteractive" />
    <SiteFooter />
  </>;
}

