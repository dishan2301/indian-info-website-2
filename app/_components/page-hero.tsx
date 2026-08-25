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
  const industryMedia: Record<string, { desktop: string; mobile: string; tone: 'light' }> = {
    manufacturing: { desktop: '/campaign/industries/manufacturing-desktop-v2.webp', mobile: '/campaign/industries/manufacturing-mobile-v2.webp', tone: 'light' },
    'corporate offices': { desktop: '/campaign/industries/corporate-desktop-v2.webp', mobile: '/campaign/industries/corporate-mobile-v2.webp', tone: 'light' },
    'pharmaceutical & research': { desktop: '/campaign/industries/pharma-desktop-v2.webp', mobile: '/campaign/industries/pharma-mobile-v2.webp', tone: 'light' },
    healthcare: { desktop: '/campaign/industries/healthcare-desktop-v2.webp', mobile: '/campaign/industries/healthcare-mobile-v2.webp', tone: 'light' },
    education: { desktop: '/campaign/industries/education-desktop-v2.webp', mobile: '/campaign/industries/education-mobile-v2.webp', tone: 'light' },
    construction: { desktop: '/campaign/industries/construction-desktop-v2.webp', mobile: '/campaign/industries/construction-mobile-v2.webp', tone: 'light' },
    government: { desktop: '/campaign/industries/government-desktop-v2.webp', mobile: '/campaign/industries/government-mobile-v2.webp', tone: 'light' },
    banking: { desktop: '/campaign/industries/banking-desktop-v2.webp', mobile: '/campaign/industries/banking-mobile-v2.webp', tone: 'light' },
    logistics: { desktop: '/campaign/industries/logistics-desktop-v2.webp', mobile: '/campaign/industries/logistics-mobile-v2.webp', tone: 'light' },
    retail: { desktop: '/campaign/industries/retail-desktop-v2.webp', mobile: '/campaign/industries/retail-mobile-v2.webp', tone: 'light' },
    hospitality: { desktop: '/campaign/industries/hospitality-desktop-v2.webp', mobile: '/campaign/industries/hospitality-mobile-v2.webp', tone: 'light' },
  };
  const specificIndustryMedia = key.includes('pharmaceutical') ? industryMedia['pharmaceutical & research'] : key.includes('industr') ? industryMedia[title.toLowerCase()] : undefined;
  const media = specificIndustryMedia || (key.includes('software') || key.includes('hrms') || key.includes('developer') || key.includes('integration') || key.includes('platform')
    ? { desktop: '/campaign/hero/security-desktop-v2.webp', mobile: '/campaign/hero/security-mobile-v2.webp', tone: 'light' }
    : key.includes('industry') || key.includes('pharma') || key.includes('workforce')
      ? { desktop: '/campaign/hero/workforce-desktop-v2.webp', mobile: '/campaign/hero/workforce-mobile-v2.webp', tone: 'dark' }
      : key.includes('solution') || key.includes('access') || key.includes('entrance')
        ? { desktop: '/campaign/hero/access-desktop-v2.webp', mobile: '/campaign/hero/access-mobile-v2.webp', tone: 'light' }
        : key.includes('technology') || key.includes('support') || key.includes('resource') || key.includes('academy') || key.includes('trust') || key.includes('legal')
          ? { desktop: '/campaign/hero/innovation-desktop-v2.webp', mobile: '/campaign/hero/innovation-mobile-v2.webp', tone: 'dark' }
          : { desktop: '/campaign/hero/identity-desktop-v2.webp', mobile: '/campaign/hero/identity-mobile-v2.webp', tone: 'dark' });
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
