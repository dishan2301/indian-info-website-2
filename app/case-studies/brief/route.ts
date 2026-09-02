import { caseStudyBriefSections } from '@/app/proof-content';
import { companyProfile } from '@/lib/company-profile';

export function GET() {
  const text = [
    'INDIAN INFOTECH — CASE STUDY EVIDENCE BRIEF', '',
    'Complete this brief with source-backed facts. Do not include confidential, personal, security-sensitive, or third-party information unless it is necessary and approved for review.', '',
    ...caseStudyBriefSections.flatMap((section) => [section.title.toUpperCase(), ...section.prompts.map((prompt) => `- ${prompt}:`), '']),
    'PUBLICATION GATE',
    '- Named facts and assets will not be published until the customer approver and Indian Infotech evidence owner approve the final draft.',
    '- Every metric must retain its baseline, period, unit, source, calculation method, and validator.',
    '- Submit the completed brief and approved assets through the case-study contact route.', '',
    `Contact: ${companyProfile.email}`,
  ].join('\n');
  return new Response(text, { headers: {
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Disposition': 'attachment; filename="indian-infotech-case-study-evidence-brief.txt"',
    'X-Content-Type-Options': 'nosniff',
  } });
}
