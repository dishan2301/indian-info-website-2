import type { Metadata } from 'next';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = createPageMetadata({ title: 'Cookie Policy', description: 'See how Indian Infotech’s website, embedded Google Maps and any configured analytics services use cookies and similar technologies.', path: '/cookies' });

const sections = [
  ['scope', 'Scope and key terms'],
  ['categories', 'Technology categories'],
  ['data', 'Information that may be collected'],
  ['purposes', 'Why we use this information'],
  ['consent', 'Consent and preference storage'],
  ['providers', 'Third-party services'],
  ['retention', 'Retention and deletion'],
  ['choices', 'Your controls'],
  ['transfers', 'Security and international processing'],
  ['children', 'Children'],
  ['updates', 'Changes and contact'],
];

export default function CookiePolicyPage() {
  return <main><SiteHeader /><PageHero eyebrow="Legal · Cookies" title="Cookie policy" description="What cookies and similar browser technologies may be used when you visit Indian Infotech’s website." marker="II / COOKIES" />
    <article className="legal-copy legal-document">
      <p className="legal-policy-meta"><strong>Last updated:</strong> 3 November 2026 <span>·</span> <strong>Applies to:</strong> indianinfotech.org and its public website pages</p>
      <p>This policy explains how Indian Infotech uses cookies and similar browser technologies on its public website. It describes the technology available in the current website code, the information that may be processed, why it may be processed, the providers that may receive it, and the choices available to visitors. It should be read with our <Link href="/privacy">Privacy policy</Link>.</p>
      <p>Cookies are small text files stored by a website or service in your browser. Similar technologies include local storage, pixels, tags, scripts, device identifiers and server request logs. Some are needed to deliver and protect a website. Others support measurement or third-party features. The exact cookies created by an external provider may change as that provider updates its service.</p>
      <nav className="legal-toc" aria-label="Cookie policy contents"><strong>In this policy</strong><ul>{sections.map(([id, label], index) => <li key={id}><a href={`#${id}`}>{String(index + 1).padStart(2, '0')} · {label}</a></li>)}</ul></nav>

      <section id="scope" className="legal-section"><h2>1. Scope and key terms</h2>
        <p>This policy applies when you browse Indian Infotech’s public website. It does not describe cookies used inside a customer product, employee system, attendance device, access-control installation or another service operated under a separate agreement. Those environments may have different administrators, purposes and notices.</p>
        <p>In this policy, “we”, “us” and “our” mean Indian Infotech. “You” means a visitor to the public website. “Optional measurement” means analytics or advertising technology that is not required simply to display the core website. “Provider” means another organization whose service or content is used by the website.</p>
        <p>The public website does not provide a visitor account or sign-in area and therefore does not set an account authentication cookie for ordinary visitors. Hosting, networking and security services may still process request information necessary to connect your browser, return website files, detect misuse and maintain service reliability.</p>
      </section>

      <section id="categories" className="legal-section"><h2>2. Categories of cookies and similar technologies</h2>
        <h3>Essential website operations</h3>
        <p>Technical infrastructure may use short-lived identifiers, request logs or security signals to route traffic, prevent abuse, investigate errors and deliver the pages you request. These operations can occur even when optional analytics is not enabled because a website cannot respond without receiving basic network and browser information.</p>
        <h3>Consent preference storage</h3>
        <p>When you accept the cookie notice, the website stores the value <code>accepted</code> under the local-storage key <code>indian-infotech-cookie-consent</code>. This record allows the website to remember the selection on later pages and visits in the same browser. It is stored locally in your browser rather than being sent to Indian Infotech as a form submission.</p>
        <h3>Analytics and performance measurement</h3>
        <p>Google Analytics or Google Tag Manager may be enabled by the website operator. When configured and accepted, these tools can measure visits, page use, engagement and selected interactions. Google Tag Manager is a delivery system for configured tags; the information processed depends on the tags placed in that container.</p>
        <h3>Advertising measurement</h3>
        <p>Meta Pixel may be enabled to record page visits and help understand the effectiveness of communications or campaigns. Meta may connect information received through the pixel with information it already holds, subject to its own terms, settings and privacy policy.</p>
        <h3>Embedded and submitted third-party content</h3>
        <p>Google Maps content may make a request to Google when an embedded map loads. FormSubmit receives the details entered into a contact form when that form is submitted. These services may use their own cookies or similar technology under their policies.</p>
      </section>

      <section id="data" className="legal-section"><h2>3. Information that may be collected</h2>
        <p>Depending on the services configured, the page visited and your browser settings, website technology may process information such as the requested URL, referring page, approximate date and time, browser type, operating system, device category, screen characteristics, language, approximate location inferred from an IP address, and technical identifiers assigned by a provider.</p>
        <p>Measurement events may include page views, the approximate duration of a visit or engagement, navigation between pages, contact-link selections, telephone, email or WhatsApp link selections, contact-page visits and form-submission events. A measurement event indicates that an interaction occurred; it does not necessarily include the words typed into a form.</p>
        <p>When you voluntarily submit a contact form, FormSubmit processes the fields you provide so the message can be delivered. Contact-form content is described more fully in our Privacy policy and is different from ordinary cookie measurement. Do not submit passwords, payment-card information, biometric templates, production employee records or other sensitive material through the public enquiry form.</p>
        <p>We do not use the public website’s optional analytics code to enroll biometric data, recognize faces, read fingerprints or access information stored in a customer’s attendance or access-control system.</p>
      </section>

      <section id="purposes" className="legal-section"><h2>4. Why we use this information</h2>
        <p>Essential technical information is used to provide requested pages, maintain availability, diagnose errors, protect the website and investigate suspected misuse. Consent preference storage is used to remember your selection and avoid asking for the same choice on every page.</p>
        <p>If optional measurement is enabled, aggregated and event-level information may help us understand which pages are useful, how visitors reach the website, where navigation is unclear, whether pages work across common device types, and whether contact routes are being used. These observations can guide content, design, performance and service improvements.</p>
        <p>If advertising measurement is enabled, it may help measure whether a campaign led to a website visit or enquiry. We do not promise that every deployment uses every integration named in this policy. A service is active only when its valid identifier is configured and, for optional scripts controlled by the consent notice, after acceptance.</p>
      </section>

      <section id="consent" className="legal-section"><h2>5. Consent and preference storage</h2>
        <p>The cookie notice appears when the browser does not contain a stored acceptance record. Optional Google Analytics, Google Tag Manager and Meta Pixel scripts controlled by the website are not loaded through this integration until you select “Accept”. If you continue browsing without accepting, those optional scripts remain disabled, although essential infrastructure and independently loaded third-party content may still operate.</p>
        <p>Your selection applies to the browser and browser profile in which it was made. A different device, browser, private-browsing session or cleared storage may not contain the same preference and may show the notice again. Browser extensions, enterprise policies or privacy tools may also prevent the preference from being stored.</p>
        <p>You can withdraw the stored acceptance by clearing this website’s local storage or site data in your browser. After the stored value is removed, reload the website. Removing the local preference does not automatically erase information that a provider received before withdrawal; provider retention and deletion rules apply to previously collected information.</p>
      </section>

      <section id="providers" className="legal-section"><h2>6. Third-party services</h2>
        <div className="legal-table-wrap" tabIndex={0} role="region" aria-label="Cookie services table"><table className="legal-table"><thead><tr><th scope="col">Service</th><th scope="col">When it is used</th><th scope="col">More information</th></tr></thead><tbody>
          <tr><th scope="row">Google Maps</th><td>When the embedded map on the contact page or in the site footer is loaded. Google may process browser and request information and use its own cookies or storage.</td><td><a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a> · <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer">Google cookies</a></td></tr>
          <tr><th scope="row">Google Analytics / Tag Manager</th><td>Only after acceptance and if a valid service identifier is configured. Measurement may use a first-party identifier and send website and interaction events to Google.</td><td><a href="https://support.google.com/analytics/answer/11593727" target="_blank" rel="noreferrer">Google Analytics data collection</a></td></tr>
          <tr><th scope="row">Meta Pixel</th><td>Only after acceptance and if a valid Meta Pixel identifier is configured. It may send page-view and related browser information to Meta.</td><td><a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noreferrer">Meta Privacy Policy</a></td></tr>
          <tr><th scope="row">FormSubmit</th><td>When you submit the contact form. It receives form information to deliver the message and may use its own technical cookies.</td><td><a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noreferrer">FormSubmit privacy terms</a></td></tr>
        </tbody></table></div>
        <p>These services are operated by third parties. Their cookies, retention periods and controls are governed by their current policies and your account or browser settings, not by Indian Infotech.</p>
        <p>A provider may process information as an independent controller or under its service terms. It may combine website events with other information when permitted by its policies and your settings. Indian Infotech does not control the design of a provider’s browser controls, account settings or external privacy pages.</p>
      </section>

      <section id="retention" className="legal-section"><h2>7. Retention and deletion</h2>
        <p>The local acceptance record has no fixed expiry in the website code. It remains in that browser until it is cleared by you, removed by the browser, or changed by a later version of the website. Private-browsing sessions commonly remove local storage when the session closes.</p>
        <p>Hosting and security logs may be retained for operational, diagnostic and security periods set by the relevant infrastructure provider. Optional analytics and advertising information is retained according to the settings selected for the relevant service and the provider’s current retention rules. Those periods can differ by event type and may change when service settings are updated.</p>
        <p>Aggregated reports may no longer identify a particular browser event and may be kept to compare website performance over time. Contact-form messages follow the enquiry retention practices described in the Privacy policy rather than the local consent-preference rule.</p>
      </section>

      <section id="choices" className="legal-section"><h2>8. Your controls</h2>
        <p>You can review, block or delete cookies through your browser settings. Browser controls are usually available in the privacy, security or site-settings menu. Blocking all cookies or embedded content can affect third-party features such as the map. Clearing a cookie does not itself prevent a script from setting a new one if that service is enabled.</p>
        <p>For Google Analytics, Google also offers a <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">browser opt-out add-on</a>. You can manage Meta activity through <a href="https://www.facebook.com/privacy/center/" target="_blank" rel="noreferrer">Meta Privacy Center</a>. These controls are provided by those services and may not disable other forms of measurement.</p>
        <p>You may also use browser tracking protection, content blocking or network-level controls. These tools are provided by third parties and may affect site appearance or functionality. A “Do Not Track” browser signal does not have one universally implemented technical meaning; the consent status described above controls the optional scripts integrated directly into this website.</p>
        <p>Depending on applicable law and the nature of the information, you may ask about personal information associated with an enquiry, request correction or deletion, withdraw consent where consent is the basis for processing, or raise a privacy concern. For request instructions, read our <Link href="/privacy">Privacy policy</Link>.</p>
      </section>

      <section id="transfers" className="legal-section"><h2>9. Security and international processing</h2>
        <p>We use reasonable technical and organizational measures intended to protect the public website and information processed through it. These measures may include HTTPS transport, input validation, deployment controls and provider security features. No browser storage, internet transmission or third-party service can be guaranteed completely secure.</p>
        <p>Google, Meta, FormSubmit, hosting providers or their subcontractors may process information on infrastructure located outside your state or country. Where cross-border processing occurs, it is governed by applicable law and the relevant provider’s terms and safeguards. Provider privacy links in this policy offer more information about their practices.</p>
        <p>If you believe the website or a cookie-related service has exposed information improperly, contact us promptly and include enough non-sensitive detail to help investigate. Do not send passwords, identity documents or confidential customer-system records in an initial report.</p>
      </section>

      <section id="children" className="legal-section"><h2>10. Children</h2>
        <p>This is a business website intended for organizations and adults acting in a professional capacity. It is not designed to profile children or invite children to submit personal information. If you believe a child has provided information through the public website, contact us so the situation can be reviewed.</p>
      </section>

      <section id="updates" className="legal-section"><h2>11. Changes and contact</h2>
        <p>We may update this policy when website features, providers, measurement practices, legal requirements or browser technology change. The “Last updated” date at the beginning identifies the current version. A material change to optional measurement may cause the consent notice to be presented again or require a new choice.</p>
        <p>For questions about this policy, cookie use or a privacy request, use the <Link href="/contact?topic=cookies">contact form</Link>. Please describe the browser, page and service involved where that information is relevant, but do not include passwords or unnecessary sensitive information.</p>
        <p>Related pages: <Link href="/privacy">Privacy policy</Link> · <Link href="/terms">Terms and conditions</Link>.</p>
      </section>
    </article><SiteFooter /></main>;
}
