import Image from 'next/image';
import Link from 'next/link';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  marker?: string;
  breadcrumbs?: readonly { label: string; href?: string }[];
};

export function PageHero({ eyebrow, title, description, marker = 'II / SYSTEMS', breadcrumbs }: PageHeroProps) {
  const trail = breadcrumbs ?? [{ label: eyebrow }];
  const key = eyebrow.toLowerCase();
  const media = key.includes('software') || key.includes('hrms') || key.includes('developer') || key.includes('integration') || key.includes('platform')
    ? { desktop: '/campaign/hero/security-desktop-v2.webp', mobile: '/campaign/hero/security-mobile-v2.webp', tone: 'light' }
    : key.includes('industry') || key.includes('pharma') || key.includes('workforce')
      ? { desktop: '/campaign/hero/workforce-desktop-v2.webp', mobile: '/campaign/hero/workforce-mobile-v2.webp', tone: 'dark' }
      : key.includes('solution') || key.includes('access') || key.includes('entrance')
        ? { desktop: '/campaign/hero/access-desktop-v2.webp', mobile: '/campaign/hero/access-mobile-v2.webp', tone: 'light' }
        : key.includes('technology') || key.includes('support') || key.includes('resource') || key.includes('academy') || key.includes('trust') || key.includes('legal')
          ? { desktop: '/campaign/hero/innovation-desktop-v2.webp', mobile: '/campaign/hero/innovation-mobile-v2.webp', tone: 'dark' }
          : { desktop: '/campaign/hero/identity-desktop-v2.webp', mobile: '/campaign/hero/identity-mobile-v2.webp', tone: 'dark' };
  return (
    <>
      <section className={`page-hero page-hero-${media.tone}`}>
        <div className="page-hero-media page-hero-media-desktop"><Image src={media.desktop} alt="" fill priority sizes="100vw" /></div>
        <div className="page-hero-media page-hero-media-mobile"><Image src={media.mobile} alt="" fill priority sizes="100vw" /></div>
        <div className="page-hero-overlay" aria-hidden="true" />
        <div className="page-hero-copy">
          <p className="eyebrow"><span /> {eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="page-marker" aria-hidden="true"><span>{marker}</span><i /></div>
      </section>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        {trail.map((item) => <span className="breadcrumb-item" key={`${item.href ?? 'current'}-${item.label}`}><span aria-hidden="true">/</span>{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}
      </nav>
    </>
  );
}
