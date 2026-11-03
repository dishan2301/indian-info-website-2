import { StructuredData } from '@/components/structured-data';
import { SITE_URL } from '@/lib/site';

type Crumb = { name: string; path: string };

export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const schema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: `${SITE_URL}${item.path}` })) };
  return <StructuredData data={schema} />;
}
