import { NextRequest, NextResponse } from 'next/server';
import { contentSecurityPolicy, SECURITY_HEADERS } from '@/lib/security.mjs';
import { legacyRedirectMap } from '@/lib/legacy-routes.mjs';

function secure(response: NextResponse, policy: string) {
  response.headers.set('Content-Security-Policy', policy);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) response.headers.set(name, value);
  return response;
}

export function proxy(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID());
  const policy = contentSecurityPolicy(nonce);

  if (process.env.VERCEL && process.env.NODE_ENV === 'production' && request.headers.get('x-forwarded-proto') === 'http') {
    const secureUrl = request.nextUrl.clone();
    secureUrl.protocol = 'https:';
    return secure(NextResponse.redirect(secureUrl, 308), policy);
  }

  const legacyDestination = legacyRedirectMap.get(request.nextUrl.pathname);
  if (legacyDestination) return secure(NextResponse.redirect(new URL(legacyDestination, request.url), 301), policy);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('Content-Security-Policy', policy);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return secure(response, policy);
}

export const config = { matcher: '/:path*' };
