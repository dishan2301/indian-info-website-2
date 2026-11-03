'use client';

import dynamic from 'next/dynamic';

const SiteFooter = dynamic(() => import('./site-footer').then((module) => module.SiteFooter), { ssr: false });

export function DeferredSiteFooter() {
  return <SiteFooter />;
}
