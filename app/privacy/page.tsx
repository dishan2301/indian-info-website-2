import type { Metadata } from 'next';
import Link from 'next/link';
import { companyProfile } from '@/lib/company-profile';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = createPageMetadata({ title: 'Privacy Policy', description: 'Learn what information Indian Infotech receives through this website, why it is used, which service providers handle it, and how to make a privacy request.', path: '/privacy' });

const sections = [
  ['information', 'Information we receive'], ['use', 'How we use information'], ['sharing', 'Who may receive it'],
  ['retention', 'Retention and security'], ['choices', 'Your choices and requests'], ['children', 'Children'], ['changes', 'Changes and contact'],
];

export default function PrivacyPage() {
  return <main><SiteHeader /><PageHero eyebrow="Legal · Privacy" title="Privacy policy" description="A practical account of the information Indian Infotech receives through this website and how it is handled." marker="II / PRIVACY" />
    <article className="legal-copy legal-document">
      <p className="legal-policy-meta"><strong>Last updated:</strong> 24 September 2026 <span>·</span> <strong>Applies to:</strong> indianinfotech.org and its public website pages</p>
      <p>This policy explains the website’s current information practices. It covers website visits and enquiries; a separate written agreement may govern personal data handled when a customer deploys Indian Infotech products or services.</p>
      <nav className="legal-toc" aria-label="Privacy policy contents"><strong>In this policy</strong><ul>{sections.map(([id, label], index) => <li key={id}><a href={`#${id}`}>{String(index + 1).padStart(2, '0')} · {label}</a></li>)}</ul></nav>

      <section id="information" className="legal-section"><h2>1. Information we receive</h2>
        <p><strong>When you contact us.</strong> The website enquiry form asks for your name, email address, telephone number, message and, optionally, your organization. It can also include page or enquiry context. The form does not have a file-upload field. If you choose to contact us by email, telephone or WhatsApp, we receive the information you choose to share through that channel.</p>
        <p><strong>When you browse.</strong> The website’s hosting, delivery and security services may process technical request information such as IP address, browser and device details, requested page, timestamps and security events to deliver, protect and troubleshoot the site. The contact page embeds Google Maps; loading that map connects your browser to Google.</p>
        <p><strong>Information we do not ask for.</strong> Do not send passwords, payment-card details, biometric templates, identity documents, health information, access credentials, production employee records or other sensitive or confidential material through a general enquiry. The public website is not a channel for submitting biometric records or managing customer-system user data.</p>
      </section>

      <section id="use" className="legal-section"><h2>2. How we use information</h2>
        <p>We use enquiry details to understand and respond to your request, contact you about the products or services you asked about, provide follow-up you request, keep a reasonable record of the conversation, protect the website from spam or misuse, and meet legal requirements. We do not use the website enquiry form to enroll you in marketing messages unrelated to your enquiry.</p>
        <p>Optional measurement scripts may be enabled for a deployment using analytics or advertising identifiers. See the <Link href="/cookies">Cookie policy</Link> for the services the code supports and the controls available.</p>
      </section>

      <section id="sharing" className="legal-section"><h2>3. Who may receive information</h2>
        <p>Access is limited to Indian Infotech personnel who need the information to handle the enquiry or operate the website. The contact form sends the details you submit through FormSubmit, a third-party form-delivery service (<a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noreferrer">privacy terms</a>), which relays the enquiry to our team by email. Our email provider then handles the message as part of its service.</p>
        <p>Google receives a request when the embedded map is loaded. Google Analytics, Google Tag Manager or Meta Pixel may receive browsing or interaction events only when a valid identifier for that service is configured for the deployment. These providers process information under their own policies. We may also disclose information to professional advisers, service providers acting on our instructions, or authorities when required by law or necessary to protect rights and safety.</p>
        <p>Service providers may process information on infrastructure outside your state or country. Where a cross-border transfer occurs, it remains subject to applicable law and the provider’s terms.</p>
      </section>

      <section id="retention" className="legal-section"><h2>4. Retention and security</h2>
        <p>We keep enquiry correspondence while it remains useful to respond, continue a requested business discussion, maintain necessary business records or meet a legal obligation. We review information and remove or de-identify it when it is no longer needed for those purposes, subject to backups and retention controls operated by our email and service providers. We do not publish a fixed deletion period for enquiry emails.</p>
        <p>We use technical and organizational safeguards intended to protect information, including secure transport where the site is served over HTTPS, input validation and website security controls. No internet transmission or storage system can be guaranteed completely secure. If you believe information sent through the site has been exposed, contact us promptly.</p>
      </section>

      <section id="choices" className="legal-section"><h2>5. Your choices and privacy requests</h2>
        <p>You can choose whether to submit an enquiry and can leave the optional organization field blank. Depending on applicable law, you may ask us to explain what enquiry information we hold, correct it, erase it, withdraw consent where consent is the basis for processing, or raise a privacy grievance. We may ask for enough information to verify and locate the request, and some records may need to be retained where law permits or requires it.</p>
        <p>To make a request, email <a href={`mailto:${companyProfile.supportEmail}`}>{companyProfile.supportEmail}</a> with “Privacy request” in the subject, or use the <Link href="/contact?topic=privacy">contact form</Link>. Do not include sensitive information in the request unless we explain a secure way to provide it.</p>
        <p>This policy is intended to explain current website practices alongside applicable privacy law, including India’s <a href="https://www.meity.gov.in/static/uploads/2024/02/Digital-Personal-Data-Protection-Act-2023.pdf" target="_blank" rel="noreferrer">Digital Personal Data Protection Act, 2023</a> and the <a href="https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf" target="_blank" rel="noreferrer">Digital Personal Data Protection Rules, 2025</a>, as their provisions come into force.</p>
      </section>

      <section id="children" className="legal-section"><h2>6. Children</h2>
        <p>This business website is intended for organizations and adults acting in a professional capacity. It is not designed to invite children to submit personal information. If you believe a child has sent us information, contact us so we can review the request and take appropriate action.</p>
      </section>

      <section id="changes" className="legal-section"><h2>7. Changes and privacy contact</h2>
        <p>We may revise this policy when the site, its service providers or applicable requirements change. The “Last updated” date at the top shows when the current version was published.</p>
        <address className="legal-contact"><strong>Indian Infotech · Privacy contact</strong><br /><a href={`mailto:${companyProfile.supportEmail}`}>{companyProfile.supportEmail}</a><br />{companyProfile.address.street}, {companyProfile.address.locality}, {companyProfile.address.region} {companyProfile.address.postalCode}, {companyProfile.address.country}</address>
        <p>Related pages: <Link href="/cookies">Cookie policy</Link> · <Link href="/terms">Terms and conditions</Link>.</p>
      </section>
    </article><SiteFooter /></main>;
}
