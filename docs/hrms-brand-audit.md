# HRMS brand audit

Repository inspection, 29 October 2026. The source of truth is `app/globals.css` and the shared site components, not the competitor reference.

| Token | Value | Use |
| --- | --- | --- |
| `--brand-primary`, `--brand-accent`, `--teal-400` | `#13acf4` | Primary actions and accents |
| `--brand-primary-dark`, `--navy-950` | `#040404` | Dark surface and text |
| `--brand-primary-light`, `--ice` | `#e8f8ff` | Light surface |
| `--brand-accent-secondary`, `--brand-green`, `--teal-300` | `#9ecf09` | Secondary accent and focus |
| `--navy-900` | `#1e1e1e` | Dark surface and text |
| `--navy-800`, `--ink` | `#17191c` | Text |
| `--mist` | `#f7fbfd` | Neutral surface |
| `--muted` | `#62666b` | Secondary text |
| `--line` | `#d9d9d9` | Borders |
| `--font-geist-sans`, `--font-geist-mono` | Geist Local / Geist Mono Local with system fallbacks | Typography |

Shared components: `app/_components/site-header.tsx`, `app/_components/site-footer.tsx`; `.button` and `.button-primary` in `app/globals.css`. Routes: `app/hrms-payroll/page.tsx` and `app/hrms-payroll/[slug]/page.tsx`; module content: `app/hrms-payroll/content.ts` and `app/content.ts`.

The existing module CSS contains additional hard-coded green and teal values and overrides the shared primary button. These are existing implementation choices, not verified global brand tokens; alignment remains a review item. The deployed preview and screenshot comparison have not been verified in this audit.
