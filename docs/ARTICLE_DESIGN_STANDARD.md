# Indian Infotech article design standard

## Approved reference and audit

All five articles in `app/insights/content.ts` use the same detail route, PageHero, article image, centered body, bordered sections, headings, paragraphs and list CSS. Their text, URLs, metadata and supplementary research notes/references remain unchanged.

The previous CMS implementation duplicated the frame, nested content in `.article-portable-text`, and maintained a second rule set for paragraph spacing, H3, blockquotes, inline images and links. Its inline links were normal weight (400), while original reference links were bold (700). Bold/italic used the library defaults. The earlier integration fix had already aligned ordinary H2/paragraphs/lists; the remaining problem was maintaining two styling paths for future content.

`components/article-body.tsx` now owns the original article frame, lead image and 760px body column for both sources. `components/article-portable-text.tsx` only emits semantic content sections. All typography rules are scoped to `.insight-article-body` in the existing article CSS block. CMS-only CSS and duplicate reference-link rules are removed. Inline links now share the original reference link's weight, color and border. Related navigation and CTA link styles remain separate.

## Final rules

All values below use the existing 16px root size and existing design tokens.

| Element | Approved/shared rule |
| --- | --- |
| Font | `var(--font-geist-sans), Arial, sans-serif`; resolves to Geist Local with existing system fallback; body weight 400 |
| H1 | Existing PageHero, 700; desktop `clamp(2.45rem, 4.3vw, 4.5rem)`, line height .96, tracking -.06em, margin 1.8rem vertically; mobile <=760px `clamp(2.3rem, 9.5vw, 3.25rem)` |
| H2 | 700; `clamp(1.75rem, 2.8vw, 2.8rem)`, line height 1.08, tracking -.045em, margin 0 0 1rem |
| H3 | 700; existing CMS scale `clamp(1.35rem, 2vw, 1.75rem)`, line height 1.2, margin 1.5rem 0 1rem, now shared |
| Paragraph | 1.02rem / 16.32px; 400; line height 1.85 / 30.192px; `--muted`; zero margin; consecutive paragraphs have 1.25rem spacing |
| Section | 1px top border in `--line`; 2.5rem vertical padding; original research/takeaway/reference exceptions retained |
| Column | Centered, maximum 760px; original article frame has `clamp(4rem, 8vw, 8rem)` vertical padding and `max(6vw, calc((100vw - 1120px) / 2))` horizontal padding |
| Lists | Original inherited 1rem / 16px, weight 400, line height 1.75 / 28px; 1.25rem top margin and left padding; unordered discs and ordered decimals; nested list indentation retained |
| Bold / italic | Explicit `<strong>` / `<em>` serializers; native semantic 700 / italic |
| Body links | `--navy-950`, 700, 1px bottom border in `--brand-primary`; safe URLs only, noopener/noreferrer for new tabs |
| Images | Original relative frame, object-fit cover, 16:8; <=760px 4:3. Lead margin-bottom `clamp(3rem, 6vw, 6rem)`; body images have 2.5rem block margins. Alt text is preserved; missing images render nothing |
| Blockquote | Shared existing quote treatment: 3px brand-primary left border, 1.25rem left padding and vertical margin, muted color, line height 1.85 |

The originals contain no H3, inline body image, caption or blockquote examples. H3/inline image/quote rules therefore preserve the existing CMS renderer's treatment and now apply equally to equivalent static markup. Captions are absent from the current Sanity schema and original articles; none have been invented.

The article-specific mobile breakpoint is 760px. Tablet widths use the fluid desktop formulas until that breakpoint; no tablet-only typography is introduced.

| Viewport | H1 px | H2 px | H3 px | Body column px |
| --- | --- | --- | --- | --- |
| 1920 | 72 | 44.8 | 28 | 760 |
| 1366 | 58.738 | 38.248 | 27.32 | 760 |
| 768 | 39.2 | 28 | 21.6 | 675.844 |
| 375 | 36.8 | 28 | 21.6 | 335 |

## Publishing

Editors use Normal, Heading 2, Heading 3, Bold, Italic, bullet/number lists, links, Quote and images with alt text. Every H2 begins an original-style section; H3 stays inside its section. Use H2 rather than manually bolding a paragraph to create a section heading. No CSS, HTML, font-size field or inline typography is required.

The runtime CMS detail query, dynamic slug support, publication filters and 60-second Sanity cache are unchanged. Newly published articles use these shared components without rebuilding the site or pushing GitHub changes. Normal cache refresh still applies. No Sanity schema/content mutation is part of this change.

## Repeatable checks

- `npm run check:articles`: semantic rendering, all five original bodies vs Portable Text HTML, nested lists, safe links, image alt/source, shared frame, and publication without rebuilding route modules.
- `npm run lint` and `npm run build`.
- `npm run audit:articles`: start a production build at port 3112 first (or set `ARTICLE_BASE_URL`). Requires Playwright on the test machine; no browser dependency was added to the deployed website. Set `PLAYWRIGHT_MODULE` and `PLAYWRIGHT_EXECUTABLE_PATH` to reuse another installed Playwright/browser. Set `TMPDIR` to a writable directory if browser temporary storage has a quota.
- Browser audit runs all five original routes at 1920, 1366, 768 and 375px, then builds local-only fixtures using the actual ArticleBody/Portable Text renderer. It compares computed font family/size/weight/style, line height, tracking, colors, alignment, widths, margins, padding, list style, borders and image ratio. It also checks formatting absent from originals and horizontal page overflow. `ARTICLE_AUDIT_OUTPUT` selects screenshot/JSON output. Optional `ARTICLE_BASELINE` compares the original pages with a before-change computed snapshot.

## Verification for this change

Production build and TypeScript passed. The focused suite passed 29 tests with 1 pre-existing skip and no failures. The before-change browser snapshot contains all five originals at all four requested widths. Final browser results and deployment links are recorded in the completion report.

The read-only public Sanity query returned no published editorial documents during this task, so Sanity screenshots use clearly labeled local fixtures. Nothing was published, edited or deleted in Sanity. These fixtures are not deployed routes.

Final browser run passed: 20 original/CMS pairs (five articles × four widths), plus four extended-formatting pairs. Every original matched its before-change computed snapshot. All compared CSS properties matched between original and CMS fixtures, with no horizontal overflow. The four original/Sanity fixture screenshot pairs are byte-for-byte identical. Screenshots and computed JSON are saved at `/home/dishan/Documents/indian-infotech-typography-review/final/` on the review machine.

Changed files: `app/globals.css`, `app/insights/[slug]/page.tsx`, `components/article-body.tsx`, `components/article-portable-text.tsx`, `package.json`, `tests/insights-integration.test.mjs`, `tests/article-typography.test.mjs`, `tests/article-typography-browser.mjs`, `tests/helpers/load-ts-module.mjs`, and this document.
