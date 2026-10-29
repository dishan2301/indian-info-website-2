import type { Metadata } from 'next';
import styles from './highlights.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createPageMetadata } from '@/lib/site';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';
import { hrmsModules } from '../../content';
import { hrmsDetails } from '../content';
import { capabilityIcons } from '../capability-icons';
import { AnimatedFeatureScene, FeatureReveal } from '../animated-feature-scene';
import { Check, Layers3 } from 'lucide-react';

export function generateStaticParams() {
  return hrmsModules.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = hrmsModules.find((candidate) => candidate.slug === slug);
  if (!item) return {};
  const detail = hrmsDetails[item.slug];
  return createPageMetadata({ title: `${item.name} | HRMS & Payroll`, description: detail.introduction, path: `/hrms-payroll/${item.slug}`, image: null });
}

export default async function HrmsModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = hrmsModules.find((candidate) => candidate.slug === slug);
  if (!item) notFound();
  const detail = hrmsDetails[item.slug];

  const visualStages = detail.visual[1].split('|');

  return (
    <main className={`hrms-page ${styles.page}`}>
      <SiteHeader />
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/hrms-payroll">HRMS & Payroll</Link><span aria-hidden="true">/</span><span aria-current="page">{item.name}</span>
      </nav>
      <section className="hrms-detail-hero">
        <div className="hrms-detail-copy">
          <p className="section-kicker"><span className={styles.statusDot} /> THE CONNECTED HR SUITE</p>
          <h1>{item.name}</h1>
          <h2>{detail.headline}</h2>
          <p>{detail.introduction}</p>
          <div className={styles.heroTags}><span><Layers3 size={14} aria-hidden="true" />{detail.features.length} capabilities</span><span>One connected employee journey</span></div>
          <div className="hrms-hero-actions">
            <Link className="button button-primary" href={`/contact?hrms=${item.slug}`}>Discuss this module <span aria-hidden="true">↗</span></Link>
            <Link className="outline-link" href="/hrms-payroll">All {hrmsModules.length} HRMS modules</Link>
          </div>
        </div>
        <div className="hrms-detail-image">
          <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 800px) 100vw, 50vw" priority />
          <div className="hrms-detail-image-caption"><span>{detail.visual[0]}</span><strong>{detail.visual[2]}</strong></div>
        </div>
      </section>

      <section className="section hrms-capabilities" id="capabilities" aria-labelledby="hrms-capabilities-heading">
        <div className="section-heading split-heading">
          <div><p className="section-kicker">01 / Inside the module</p><h2 id="hrms-capabilities-heading">Every detail.<br /><em>A clearer way to work.</em></h2></div>
          <p>Explore what {item.name.toLowerCase()} brings to your team, from everyday tasks to the decisions and handoffs around them.</p>
        </div>
        <FeatureReveal className="hrms-capability-grid">
          {detail.features.map(([name, description], index) => {
            const Icon = capabilityIcons[item.slug]?.[index] ?? Check;
            return <article key={name}>
              <span className={styles.capabilityCheck}><Icon size={18} strokeWidth={1.8} aria-hidden="true" /></span>
              <div><span className={styles.cardLabel}>CAPABILITY {String(index + 1).padStart(2, '0')}</span><h3>{name}</h3><p>{description}</p></div>
            </article>;
          })}
        </FeatureReveal>
      </section>

      <section className={`section ${styles.moduleHighlights}`} aria-labelledby="module-highlights-heading">
        <h2 id="module-highlights-heading">Highlights</h2>
        {detail.highlights.map(([title, description], index) => {
          const midpoint = Math.ceil(detail.features.length / 2);
          const features = index === 0 ? detail.features.slice(0, 3) : detail.features.slice(midpoint, midpoint + 3);
          return <FeatureReveal key={title} className={`${styles.highlightRow} ${index % 2 ? styles.highlightReverse : ''}`}>
            <div className={styles.highlightCopy}>
              <h3>{title}</h3>
              <p>{description}</p>
              <ul>{features.map(([name, text]) => <li key={name}><strong>{name}</strong> — {text}</li>)}</ul>
            </div>
            <AnimatedFeatureScene module={item.slug} stages={visualStages} variant={index} />
          </FeatureReveal>;
        })}
        <div className={styles.highlightAction}><Link className="button button-primary" href={`/contact?hrms=${item.slug}`}>Talk to our team <span aria-hidden="true">↗</span></Link></div>
      </section>

      <SiteFooter />
    </main>
  );
}
