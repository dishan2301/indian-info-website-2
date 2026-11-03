'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export const COOKIE_CONSENT_KEY = 'indian-infotech-cookie-consent';

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      setIsOpen(localStorage.getItem(COOKIE_CONSENT_KEY) !== 'accepted');
    } catch {
      setIsOpen(true);
    }
  }, []);

  function acceptCookies() {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    } catch {
      // The choice still applies for this page when browser storage is unavailable.
    }
    window.dispatchEvent(new Event('cookie-consent-accepted'));
    setIsOpen(false);
  }

  if (!isOpen) return null;

  return <aside className="cookie-consent" aria-label="Cookie consent" role="region">
    <div className="cookie-consent-icon" aria-hidden="true">🍪</div>
    <div className="cookie-consent-copy">
      <strong>We value your privacy</strong>
      <p>We use cookies and similar technologies to understand which pages you visit, how long you stay, and which buttons, links, or forms you use. This helps us improve our website and services.</p>
      <Link href="/cookies">Read our Cookie Policy</Link>
    </div>
    <button type="button" onClick={acceptCookies}>Accept</button>
  </aside>;
}
