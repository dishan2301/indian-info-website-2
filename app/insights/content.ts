export type Insight = {
  slug: string;
  category: 'Blog';
  date: string;
  title: string;
  summary: string;
  image: string;
  sourceUrl: string;
  sections: readonly { title: string; body: string }[];
};

export const insights: readonly Insight[] = [
  {
    slug: 'easytime-cloud-attendance-benefits',
    category: 'Blog',
    date: '23 August 2024',
    title: 'Why Your Company Needs EasyTime: Cloud Attendance Management',
    summary: 'A practical introduction to cloud-based attendance management, flexible rollout, centralized records, and the operational questions to review before deployment.',
    image: '/campaign/hero/workforce-desktop-v2.webp',
    sourceUrl: 'https://indianinfotech.org/why-your-company-needs-easytime-the-benefits-of-rent-based-cloud-attendance-management/',
    sections: [
      { title: 'Why teams reconsider traditional attendance', body: 'Attendance workflows can become difficult to maintain when locations, shifts, approvals, and records are handled separately. A cloud service can centralize that operating view while reducing the infrastructure that each site must maintain.' },
      { title: 'Where a cloud model can help', body: 'The original Indian Infotech article highlights flexible subscription access, centralized reporting, support for distributed teams, and lower local IT overhead as reasons organizations evaluate EasyTime.' },
      { title: 'What to confirm before rollout', body: 'A responsible rollout still starts with attendance policies, shift patterns, device compatibility, user roles, data handling, exception review, and support ownership. These details should be validated for each organization rather than assumed from a generic feature list.' },
    ],
  },
  {
    slug: 'ai-in-production-lines',
    category: 'Blog',
    date: '23 August 2024',
    title: 'How AI Technology Is Changing Production Lines',
    summary: 'An overview of how AI, workforce systems, and intelligent access can support more connected production environments.',
    image: '/campaign/industries/manufacturing-desktop-v2.webp',
    sourceUrl: 'https://indianinfotech.org/how-ai-technology-is-changing-the-game-in-production-lines/',
    sections: [
      { title: 'AI in the operating environment', body: 'Production teams increasingly evaluate AI for monitoring, process visibility, quality support, planning, and faster interpretation of operational information. The useful question is not whether a system uses AI, but which decision it improves.' },
      { title: 'Identity is part of the workflow', body: 'Indian Infotech connects this discussion to workforce software and biometric access control. In a production environment, attendance, authorized movement, and controlled-area entry need to fit the site’s real roles and safety procedures.' },
      { title: 'Evaluate outcomes, not labels', body: 'Before adopting an AI-enabled system, define the operating problem, available evidence, data responsibilities, integration requirements, failure handling, and the people accountable for reviewing results.' },
    ],
  },
] as const;
