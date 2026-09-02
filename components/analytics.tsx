import { headers } from 'next/headers';
import Script from 'next/script';

export async function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const tagManagerId = process.env.NEXT_PUBLIC_GTM_ID;
  const validMeasurementId = measurementId && /^G-[A-Z0-9]+$/.test(measurementId) ? measurementId : undefined;
  const validTagManagerId = tagManagerId && /^GTM-[A-Z0-9]+$/.test(tagManagerId) ? tagManagerId : undefined;
  if (!validMeasurementId && !validTagManagerId) return null;
  const nonce = (await headers()).get('x-nonce') ?? undefined;
  const id = JSON.stringify(validTagManagerId ?? validMeasurementId);

  return <>
    <Script nonce={nonce} src={validTagManagerId ? `https://www.googletagmanager.com/gtm.js?id=${validTagManagerId}` : `https://www.googletagmanager.com/gtag/js?id=${validMeasurementId}`} strategy="afterInteractive" />
    <Script nonce={nonce} id="indian-infotech-analytics" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments)}
      ${validTagManagerId ? `dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });` : `gtag('js', new Date()); gtag('config', ${id}, { anonymize_ip: true });`}
      document.addEventListener('click', function (event) {
        var link = event.target.closest && event.target.closest('a');
        if (!link) return;
        var href = link.getAttribute('href') || '';
        var name = href.indexOf('tel:') === 0 ? 'phone_click' : href.indexOf('mailto:') === 0 ? 'email_click' : href.indexOf('wa.me') !== -1 ? 'whatsapp_click' : href.indexOf('/contact') === 0 ? 'generate_lead' : '';
        if (name) ${validTagManagerId ? `dataLayer.push({ event: name, link_url: link.href });` : `gtag('event', name, { link_url: link.href });`}
      });
      document.addEventListener('submit', function () { ${validTagManagerId ? `dataLayer.push({ event: 'form_submit' });` : `gtag('event', 'form_submit');`} });
    `}</Script>
  </>;
}
