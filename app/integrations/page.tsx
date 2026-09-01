import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import Link from 'next/link';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { RouteCardGrid } from '../_components/enterprise-route';

export const metadata: Metadata = createPageMetadata({ title: 'Workforce System Integrations', description: 'Plan device, attendance software, HRMS, payroll, ERP, and enterprise integration requirements.', path: '/integrations' });
const cards = [
  ['Attendance to workforce workflows', 'Map the journey from a device event to review, approval, reporting, and downstream workforce processes.', 'Attendance data flow'],
  ['HRMS and payroll readiness', 'Clarify the records, ownership, policy rules, and compatibility questions that sit between attendance and payroll.', 'HRMS / payroll'],
  ['Access and entrance systems', 'Review terminals, controllers, barriers, turnstiles, screening, and the site-specific logic that connects them.', 'Physical security'],
  ['APIs and custom connections', 'Document endpoints, prerequisites, data ownership, and support boundaries only after technical review.', 'API review'],
] as const;
export default function IntegrationsPage() { return <main><SiteHeader /><PageHero eyebrow="Integrations" title="Connect the systems that your people already depend on." description="Integration planning starts with a data flow and a verified compatibility conversation—not a promise that every system connects the same way." marker="II / INTEGRATIONS" /><section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Integration catalogue</p><h2>Make the data flow legible.</h2></div><p>Choose a starting pattern, then share the products, software, policies, and constraints that need technical confirmation.</p></div><RouteCardGrid cards={cards.map(([title, description, eyebrow]) => ({ title, description, href: '/contact?topic=integration', eyebrow }))} /></section><section className="architecture-panel"><div><p className="section-kicker light">Illustrative flow</p><h2>Device → network → attendance → workforce workflow</h2></div><ol><li>Capture an approved event</li><li>Confirm connectivity and synchronization</li><li>Review the operational record</li><li>Route approved information to the next system</li></ol></section><section className="decision-band"><div><p className="section-kicker light">Need technical confirmation?</p><h2>Bring your existing system map to the conversation.</h2></div><Link className="button button-primary" href="/contact?topic=integration">Discuss integration <span aria-hidden="true">↗</span></Link></section><SiteFooter /></main>; }
