import { headers } from 'next/headers';
import Script from 'next/script';

export async function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const tagManagerId = process.env.NEXT_PUBLIC_GTM_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const validMeasurementId = measurementId && /^G-[A-Z0-9]+$/.test(measurementId) ? measurementId : undefined;
  const validTagManagerId = tagManagerId && /^GTM-[A-Z0-9]+$/.test(tagManagerId) ? tagManagerId : undefined;
  const validMetaPixelId = metaPixelId && /^\d{5,20}$/.test(metaPixelId) ? metaPixelId : undefined;
  if (!validMeasurementId && !validTagManagerId && !validMetaPixelId) return null;
  const nonce = (await headers()).get('x-nonce') ?? undefined;
  const analyticsId = validTagManagerId ?? validMeasurementId;

  return <>
    {analyticsId ? <><Script nonce={nonce} src={validTagManagerId ? `https://www.googletagmanager.com/gtm.js?id=${validTagManagerId}` : `https://www.googletagmanager.com/gtag/js?id=${validMeasurementId}`} strategy="afterInteractive" />
    <Script nonce={nonce} id="indian-infotech-analytics" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments)}
      ${validTagManagerId ? `dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });` : `gtag('js', new Date()); gtag('config', ${JSON.stringify(validMeasurementId)}, { anonymize_ip: true });`}
      document.addEventListener('click', function (event) {
        var link = event.target.closest && event.target.closest('a');
        if (!link) return;
        var href = link.getAttribute('href') || '';
        var name = href.indexOf('tel:') === 0 ? 'phone_click' : href.indexOf('mailto:') === 0 ? 'email_click' : href.indexOf('wa.me') !== -1 ? 'whatsapp_click' : href.indexOf('/contact') === 0 ? 'generate_lead' : '';
        if (name) ${validTagManagerId ? `dataLayer.push({ event: name, link_url: link.href });` : `gtag('event', name, { link_url: link.href });`}
      });
      document.addEventListener('submit', function () { ${validTagManagerId ? `dataLayer.push({ event: 'form_submit' });` : `gtag('event', 'form_submit');`} });
    `}</Script></> : null}
    {validMetaPixelId ? <Script nonce={nonce} id="indian-infotech-meta-pixel" strategy="afterInteractive">{`
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', ${JSON.stringify(validMetaPixelId)}); fbq('track', 'PageView');
    `}</Script> : null}
  </>;
}
