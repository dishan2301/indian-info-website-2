import { headers } from 'next/headers';
import Script from 'next/script';

export async function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId || !/^G-[A-Z0-9]+$/.test(measurementId)) return null;
  const nonce = (await headers()).get('x-nonce') ?? undefined;
  const id = JSON.stringify(measurementId);

  return <>
    <Script nonce={nonce} src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
    <Script nonce={nonce} id="indian-infotech-analytics" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments)}
      gtag('js', new Date());
      gtag('config', ${id}, { anonymize_ip: true });
      document.addEventListener('click', function (event) {
        var link = event.target.closest && event.target.closest('a');
        if (!link) return;
        var href = link.getAttribute('href') || '';
        var name = href.indexOf('tel:') === 0 ? 'phone_click' : href.indexOf('mailto:') === 0 ? 'email_click' : href.indexOf('wa.me') !== -1 ? 'whatsapp_click' : href.indexOf('/contact') === 0 ? 'generate_lead' : '';
        if (name) gtag('event', name, { link_url: link.href });
      });
      document.addEventListener('submit', function () { gtag('event', 'form_submit'); });
    `}</Script>
  </>;
}
