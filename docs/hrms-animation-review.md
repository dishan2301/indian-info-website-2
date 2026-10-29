# HRMS animation review

The new sections reuse the existing module introduction, workflow, scenario, first three capability descriptions, and stage labels from `app/hrms-payroll/content.ts`. No independent product specification or owner approval was found in the workspace. The existing copy is not proof of implementation; the responsible product owner should verify the following process claims and the associated copy before publication.

| Module | Illustrated process to verify |
| --- | --- |
| Recruitment | Application, interview, offer; vacancy and candidate workflows |
| Onboarding | Documents, verification, welcome; joining and access tasks |
| Core HRIS & Payroll | Employee data, salary review, disbursement |
| Employee self-service | Profile, requests, payslips |
| Leave | Request, approval, availability |
| Attendance | Capture, review, payroll handoff |
| Expense | Receipt, approval, reimbursement |
| Timesheet | Project, time entry, approval |
| Performance | Goals, feedback, development |
| Performance-linked benefits | Output, rate rules, payroll |
| HR help desk | Request raised, assigned, resolved |
| Training and induction | Skill gaps, learning, evaluation |
| Offboarding | Resignation, clearance, settlement |
| Visitors | Invitation, OTP check, host sign-off |

The illustrations are conceptual, not screenshots of the product. The actual steps, configuration, integrations and availability need confirmation. In particular, confirm the existing detailed claims about AI screening, OTP, payroll or finance handoffs, and any supported mobile workflows. No deployment was performed.

Validation completed locally: production build and TypeScript; responsive widths 320, 375, 768, 1024, 1280, 1440 and 1920; browser zoom 125%, 150% and 200%; reduced motion, offscreen pausing, keyboard FAQ operation, hydration/page errors, and 320px scene-content clipping. The revised training-page Lighthouse sample was performance 61 and accessibility 100; a pre-change baseline sample was 62 and 92. Individual Lighthouse runs are variable and do not establish a performance guarantee. Lucide icons use the bundled ISC license; scene drawings are original inline SVG.
