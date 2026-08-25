import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { companyFacts } from '../content';

export const metadata: Metadata = {
  title: 'About Indian Infotech | Ahmedabad, Gujarat',
  description: 'Founded in Ahmedabad in 2011, Indian Infotech serves 2,000+ clients across 7+ countries with workforce and workplace systems.',
  alternates: { canonical: '/about' },
  openGraph: { title: 'About Indian Infotech', description: 'Workforce and workplace technology from Ahmedabad since 2011.', url: '/about' },
};

const principles = [
  { number: '01', title: 'Start with the operation', text: 'Understand the people, entry points, shifts, policies, and constraints before recommending technology.' },
  { number: '02', title: 'Be specific', text: 'Describe capabilities, limits, and deployment needs clearly. Avoid generic promises that cannot be verified.' },
  { number: '03', title: 'Stay practical', text: 'Build systems that facility, HR, security, IT, and management teams can use in daily work.' },
] as const;

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero eyebrow="About Indian Infotech" title="Built in Ahmedabad for workplaces that cannot stop." description="Since 2011, Indian Infotech has developed a portfolio across biometric attendance, access control, entrance management, workplace software, and HRMS." marker="II / SINCE 2011" />

      <section className="proof-strip internal-proof" aria-label="Company facts">
        {companyFacts.map((fact) => <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}
      </section>

      <section className="about-story">
        <div><p className="section-kicker">Our direction</p><h2>Make workplace technology easier to understand, deploy, and operate.</h2></div>
        <div><p>Indian Infotech began in 2011 and operates from Thaltej, Ahmedabad. The company’s portfolio now spans 12+ products and serves 2,000+ clients across 7+ countries.</p><p>The next chapter is about presenting that breadth as one clear workforce and workplace story—without losing the practical, relationship-led character of the business.</p></div>
      </section>

      <section className="about-direction-grid" aria-label="Indian Infotech mission and vision">
        <article>
          <p className="section-kicker">Our mission</p>
          <h2>Operational efficiency with resilient security.</h2>
          <p>We&apos;re committed to crafting intuitive solutions that empower businesses to enhance operational efficiencies, fortify their security infrastructures, and embrace digital transformation with resilience and agility.</p>
        </article>
        <article>
          <p className="section-kicker">Our vision</p>
          <h2>Scalable systems for a global clientele.</h2>
          <p>We aim to set new industry benchmarks, delivering bespoke, scalable solutions that resonate with the evolving needs of a global clientele, driving progress through customer-centric innovation.</p>
        </article>
      </section>

      <section className="principles-section">
        <div className="section-heading"><p className="section-kicker light">How we approach projects</p><h2>Clear requirements before complex systems.</h2></div>
        <div className="principle-grid">{principles.map((principle) => <article key={principle.number}><span>{principle.number}</span><h3>{principle.title}</h3><p>{principle.text}</p></article>)}</div>
      </section>

      <section className="decision-band"><div><p className="section-kicker light">Work with Indian Infotech</p><h2>Bring your site, workforce, and operating requirements.</h2></div><Link className="button button-primary" href="/contact">Meet the team <span aria-hidden="true">↗</span></Link></section>
      <SiteFooter />
    </main>
  );
}
