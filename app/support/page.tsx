import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { RouteCardGrid } from '../_components/enterprise-route';
import { SupportLibrary } from '../../components/support/support-library';

export const metadata: Metadata = { title: 'Support | Indian Infotech', description: 'Find Indian Infotech product, software, documentation, and support routes.', alternates: { canonical: '/support' } };
const cards = [
  ['Product documentation', 'Datasheets, manuals, installation guidance, and approved product material will be linked here as each file is supplied and reviewed.', 'Products'],
  ['Software support', 'Use the software detail pages for workflow context, compatibility questions, and the right next conversation.', 'Software'],
  ['Knowledge and FAQs', 'A structured knowledge base is planned for recurring setup, usage, and operating questions.', 'Knowledge base'],
  ['Raise a support request', 'Share the product or software, site context, and the issue so the support owner can route it correctly.', 'Support request'],
] as const;
export default function SupportPage() {
  return <main><SiteHeader /><PageHero eyebrow="Support" title="Support starts with the right product, context, and owner." description="Use the routes below to find current material or begin a support conversation. Files, drivers, firmware, warranty terms, and ticket delivery will be published only after their source and owner are confirmed." marker="II / SUPPORT" /><section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Support center</p><h2>Keep the next action clear.</h2></div><p>We are organizing the support experience around product documentation, software workflows, installation context, and a traceable request path.</p></div><RouteCardGrid cards={cards.map(([title, description, eyebrow]) => ({ title, description, href: title === 'Raise a support request' ? '/contact?topic=support' : '/resources', eyebrow }))} /></section><section className="section resources-section"><div className="section-heading split-heading"><div><p className="section-kicker">Search support</p><h2>Find the right route for manuals, firmware, setup, and questions.</h2></div><p>Files are released only after their product, version, owner, and approval status are confirmed.</p></div><SupportLibrary /></section><section className="support-human-section"><div className="support-human-image"><Image src="/company/support-cta.png" alt="Indian Infotech support representative ready to help" width={1568} height={650} /></div><div><p className="section-kicker">Human support</p><h2>Bring the installed context. We’ll help find the next responsible step.</h2><p>The current Indian Infotech site uses this support visual for its service conversation. Product, location, version, and issue details help route a request to the right owner.</p><Link className="button button-primary" href="/contact?topic=support">Contact support <span aria-hidden="true">↗</span></Link></div></section><section className="route-feature-band"><div><p className="section-kicker light">Need help now?</p><h2>Tell us what is installed and what needs attention.</h2><p>Include the product or software name, location, and a short description of the issue.</p></div><Link className="button button-primary" href="/contact?topic=support">Contact support <span aria-hidden="true">↗</span></Link></section><SiteFooter /></main>;
}
