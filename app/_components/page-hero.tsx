import Image from 'next/image';
import Link from 'next/link';
import { StructuredData } from '@/components/structured-data';
import { absoluteUrl } from '@/lib/site';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  marker?: string;
  breadcrumbs?: readonly { label: string; href?: string }[];
  path?: string;
};

export function PageHero({ eyebrow, title, description, marker = 'II / SYSTEMS', breadcrumbs, path }: PageHeroProps) {
  const trail = breadcrumbs ?? [{ label: eyebrow }];
  const breadcrumbSchema = path ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      ...trail.map((item, index) => ({ '@type': 'ListItem', position: index + 2, name: item.label, item: absoluteUrl(item.href ?? path) })),
    ],
  } : null;
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
  const subject = `${key} ${title.toLowerCase()}`;
  const campaignMedia = subject.includes('hrms') || subject.includes('payroll') || subject.includes('employee self')
    ? { desktop: '/campaign/product-moments/hrms-payroll-v2.png', mobile: '/campaign/product-moments/hrms-payroll-v2.png', tone: 'light' as const, copySide: 'left' as const }
    : subject.includes('visitor') || subject.includes('reception') || subject.includes('guest')
      ? { desktop: '/campaign/product-moments/visitor-management-v2.png', mobile: '/campaign/product-moments/visitor-management-v2.png', tone: 'light' as const, copySide: 'left' as const }
      : subject.includes('canteen') || subject.includes('meal')
        ? { desktop: '/campaign/product-moments/canteen-management-v1.png', mobile: '/campaign/product-moments/canteen-management-v1.png', tone: 'light' as const }
        : subject.includes('mediaa') || subject.includes('signage')
          ? { desktop: '/campaign/product-moments/mediaa-wave-v1.png', mobile: '/campaign/product-moments/mediaa-wave-v1.png', tone: 'light' as const }
          : subject.includes('entrance') || subject.includes('turnstile') || subject.includes('barrier')
            ? { desktop: '/campaign/product-moments/entrance-control-v2.png', mobile: '/campaign/product-moments/entrance-control-v2.png', tone: 'light' as const }
            : subject.includes('interlock') || subject.includes('access control') || subject.includes('door control') || subject.includes('clean-room')
              ? { desktop: '/campaign/product-moments/door-interlock-v1.png', mobile: '/campaign/product-moments/door-interlock-v1.png', tone: 'light' as const }
              : subject.includes('industrial ai') || subject.includes('computer vision') || subject.includes('engineering') || subject.includes('technology') || subject.includes('integration') || subject.includes('developer')
                ? { desktop: '/campaign/product-moments/industrial-ai-v2.png', mobile: '/campaign/product-moments/industrial-ai-v2.png', tone: 'light' as const, copySide: 'left' as const }
                : subject.includes('contract') || subject.includes('labor') || subject.includes('labour') || subject.includes('attendance') || subject.includes('workforce') || subject.includes('easytime')
                  ? { desktop: '/campaign/product-moments/contract-workforce-v1.png', mobile: '/campaign/product-moments/contract-workforce-v1.png', tone: 'light' as const }
                  : key.includes('support')
                    ? { desktop: '/company/support-cta.webp', mobile: '/company/support-cta.webp', tone: 'light' as const }
                    : key.includes('company') || key.includes('customer')
                      ? { desktop: '/company/about-banner.webp', mobile: '/company/about-banner.webp', tone: 'light' as const }
                      : key.includes('software') || key.includes('platform')
                        ? { desktop: '/campaign/product-moments/mediaa-wave-v1.png', mobile: '/campaign/product-moments/mediaa-wave-v1.png', tone: 'light' as const }
                        : key.includes('industry') || key.includes('pharma')
                          ? { desktop: '/campaign/industries/pharma-desktop-v2.webp', mobile: '/campaign/industries/pharma-mobile-v2.webp', tone: 'light' as const }
                          : key.includes('solution') || key.includes('product')
                            ? { desktop: '/campaign/product-moments/entrance-control-v2.png', mobile: '/campaign/product-moments/entrance-control-v2.png', tone: 'light' as const }
                            : key.includes('technology') || key.includes('resource') || key.includes('academy') || key.includes('trust')
                              ? { desktop: '/campaign/product-moments/industrial-ai-v2.png', mobile: '/campaign/product-moments/industrial-ai-v2.png', tone: 'light' as const, copySide: 'left' as const }
                              : { desktop: '/campaign/hero/identity-desktop-v2.webp', mobile: '/campaign/hero/identity-mobile-v2.webp', tone: 'light' as const };
  const media = specificIndustryMedia || campaignMedia;
  return (
    <>
      {breadcrumbSchema ? <StructuredData data={breadcrumbSchema} /> : null}
      <section className={`page-hero page-hero-${media.tone} ${'copySide' in media && media.copySide === 'right' ? 'page-hero-copy-right' : ''}`}>
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
