import type { MetadataRoute } from 'next';
import { IS_INDEXABLE, SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  if (!IS_INDEXABLE) return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/_next/', '/admin/', '/dashboard/', '/search?*', '/compare?*'] },
      { userAgent: 'GPTBot', allow: '/' }, { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' }, { userAgent: 'Google-Extended', allow: '/' }, { userAgent: 'Applebot', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
