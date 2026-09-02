import { softwarePlatforms } from '@/app/content';
import { companyProfile } from '@/lib/company-profile';

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const software = softwarePlatforms.find((item) => item.slug === slug);
  if (!software) return new Response('Software not found', { status: 404 });

  const facts = software.publishedFacts?.map((fact) => `${fact.label}: ${fact.value}`) ?? ['No detailed brochure facts are published for this platform.'];
  const text = [
    'INDIAN INFOTECH — SOFTWARE SPECIFICATION SUMMARY', '',
    `Platform: ${software.name}`,
    `Category: ${software.category}`,
    `Summary: ${software.summary}`, '',
    'PUBLISHED SCOPE', ...facts, '',
    `Modules: ${software.modules.join(', ')}`,
    `Workflow: ${software.workflow.join(' → ')}`, '',
    `Evidence source: ${software.evidenceSource ?? 'Published Indian Infotech software catalogue'}`, '',
    'Important: Confirm the exact software version, licensed modules, device compatibility, capacity, interface, hosting, security, implementation, and support scope before procurement.', '',
    `Software page: /software/${software.slug}`,
    `Contact: ${companyProfile.email}`,
  ].join('\n');

  return new Response(text, { headers: {
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Disposition': `attachment; filename="indian-infotech-${software.slug}-specification.txt"`,
    'X-Content-Type-Options': 'nosniff',
  } });
}
