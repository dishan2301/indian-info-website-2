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
import { ArrowUpRight, Check, Layers3, ArrowRight } from 'lucide-react';

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

  const related = detail.related
    .map((relatedSlug) => hrmsModules.find((module) => module.slug === relatedSlug))
    .filter((module): module is (typeof hrmsModules)[number] => Boolean(module));
  const visualStages = detail.visual[1].split('|');
  const faqs = [
    ...detail.faqs,
    [`How does ${item.name} work in practice?`, detail.scenario[1]],
    [`What steps are involved in ${item.name}?`, detail.workflow.join(' ')],
  ];

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

      <nav className={styles.sectionNav} aria-label="On this page"><span>Explore this module</span><a href="#capabilities">Capabilities <ArrowUpRight size={14} aria-hidden="true" /></a><a href="#workflow">How it works <ArrowUpRight size={14} aria-hidden="true" /></a><a href="#questions">FAQs <ArrowUpRight size={14} aria-hidden="true" /></a><a href="#connected">Connected modules <ArrowUpRight size={14} aria-hidden="true" /></a></nav>

      <section className={styles.processSections} aria-label={`${item.name} process`}>
        <FeatureReveal className={styles.processRow}>
          <div className={styles.processCopy}><p className="section-kicker">A CONNECTED PROCESS</p><h2>{detail.headline}</h2><p>{detail.introduction}</p><ul>{detail.workflow.map((step) => <li key={step}>{step}</li>)}</ul></div>
          <AnimatedFeatureScene module={item.slug} stages={visualStages} />
        </FeatureReveal>
      </section>

      <section className="section hrms-capabilities" id="capabilities" aria-labelledby="hrms-capabilities-heading">
        <div className="section-heading split-heading">
          <div><p className="section-kicker">01 / Inside the module</p><h2 id="hrms-capabilities-heading">Every detail.<br /><em>A clearer way to work.</em></h2></div>
          <p>Explore what {item.name.toLowerCase()} brings to your team, from everyday tasks to the decisions and handoffs around them.</p>
        </div>
        <div className="hrms-capability-grid">
          {detail.features.map(([name, description], index) => {
            const Icon = capabilityIcons[item.slug]?.[index] ?? Check;
            return <article key={name}>
              <span className={styles.capabilityCheck}><Icon size={18} strokeWidth={1.8} aria-hidden="true" /></span>
              <div><span className={styles.cardLabel}>CAPABILITY {String(index + 1).padStart(2, '0')}</span><h3>{name}</h3><p>{description}</p></div>
            </article>;
          })}
        </div>
      </section>

      <section className={`section hrms-detail-workflow ${styles.workflow}`} id="workflow" aria-labelledby="hrms-workflow-heading">
        <div className="hrms-detail-aside">
          <p className="section-kicker">02 / From action to outcome</p>
          <h2 id="hrms-workflow-heading">A workflow your<br /><em>team can follow.</em></h2>
          <p>See how the information moves, who takes the next step, and where this module connects with the wider HR process.</p>
          <aside className={styles.scenario}><span>IN PRACTICE</span><h3>{detail.scenario[0]}</h3><p>{detail.scenario[1]}</p></aside>
        </div>
        <div className="hrms-feature-preview">
          <span>{detail.visual[0]}</span>
          <h3>Three steps.<br />One shared process.</h3>
          <ol>{visualStages.map((stage, index) => <li key={stage}><span>{String(index + 1).padStart(2, '0')}</span><div><h4>{stage}</h4><p>{detail.workflow[index]}</p></div></li>)}</ol>
          <div className={styles.workflowFoot}><Check size={15} aria-hidden="true" /> Connected to your wider HR workflow</div>
        </div>
      </section>

      <section className="section hrms-faq" id="questions" aria-labelledby="hrms-faq-heading">
        <div className="section-heading split-heading">
          <div><p className="section-kicker">03 / Common questions</p><h2 id="hrms-faq-heading">Questions about <em>{item.name}?</em></h2></div>
          <p>Explore how this workflow can fit your team, from everyday tasks to setup and review.</p>
          <div className={styles.faqContact}><strong>Need a closer look?</strong><p>Talk through your process with our team.</p><Link href={`/contact?hrms=${item.slug}`}>Discuss {item.name} <ArrowRight size={16} aria-hidden="true" /></Link></div>
        </div>
        <div className="hrms-faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question}><summary><small>{String(index + 1).padStart(2, '0')}</small><strong>{question}</strong><span aria-hidden="true">+</span></summary><p>{answer}</p></details>
          ))}
        </div>
      </section>

      <section className="hrms-related section" id="connected">
        <div className="section-heading split-heading">
          <div><p className="section-kicker">Connected modules</p><h2>Continue the employee journey.</h2></div>
          <Link className="outline-link" href="/hrms-payroll">View all {hrmsModules.length} modules <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="hrms-related-grid">
          {related.map((module) => (
            <Link key={module.slug} href={`/hrms-payroll/${module.slug}`}>
              <span>CONNECTED MODULE</span><h3>{module.name}</h3><p>{module.summary}</p><b>Explore module <ArrowRight size={16} aria-hidden="true" /></b>
            </Link>
          ))}
        </div>
      </section>

      <nav className="section hrms-module-nav" aria-label="HRMS module navigation">
        {(() => { const index = hrmsModules.indexOf(item); const previous = hrmsModules[(index - 1 + hrmsModules.length) % hrmsModules.length]; const next = hrmsModules[(index + 1) % hrmsModules.length]; return <><Link href={`/hrms-payroll/${previous.slug}`}><small>Previous module</small><strong>← {previous.name}</strong></Link><Link href={`/hrms-payroll/${next.slug}`}><small>Next module</small><strong>{next.name} →</strong></Link></>; })()}
      </nav>

      <section className="route-feature-band">
        <div><p className="section-kicker light">Plan your HRMS workflow</p><h2>See how this feature could fit your team.</h2><p>Share your current process and requirements with our team.</p></div>
        <Link className="button button-primary" href={`/contact?hrms=${item.slug}`}>Talk to our team <span aria-hidden="true">↗</span></Link>
      </section>
      <SiteFooter />
    </main>
  );
}
