import type { Metadata } from 'next';
import { companyProfile } from '@/lib/company-profile';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = createPageMetadata({ title: 'Terms & Conditions', description: 'Terms and conditions for using the Indian Infotech website and its published information.', path: '/terms' });

export default function TermsPage() {
  return <main><SiteHeader /><PageHero eyebrow="Legal" title="Terms and conditions" description="The terms that apply when you access Indian Infotech products, services, and website content." marker="II / TERMS" /><section className="legal-copy"><h2>1. Introduction</h2><p>By accessing or using Indian Infotech’s services and products, you agree to the following terms.</p><h2>2. Products and services</h2><p>We provide biometric devices, access control systems, attendance systems, and management software like HRMS, Canteen, and Visitor Management systems. The features and functionalities of each product are subject to change without notice.</p><h2>3. User responsibilities</h2><p>You are responsible for the accuracy of data input and proper use of devices and software.</p><h2>4. Liability</h2><p>Indian Infotech is not responsible for any direct or indirect damages from the use of our products.</p><h2>5. Modifications</h2><p>We reserve the right to update these terms without notice. Continued use implies acceptance of changes.</p><p>For more details, contact us at <a href={`mailto:${companyProfile.email}`}>{companyProfile.email}</a>.</p></section><SiteFooter /></main>;
}
