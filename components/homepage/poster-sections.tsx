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

export function CompanyStrength() { return <section className="company-strength" aria-labelledby="strength-heading"><div><p>Engineered for scale</p><h2 id="strength-heading">Experience you can place in context.</h2></div><div className="company-strength-stats">{companyFacts.map((fact) => <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}</div></section>; }

export function ClientGrid() { return <section className="client-logo-section" aria-labelledby="clients-heading"><div className="poster-section-intro"><p>Customer roster</p><h2 id="clients-heading">Trusted across industries.</h2><span>Organizations displayed on Indian Infotech’s published customer roster.</span></div><div className="client-logo-grid">{customerOrganizations.map((customer) => <div key={customer.name}><Image src={customer.logo} alt={customer.name} width={131} height={60} /></div>)}</div><Link className="poster-link" href="/case-studies">Explore customer proof <span aria-hidden="true">↗</span></Link></section>; }

const editorial = [
  { category: 'Cloud attendance · Blog', title: 'Why your company needs EasyTime cloud attendance management.', href: '/insights/easytime-cloud-attendance-benefits', image: '/campaign/hero/workforce-desktop-v2.webp' },
  { category: 'Production technology · Blog', title: 'How AI technology is changing production lines.', href: '/insights/ai-in-production-lines', image: '/campaign/industries/manufacturing-desktop-v2.webp' },
  { category: 'News & insights', title: 'Explore company updates and practical workplace technology guidance.', href: '/insights', image: '/campaign/hero/innovation-desktop-v2.webp' },
] as const;

export function EditorialSection() { return <section className="editorial-section" aria-labelledby="editorial-heading"><div className="poster-section-intro"><p>News & insights</p><h2 id="editorial-heading">Ideas for connected workplaces.</h2></div><div className="editorial-grid">{editorial.map((story, index) => <Link className={index === 0 ? 'editorial-featured' : ''} href={story.href} key={story.title}><div><Image src={story.image} alt={`Illustration for ${story.title}`} fill sizes={index === 0 ? '(max-width: 760px) 100vw, 60vw' : '(max-width: 760px) 100vw, 40vw'} /></div><span>{story.category}</span><h3>{story.title}</h3><b>Read more ↗</b></Link>)}</div></section>; }

export function FinalPosterCTA() { return <section className="final-poster-cta"><p>Start with the requirement</p><h2>Let’s build a safer, clearer workplace.</h2><span>Bring your sites, people, entry points, and operating needs to a practical solution conversation.</span><Link href="/contact">Talk to our team <b aria-hidden="true">↗</b></Link></section>; }
