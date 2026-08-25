import type { Metadata } from 'next';
import { SiteSearch, type SearchEntry } from '@/components/search/site-search';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { products, softwarePlatforms } from '../content';

export const metadata: Metadata = { title: 'Search | Indian Infotech', description: 'Search Indian Infotech products, software, industries, resources, and company information.', alternates: { canonical: '/search' }, robots: { index: false, follow: true } };

const pageEntries: readonly SearchEntry[] = [
  { title: 'Workforce + Workplace Platform', description: 'How attendance, access, HRMS, visitor, and workplace operations connect.', type: 'Platform', href: '/platform', keywords: 'workforce workplace system architecture' },
  { title: 'Product catalogue', description: 'Access control, attendance, flap barriers, turnstiles, boom barriers, and screening.', type: 'Products', href: '/products', keywords: 'biometric face fingerprint RFID entrance device' },
  { title: 'Product comparison', description: 'Select and compare up to four products.', type: 'Tool', href: '/compare', keywords: 'compare shortlist selection' },
  { title: 'Pharmaceutical & research', description: 'Workforce and workplace systems for controlled pharmaceutical environments.', type: 'Industry', href: '/industries/pharma', keywords: 'pharma controlled clean room visitor attendance' },
  { title: 'Resources', description: 'Product, software, industry, and implementation guidance.', type: 'Resources', href: '/resources', keywords: 'downloads datasheets manuals guides articles' },
  { title: 'Developers', description: 'Integration planning and developer review topics.', type: 'Technical', href: '/developers', keywords: 'API SDK webhook integration employee attendance device' },
  { title: 'Academy', description: 'Role-based learning paths for customers and partners.', type: 'Training', href: '/academy', keywords: 'training certification implementation administrator partner' },
  { title: 'Trust center', description: 'Security, privacy, availability, and compliance review domains.', type: 'Trust', href: '/trust', keywords: 'security privacy compliance encryption audit backup' },
  { title: 'System status', description: 'Service communication and support issue route.', type: 'Support', href: '/status', keywords: 'status uptime incident availability outage' },
  { title: 'About Indian Infotech', description: 'Company background, verified operating facts, and working principles.', type: 'Company', href: '/about', keywords: 'Ahmedabad Gujarat founded 2011 clients countries' },
  { title: 'Contact Indian Infotech', description: 'Sales, support, telephone, WhatsApp, and Ahmedabad office details.', type: 'Contact', href: '/contact', keywords: 'demo quote engineer office email phone' },
] as const;

export default function SearchPage() {
  const entries: SearchEntry[] = [
    ...pageEntries,
    ...products.map((product) => ({ title: product.name, description: product.description, type: 'Product', href: `/products/${product.slug}`, keywords: product.family })),
    ...softwarePlatforms.map((software) => ({ title: software.name, description: software.summary, type: 'Software', href: `/software/${software.slug}`, keywords: `${software.category} ${software.modules.join(' ')}` })),
  ];
  return <main><SiteHeader /><PageHero eyebrow="Global search" title="Find the system, product, or workflow you need." description="Search the current Indian Infotech website across products, software, industries, resources, and company information." marker="II / SEARCH" /><section className="section search-section"><SiteSearch entries={entries} /></section><SiteFooter /></main>;
}
