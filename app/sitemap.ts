import type { MetadataRoute } from 'next';
import { products, softwarePlatforms } from './content';

const routes = ['', '/platform', '/products', '/compare', '/software', '/solutions', '/industries', '/industries/pharma', '/technologies', '/engineering', '/integrations', '/resources', '/support', '/search', '/company', '/about', '/contact', '/solution-builder', '/privacy', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://indianinfotech.org';
  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/platform' || route === '/products' ? 0.9 : 0.7,
  }));
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  const softwareRoutes = softwarePlatforms.map((software) => ({
    url: `${baseUrl}/software/${software.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  return [...staticRoutes, ...productRoutes, ...softwareRoutes];
}
