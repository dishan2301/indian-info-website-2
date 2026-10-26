import type { NextConfig } from 'next';
import { SECURITY_HEADERS } from './lib/security.mjs';

const nextConfig: NextConfig = {
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
