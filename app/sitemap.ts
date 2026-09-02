import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { hrmsModules, industryProfiles, products, softwarePlatforms, solutionProfiles } from './content';
import { insights } from './insights/content';
import { seoLandingPages } from './seo-landing-content';
import { approvedCaseStudies } from './proof-content';

const routes = ['', '/platform', '/products', '/compare', '/software', '/solutions', '/industries', '/technologies', '/engineering', '/integrations', '/developers', '/knowledge', '/resources', '/resources/procurement', '/insights', '/support', '/case-studies', '/case-studies/contribute', '/testimonials', '/partners', '/academy', '/certification', '/trust', '/trust/security', '/trust/responsible-disclosure', '/trust/quality-policy', '/company', '/about-us', '/contact', '/solution-builder', '/privacy', '/cookies', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/platform' || route === '/products' ? 0.9 : 0.7,
  }));
  const productRoutes = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  const softwareRoutes = softwarePlatforms.map((software) => ({
    url: `${SITE_URL}/software/${software.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  const hrmsRoutes = hrmsModules.map((module) => ({
    url: `${SITE_URL}/hrms-payroll/${module.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));
  const solutionRoutes = solutionProfiles.map((item) => ({ url: `${SITE_URL}/solutions/${item.slug}`, changeFrequency: 'monthly' as const, priority: 0.8 }));
  const industryRoutes = industryProfiles.map((item) => ({ url: `${SITE_URL}/industries/${item.slug}`, changeFrequency: 'monthly' as const, priority: 0.8 }));
  const insightRoutes = insights.map((item) => ({ url: `${SITE_URL}/insights/${item.slug}`, lastModified: new Date(item.date), changeFrequency: 'monthly' as const, priority: 0.7 }));
  const landingRoutes = seoLandingPages.map((item) => ({ url: `${SITE_URL}/${item.slug}`, changeFrequency: 'monthly' as const, priority: 0.9 }));
  const caseStudyRoutes = approvedCaseStudies.map((item) => ({ url: `${SITE_URL}/case-studies/${item.slug}`, changeFrequency: 'monthly' as const, priority: 0.75 }));
  return [...staticRoutes, ...landingRoutes, ...productRoutes, ...softwareRoutes, { url: `${SITE_URL}/hrms-payroll`, changeFrequency: 'monthly' as const, priority: 0.85 }, ...hrmsRoutes, ...solutionRoutes, ...industryRoutes, ...insightRoutes, ...caseStudyRoutes];
}
