type BreadcrumbItem = { name: string; url: string };

export function JsonLdBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const schema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.url })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function JsonLdFaq({ items }: { items: { question: string; answer: string }[] }) {
  const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function JsonLdProduct({ name, description, image, sku, category, url }: { name: string; description: string; image: string; sku: string; category: string; url: string }) {
  const schema = { '@context': 'https://schema.org', '@type': 'Product', name, description, image, sku, category, brand: { '@type': 'Brand', name: 'Indian Infotech' }, manufacturer: { '@type': 'Organization', name: 'Indian Infotech', url: 'https://indianinfotech.org' }, offers: { '@type': 'Offer', url, priceCurrency: 'INR', availability: 'https://schema.org/InStock', seller: { '@type': 'Organization', name: 'Indian Infotech' } } };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
