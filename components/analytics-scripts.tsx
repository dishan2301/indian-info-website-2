'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { COOKIE_CONSENT_KEY } from './cookie-consent';

type AnalyticsScriptsProps = {
  measurementId?: string;
  tagManagerId?: string;
  metaPixelId?: string;
  nonce?: string;
};

export function AnalyticsScripts({ measurementId, tagManagerId, metaPixelId, nonce }: AnalyticsScriptsProps) {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const updateConsent = () => {
      try {
        setHasConsent(localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted');
      } catch {
        setHasConsent(false);
      }
    };
    updateConsent();
    window.addEventListener('cookie-consent-accepted', updateConsent);
    return () => window.removeEventListener('cookie-consent-accepted', updateConsent);
  }, []);

  if (!hasConsent) return null;
  const analyticsId = tagManagerId ?? measurementId;

  return <>
    {analyticsId ? <><Script nonce={nonce} src={tagManagerId ? `https://www.googletagmanager.com/gtm.js?id=${tagManagerId}` : `https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
    <Script nonce={nonce} id="indian-infotech-analytics" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments)}
      ${tagManagerId ? `dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });` : `gtag('js', new Date()); gtag('config', ${JSON.stringify(measurementId)}, { anonymize_ip: true });`}
      document.addEventListener('click', function (event) {
        var link = event.target.closest && event.target.closest('a');
        if (!link) return;
        var href = link.getAttribute('href') || '';
        var name = href.indexOf('tel:') === 0 ? 'phone_click' : href.indexOf('mailto:') === 0 ? 'email_click' : href.indexOf('wa.me') !== -1 ? 'whatsapp_click' : href.indexOf('/contact') === 0 ? 'generate_lead' : '';
        if (name) ${tagManagerId ? `dataLayer.push({ event: name, link_url: link.href });` : `gtag('event', name, { link_url: link.href });`}
      });
      document.addEventListener('submit', function () { ${tagManagerId ? `dataLayer.push({ event: 'form_submit' });` : `gtag('event', 'form_submit');`} });
    `}</Script></> : null}
    {metaPixelId ? <Script nonce={nonce} id="indian-infotech-meta-pixel" strategy="afterInteractive">{`
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', ${JSON.stringify(metaPixelId)}); fbq('track', 'PageView');
    `}</Script> : null}
  </>;
}
