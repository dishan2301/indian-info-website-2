import type { Metadata } from 'next';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = createPageMetadata({ title: 'Cookie Policy', description: 'See how Indian Infotech’s website, embedded Google Maps and any configured analytics services use cookies and similar technologies.', path: '/cookies' });

const sections = [['use', 'How this site uses them'], ['providers', 'Third-party services'], ['choices', 'Your controls'], ['updates', 'Changes and contact']];

export default function CookiePolicyPage() {
  return <main><SiteHeader /><PageHero eyebrow="Legal · Cookies" title="Cookie policy" description="What cookies and similar browser technologies may be used when you visit Indian Infotech’s website." marker="II / COOKIES" />
    <article className="legal-copy legal-document">
      <p className="legal-policy-meta"><strong>Last updated:</strong> 24 September 2026 <span>·</span> <strong>Applies to:</strong> indianinfotech.org and its public website pages</p>
      <p>Cookies are small files stored by a website in your browser. Similar technologies include local storage, pixels and scripts that can read or write browser identifiers. This page describes what the current website code supports; third-party services may change their own technologies and policies.</p>
      <nav className="legal-toc" aria-label="Cookie policy contents"><strong>In this policy</strong><ul>{sections.map(([id, label], index) => <li key={id}><a href={`#${id}`}>{String(index + 1).padStart(2, '0')} · {label}</a></li>)}</ul></nav>

      <section id="use" className="legal-section"><h2>1. How this site uses cookies and similar technologies</h2>
        <p>The public website does not use an account or sign-in cookie for visitors. The site’s source does not define a first-party cookie preference center. Hosting and security infrastructure may use technical identifiers or request logs needed to deliver and protect the site.</p>
        <p>The contact page and site footer contain embedded Google Maps. When either map enters the page and your browser loads it, Google may receive technical information and use cookies or similar storage under Google’s own settings. You can prevent the map request by blocking third-party content in your browser.</p>
        <p>Google Analytics, Google Tag Manager and Meta Pixel are optional integrations in the site code. Their scripts are loaded only when a valid identifier for the relevant service is configured for a deployment. If enabled, Google Analytics or Tag Manager may receive page views, contact-link clicks and form-submit events; Meta Pixel currently receives page-view events. These services may use cookies or similar identifiers. The site does not currently provide an in-page preference center for these optional integrations; availability can vary by deployment.</p>
      </section>

      <section id="providers" className="legal-section"><h2>2. Third-party services</h2>
        <div className="legal-table-wrap"><table className="legal-table"><thead><tr><th scope="col">Service</th><th scope="col">When it is used</th><th scope="col">More information</th></tr></thead><tbody>
          <tr><th scope="row">Google Maps</th><td>When the embedded map on the contact page or in the site footer is loaded. Google may process browser and request information and use its own cookies or storage.</td><td><a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a> · <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer">Google cookies</a></td></tr>
          <tr><th scope="row">Google Analytics / Tag Manager</th><td>Only if a valid service identifier is configured for the deployment. Measurement may use a first-party identifier and send website events to Google.</td><td><a href="https://support.google.com/analytics/answer/11593727" target="_blank" rel="noreferrer">Google Analytics data collection</a></td></tr>
          <tr><th scope="row">Meta Pixel</th><td>Only if a valid Meta Pixel identifier is configured. It may send page-view and interaction events to Meta.</td><td><a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noreferrer">Meta Privacy Policy</a></td></tr>
          <tr><th scope="row">FormSubmit</th><td>When you submit the contact form. It receives form information to deliver the message and may use its own technical cookies.</td><td><a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noreferrer">FormSubmit privacy terms</a></td></tr>
        </tbody></table></div>
        <p>These services are operated by third parties. Their cookies, retention periods and controls are governed by their current policies and your account or browser settings, not by Indian Infotech.</p>
      </section>

      <section id="choices" className="legal-section"><h2>3. Your controls</h2>
        <p>You can review, block or delete cookies through your browser settings. Browser controls are usually available in the privacy, security or site-settings menu. Blocking all cookies or embedded content can affect third-party features such as the map. Clearing a cookie does not itself prevent a script from setting a new one if that service is enabled.</p>
        <p>For Google Analytics, Google also offers a <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">browser opt-out add-on</a>. You can manage Meta activity through <a href="https://www.facebook.com/privacy/center/" target="_blank" rel="noreferrer">Meta Privacy Center</a>. These controls are provided by those services and may not disable other forms of measurement.</p>
        <p>For details about enquiry information and privacy requests, read our <Link href="/privacy">Privacy policy</Link>.</p>
      </section>

      <section id="updates" className="legal-section"><h2>4. Changes and contact</h2>
        <p>We will update this page if the website’s use of cookies or similar technologies changes. For questions about this policy, use the <Link href="/contact?topic=cookies">contact form</Link>.</p>
        <p>Related pages: <Link href="/privacy">Privacy policy</Link> · <Link href="/terms">Terms and conditions</Link>.</p>
      </section>
    </article><SiteFooter /></main>;
}
