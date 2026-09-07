import type { NextConfig } from 'next';
import { SECURITY_HEADERS } from './lib/security.mjs';

const nextConfig: NextConfig = {
  async headers() {
    const securityHeaders = Object.entries(SECURITY_HEADERS).map(([key, value]) => ({ key, value }));
    return [
      { source: '/_next/static/:path*', headers: [...securityHeaders, { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/:path*', headers: securityHeaders },
    ];
  },
};

export default nextConfig;
