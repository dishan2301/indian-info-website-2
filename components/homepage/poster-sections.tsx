import Image from 'next/image';
import Link from 'next/link';
import { companyFacts, customerOrganizations } from '@/app/content';

const stories = [
  { type: 'Blog', title: 'Why your company needs EasyTime cloud attendance', href: '/insights/easytime-cloud-attendance-benefits' },
  { type: 'Blog', title: 'How AI technology is changing production lines', href: '/insights/ai-in-production-lines' },
  { type: 'New product', title: 'AI 60 facial-recognition terminal', href: '/products/ai-60' },
  { type: 'Technology', title: 'Identity and edge-intelligence review', href: '/technologies' },
  { type: 'Solution', title: 'Plan physical access around the site', href: '/solutions/physical-access-control' },
  { type: 'Company', title: 'Indian Infotech since 2011', href: '/company' },
  { type: 'Customer proof', title: 'Published customer roster', href: '/case-studies' },
] as const;

export function StoryRail() { return <section className="story-rail" aria-label="Latest Indian Infotech stories"><p>Latest</p><div>{stories.map((story) => <Link href={story.href} key={story.title}><span>{story.type}</span><strong>{story.title}</strong><b aria-hidden="true">↗</b></Link>)}</div></section>; }

const corePortfolio = [
  { category: 'Attendance & identity', title: 'EasyTime Online', description: 'Attendance, shifts, leave, policy rules, reporting, and connected biometric capture for multi-location workforces.', features: ['60+ MIS reports', 'Multi-company and multi-location', 'ERP, payroll and SAP integration'], href: '/software/easytime-online' },
  { category: 'People operations', title: 'HRMS & Payroll', description: 'A broad employee platform covering core HR, payroll, self-service, recruitment, performance, and lifecycle workflows.', features: ['20 core HR modules', '400+ report formats', 'Statutory and maker-checker workflows'], href: '/software/hrms-payroll' },
  { category: 'Workplace services', title: 'Easy Canteen', description: 'Paperless biometric canteen operations for cashless serving, entitlements, vendor billing, and usage reporting.', features: ['Prepaid and postpaid', 'Subsidy and meal scheduling', 'Payroll or ERP deductions'], href: '/software/canteen-management' },
  { category: 'Visitor operations', title: 'Easy Visit VMS', description: 'Cloud-based preregistration, approvals, secure check-in, visitor communication, dashboards, and visit records.', features: ['Email, WhatsApp and SMS invites', 'QR code and gate-pass check-in', 'Live notifications and dashboards'], href: '/software/visitor-management' },
  { category: 'Digital signage', title: 'Hexin Mediaa Wave', description: 'Centralized cloud media management for scheduling approved content across screens, locations, and industries.', features: ['Multi-user and multi-display', 'Images, video, PDF and live data', 'Remote scheduling and monitoring'], href: '/software/hexin-mediaa-wave' },
  { category: 'Secure movement', title: 'Entrance Control', description: 'Flap barriers, tripod gates, full-height turnstiles, and boom barriers for people and vehicle entry points.', features: ['Emergency release options', 'SUS304 construction options', 'Third-party access integration'], href: '/products#entrance-management' },
  { category: 'Clean-room security', title: 'Door Interlock & Access', description: 'Clean-room interlocking and multi-door access control with configurable permissions and occupancy rules.', features: ['2 to 16 interlocked doors', 'Touch and no-touch options', 'RFID, fingerprint and face'], href: '/industries/pharma' },
  { category: 'Computer vision', title: 'Industrial AI Solutions', description: 'Visual inspection, safety monitoring, retail analytics, and predictive insight built around operational use cases.', features: ['Quality inspection', 'PPE, fire and smoke monitoring', 'Predictive maintenance'], href: '/technologies' },
] as const;

export function CorePortfolio() { return <section className="core-portfolio" aria-labelledby="core-portfolio-heading"><div className="core-portfolio-intro"><div><p>Best-selling systems · brochure collection</p><h2 id="core-portfolio-heading">The solutions customers ask us about most.</h2></div><span>Eight core offerings from Indian Infotech’s company brochure, with useful capabilities visible before you open a product page.</span></div><div className="core-portfolio-grid">{corePortfolio.map((item, index) => <Link href={item.href} key={item.title}><div className="core-portfolio-meta"><span>{String(index + 1).padStart(2, '0')}</span><b>{item.category}</b></div><h3>{item.title}</h3><p>{item.description}</p><ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><strong>Explore system <i aria-hidden="true">↗</i></strong></Link>)}</div></section>; }

export function CompanyStrength() { return <section className="company-strength" aria-labelledby="strength-heading"><div><p>Engineered for scale</p><h2 id="strength-heading">Experience you can place in context.</h2></div><div className="company-strength-stats">{companyFacts.map((fact) => <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}</div></section>; }

export function ClientGrid() { return <section className="client-logo-section" aria-labelledby="clients-heading"><div className="poster-section-intro"><p>Customer roster</p><h2 id="clients-heading">Trusted across industries.</h2><span>Organizations displayed on Indian Infotech’s published customer roster.</span></div><div className="client-logo-grid">{customerOrganizations.map((customer) => <div key={customer.name}><Image src={customer.logo} alt={customer.name} width={131} height={60} /></div>)}</div><Link className="poster-link" href="/case-studies">Explore customer proof <span aria-hidden="true">↗</span></Link></section>; }

const mosaic = [
  { title: 'Workforce attendance', eyebrow: 'Workforce', href: '/solutions/attendance-automation', image: '/campaign/solutions/attendance-desktop-v2.webp', className: 'mosaic-wide' },
  { title: 'Physical access', eyebrow: 'Security', href: '/solutions/physical-access-control', image: '/campaign/solutions/access-desktop-v2.webp', className: '' },
  { title: 'Visitor operations', eyebrow: 'Workplace', href: '/software/visitor-management', image: '/campaign/solutions/visitor-desktop-v2.webp', className: '' },
  { title: 'HRMS & payroll', eyebrow: 'Software', href: '/hrms-payroll', image: '/campaign/hero/security-desktop-v2.webp', className: '' },
  { title: 'Entrance management', eyebrow: 'Infrastructure', href: '/solutions/entrance-management', image: '/campaign/solutions/entrance-desktop-v2.webp', className: 'mosaic-wide' },
] as const;

export function PosterMosaic() { return <section className="poster-mosaic-section" aria-labelledby="mosaic-heading"><div className="poster-section-intro"><p>Connected capabilities</p><h2 id="mosaic-heading">One system starts with a real use case.</h2></div><div className="poster-mosaic">{mosaic.map((item) => <Link className={item.className} href={item.href} key={item.title}><Image src={item.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" /><i /><span>{item.eyebrow}</span><h3>{item.title}</h3><b aria-hidden="true">↗</b></Link>)}</div></section>; }

const editorial = [
  { category: 'Cloud attendance · Blog', title: 'Why your company needs EasyTime cloud attendance management.', href: '/insights/easytime-cloud-attendance-benefits', image: '/campaign/hero/workforce-desktop-v2.webp' },
  { category: 'Production technology · Blog', title: 'How AI technology is changing production lines.', href: '/insights/ai-in-production-lines', image: '/campaign/industries/manufacturing-desktop-v2.webp' },
  { category: 'News & insights', title: 'Explore company updates and practical workplace technology guidance.', href: '/insights', image: '/campaign/hero/innovation-desktop-v2.webp' },
] as const;

export function EditorialSection() { return <section className="editorial-section" aria-labelledby="editorial-heading"><div className="poster-section-intro"><p>News & insights</p><h2 id="editorial-heading">Ideas for connected workplaces.</h2></div><div className="editorial-grid">{editorial.map((story, index) => <Link className={index === 0 ? 'editorial-featured' : ''} href={story.href} key={story.title}><div><Image src={story.image} alt="" fill sizes={index === 0 ? '(max-width: 760px) 100vw, 60vw' : '(max-width: 760px) 100vw, 40vw'} /></div><span>{story.category}</span><h3>{story.title}</h3><b>Read more ↗</b></Link>)}</div></section>; }

export function FinalPosterCTA() { return <section className="final-poster-cta"><p>Start with the requirement</p><h2>Let’s build a safer, clearer workplace.</h2><span>Bring your sites, people, entry points, and operating needs to a practical solution conversation.</span><Link href="/contact">Talk to our team <b aria-hidden="true">↗</b></Link></section>; }
