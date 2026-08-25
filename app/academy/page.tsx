import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = { title: 'Academy | Indian Infotech', description: 'Customer, implementation, and partner learning paths for Indian Infotech systems.', alternates: { canonical: '/academy' } };
const paths = ['Easytime administrator', 'HRMS and payroll administrator', 'Device installation technician', 'Implementation partner', 'API integration professional'];
export default function AcademyPage() { return <main><SiteHeader /><PageHero eyebrow="Academy" title="A learning structure for the people who run the system." description="Learning paths below define the intended training structure. Course content, examinations, certificates, and verification will be published after owners and approved material are available." marker="II / ACADEMY" /><section className="section"><div className="section-heading split-heading"><div><p className="section-kicker">Learning paths</p><h2>Train by role and responsibility.</h2></div><p>Each path should combine setup, daily operations, troubleshooting, escalation, and evidence of completion.</p></div><div className="route-link-list">{paths.map((path) => <div key={path}>{path}<span>Course status: planned</span></div>)}</div></section><section className="decision-band"><div><p className="section-kicker light">Customer training request</p><h2>Need onboarding for an active deployment?</h2></div><Link className="button button-primary" href="/contact?topic=training">Discuss training <span aria-hidden="true">↗</span></Link></section><SiteFooter /></main>; }
