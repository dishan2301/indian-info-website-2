/**
 * Authoritative cutover map. Runtime redirects and acceptance tests consume the
 * same records so launch documentation cannot drift from deployed behavior.
 */
export const legacyRoutes = [
  { source: '/contact-us', destination: '/contact', equivalence: 'direct' },
  { source: '/about', destination: '/about-us', equivalence: 'direct' },
  { source: '/industries/textiles', destination: '/industries/textile', equivalence: 'direct' },
  { source: '/industries/food-industries', destination: '/industries/food', equivalence: 'direct' },
  { source: '/blogs', destination: '/insights', equivalence: 'direct' },
  { source: '/blog-detail', destination: '/insights', equivalence: 'closest-relevant' },
  { source: '/softwares', destination: '/software', equivalence: 'direct' },
  { source: '/softwares/communication-ease', destination: '/software/canteen-management', equivalence: 'direct' },
  { source: '/softwares/scalable-resources', destination: '/software/visitor-management', equivalence: 'direct' },
  { source: '/softwares/cost-effective', destination: '/software/easytime-online', equivalence: 'direct' },
  { source: '/products/mini-ai-30-2', destination: '/products/mini-ai-30', equivalence: 'direct' },
  { source: '/privacy-policy', destination: '/privacy', equivalence: 'direct' },
  { source: '/terms-and-conditions', destination: '/terms', equivalence: 'direct' },
  { source: '/how-ai-technology-is-changing-the-game-in-production-lines', destination: '/insights/ai-in-production-lines', equivalence: 'direct' },
  { source: '/why-your-company-needs-easytime-the-benefits-of-rent-based-cloud-attendance-management', destination: '/insights/easytime-cloud-attendance-benefits', equivalence: 'direct' },
  { source: '/hrms-payroll/core-hr-and-payroll', destination: '/hrms-payroll/core-hr-payroll', equivalence: 'direct' },
  { source: '/hrms-payroll/training-and-induction', destination: '/hrms-payroll/training-induction', equivalence: 'direct' },
  { source: '/hrms-payroll/performace-management-system', destination: '/hrms-payroll/performance-management', equivalence: 'direct' },
  { source: '/hrms-payroll/employee-self-services', destination: '/hrms-payroll/employee-self-service', equivalence: 'direct' },
  { source: '/hrms-payroll/employee-lifecycle', destination: '/hrms-payroll/employee-onboarding', equivalence: 'closest-relevant' },
  { source: '/hrms-payroll/employee-lifecycle/employee-onboard', destination: '/hrms-payroll/employee-onboarding', equivalence: 'direct' },
  { source: '/hrms-payroll/employee-lifecycle/exit-process-simplified', destination: '/hrms-payroll/exit-process', equivalence: 'direct' },
  { source: '/hrms-payroll/core-hr-and-payroll/time-and-attendance', destination: '/hrms-payroll/time-attendance', equivalence: 'direct' },
  { source: '/hrms-payroll/core-hr-and-payroll/leave-management', destination: '/hrms-payroll/leave-management', equivalence: 'direct' },
  { source: '/hrms-payroll/core-hr-and-payroll/hris-payroll', destination: '/hrms-payroll/hris-payroll', equivalence: 'direct' },
  { source: '/hrms-payroll/core-hr-and-payroll/employee-asset', destination: '/hrms-payroll/employee-asset', equivalence: 'direct' },
  { source: '/hrms-payroll/core-hr-and-payroll/claim-and-reambarcement', destination: '/hrms-payroll/claim-reimbursement', equivalence: 'direct' },
  { source: '/hrms-payroll/core-hr-and-payroll/document-management', destination: '/hrms-payroll/document-management', equivalence: 'direct' },
];

export const legacyRedirectMap = new Map(legacyRoutes.map(({ source, destination }) => [source, destination]));
