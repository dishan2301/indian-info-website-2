/** Keep section spacing consistent across the imported attendance landing pages. */
export function EasytimeSpacing() {
  return <style>{`
    .easytime-page .mobile-product-scene:not([data-hero-ready="true"]) { visibility: hidden; }
    .easytime-page .mobile-product-scene .attendance-device-carousel > img:not(.active) { visibility: hidden !important; opacity: 0 !important; }
    .easytime-page .mobile-product-scene .attendance-device-carousel > img.active { visibility: visible !important; opacity: 1 !important; filter: none !important; }
    .easytime-page .mobile-product-scene .attendance-device-carousel { filter: none !important; }
    .easytime-page .software-tour .saas-caption { display: none; }
    .easytime-page .software-tour .saas-playback { padding-bottom: 0; aspect-ratio: 1856 / 960; min-height: 0; }
    .easytime-page .software-tour .saas-playback > img { height: 100%; aspect-ratio: auto; }
    .easytime-page > main > section.section {
      padding-block: clamp(28px, 3.5vw, 56px) !important;
      margin-block: 0 !important;
    }
    .easytime-page > main > section.mobile-app-hero {
      min-height: 0 !important;
      padding-top: clamp(32px, 4vw, 64px) !important;
    }
    .easytime-page .section-head {
      margin-bottom: clamp(24px, 2.5vw, 36px);
    }
    .easytime-page > main > section.integration-banner {
      margin-block: 0;
      padding-block: clamp(28px, 3.5vw, 56px);
    }
    .easytime-page > main > section.module-strip {
      padding-block: clamp(24px, 2.5vw, 40px) !important;
    }
  `}</style>;
}
