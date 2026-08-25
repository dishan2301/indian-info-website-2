import Image from 'next/image';
import Link from 'next/link';
import { customerOrganizations } from '@/app/content';

const companyFacts = [
  { value: '14+', label: 'Years of experience' },
  { value: '12+', label: 'Products' },
  { value: '7+', label: 'Countries served' },
  { value: '2,000+', label: 'Happy clients' },
] as const;

const industries = ['Pharma', 'Chemical', 'Textiles', 'Manufacturing', 'Service provider', 'Engineering', 'Food industries'] as const;

const clientQuotes = [
  { quote: 'Smooth HRMS implementation with reliable attendance and prompt support.', source: 'HR Team' },
  { quote: 'Strong technical expertise with professional implementation.', source: 'Management' },
  { quote: 'User-friendly system with accurate attendance tracking. Support response is quick and dependable.', source: 'IT Team, HCP Pvt. Ltd.' },
  { quote: 'Seamless hardware and software integration delivered on time. Highly satisfied with the service quality.', source: 'Indbest Healthcare Pvt. Ltd.' },
] as const;

const news = [
  { category: 'Cloud attendance · Blog', title: 'Why your company needs EasyTime cloud attendance management', href: '/insights/easytime-cloud-attendance-benefits', image: '/campaign/hero/workforce-desktop-v2.webp' },
  { category: 'Production technology · Blog', title: 'How AI technology is changing production lines', href: '/insights/ai-in-production-lines', image: '/campaign/industries/manufacturing-desktop-v2.webp' },
] as const;

export function CompanyOverview() {
  return <>
    <section className="home-company-page" aria-labelledby="why-indian-infotech">
      <div className="home-company-identity">
        <Image src="/indian-infotech-logo.png" alt="Indian Infotech" width={420} height={152} priority={false} />
        <div className="home-certificate">
          <Image src="/iso-9001-certified.webp" alt="ISO 9001 Certified" width={440} height={160} />
          <span>Certification shown in Indian Infotech’s company brochure.</span>
        </div>
      </div>
      <div className="home-company-copy">
        <div className="home-company-intro">
          <p>Why Indian Infotech</p>
          <h2 id="why-indian-infotech">Technology shaped around real workplace needs.</h2>
          <span>Since 2011, Indian Infotech has combined practical technology with dependable implementation. Our workforce, access, and workplace systems help organizations improve efficiency, security, and everyday operations.</span>
        </div>
        <article><p>Our vision</p><h3>Customer-led innovation with global relevance.</h3><span>We aim to set new industry benchmarks with bespoke, scalable solutions that respond to the evolving needs of a global clientele.</span></article>
        <article><p>Our mission</p><h3>Intuitive systems for efficient, secure operations.</h3><span>We craft solutions that help businesses improve operational efficiency, strengthen security, and embrace digital transformation with resilience and agility.</span></article>
      </div>
    </section>
    <section className="home-fact-strip" aria-label="Indian Infotech company facts">
      {companyFacts.map((fact) => <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}
    </section>
  </>;
}

export function IndustriesAndClients() {
  return <section className="home-industry-client-page" aria-labelledby="home-industries-heading">
    <div className="home-section-heading"><p>Industries</p><h2 id="home-industries-heading">Experience across varied operating environments.</h2></div>
    <div className="home-industry-list">
      {industries.map((industry, index) => <div key={industry}><span>{String(index + 1).padStart(2, '0')}</span><strong>{industry}</strong></div>)}
    </div>
    <div className="home-client-heading"><p>Our clients</p><h2>Trusted by organizations across industries.</h2></div>
    <div className="home-client-grid">
      {customerOrganizations.map((customer) => <div key={customer.name}><Image src={customer.logo} alt={customer.name} width={131} height={60} /></div>)}
    </div>
  </section>;
}

export function QuotesAndNews() {
  return <section className="home-quotes-news-page" aria-labelledby="client-quotes-heading">
    <div className="home-section-heading"><p>Client’s Quote</p><h2 id="client-quotes-heading">What clients say about working with us.</h2></div>
    <div className="home-quote-grid">
      {clientQuotes.map((item) => <blockquote key={item.source}><p>“{item.quote}”</p><cite>— {item.source}</cite></blockquote>)}
    </div>
    <div className="home-news-heading"><p>News &amp; blogs</p><h2>Latest ideas from Indian Infotech.</h2></div>
    <div className="home-news-grid">
      {news.map((item) => <Link href={item.href} key={item.title}><div><Image src={item.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><span>{item.category}</span><h3>{item.title}</h3><b>Read more ↗</b></Link>)}
    </div>
  </section>;
}
