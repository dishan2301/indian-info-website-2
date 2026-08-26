import type { NextConfig } from 'next';

const hrmsLegacyRedirects = [
  ['/hrms-payroll/core-hr-and-payroll', '/hrms-payroll/core-hr-payroll'],
  ['/hrms-payroll/training-and-induction', '/hrms-payroll/training-induction'],
  ['/hrms-payroll/performace-management-system', '/hrms-payroll/performance-management'],
  ['/hrms-payroll/employee-self-services', '/hrms-payroll/employee-self-service'],
  ['/hrms-payroll/employee-lifecycle', '/hrms-payroll/employee-onboarding'],
  ['/hrms-payroll/employee-lifecycle/employee-onboard', '/hrms-payroll/employee-onboarding'],
  ['/hrms-payroll/employee-lifecycle/exit-process-simplified', '/hrms-payroll/exit-process'],
  ['/hrms-payroll/core-hr-and-payroll/time-and-attendance', '/hrms-payroll/time-attendance'],
  ['/hrms-payroll/core-hr-and-payroll/leave-management', '/hrms-payroll/leave-management'],
  ['/hrms-payroll/core-hr-and-payroll/hris-payroll', '/hrms-payroll/hris-payroll'],
  ['/hrms-payroll/core-hr-and-payroll/employee-asset', '/hrms-payroll/employee-asset'],
  ['/hrms-payroll/core-hr-and-payroll/claim-and-reambarcement', '/hrms-payroll/claim-reimbursement'],
  ['/hrms-payroll/core-hr-and-payroll/document-management', '/hrms-payroll/document-management'],
] as const;

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/blogs', destination: '/resources', permanent: true },
      { source: '/blog-detail', destination: '/resources', permanent: true },
      { source: '/softwares', destination: '/software', permanent: true },
      { source: '/softwares/communication-ease', destination: '/software/canteen-management', permanent: true },
      { source: '/softwares/scalable-resources', destination: '/software/visitor-management', permanent: true },
      { source: '/softwares/cost-effective', destination: '/software/easytime-online', permanent: true },
      { source: '/products/mini-ai-30-2', destination: '/products/mini-ai-30', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/terms-and-conditions', destination: '/terms', permanent: true },
      { source: '/how-ai-technology-is-changing-the-game-in-production-lines', destination: '/resources#legacy-editorial', permanent: true },
      { source: '/why-your-company-needs-easytime-the-benefits-of-rent-based-cloud-attendance-management', destination: '/resources#legacy-editorial', permanent: true },
      ...hrmsLegacyRedirects.map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },
};

export default nextConfig;
