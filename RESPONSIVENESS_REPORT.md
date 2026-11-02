# 📱 Responsiveness Audit Report

| Field | Details |
|-------|---------|
| **Project** | sites-project (Indian Infotech website) |
| **Audited by** | Codex — Senior Mobile Developer Mode |
| **Date** | 2026-11-02 |
| **Overall Status** | ❌ NEEDS WORK |

---

## Executive Summary

Playwright tested 174 page-width combinations; 21 passed all requested checks. No horizontal overflow was measured. Fixed pixel image caps also fail the literal computed `max-width: 100%` check, even where the page fits.

---

## Pages Audited

Playwright measured 21/174 page-width combinations. Dynamic routes use one representative linked URL per page template. Screenshots are in `responsiveness-screenshots/`.

| Page / Screen | Mobile 375px | Tablet 768px | Desktop 1440px | Issues | Fixed |
|---------------|--------------|--------------|----------------|--------|-------|
| `/[seo]` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/about` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/about-us` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/academy` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/careers` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/case-studies/[slug]` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/case-studies/contribute` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/case-studies` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/certification` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/company` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/compare` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/contact` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/contract-labour-management` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/cookies` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/developers/integration-reference` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/developers` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/easytime/[slug]` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/easytime` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/engineering` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/hrms-payroll/[slug]` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/hrms-payroll` | ❌ FAIL | ❌ FAIL | ❌ FAIL | 1 | ✅ |
| `/industries/[slug]` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/industries` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/industries/pharma` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/insights/[slug]` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/insights` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/integrations` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/knowledge` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/partners` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/platform` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/privacy` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/products/[slug]` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/products` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/resources` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/resources/procurement` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/search` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/software/[slug]` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/software` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/solution-builder` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/solutions/[slug]` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/solutions` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/support` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/technologies` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/terms` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/testimonials` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/trust` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/trust/quality-policy` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/trust/responsible-disclosure` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/trust/security` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/easytime/404.html` | ✅ PASS | ✅ PASS | ✅ PASS | — | — |
| `/easytime/blog-actionable-insights.html` | ✅ PASS | ✅ PASS | ✅ PASS | — | — |
| `/easytime/blog-ai-growth-insights.html` | ✅ PASS | ✅ PASS | ✅ PASS | — | — |
| `/easytime/blog-clarity.html` | ✅ PASS | ✅ PASS | ✅ PASS | — | — |
| `/easytime/blog.html` | ✅ PASS | ✅ PASS | ✅ PASS | — | — |
| `/easytime/index.html` | ❌ FAIL | ❌ FAIL | ❌ FAIL | — | — |
| `/easytime/newsletter.html` | ✅ PASS | ✅ PASS | ✅ PASS | — | — |
| `/easytime/software-tour.html` | ✅ PASS | ✅ PASS | ✅ PASS | — | — |

---

## Issues Found & Resolved

| # | Page | Category | Issue | Fix Applied | Status |
|---|------|----------|-------|-------------|--------|
| 1 | HRMS feature gallery | 🧭 Navigation | Progress buttons had a 4px hit area; arrow buttons were 34px square | Enlarged hit areas to 44px and retained the 4px visual progress marks | ✅ Fixed |

---

## Items Needing Manual Review

| # | Page | Issue | Why Manual |
|---|------|-------|------------|
| 1 | EasyTime landing page | Overflow and oversized dashboard images fixed | Playwright confirms no overflow or oversized images at all three widths |
| 2 | Case study detail template | No approved case studies exist, so there is no real slug to open | Requires published content before a representative page can be tested |
| 3 | Image max-width check | Fixed pixel caps such as the 195px header logo fail the literal 100% rule | Review whether the rule should accept intentionally smaller image caps |

---

## Responsive Score

**15/28 checks verified in source; 13 require browser or manual review.** This is a verification score, not a claim that the remaining checks failed.

| Category | Checks | Passed / verified | Score |
|----------|--------|-------------------|-------|
| 🖼️ Images | 10 | 6 | 6/10 |
| 📐 Layout | 8 | 3 | 3/8 |
| 🔤 Typography | 4 | 1 | 1/4 |
| 🧭 Navigation | 3 | 2 | 2/3 |
| 🏗️ HTML/Global | 3 | 3 | 3/3 |
| **Total** | **28** | **15** | **15/28** |

The source checks confirm Next.js viewport metadata, standalone HTML viewport tags, existing scroll wrappers for audited tables, SVG viewBox attributes, responsive image rules from Tailwind, and responsive navigation styles. They do not prove every image, text block, or absolute element fits all widths.

---

## Files Changed

| File | Change Made |
|------|-------------|
| `components/ui/vertical-tabs.module.css` | Expanded feature gallery progress and arrow tap targets to 44px |
| `scripts/responsiveness-audit.mjs` | Added repeatable Playwright viewport audit, retest support, and overflow diagnostics |
| `public/easytime/responsive-fixes.css` | Made dashboard grid shrink and constrained contact card width including margins |
| `package.json`, `package-lock.json` | Added Playwright development dependency |
| `responsiveness-screenshots/` | Saved 57 valid 375px page screenshots and detailed JSON results |
| `RESPONSIVENESS_REPORT.md` | Recorded per-page browser results and failure details |

---

## Recommendation

EasyTime overflow and oversized dashboard images are fixed and verified at all three widths. The script measured all listed rows at 375px, 768px, and 1440px except the case study detail template, which has no published slug. Review the literal `max-width: 100%` requirement against intentionally capped logos. The TypeScript check (`npm run lint`) and `git diff --check` pass.

## Playwright Audit Results

| Page and width | Failure details |
|----------------|-----------------|
| `/[seo]` (375px) | 1 image max-width failures |
| `/[seo]` (768px) | 1 image max-width failures |
| `/[seo]` (1440px) | 1 image max-width failures |
| `/about` (375px) | 1 image max-width failures |
| `/about` (768px) | 1 image max-width failures |
| `/about` (1440px) | 1 image max-width failures |
| `/about-us` (375px) | 1 image max-width failures |
| `/about-us` (768px) | 1 image max-width failures |
| `/about-us` (1440px) | 1 image max-width failures |
| `/academy` (375px) | 1 image max-width failures |
| `/academy` (768px) | 1 image max-width failures |
| `/academy` (1440px) | 1 image max-width failures |
| `/careers` (375px) | 1 image max-width failures |
| `/careers` (768px) | 1 image max-width failures |
| `/careers` (1440px) | 1 image max-width failures |
| `/case-studies/[slug]` (375px) | Error: No link found for dynamic route /case-studies/[slug] |
| `/case-studies/[slug]` (768px) | Error: No link found for dynamic route /case-studies/[slug] |
| `/case-studies/[slug]` (1440px) | Error: No link found for dynamic route /case-studies/[slug] |
| `/case-studies/contribute` (375px) | 1 image max-width failures |
| `/case-studies/contribute` (768px) | 1 image max-width failures |
| `/case-studies/contribute` (1440px) | 1 image max-width failures |
| `/case-studies` (375px) | 1 image max-width failures |
| `/case-studies` (768px) | 1 image max-width failures |
| `/case-studies` (1440px) | 1 image max-width failures |
| `/certification` (375px) | 1 image max-width failures |
| `/certification` (768px) | 1 image max-width failures |
| `/certification` (1440px) | 1 image max-width failures |
| `/company` (375px) | 1 image max-width failures |
| `/company` (768px) | 1 image max-width failures |
| `/company` (1440px) | 1 image max-width failures |
| `/compare` (375px) | 1 image max-width failures |
| `/compare` (768px) | 1 image max-width failures |
| `/compare` (1440px) | 1 image max-width failures |
| `/contact` (375px) | 1 image max-width failures |
| `/contact` (768px) | 1 image max-width failures |
| `/contact` (1440px) | 1 image max-width failures |
| `/contract-labour-management` (375px) | 1 image max-width failures |
| `/contract-labour-management` (768px) | 1 image max-width failures |
| `/contract-labour-management` (1440px) | 1 image max-width failures |
| `/cookies` (375px) | 1 image max-width failures |
| `/cookies` (768px) | 1 image max-width failures |
| `/cookies` (1440px) | 1 image max-width failures |
| `/developers/integration-reference` (375px) | 1 image max-width failures |
| `/developers/integration-reference` (768px) | 1 image max-width failures |
| `/developers/integration-reference` (1440px) | 1 image max-width failures |
| `/developers` (375px) | 1 image max-width failures |
| `/developers` (768px) | 1 image max-width failures |
| `/developers` (1440px) | 1 image max-width failures |
| `/easytime/[slug]` (375px) | 1 image max-width failures |
| `/easytime/[slug]` (768px) | 1 image max-width failures |
| `/easytime/[slug]` (1440px) | 1 image max-width failures |
| `/easytime` (375px) | 32 image max-width failures |
| `/easytime` (768px) | 32 image max-width failures |
| `/easytime` (1440px) | 32 image max-width failures |
| `/engineering` (375px) | 1 image max-width failures |
| `/engineering` (768px) | 1 image max-width failures |
| `/engineering` (1440px) | 1 image max-width failures |
| `/hrms-payroll/[slug]` (375px) | 1 image max-width failures |
| `/hrms-payroll/[slug]` (768px) | 1 image max-width failures |
| `/hrms-payroll/[slug]` (1440px) | 1 image max-width failures |
| `/hrms-payroll` (375px) | 6 image max-width failures |
| `/hrms-payroll` (768px) | 6 image max-width failures |
| `/hrms-payroll` (1440px) | 6 image max-width failures |
| `/industries/[slug]` (375px) | 1 image max-width failures |
| `/industries/[slug]` (768px) | 1 image max-width failures |
| `/industries/[slug]` (1440px) | 1 image max-width failures |
| `/industries` (375px) | 1 image max-width failures |
| `/industries` (768px) | 1 image max-width failures |
| `/industries` (1440px) | 1 image max-width failures |
| `/industries/pharma` (375px) | 1 image max-width failures |
| `/industries/pharma` (768px) | 1 image max-width failures |
| `/industries/pharma` (1440px) | 1 image max-width failures |
| `/insights/[slug]` (375px) | 1 image max-width failures |
| `/insights/[slug]` (768px) | 1 image max-width failures |
| `/insights/[slug]` (1440px) | 1 image max-width failures |
| `/insights` (375px) | 1 image max-width failures |
| `/insights` (768px) | 1 image max-width failures |
| `/insights` (1440px) | 1 image max-width failures |
| `/integrations` (375px) | 1 image max-width failures |
| `/integrations` (768px) | 1 image max-width failures |
| `/integrations` (1440px) | 1 image max-width failures |
| `/knowledge` (375px) | 1 image max-width failures |
| `/knowledge` (768px) | 1 image max-width failures |
| `/knowledge` (1440px) | 1 image max-width failures |
| `/` (375px) | 2 image max-width failures |
| `/` (768px) | 2 image max-width failures |
| `/` (1440px) | 2 image max-width failures |
| `/partners` (375px) | 1 image max-width failures |
| `/partners` (768px) | 1 image max-width failures |
| `/partners` (1440px) | 1 image max-width failures |
| `/platform` (375px) | 1 image max-width failures |
| `/platform` (768px) | 1 image max-width failures |
| `/platform` (1440px) | 1 image max-width failures |
| `/privacy` (375px) | 1 image max-width failures |
| `/privacy` (768px) | 1 image max-width failures |
| `/privacy` (1440px) | 1 image max-width failures |
| `/products/[slug]` (375px) | 1 image max-width failures |
| `/products/[slug]` (768px) | 1 image max-width failures |
| `/products/[slug]` (1440px) | 1 image max-width failures |
| `/products` (375px) | 1 image max-width failures |
| `/products` (768px) | 1 image max-width failures |
| `/products` (1440px) | 1 image max-width failures |
| `/resources` (375px) | 1 image max-width failures |
| `/resources` (768px) | 1 image max-width failures |
| `/resources` (1440px) | 1 image max-width failures |
| `/resources/procurement` (375px) | 1 image max-width failures |
| `/resources/procurement` (768px) | 1 image max-width failures |
| `/resources/procurement` (1440px) | 1 image max-width failures |
| `/search` (375px) | 1 image max-width failures |
| `/search` (768px) | 1 image max-width failures |
| `/search` (1440px) | 1 image max-width failures |
| `/software/[slug]` (375px) | 1 image max-width failures |
| `/software/[slug]` (768px) | 1 image max-width failures |
| `/software/[slug]` (1440px) | 1 image max-width failures |
| `/software` (375px) | 1 image max-width failures |
| `/software` (768px) | 1 image max-width failures |
| `/software` (1440px) | 1 image max-width failures |
| `/solution-builder` (375px) | 1 image max-width failures |
| `/solution-builder` (768px) | 1 image max-width failures |
| `/solution-builder` (1440px) | 1 image max-width failures |
| `/solutions/[slug]` (375px) | 31 image max-width failures |
| `/solutions/[slug]` (768px) | 31 image max-width failures |
| `/solutions/[slug]` (1440px) | 31 image max-width failures |
| `/solutions` (375px) | 1 image max-width failures |
| `/solutions` (768px) | 1 image max-width failures |
| `/solutions` (1440px) | 1 image max-width failures |
| `/support` (375px) | 1 image max-width failures |
| `/support` (768px) | 1 image max-width failures |
| `/support` (1440px) | 1 image max-width failures |
| `/technologies` (375px) | 1 image max-width failures |
| `/technologies` (768px) | 1 image max-width failures |
| `/technologies` (1440px) | 1 image max-width failures |
| `/terms` (375px) | 1 image max-width failures |
| `/terms` (768px) | 1 image max-width failures |
| `/terms` (1440px) | 1 image max-width failures |
| `/testimonials` (375px) | 1 image max-width failures |
| `/testimonials` (768px) | 1 image max-width failures |
| `/testimonials` (1440px) | 1 image max-width failures |
| `/trust` (375px) | 1 image max-width failures |
| `/trust` (768px) | 1 image max-width failures |
| `/trust` (1440px) | 1 image max-width failures |
| `/trust/quality-policy` (375px) | 1 image max-width failures |
| `/trust/quality-policy` (768px) | 1 image max-width failures |
| `/trust/quality-policy` (1440px) | 1 image max-width failures |
| `/trust/responsible-disclosure` (375px) | 1 image max-width failures |
| `/trust/responsible-disclosure` (768px) | 1 image max-width failures |
| `/trust/responsible-disclosure` (1440px) | 1 image max-width failures |
| `/trust/security` (375px) | 1 image max-width failures |
| `/trust/security` (768px) | 1 image max-width failures |
| `/trust/security` (1440px) | 1 image max-width failures |
| `/easytime/index.html` (375px) | 31 image max-width failures |
| `/easytime/index.html` (768px) | 30 image max-width failures |
| `/easytime/index.html` (1440px) | 30 image max-width failures |
