import type { Metadata } from 'next';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/site';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { softwarePlatforms } from '../content';

export const metadata: Metadata = createPageMetadata({ title: 'Workforce & Workplace Software', description: 'Explore Easytime Online, HRMS, payroll, visitor management, and canteen management software from Indian Infotech.', path: '/software' });

const categories = ['Workforce', 'Workplace'] as const;

export default function SoftwarePage() {
  return (
    <main>
      <SiteHeader />
      <PageHero eyebrow="Software platforms" title="Turn workplace events into clearer operating workflows." description="Connect attendance, people operations, visitor activity, and canteen records through software selected around the way your organization works." marker="II / SOFTWARE" />

      <section className="software-index section">
        <div className="section-heading split-heading">
          <div><p className="section-kicker">Software ecosystem</p><h2>Start with the workflow, then connect the right systems.</h2></div>
          <p>Each platform is shown with its operational scope. Interface screenshots will be published only after current production screens are approved.</p>
        </div>

        {categories.map((category, categoryIndex) => (
          <div className="software-category" key={category}>
            <div className="software-category-title"><span>0{categoryIndex + 1}</span><h2>{category}</h2></div>
            <div className="software-card-grid">
              {softwarePlatforms.filter((item) => item.category === category).map((item) => (
                <Link className="software-card" href={`/software/${item.slug}`} key={item.slug}>
                  <div className="software-window" aria-hidden="true">
                    <div><i /><i /><i /></div>
                    <span>Approved interface media pending</span>
                    <ol>{item.modules.slice(0, 4).map((module, index) => <li key={module}><b>{String(index + 1).padStart(2, '0')}</b>{module}</li>)}</ol>
                  </div>
                  <div className="software-card-copy"><span>{item.category} software</span><h3>{item.name}</h3><p>{item.summary}</p><b>Explore platform ↗</b></div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="selection-note"><div><p className="section-kicker light">Plan the system</p><h2>Software selection starts with roles, rules, sites, devices, and reporting needs.</h2><p>Bring your operating workflow to the discussion. Indian Infotech can help map the required modules and confirm compatible hardware and deployment choices.</p></div><Link className="button button-primary" href="/contact">Book a software demo <span aria-hidden="true">↗</span></Link></section>
      <SiteFooter />
    </main>
  );
}
