# Feature and discovery page redesign

## Scope
- Solutions directory and all solution detail pages, including the top-level solution landing routes.
- HRMS overview and all 14 employee lifecycle features.
- Software directory and all five software platforms.
- Industries directory and every industry detail page, including pharma.
- Products directory, product category pages, and product details (retain filters, comparison, media, specifications, downloads).
- Careers (retain honest career-path descriptions and enquiry flow; do not invent vacancies).

## Visual direction
60% white / near-white reading space; 30% ice-blue imagery and supporting surfaces; 10% blue actions and lime markers. Existing brand: #13acf4, #9ecf09, #17191c. Use accessible darker blue for text. Avoid dark teal slabs and arbitrary gradients.
Typography: 44–64px desktop page titles, 34–44px mobile; 28–40px section titles; 16px body text with 1.65 line height. Never force a heading into a narrow grid column. Content width 1200px. Section separation 40–64px desktop, 32–40px mobile. Images retain useful aspect ratios.

## Content and visitor journey
1. Name the task in plain language and show a relevant human or workplace scene.
2. State what changes for the visitor in one short paragraph.
3. Show an everyday example, clearly labelled as an illustration rather than a real product screen.
4. Explain the sequence in three or four selectable steps.
5. Present detailed capabilities as readable open rows with icons, not repetitive bordered tiles.
6. Answer practical questions and offer one clear next step.
Use progressive disclosure for detailed answers, predictable navigation, descriptive links, and a consistent primary action. No invented metrics, customer endorsements, or software screenshots.

## Components and implementation
Use a scoped CSS module design system to avoid the global selector collisions found in the old FAQ. Shared server-rendered content, a small Motion reveal component, and an accessible interactive workflow. Keep existing metadata, structured data, content sources, and functional tools. Reuse subject-matched images; generate an onboarding-specific scene to replace the unrelated attendance image. Product photos remain original.

## Research
- https://chatgpt.com/overview/ — task-first feature storytelling and relevant visual examples.
- https://motion.dev/docs/react-scroll-animations — one-time in-view reveals.
- https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html — reduced-motion support.
- Comparison of the reference onboarding page and local page in Chromium at 1440px and 390px.
Figma MCP is not connected in this session. Designs are implemented and reviewed directly in the local browser.

## Validation
TypeScript, production build and existing relevant checks. Enumerate and visit every affected route in Chromium; check response status, browser errors, headings, image loading, overflow at desktop and mobile widths. Exercise workflow tabs, FAQs, product filters, navigation, and reduced-motion behavior. Save representative screenshots.
