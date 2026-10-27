import type { NextConfig } from 'next';
import { SECURITY_HEADERS } from './lib/security.mjs';

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: 'security',
  },
  async redirects() {
    return [
      { source: '/hrms-payroll/on-boarding', destination: '/hrms-payroll/onboarding', permanent: true },
      { source: '/hrms-payroll/time-sheet', destination: '/hrms-payroll/timesheet', permanent: true },
      { source: '/hrms-payroll/core-hr-payroll', destination: '/hrms-payroll/core-hris-payroll', permanent: true },
      { source: '/hrms-payroll/claim-reimbursement', destination: '/hrms-payroll/expense', permanent: true },
      { source: '/hrms-payroll/document-management', destination: '/hrms-payroll/core-hris-payroll', permanent: true },
      { source: '/hrms-payroll/employee-asset', destination: '/hrms-payroll/core-hris-payroll', permanent: true },
      { source: '/hrms-payroll/hris-payroll', destination: '/hrms-payroll/core-hris-payroll', permanent: true },
      { source: '/hrms-payroll/leave-management', destination: '/hrms-payroll/leave', permanent: true },
      { source: '/hrms-payroll/time-attendance', destination: '/hrms-payroll/attendance', permanent: true },
      { source: '/hrms-payroll/employee-self-service', destination: '/hrms-payroll/ess', permanent: true },
      { source: '/hrms-payroll/performance-management', destination: '/hrms-payroll/pms', permanent: true },
      { source: '/hrms-payroll/fixed-asset', destination: '/hrms-payroll/core-hris-payroll', permanent: true },
      { source: '/hrms-payroll/employee-onboarding', destination: '/hrms-payroll/onboarding', permanent: true },
      { source: '/hrms-payroll/exit-process', destination: '/hrms-payroll/off-boarding', permanent: true },
    ];
  },
  images: {
    remotePatterns: [{protocol: 'https', hostname: 'cdn.sanity.io'}],
  },
  async headers() {
    const securityHeaders = Object.entries(SECURITY_HEADERS).map(([key, value]) => ({ key, value }));
    return [
      { source: '/:path*', headers: securityHeaders },
    ];
  },
};

export default nextConfig;
