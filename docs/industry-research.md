# Industry guide research and product mapping

Reviewed: 2 November 2026. Scope: Manufacturing, Corporate offices, Pharmaceutical & research, Healthcare, Education, Logistics & warehousing, and the Industries directory.

The guide content and bibliography live in `app/industries/research/content.ts`. Findings link to their references in the rendered page. Workflow suggestions, selection checks, example scenarios and pilot measures are original planning applications, rather than findings attributed to an outside study. These are evidence-informed industry guides, not peer-reviewed research papers or verified customer case studies.

## Research approach

1. Review the company brochure, published catalogue and relevant model-specific datasheets before mapping hardware and software to an industry.
2. Use primary industry guidance for the operating context. Separate source findings from Indian Infotech's proposed application.
3. Specify a role and a selection check for each device. Avoid transplanting device specifications into SaaS claims.
4. Separate attendance, physical access permission, door sequencing, visitor supervision and payroll review.
5. Use workplace illustrations to explain context and catalogue images to show equipment. Do not describe illustrations as client installations.

## Evidence map

| Environment | Primary operating references | Product / software mapping |
| --- | --- | --- |
| Manufacturing | HSE shift handover; HSE fatigue | AI-60 identification; TS200 pedestrian lane; CMP 200 vehicle gate; Easytime, HRMS, canteen |
| Corporate offices | NIST-hosted ePACS overlay, PE-2 / PE-3 / PE-8; CISA / ISC facility access | Mini AI-30 attendance; FBL 200 lobby passage; I-18 room access; visitor, Easytime, HRMS |
| Pharmaceutical & research | European Commission GMP Annex 1 §4.13; WHO Laboratory Biosafety Manual 4th ed. | Modular door interlock; AI-60 general staff identity; I-18 selected rooms; attendance, HR administration, hosted visits |
| Healthcare | OSHA hospital workplace violence resources; CDC environmental infection-control recommendations | AI-60 / Mini AI-30 staff identity; I-18 selected rooms; staff attendance, HRMS, visitor workflow |
| Education | CISA school security companion; NDMA school-safety policy hosted by India's Ministry of Education | Staff attendance terminal; assessed pedestrian lane; staff-only room reader; visitor, Easytime, HRMS |
| Logistics & warehousing | HSE warehousing; OSHA industrial-truck pedestrian guidance | CMP 200 vehicle gate; TS200 pedestrian lane; AI-60 identity; Easytime, contract-workforce process, visitors |

The complete primary links are maintained in `researchSources`, including direct links to the company brochure, AI-60 datasheet, interlock datasheet and Indian Infotech's EasyTime app listing. Some agency PDFs were accessible through indexed primary-source extracts rather than full-text retrieval; the rendered findings stay within those supported extracts.

## Important product distinctions

- The company brochure describes both a client-server / MS SQL attendance architecture and software functions. The current developer app listing describes attendance, leave, shifts, approvals, self-service and multiple locations. A specific cloud or client-server deployment is confirmed in solution design.
- The AI-60 datasheet supports face, fingerprint and card methods. Its model-specific interfaces are not a promise that every device or software variant supports the same integration.
- The interlock datasheet lists 2 / 3 / 4 / 6 / 8-door configurations, contacts and emergency inputs. It does not establish facility qualification, cleanroom performance or a regulatory certificate.
- No student pickup system, patient system, continuous staff tracking, forklift collision-avoidance system, WMS, transport management or automatic universal product compatibility has been inferred.
- International references provide planning context. They are not presented as universally applicable Indian legal requirements.

## Verification

- `npm run lint`
- `npm run build`
- `CHROMIUM_EXECUTABLE=/path/to/chromium AUDIT_BASE_URL=http://localhost:3002 AUDIT_OUTPUT_DIR=/tmp/industry-review node tests/industry-pages.browser.mjs`

The browser audit checks the six guides at phone, tablet and desktop widths, image loading, page overflow, reference targets, FAQ interaction, article metadata, canonical URLs and internal content links. It also checks the new Industries directory.
