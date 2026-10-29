import Link from 'next/link';
import type { CSSProperties } from 'react';
import {
  ArrowUpRight,
  Banknote,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CircleCheck,
  ClipboardCheck,
  ClipboardClock,
  ClipboardList,
  Clock3,
  Coins,
  ContactRound,
  DoorOpen,
  Factory,
  Fingerprint,
  Headset,
  MessageCircleQuestion,
  PackageCheck,
  Presentation,
  ReceiptText,
  Smartphone,
  Sun,
  Target,
  TrendingUp,
  UserRound,
  UserRoundPlus,
  UserRoundSearch,
  Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { hrmsModules } from '../content';
import { hrmsDetails } from './content';
import styles from './module-explorer.module.css';

const moduleIllustrations: Record<string, {
  symbols: readonly [LucideIcon, LucideIcon, LucideIcon];
  accent: string;
  tint: string;
  secondary: string;
}> = {
  recruitment: { symbols: [UserRoundSearch, ClipboardList, BriefcaseBusiness], accent: '#227e73', tint: '#dff4e9', secondary: '#f5b941' },
  leave: { symbols: [CalendarDays, Sun, CircleCheck], accent: '#2878b8', tint: '#e1f1ff', secondary: '#f3a83b' },
  pms: { symbols: [Target, TrendingUp, CircleCheck], accent: '#7655bd', tint: '#eee8ff', secondary: '#f1a63b' },
  'performance-linked-benefits': { symbols: [Factory, Coins, TrendingUp], accent: '#b76424', tint: '#fff0d9', secondary: '#58a76d' },
  onboarding: { symbols: [UserRoundPlus, ClipboardCheck, CircleCheck], accent: '#258b76', tint: '#ddf5eb', secondary: '#eaa345' },
  attendance: { symbols: [Clock3, Fingerprint, CircleCheck], accent: '#3479c1', tint: '#e1efff', secondary: '#e9a43e' },
  'hr-help-desk': { symbols: [Headset, MessageCircleQuestion, CircleCheck], accent: '#7358b4', tint: '#efe9ff', secondary: '#efaa42' },
  'training-induction': { symbols: [Presentation, BookOpen, CircleCheck], accent: '#277f9c', tint: '#def3f6', secondary: '#eda342' },
  'core-hris-payroll': { symbols: [ContactRound, Banknote, ClipboardCheck], accent: '#247d75', tint: '#def3ec', secondary: '#eca63f' },
  expense: { symbols: [ReceiptText, Wallet, CircleCheck], accent: '#a65b2b', tint: '#fff0df', secondary: '#4f9b72' },
  'off-boarding': { symbols: [DoorOpen, PackageCheck, UserRound], accent: '#63758e', tint: '#e8eef5', secondary: '#e6a544' },
  timesheet: { symbols: [ClipboardClock, Clock3, CircleCheck], accent: '#347b99', tint: '#e1f2f6', secondary: '#e9a43e' },
  ess: { symbols: [Smartphone, ContactRound, CircleCheck], accent: '#347cbd', tint: '#e2f0ff', secondary: '#e9a43e' },
  visitors: { symbols: [BadgeCheck, UserRound, DoorOpen], accent: '#278375', tint: '#def3ea', secondary: '#eca643' },
};

type IllustrationStyle = CSSProperties & {
  '--module-accent': string;
  '--module-tint': string;
  '--module-secondary': string;
};

export default function ModuleExplorer() {
  return <section className={`section ${styles.explorer}`} id="modules" aria-labelledby="modules-heading">
    <div className={styles.heading}>
      <p className="section-kicker">Explore the HR suite</p>
      <h2 id="modules-heading">The workflows behind every stage of work.</h2>
      <p>Explore each module to see its capabilities, workflow, and the questions to discuss with our team.</p>
    </div>
    <div className={styles.cards}>
      {hrmsModules.map((module, index) => (
        <article className={styles.card} key={module.slug}>
          <Link className={styles.image} href={`/hrms-payroll/${module.slug}`} tabIndex={-1} aria-hidden="true">
            <ModuleIllustration slug={module.slug} />
            <span>MODULE {String(index + 1).padStart(2, '0')}</span>
          </Link>
          <div className={styles.copy}>
            <div className={styles.cardTop}><span>HRMS MODULE</span><ArrowUpRight size={19} aria-hidden="true" /></div>
            <h3><Link href={`/hrms-payroll/${module.slug}`}>{module.name}</Link></h3>
            <p>{module.summary}</p>
            <ul>{hrmsDetails[module.slug].features.slice(0, 3).map(([name]) => <li key={name}><Check size={15} aria-hidden="true" />{name}</li>)}</ul>
            <Link className={styles.cardLink} href={`/hrms-payroll/${module.slug}`}>Explore {module.name}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </article>
      ))}
    </div>
  </section>;
}

function ModuleIllustration({ slug }: { slug: string }) {
  const illustration = moduleIllustrations[slug];
  const [MainSymbol, LeftSymbol, RightSymbol] = illustration.symbols;
  const style: IllustrationStyle = {
    '--module-accent': illustration.accent,
    '--module-tint': illustration.tint,
    '--module-secondary': illustration.secondary,
  };

  return (
    <span className={styles.artwork} data-module={slug} style={style}>
      <span className={styles.connector} />
      <span className={`${styles.symbol} ${styles.supportSymbol}`}><LeftSymbol /></span>
      <span className={`${styles.symbol} ${styles.mainSymbol}`}><MainSymbol /></span>
      <span className={`${styles.symbol} ${styles.supportSymbol} ${styles.rightSymbol}`}><RightSymbol /></span>
      <span className={styles.artworkDot} />
    </span>
  );
}
