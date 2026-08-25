import type { MetadataRoute } from 'next';

const routes = ['', '/platform', '/products', '/industries/pharma', '/about', '/contact', '/privacy', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://indianinfotech.org';
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/platform' || route === '/products' ? 0.9 : 0.7,
  }));
}
