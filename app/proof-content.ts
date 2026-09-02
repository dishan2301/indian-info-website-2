export type EvidenceStatus = 'approved' | 'awaiting-client-approval' | 'awaiting-source';

export type Testimonial = {
  id: string;
  quote: string;
  person: string;
  title: string;
  company: string;
  industry: string;
  product: string;
  logo: string;
  photo?: string;
  permissionReference: string;
  evidenceStatus: 'approved';
};

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  problem: string;
  solution: string;
  deployment: string;
  outcome: string;
  productSlugs: readonly string[];
  logo: string;
  pdf?: string;
  permissionReference: string;
  evidenceStatus: 'approved';
};

// Publication gate: only records with named attribution, evidence, and explicit
// public permission belong in these arrays. No qualifying records were supplied.
export const approvedTestimonials: readonly Testimonial[] = [];
export const approvedCaseStudies: readonly CaseStudy[] = [];

export const evidenceQueue = [
  { id: 'case-studies', label: '3–5 named case studies', requirement: 'Client permission, problem, solution, deployment size, measurable outcome, logo, and PDF approval', owner: 'Sales and client success', status: 'awaiting-source' },
  { id: 'testimonials', label: 'Named testimonials', requirement: 'Person, title, company, quote, result context, photo or logo, and written display permission', owner: 'Sales and client success', status: 'awaiting-client-approval' },
  { id: 'industry-metrics', label: 'Industry deployment metrics', requirement: 'Source record, reporting period, calculation method, and owner approval', owner: 'Operations', status: 'awaiting-source' },
  { id: 'certificates', label: 'Certificates and quality policy', requirement: 'Current PDF, scope, certificate number, issuer, issue and expiry dates, and publication approval', owner: 'Quality', status: 'awaiting-source' },
] as const satisfies readonly { id: string; label: string; requirement: string; owner: string; status: EvidenceStatus }[];
