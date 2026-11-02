import { ArrowLeft, ArrowRightIcon, BookOpenIcon, HomeIcon, MailIcon, ScanFaceIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import styles from './not-found-06.module.css';

const pages = [
  { icon: HomeIcon, title: 'Home', description: 'Back to the main page', href: '/' },
  { icon: BookOpenIcon, title: 'Blog', description: 'Read our latest insights', href: '/insights' },
  { icon: ScanFaceIcon, title: 'Devices', description: 'Explore our biometric devices', href: '/products' },
  { icon: MailIcon, title: 'Contact', description: 'Get in touch with our team', href: '/contact' },
];

export default function NotFound() {
  return (
    <section className={styles.section} aria-labelledby="not-found-title">
      <div className={styles.content}>
        <Image className={styles.illustration} src="/images/not-found-robot.webp" width={768} height={512} sizes="(max-width: 540px) 260px, 340px" alt="A curious blue and lime robot trying to reconnect a loose cable" preload />
        <p className={styles.status}>ERROR 404</p>
        <h1 id="not-found-title" className={styles.title}>Page <span>not found.</span></h1>
        <p className={styles.description}>Here are some pages that might help you find what you&apos;re looking for.</p>
        <nav className={styles.pages} aria-label="Helpful pages">
          {pages.map((page) => (
            <a className={styles.card} href={page.href} key={page.href}>
              <span className={styles.icon}><page.icon size={18} aria-hidden="true" /></span>
              <span className={styles.copy}><span className={styles.cardTitle}>{page.title}</span><span className={styles.cardDescription}>{page.description}</span></span>
              <ArrowRightIcon className={styles.arrow} size={17} aria-hidden="true" />
            </a>
          ))}
        </nav>
        <Button asChild className={styles.home} variant="outline"><a href="/"><ArrowLeft size={17} aria-hidden="true" /> Go home</a></Button>
      </div>
    </section>
  );
}
