import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CustomerCoverflow } from '@/components/ui/3-d-coverflow-carousel';
import { SiteFooter } from './_components/site-footer';
import { SiteHeader } from './_components/site-header';
import { companyFacts, customerOrganizations, industries, platformPillars, products, softwarePlatforms } from './content';

export const metadata: Metadata = {
  title: 'Workforce & Workplace Solutions | Indian Infotech',
  description:
    'Biometric attendance, access control, entrance management, and HRMS solutions from Indian Infotech in Ahmedabad, Gujarat.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Indian Infotech | Workforce + Workplace Systems',
    description: 'Run every shift. Secure every entry.',
    url: '/',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Indian Infotech workforce and workplace systems' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indian Infotech | Workforce + Workplace Systems',
    description: 'Run every shift. Secure every entry.',
    images: ['/og.png'],
  },
};

const platformSignals = [
  { code: '01', label: 'Biometric attendance', status: 'Identity verified' },
  { code: '02', label: 'Access control', status: 'Entry governed' },
  { code: '03', label: 'HRMS & payroll', status: 'Workforce managed' },
];

const workflow = [
  { number: '01', title: 'Identify', text: 'Capture workforce identity through face, fingerprint, card, or approved attendance methods.' },
  { number: '02', title: 'Control', text: 'Define how employees, visitors, and contractors move through workplace entry points.' },
  { number: '03', title: 'Reconcile', text: 'Bring attendance, shifts, leave, and exceptions into a clearer operating workflow.' },
  { number: '04', title: 'Operate', text: 'Support HR, payroll, security, and facility teams with practical systems and records.' },
];

const featuredProducts = products.filter((product) => product.image);

export default function Home() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Indian Infotech',
    url: 'https://indianinfotech.org',
    logo: 'https://indianinfotech.org/indian-infotech-logo.png',
    foundingDate: '2011',
    email: 'sales@indianinfotech.org',
    telephone: '+91-76000-66770',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '429, 425, 403 Gala Empire, Opp. Doordarshan Kendra, Thaltej',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      postalCode: '380054',
      addressCountry: 'IN',
    },
  };

  return (
    <main>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> Workforce + workplace systems</p>
          <h1>Run every shift.<br /><em>Secure every entry.</em></h1>
          <p className="hero-summary">
            Biometric attendance, access control, entrance management, and HRMS
            solutions for Indian businesses operating in the real world.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/contact">
              Plan your solution <span aria-hidden="true">↗</span>
            </Link>
            <Link className="button button-secondary" href="/platform">Explore the platform</Link>
          </div>
          <p className="location-note">Ahmedabad · Serving Gujarat, India, and beyond</p>
        </div>

        <div className="hero-system" aria-label="Indian Infotech platform scope">
          <div className="system-topline">
            <span>II / OPERATIONS CORE</span>
            <span className="live-label"><i /> PLATFORM SCOPE</span>
          </div>
          <div className="system-orbit" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit-core"><span>WORKFORCE</span><strong>+</strong><span>WORKPLACE</span></div>
          </div>
          <div className="signal-list">
            {platformSignals.map((signal) => (
              <div className="signal-row" key={signal.code}>
                <span className="signal-code">{signal.code}</span>
                <strong>{signal.label}</strong>
                <span>{signal.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Company facts">
        {companyFacts.map((fact) => (
          <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>
        ))}
      </section>

      <CustomerCoverflow items={customerOrganizations} />

      <section className="section platform-section">
        <div className="section-heading split-heading">
          <div>
            <p className="section-kicker">One operational partner</p>
            <h2>Technology that meets your workforce at the gate.</h2>
          </div>
          <p>
            Build a practical stack around how your facility runs—not around a generic
            software checklist. Start with one system or scope a broader rollout.
          </p>
        </div>
        <div className="pillar-grid">
          {platformPillars.map((pillar) => (
            <Link className="pillar-card" href={pillar.href} key={pillar.number}>
              <span className="card-number">{pillar.number}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
              <ul>{pillar.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              <span className="text-link">Explore system <b aria-hidden="true">↗</b></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="workflow-section">
        <div className="workflow-copy">
          <p className="section-kicker light">From gate to people operations</p>
          <h2>One operational story, built in clear stages.</h2>
          <p>
            Scope only the capabilities your team needs today. Indian Infotech helps
            plan the hardware, software, and workplace workflow around your sites.
          </p>
          <Link className="text-link light-link" href="/platform">See platform architecture <b aria-hidden="true">↗</b></Link>
        </div>
        <ol className="workflow-list">
          {workflow.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section homepage-software">
        <div className="section-heading split-heading">
          <div><p className="section-kicker">Software platforms</p><h2>Operational records that connect people and places.</h2></div>
          <div><p>Explore software for attendance, HR and payroll, visitors, and canteen operations.</p><Link className="outline-link" href="/software">View all software</Link></div>
        </div>
        <div className="software-card-grid">
          {softwarePlatforms.map((item) => (
            <Link className="software-card compact-software-card" href={`/software/${item.slug}`} key={item.slug}>
              <div className="software-window" aria-hidden="true"><div><i /><i /><i /></div><span>Workflow scope</span><ol>{item.modules.slice(0, 3).map((module, index) => <li key={module}><b>{String(index + 1).padStart(2, '0')}</b>{module}</li>)}</ol></div>
              <div className="software-card-copy"><span>{item.category}</span><h3>{item.name}</h3><p>{item.summary}</p><b>Explore platform ↗</b></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" id="industries">
        <div className="section-heading split-heading">
          <div><p className="section-kicker">Built around operating reality</p><h2>Systems shaped for complex workplaces.</h2></div>
          <p>Shift patterns, controlled areas, visitors, contractors, and payroll cutoffs change by industry. Your solution should reflect that.</p>
        </div>
        <div className="industry-grid">
          {industries.map((industry, index) => (
            <Link className={`industry-card ${industry.featured ? 'featured' : ''}`} href={industry.href} key={industry.name}>
              <span className="card-number">0{index + 1}</span>
              <h3>{industry.name}</h3><p>{industry.description}</p>
              <span className="text-link">View approach <b aria-hidden="true">↗</b></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section products-section">
        <div className="section-heading split-heading">
          <div><p className="section-kicker">Hardware at the edge</p><h2>Purpose-built endpoints for real entry points.</h2></div>
          <Link className="outline-link" href="/products">View all 12+ products</Link>
        </div>
        <div className="featured-products">
          {featuredProducts.map((product) => (
            <article className="product-feature" key={product.name}>
              <div className="product-image">
                <Image src={product.image!} alt={`${product.name} ${product.family} device`} width={520} height={520} />
              </div>
              <div><span>{product.family}</span><h3>{product.name}</h3><p>{product.description}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="local-section">
        <div className="local-map" aria-hidden="true"><span>23.0225° N</span><i /><b>Ahmedabad</b><span>72.5714° E</span></div>
        <div>
          <p className="section-kicker light">Local engineering. Wider reach.</p>
          <h2>Based in Ahmedabad. Built for operations across India.</h2>
          <p>Discuss site conditions, team size, entry points, attendance policies, and rollout needs with a team that understands industrial operations.</p>
          <Link className="button button-primary" href="/contact">Book a consultation <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
