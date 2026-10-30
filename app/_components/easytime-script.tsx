'use client';

import Script from 'next/script';

export function EasytimeScript() {
  return <Script src="/easytime/script.js" strategy="afterInteractive" onReady={() => {
    (window as Window & { initializeEasytime?: () => void }).initializeEasytime?.();
  }} />;
}

export function EasytimeContactScript() {
  return <Script src="/easytime/contact-form.js" strategy="afterInteractive" onReady={() => {
    (window as Window & { initializeEasytimeContact?: () => void }).initializeEasytimeContact?.();
  }} />;
}
