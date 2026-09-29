import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Braces, Cpu, HeartHandshake, Lightbulb, Sparkles, UsersRound } from 'lucide-react';
import { StructuredData } from '@/components/structured-data';
import { companyStats } from '@/lib/company-profile';
import { absoluteUrl, createPageMetadata } from '@/lib/site';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import styles from './careers.module.css';

export const metadata: Metadata = createPageMetadata({
  title: 'Careers at Indian Infotech',
  description: 'Bring your curiosity to Indian Infotech. Explore career paths across workforce software, access systems, engineering, and customer delivery.',
  path: '/careers',
});

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
    { '@type': 'ListItem', position: 2, name: 'Careers', item: absoluteUrl('/careers') },
  ],
};

const facts = companyStats.filter((fact) => ['years-experience', 'products', 'countries', 'clients'].includes(fact.id));

const careerPaths = [
  { title: 'Software & product', icon: Braces, text: 'Turn real workforce and workplace challenges into useful, dependable software.' },
  { title: 'Hardware & engineering', icon: Cpu, text: 'Shape the devices and connected systems that help people move through work securely.' },
  { title: 'Projects & customer delivery', icon: HeartHandshake, text: 'Bring plans to life across installation, integration, onboarding, and ongoing support.' },
  { title: 'Business & growth', icon: UsersRound, text: 'Connect organizations with the right ideas, people, and workplace technology.' },
];

const workPrinciples = [
  { number: '01', title: 'Start with people', text: 'Understand the person, team, or workplace behind every requirement.' },
  { number: '02', title: 'Make it useful', text: 'Bring practical thinking to products and services people rely on every day.' },
  { number: '03', title: 'Own the outcome', text: 'Work across disciplines to move from a good idea to a dependable result.' },
];

export default function CareersPage() {
  return <main className={styles.page}>
    <StructuredData data={breadcrumb} />
    <SiteHeader />

    <section className={styles.hero} aria-labelledby="careers-title">
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}><Sparkles aria-hidden="true" size={15} /> CAREERS AT INDIAN INFOTECH</p>
        <h1 id="careers-title">Bring your spark.<br /><span>Build what moves us forward.</span></h1>
        <p className={styles.heroLead}>Good technology starts with people who care about the problem. Join us in shaping the systems that help teams work, connect, and move with confidence.</p>
        <div className={styles.heroActions}>
          <Link className={styles.primaryAction} href="/contact?topic=Careers">Start a conversation <ArrowUpRight aria-hidden="true" size={17} /></Link>
          <a className={styles.secondaryAction} href="#career-paths">Explore career paths <ArrowDown aria-hidden="true" size={16} /></a>
        </div>
        <div className={styles.heroNote}><span className={styles.noteDot} /> Ahmedabad roots <i aria-hidden="true">·</i> Ideas with reach</div>
      </div>
      <div className={styles.heroVisual}>
        <Image src="/campaign/hero/workforce-desktop-v2.webp" alt="Colleagues arriving at a modern workplace with connected access technology" fill priority sizes="(max-width: 760px) 100vw, 52vw" />
        <div className={styles.imageFade} aria-hidden="true" />
        <div className={styles.imageCaption}><span className={styles.captionIcon}><Lightbulb aria-hidden="true" size={19} /></span><span><b>Real challenges.</b><small>Room to make a difference.</small></span><ArrowUpRight aria-hidden="true" size={17} /></div>
        <span className={styles.imageOrb} aria-hidden="true" />
      </div>
      <a className={styles.scrollCue} href="#our-story" aria-label="Scroll to learn about Indian Infotech"><span>SCROLL TO EXPLORE</span><ArrowDown aria-hidden="true" size={15} /></a>
    </section>

    <section className={styles.proof} aria-label="Indian Infotech at a glance">
      <div className={styles.proofStats}>{facts.map((fact) => <div className={styles.proofStat} key={fact.id}><strong>{fact.display}</strong><span>{fact.label}</span></div>)}</div>
    </section>

    <section className={styles.story} id="our-story">
      <div className={styles.sectionLabel}><span>01</span> WHY THIS WORK MATTERS</div>
      <div className={styles.storyGrid}>
        <h2>Technology is at its best when it makes someone’s day <em>work better.</em></h2>
        <div className={styles.storyCopy}><p>At Indian Infotech, we bring software, identity, and access systems into the places where people work every day. The work is varied, hands-on, and connected to real operating needs.</p><p>That means thoughtful questions matter. So does the craft of making a solution clear, reliable, and ready for the people who use it.</p><Link href="/about-us">Meet Indian Infotech <ArrowRight aria-hidden="true" size={16} /></Link></div>
      </div>
      <div className={styles.principles}>{workPrinciples.map((item) => <article className={styles.principle} key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </section>

    <section className={styles.paths} id="career-paths">
      <div className={styles.pathsHeading}><div><div className={styles.sectionLabel}><span>02</span> FIND YOUR KIND OF CHALLENGE</div><h2>Different strengths.<br /><em>Shared momentum.</em></h2></div><p>Explore the kinds of work that come together here. Your experience may fit one path—or connect a few.</p></div>
      <div className={styles.pathGrid}>{careerPaths.map((path, index) => { const Icon = path.icon; return <article className={styles.pathCard} key={path.title}><div className={styles.pathTop}><span>0{index + 1}</span><Icon aria-hidden="true" size={22} strokeWidth={1.7} /></div><h3>{path.title}</h3><p>{path.text}</p><Link href={`/contact?topic=Careers&interest=${encodeURIComponent(path.title)}`} aria-label={`Ask about ${path.title} careers`}>Explore this path <ArrowUpRight aria-hidden="true" size={16} /></Link></article>; })}</div>
      <p className={styles.pathFootnote}>Career paths describe areas of work, not confirmed vacancies. Share your interests and we’ll help route your enquiry.</p>
    </section>

    <section className={styles.invite}>
      <div className={styles.inviteMark} aria-hidden="true"><span>II</span><i /><i /><i /></div>
      <div className={styles.inviteCopy}><p className={styles.sectionLabel}><span>03</span> YOUR NEXT CHAPTER</p><h2>Curious what we could build <em>together?</em></h2><p>Tell us what you’re great at, what kind of work gives you energy, and how you’d like to contribute. We’d be glad to hear from you.</p></div>
      <Link className={styles.inviteAction} href="/contact?topic=Careers">Introduce yourself <ArrowUpRight aria-hidden="true" size={18} /></Link>
      <span className={styles.inviteSpark} aria-hidden="true">✳</span>
    </section>

    <SiteFooter />
  </main>;
}
