# Responsive images and native browser zoom

Date: 2026-10-08. Tested against the Next.js production build at localhost:3001.

## Changes

The homepage's expanding hero uses bounded, responsive dimensions instead of filling an unlimited zoomed-out viewport. Each original photograph fills its panel with `object-fit: cover` and retains its original focal position. Desktop panels and collapsed titles remain vertical; the narrow touch-device layout is selected using pointer capabilities as well as viewport width. No global scaling transform was introduced.

Hero headings, copy, links, software labels, and supporting homepage text use readable fluid sizes. A ResizeObserver recalculates the hero height from both active content and collapsed vertical titles. Short viewports scroll naturally instead of clipping content. The industry image stage accommodates expanding text. The travelling logo responds to resize and motion-preference changes.

An invalid case-study URL discovered during testing now returns the intended 404 page rather than a production server error. Original images, colors, links, and existing animations remain in place. Play/Pause controls have not been reintroduced.

## Verified results

- All 144 routes at 1024×600, 1024×768, 1280×720, 1280×800, 1366×768, 1440×900, 1536×864, 1600×900, 1920×1080, and 2560×1600: 1,440 checks, zero failures. Includes navbar collision checks, image geometry, overflow, expanded details, and enlarged root text.
- Image assets across all 144 routes: 1,242 image instances decoded successfully, zero broken assets or geometry issues. Hidden images are decoded through independent image objects so browser lazy-loading does not cause false failures.
- Native browser zoom: 281 checks, zero failures or browser errors. All five hero panels checked at 14 zoom percentages on all ten laptop viewports; ten additional page templates checked at every percentage; touch-device orientation checked separately. Collapsed titles remain vertical, centered, and unclipped on desktop.
- One-pixel width sweep: 17,928 checks, zero failures. Every integer width from 320 through 2560 at height 600 on eight main page templates; all 144 routes additionally checked at every requested laptop configuration.
- Emulated display scaling: 48 checks, zero failures. DPR 1, 1.25, 1.5, 1.75, 2, and 3 with corresponding CSS viewport sizes for a 1920×1080 display, across eight page templates.
- Browser interactions: 48 checks, zero failures (menus, keyboard navigation, comparison/search filters, mocked form submissions, builder selection, resources, support, carousel controls, and motion preferences).
- Production build and TypeScript: pass. Lint: zero errors, two existing `img` warnings.
- Unit suite: 35 pass, three existing stale assertions fail (logo reveal timing, company statistics, proof-publication fixtures). The hero rotation and live motion-preference test passes.

The native zoom audit uses an isolated Chromium extension calling [chrome.tabs.setZoom](https://developer.chrome.com/docs/extensions/reference/api/tabs#method-setZoom), verifies the actual zoom factor and resulting CSS viewport, and checks every hero panel. It does not use CSS zoom or pinch-zoom simulation. The requested percentages are 40, 50, 60, 70, 80, 90, 100, 110, 120, 125, 150, 175, and 200; 25% is also included to reproduce the supplied screenshot.

## Evidence and reproduction

`laptops/matrix.json`, `images/decoded.json`, `images/pixel-sweep.json`, `images/display-scaling.json`, and `zoom/results.json` contain machine-readable results. `zoom/home-25.png`, `zoom/home-100.png`, and `zoom/home-200.png` show actual zoom output. `images/short-height-before-reproduction.png` recreates the previously measured 292px hero height at a 512×300 CSS viewport; `images/short-height-after.png` shows the final sizing calculation. The diagnostic pair uses DPR 2 and is explicitly distinguished from native zoom evidence in `images/short-height-reproduction.json`. Audits capture failure screenshots before fixes or rechecks; older transient image-loading failures are retained locally but are superseded by the final decoded-asset checks.

Set `PLAYWRIGHT_MODULE` to the installed Playwright module and `CHROMIUM_EXECUTABLE` to Chromium, then run:

```sh
AUDIT_BASE_URL=http://localhost:3001 AUDIT_OUTPUT_DIR="$PWD/audits/responsiveness/laptops" node tests/responsive-browser-audit.mjs laptops
AUDIT_BASE_URL=http://localhost:3001 node tests/browser-zoom-audit.mjs
AUDIT_BASE_URL=http://localhost:3001 node tests/image-layout-audit.mjs
```

`AUDIT_RESUME=1` resumes completed routes in the layout and image audits. The image audit also supports `IMAGE_AUDIT_MODE=assets` or `IMAGE_AUDIT_MODE=scaling` for focused rechecks; width sweeps checkpoint progress for resuming. Display scaling is emulated through device-pixel ratios and corresponding CSS viewport sizes; physical operating-system settings, Firefox, and Safari were not tested. The one-pixel sweep covers eight representative page templates; every route additionally receives all ten laptop configurations. These results do not assert that every browser/device combination has been physically tested.
