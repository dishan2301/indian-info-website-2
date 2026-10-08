# Homepage restoration and responsive audit

GitHub source: https://github.com/dishan2301/indian-info-website-2

Baseline revision: `8e188e3` (`Restore homepage colors`). The downloaded repository and the local HEAD have the same revision. Original page content, imagery, colors, and unmodified source files are therefore already the requested GitHub version.

The added dark homepage image overlay and strengthened page-hero overlays were reverted to that baseline. Added Play/Pause highlights, stories, and industries controls were removed. Existing links and previous/next controls remain. Responsive layout repairs and reduced-motion behavior were retained.

## Reproducible issues and repairs

| Route/component | Viewport/state | Issue and root cause | Severity | Repair |
|---|---|---|---|---|
| Homepage hero | All sizes | Added gradient darkened the original photography | High | Restore GitHub's transparent image overlay |
| Homepage carousels | All sizes | Added playback controls changed the requested interface | Medium | Remove the added controls |
| Shared splash | After loading | Inline body scroll lock remained after splash disappeared | High | Use the existing CSS lock tied to the actual splash element |
| Homepage company identity | 320px | 360px logo exceeded available content width | High | Bound the logo by its parent |
| Shared grids and customer roster | Narrow/intermediate widths and enlarged text | Intrinsic grid minimums and long labels widened the document | High | Zero-minimum grid tracks and wrapping |
| About proof strip | 667px | Five rigid columns exceeded available space | High | Fit columns to the available width |
| Products and comparison filters | 1024px and enlarged text | Minimum filter widths exceeded the container | High | Auto-fit bounded filter columns |
| Shared FAQ headings | 320px / 200% text | `<summary>` labels were excluded from the wrapping rule, so long words overflowed | High | Include summary labels in the shared wrapping rule |
| Solution builder | 200% text | Implicit grid tracks grew to fit long option labels | High | Explicit zero-minimum grid tracks |
| Shared navigation | Short-height viewports | Mega menu could extend below the viewport | High | Internal scrolling with dynamic viewport bounds |
| Mobile navigation | Mobile | Search and comparison/tools links were absent | Medium | Include existing destinations in the mobile menu |
| Desktop navigation | Keyboard Escape | Closing the panel lost useful focus | Medium | Return focus to its menu trigger |
| Floating WhatsApp link | Mobile | Fixed control could cover essential content | Medium | Place it in normal document flow on narrow screens |
| Product detail | Gallery controls | Primary image discarded all additional gallery images | Medium | Retain and deduplicate supplied images |
| Comparison and cookie tables | Narrow screens/keyboard | Contained scrollers lacked explicit keyboard focus/region labels | Medium | Add focusability, labels, and comparison scroll guidance |

## Exact files changed

- `app/globals.css`: responsive grid sizing, media bounds, wrapping, menu height limits, readable form sizes, contained controls, mobile floating-widget placement; restore original hero overlays and palette. Remove obsolete second-card dark-theme rules that conflict with the existing final light-card styling.
- `app/_components/site-header.tsx`: mobile destinations, Escape focus restoration, reset menu state after route changes.
- `app/careers/careers.module.css`: remove page clipping and reflow proof statistics under text enlargement; original colors retained.
- `app/cookies/page.tsx`: keyboard-accessible cookie table scroller.
- `app/products/[slug]/page.tsx`: preserve the supplied product gallery images.
- `components/catalog/product-catalogue.tsx`: keyboard-accessible comparison scroller and scroll guidance.
- `components/homepage/hero-poster-carousel.tsx`: respond to reduced-motion and breakpoint changes without adding playback buttons.
- `components/homepage/home-curated-sections.tsx`: respect reduced motion in existing autoplay sections without adding playback buttons.
- `components/site-splash.tsx`: release scrolling when splash ends and skip the animation for reduced motion.
- `tests/responsive-browser-audit.mjs`: runnable route/viewport, state, text-size, height, DPR, and screenshot checks; optional independent browser-page workers.

## Evidence and limitations

Current restoration screenshots: `restored-home-375.png` and `restored-home-1366.png`. Their hero overlays are transparent, and neither contains a Play/Pause highlights control. A direct browser check passed at 320, 375, 768, 1024, 1366, 1920, 2560, and 3840px with zero document overflow.

`restored-build.log`: production build passed. `restored-lint.log`: zero errors, two existing image-element warnings. `restored-types.log`: route generation and TypeScript passed. `restored-unit-tests.tap`: 34/38 passed. The four failures involve a stale client-logo timing expectation, a hero test fixture without `window.matchMedia`, the hard-coded years-experience expectation, and an outdated testimonial publication expectation. These failures are documented rather than reported as passing. Running the downloaded GitHub baseline reproduced all four failures and one additional polish-test failure that the responsive changes fix (`github-baseline-unit-tests.tap`).

Final route/viewport results are recorded in `restored-final/matrix.json`; route inventory is `restored-final/routes.json`. Each result includes the normal layout, all available main-page details opened, and 200% root text enlargement at 320px. Interactive state results and additional height/text/DPR results are recorded separately. Earlier intermediate artifacts may contain rejected dark overlays and controls; use restoration or final artifacts when assessing the current homepage.

Only headless Chromium was available for automation. These are CSS viewport emulations, not physical-device tests. Firefox, WebKit, physical devices, actual browser 200%/400% zoom, assistive-technology reading, and field Core Web Vitals remain NOT TESTED. Text enlargement and effective narrow-width reflow do not establish actual browser-zoom coverage. No authenticated page flow exists in this app. Valid case-study detail fixtures are unavailable because the approved case-study collection is empty; the invalid-slug state is covered.

Screenshots force offscreen reveal sections to their visible state and decode lazy images for full-page visual review. Functional tests use the normal application DOM. Contact submission success/error states are mocked at FormSubmit; the audit sends no real contact message.

The Vinext image endpoint was observed returning the original large PNG even with a requested smaller image width. That deployment behavior remains a performance follow-up; the restoration preserves the original photographs. Do not treat this report as a claim of full accessibility, physical-device compatibility, or measured field performance.

## Additional completed checks

The final matrix contains **3456/3456 passing normal checks (144 URLs × 24 widths)**, with passing 200% root text reflow on all 144 URLs and passing expanded main-page details at each width where present. Browser page errors: zero. The per-route table is `restored-final/TEST_MATRIX.md`. The FAQ fix was rechecked on the two affected routes and four representative neighboring templates; other recorded route results were retained.

- `restored-final/interactions.json`: 48/48 PASS across six mobile, landscape, tablet, and desktop viewport combinations. Includes keyboard menu opening/Escape/focus, mobile destinations, search results/empty results, contact validation/error/success, product filtering/comparison/reset, solution-builder selections, resource/support empty states, ROI inputs, and existing carousel controls.
- `extra.json` and `restored-extra.log`: 60/60 PASS for product gallery arrows/swipes/thumbnails and FAQ states, 200% root text at three effective widths, independent heights from 568 to 1080px, and DPR 1/2/3.
- `restored-final/dense.json`: 432/432 PASS in a sweep at 37px intervals plus adjacent widths around 760, 980, and 1180px, on eight representative templates.
- `restored-final/motion-change.json`: PASS. Normal hero autoplay advanced; changing reduced-motion preference stopped it; changing back resumed it. No highlight playback button was present.
- `restored-screenshots.log` and `media.json`: 64 refreshed full-page screenshots across 15 representative templates; eight homepage widths and four widths for each other template. No broken decoded image was recorded.

`restored-final/lab-performance.json` contains two unthrottled local Chromium samples collected while other audits ran. Observed homepage LCP was 1000ms at 375px and 1296ms at 1366px, with CLS 0 in both samples. Maximum observed event duration was 240ms and 176ms respectively; these samples do not establish field INP. Around 13MB of resource transfer was recorded per cold sample. Image optimization and isolated/field performance measurement remain follow-ups.

To rerun the browser checks with an existing Playwright installation:

```sh
AUDIT_BASE_URL=http://localhost:3001 \
PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs \
CHROMIUM_EXECUTABLE=/absolute/path/to/chrome \
node tests/responsive-browser-audit.mjs matrix
```

Other modes: `interactions`, `extra`, `screenshots`, `dense`. `AUDIT_OUTPUT_DIR` selects an evidence folder; `AUDIT_WORKERS=2` uses independent browser pages for route geometry checks. `AUDIT_RESUME=1` resumes a stopped matrix run, retaining only routes with every requested width already recorded and rerunning incomplete routes. It does not suppress failed checks. `AUDIT_RECHECK_ROUTES=/route-one,/route-two` forces affected routes to run again after a repair while retaining other completed results. The initial final sweep and its FAQ failures are preserved in `restored-final/matrix-before-faq-fix.json`.
