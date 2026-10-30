import Image from 'next/image';
import { cn } from '@/lib/utils';
import styles from './testimonials-with-marquee.module.css';

export interface TestimonialItem {
  author: { name: string; handle: string; avatar: string };
  text: string;
  href?: string;
}

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: TestimonialItem[];
  className?: string;
}

function TestimonialCard({ author, text, href }: TestimonialItem) {
  const content = <>
    <div className={styles.author}>
      <span className={styles.logo}><Image src={author.avatar} alt={`${author.name} logo`} width={48} height={48} sizes="48px" /></span>
      <span><strong>{author.name}</strong><small>{author.handle}</small></span>
      <span className={styles.quoteMark} aria-hidden="true">“</span>
    </div>
    <p>{text}</p>
  </>;

  return href
    ? <a className={styles.card} href={href}>{content}</a>
    : <article className={styles.card}>{content}</article>;
}

export function TestimonialsSection({ title, description, testimonials, className }: TestimonialsSectionProps) {
  if (!testimonials.length) return null;

  return <section className={cn(styles.section, className)} aria-labelledby="hrms-testimonials-title">
    <div className={styles.heading}>
      <span className={styles.eyebrow}>CLIENT VOICES</span>
      <h2 id="hrms-testimonials-title">{title}</h2>
      <p>{description}</p>
    </div>
    <div className={styles.viewport}>
      <div className={styles.track}>
        {[0, 1].map((copy) => <div className={styles.group} key={copy} aria-hidden={copy === 1}>
          {testimonials.map((testimonial, index) => <TestimonialCard key={`${copy}-${testimonial.author.name}-${index}`} {...testimonial} />)}
        </div>)}
      </div>
    </div>
    <p className={styles.note}>Selected feedback from organizations using Indian Infotech workforce solutions.</p>
  </section>;
}
