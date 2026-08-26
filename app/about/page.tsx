import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { companyFacts } from '../content';

export const metadata: Metadata = {
  title: 'About Us | Indian Infotech',
  description: 'Indian Infotech develops HRMS, access control, biometric, and cleanroom systems from Ahmedabad.',
  alternates: { canonical: '/about-us' },
};

const strengths = ['Comprehensive HRMS Solutions', 'Robust Access Control Systems', 'Advanced Biometric Integrations', 'Tailored Industry-specific Applications'] as const;

export default function AboutPage() {
  return <main>
    <SiteHeader />
    <PageHero eyebrow="About us" title="Inventing Tomorrow’s Infotech Today" description="Founded in 2011, Indian Infotech has established itself as a prominent leader in Human Resource Management Systems and access control technologies." marker="II / SINCE 2011" />

    <section className="about-story about-origin">
      <div><p className="section-kicker">Indian Infotech</p><h2>Advanced, secure, and intuitive workplace technology.</h2></div>
      <div><p>Founded in 2011, Indian Infotech has established itself as a prominent leader in Human Resource Management Systems (HRMS) and access control technologies. Our commitment to excellence is showcased in our advanced, secure, and intuitive products that streamline time office management and ensure controlled access to facilities.</p><p>We understand the importance of precise, reliable systems in today’s fast-paced business environments. Our experienced team drives innovation, providing industries with key tools for enhanced performance and modernized workplaces. Understanding the customer’s needs and providing them with the best solution has been the hallmark for its success.</p></div>
    </section>

    <section className="about-direction-grid" aria-label="Indian Infotech mission and vision">
      <article id="mission"><p className="section-kicker">Our mission</p><h2>Operational efficiency with resilient security.</h2><p>We&apos;re committed to crafting intuitive solutions that empower businesses to enhance operational efficiencies, fortify their security infrastructures, and embrace digital transformation with resilience and agility.</p></article>
      <article id="vision"><p className="section-kicker">Our vision</p><h2>Scalable systems for a global clientele.</h2><p>We aim to set new industry benchmarks, delivering bespoke, scalable solutions that resonate with the evolving needs of a global clientele, driving progress through customer-centric innovation.</p></article>
    </section>

    <section className="about-secure-section">
      <div><p className="section-kicker light">Our expertise</p><h2>Crafting Secure Environments</h2></div>
      <div><p>Indian Infotech is a catalyst for change in the specialized domain of HRMS and Office automation, leading the forefront in engineering advanced cleanroom technologies and door interlock systems. We&apos;ve nurtured innovation, offering tailored solutions that meet stringent quality and safety standards. Our expertise spans diverse applications, providing secure, smart, and controlled environments essential in today’s technological landscape.</p><p>Our passion for technological excellence has propelled us into significant partnerships across major corporates and industrial sectors. With a resolute focus on continuous improvement, Indian Infotech has become synonymous with reliability and advanced product offerings. From secure corporate offices to pristine pharma clean rooms, Indian Infotech is your ally in technological transformation.</p><p>We believe that cutting-edge technology is key to unlocking productivity and safety in any work environment. Our solutions, deeply rooted in industry innovations, are designed to empower your workforce with instant access to essential HRMS tools and attendance information. By integrating the latest in biometric recognition and access management, we provide real-time data to optimize workforce productivity and ensure robust access control, crafting a secure and efficient operation landscape.</p></div>
    </section>

    <section className="proof-strip internal-proof" aria-label="Company facts">{companyFacts.map((fact) => <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}</section>

    <section className="about-why-section"><div><p className="section-kicker">Why Indian Infotech</p><h2>Technology blended with practicality.</h2><p>Our offerings are not just products but gateways to efficiency, security, and progress.</p></div><ul>{strengths.map((strength, index) => <li key={strength}><span>0{index + 1}</span>{strength}</li>)}</ul></section>

    <section className="decision-band"><div><p className="section-kicker light">Need help?</p><h2>Take the Next Step with Indian Infotech.</h2></div><Link className="button button-primary" href="/contact">Contact us now <span aria-hidden="true">↗</span></Link></section>
    <SiteFooter />
  </main>;
}
