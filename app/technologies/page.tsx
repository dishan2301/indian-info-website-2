import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { RouteCardGrid } from '../_components/enterprise-route';

export const metadata: Metadata = { title: 'Technologies | Indian Infotech', description: 'Explore the identity, connected-system, workflow, and security capabilities to validate during solution design.', alternates: { canonical: '/technologies' } };
const cards = [
  ['Identity and credentials', 'Face, fingerprint, biometric, RFID, and other authentication methods are selected around the real use case and device configuration.', 'Face recognition'],
  ['Connected devices', 'Attendance and access endpoints can be planned with network, controller, barrier, and site conditions in view.', 'Device communication'],
  ['Workflow and reporting', 'Operational rules, attendance review, visitor records, and reporting responsibilities need clear ownership.', 'Workflow automation'],
  ['Integration readiness', 'APIs, synchronization, and downstream system connections are documented only after technical confirmation.', 'APIs and integrations'],
  ['Security operations', 'Role ownership, access authorization, records, and audit expectations are part of the discovery conversation.', 'Access and audit'],
  ['Cloud or on-site planning', 'Deployment mode, connectivity, data handling, and support responsibilities are confirmed for each project.', 'Deployment design'],
] as const;
export default function TechnologiesPage() { return <main><SiteHeader /><PageHero eyebrow="Technologies" title="Technology choices that stay connected to the operating context." description="A technology label is useful only when it explains what the system does, what it needs, and where it fits. Capabilities below remain evidence-led and configuration-aware." marker="II / TECHNOLOGY" /><section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Capability map</p><h2>Explain the connection, not just the acronym.</h2></div><p>We use product media, architecture diagrams, and technical review to establish what is supported before publication or recommendation.</p></div><RouteCardGrid cards={cards.map(([title, description, eyebrow]) => ({ title, description, href: '/contact?topic=technology', eyebrow }))} /></section><section className="route-feature-band"><div><p className="section-kicker light">Technical review</p><h2>Need to verify a device, API, or deployment pattern?</h2><p>Bring the product family, site conditions, and desired workflow to an engineer conversation.</p></div><Link className="button button-primary" href="/contact?topic=technology">Talk to an engineer <span aria-hidden="true">↗</span></Link></section><SiteFooter /></main>; }
