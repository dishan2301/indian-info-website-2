import type { Metadata } from 'next';

export const SITE_NAME = 'Indian Infotech';
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://indianinfotech.org').replace(/\/$/, '');
export const IS_INDEXABLE = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === 'production' : process.env.NODE_ENV === 'production';
export const DEFAULT_OG_IMAGE = '/og.png';

export function absoluteUrl(path = '/') {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}): Metadata {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const robots = noIndex || !IS_INDEXABLE
    ? { index: false, follow: !noIndex }
    : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const, 'max-snippet': -1, 'max-video-preview': -1 } };

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    robots,
    openGraph: { title: fullTitle, description, url: path, siteName: SITE_NAME, locale: 'en_IN', type, images: [{ url: image, alt: fullTitle }] },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [image] },
  };
}
