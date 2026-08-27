import { NextRequest, NextResponse } from 'next/server';
import { contentSecurityPolicy, SECURITY_HEADERS } from '@/lib/security.mjs';

const LEGACY_REDIRECTS = new Map([
  ['/contact-us', '/contact'],
  ['/blogs', '/resources'],
  ['/blog-detail', '/resources'],
  ['/softwares', '/software'],
  ['/softwares/communication-ease', '/software/canteen-management'],
  ['/softwares/scalable-resources', '/software/visitor-management'],
  ['/softwares/cost-effective', '/software/easytime-online'],
  ['/products/mini-ai-30-2', '/products/mini-ai-30'],
  ['/privacy-policy', '/privacy'],
  ['/terms-and-conditions', '/terms'],
  ['/how-ai-technology-is-changing-the-game-in-production-lines', '/resources#legacy-editorial'],
  ['/why-your-company-needs-easytime-the-benefits-of-rent-based-cloud-attendance-management', '/resources#legacy-editorial'],
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
]);

function secure(response: NextResponse, policy: string) {
  response.headers.set('Content-Security-Policy', policy);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) response.headers.set(name, value);
  return response;
}

export function proxy(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID());
  const policy = contentSecurityPolicy(nonce);

  if (process.env.NODE_ENV === 'production' && request.headers.get('x-forwarded-proto') === 'http') {
    const secureUrl = request.nextUrl.clone();
    secureUrl.protocol = 'https:';
    return secure(NextResponse.redirect(secureUrl, 308), policy);
  }

  const legacyDestination = LEGACY_REDIRECTS.get(request.nextUrl.pathname);
  if (legacyDestination) return secure(NextResponse.redirect(new URL(legacyDestination, request.url), 308), policy);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('Content-Security-Policy', policy);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  return secure(response, policy);
}

export const config = { matcher: '/:path*' };
