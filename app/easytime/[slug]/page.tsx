import { notFound } from 'next/navigation';
import { EasytimePage } from '../../_components/easytime-page';

const slugs = ['blog', 'blog-ai-growth-insights', 'blog-actionable-insights', 'blog-clarity', 'newsletter', 'software-tour'];

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export default async function EasytimeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slugs.includes(slug)) notFound();
  return <EasytimePage slug={slug} />;
}

