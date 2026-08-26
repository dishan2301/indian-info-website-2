import Image from 'next/image';
import Link from 'next/link';
import { customerOrganizations } from '@/app/content';

const companyFacts = [
  { value: '14+', label: 'Years of experience' },
  { value: '12+', label: 'Products' },
  { value: '7+', label: 'Countries served' },
  { value: '2,000+', label: 'Happy clients' },
] as const;

const industries = [
  { name: 'Pharma', slug: 'pharma' },
  { name: 'Chemical', slug: 'chemical' },
  { name: 'Textiles', slug: 'textiles' },
  { name: 'Manufacturing', slug: 'manufacturing' },
  { name: 'Service provider', slug: 'service-provider' },
  { name: 'Engineering', slug: 'engineering' },
  { name: 'Food industries', slug: 'food-industries' },
] as const;

const industryCollage = [
  { name: 'Pharma', image: '/campaign/industries/pharma-desktop-v2.webp' },
  { name: 'Manufacturing', image: '/campaign/industries/manufacturing-desktop-v2.webp' },
  { name: 'Corporate services', image: '/campaign/industries/corporate-desktop-v2.webp' },
  { name: 'Hospitality', image: '/campaign/industries/hospitality-desktop-v2.webp' },
] as const;

const clientQuotes = [
  { quote: 'Smooth HRMS implementation with reliable attendance and prompt support.', source: 'HR Team', mark: 'HR' },
  { quote: 'Strong technical expertise with professional implementation.', source: 'Management', mark: 'MG' },
  { quote: 'User-friendly system with accurate attendance tracking. Support response is quick and dependable.', source: 'IT Team, HCP Pvt. Ltd.', mark: 'HCP' },
  { quote: 'Seamless hardware and software integration delivered on time. Highly satisfied with the service quality.', source: 'Indbest Healthcare Pvt. Ltd.', mark: 'IH' },
] as const;

const news = [
  { category: 'Cloud attendance · Blog', title: 'Why your company needs EasyTime cloud attendance management', href: '/insights/easytime-cloud-attendance-benefits', image: '/campaign/hero/workforce-desktop-v2.webp' },
  { category: 'Production technology · Blog', title: 'How AI technology is changing production lines', href: '/insights/ai-in-production-lines', image: '/campaign/industries/manufacturing-desktop-v2.webp' },
] as const;

export function CompanyOverview() {
  return <>
    <section className="home-company-page" aria-labelledby="why-indian-infotech">
      <div className="home-company-waves" aria-hidden="true"><i /><i /><i /></div>
      <div className="home-company-identity">
        <Image src="/indian-infotech-logo.png" alt="Indian Infotech" width={520} height={188} priority={false} />
        <div className="home-certificate">
          <Image src="/iso-9001-certified.webp" alt="ISO 9001 Certified" width={440} height={160} />
          <span>Certified company · Company brochure</span>
        </div>
      </div>
      <div className="home-company-copy">
        <div className="home-company-intro">
          <p>Why Indian Infotech</p>
          <h2 id="why-indian-infotech">Practical technology. Dependable delivery.</h2>
          <span>Since 2011, Indian Infotech has shaped workforce, access, and workplace systems around real operating needs—helping teams work with greater efficiency and security.</span>
        </div>
        <div className="home-company-directions">
          <article><p>Our vision</p><h3>Customer-led innovation with global relevance.</h3><span>Scalable solutions that respond to evolving business needs.</span></article>
          <article><p>Our mission</p><h3>Efficient and secure everyday operations.</h3><span>Intuitive systems that strengthen productivity, security, and agility.</span></article>
        </div>
      </div>
    </section>
    <section className="home-fact-strip" aria-label="Indian Infotech company facts">
      {companyFacts.map((fact) => <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}
    </section>
  </>;
}

export function IndustriesAndClients() {
  return <section className="home-industry-client-page" aria-labelledby="home-industries-heading">
    <div className="home-industry-layout">
      <div>
        <div className="home-section-heading"><p>Industries</p><h2 id="home-industries-heading">Industry understanding, built into every solution.</h2><span>Seven sectors from Indian Infotech’s established portfolio.</span></div>
        <div className="home-industry-list">
          {industries.map((industry) => <div key={industry.slug}><Image src={`/industries/icons/${industry.slug}.png`} alt="" width={56} height={51} /><strong>{industry.name}</strong></div>)}
        </div>
      </div>
      <div className="home-industry-collage" aria-label="Workplaces across served industries">
        {industryCollage.map((item) => <figure key={item.name}><Image src={item.image} alt={`${item.name} workplace`} fill sizes="(max-width: 760px) 50vw, 20vw" /><figcaption>{item.name}</figcaption></figure>)}
      </div>
    </div>
    <div className="home-client-heading"><p>Our clients</p><h2>Organizations that choose Indian Infotech.</h2></div>
    <div className="home-client-grid">
      {customerOrganizations.map((customer) => <div key={customer.name}><Image src={customer.logo} alt={customer.name} width={131} height={60} /></div>)}
    </div>
  </section>;
}

export function QuotesAndNews() {
  return <section className="home-quotes-news-page" aria-labelledby="client-quotes-heading">
    <div className="home-section-heading"><p>Client’s Quote</p><h2 id="client-quotes-heading">Feedback from teams we support.</h2></div>
    <div className="home-quote-grid">
      {clientQuotes.map((item) => <blockquote key={item.source}><div><span>{item.mark}</span><b aria-hidden="true">“</b></div><p>{item.quote}</p><cite>— {item.source}</cite></blockquote>)}
    </div>
    <div className="home-news-heading"><p>News &amp; blogs</p><h2>Practical thinking for modern workplaces.</h2></div>
    <div className="home-news-grid">
      {news.map((item) => <Link href={item.href} key={item.title}><div><Image src={item.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><span>{item.category}</span><h3>{item.title}</h3><b>Read more ↗</b></Link>)}
    </div>
  </section>;
}
