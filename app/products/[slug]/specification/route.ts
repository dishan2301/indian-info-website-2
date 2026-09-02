import { products } from '@/app/content';

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return new Response('Product not found', { status: 404 });

  const text = [
    'INDIAN INFOTECH — PRODUCT SPECIFICATION SUMMARY',
    '',
    `Model: ${product.name}`,
    `Family: ${product.family}`,
    `Description: ${product.description}`,
    `Authentication: ${product.authentication}`,
    `Primary application: ${product.application}`,
    `Connectivity: ${product.connectivity}`,
    `Software compatibility: ${product.softwareCompatibility}`,
    `Deployment: ${product.deployment}`,
    `Catalogue status: ${product.status}`,
    '',
    'Important: This summary contains only currently published catalogue information. Confirm the exact model, variant, capacity, interfaces, environment, software version, accessories, warranty, and installation scope before procurement.',
    '',
    `Product page: /products/${product.slug}`,
    'Contact: info@indianinfotech.org',
  ].join('\n');

  return new Response(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': `attachment; filename="indian-infotech-${product.slug}-specification.txt"`,
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
