export type Insight = {
  slug: string;
  category: 'Blog';
  date: string;
  title: string;
  summary: string;
  image: string;
  sourceUrl?: string;
  sections: readonly { title: string; body: string; points?: readonly string[]; ordered?: boolean }[];
};

export const insights: readonly Insight[] = [
  {
    slug: 'using-rag-to-solve-customer-problems-faster',
    category: 'Blog',
    date: '31 August 2026',
    title: 'RAG Customer Support: Faster Answers From Existing Knowledge',
    summary: 'How retrieval-augmented generation turns existing support knowledge into faster, grounded answers while keeping a clear path to human help.',
    image: '/campaign/hero/innovation-desktop-v2.webp',
    sections: [
      { title: 'The problem', body: "A customer submits a ticket, waits in a queue, and then waits again while an agent searches documentation or old tickets for an answer that may already exist. Customers want an accurate answer now—ideally without needing a human for every simple, repetitive question. That is the gap retrieval-augmented generation, or RAG, is built to close." },
      { title: 'What is RAG, in plain terms?', body: "RAG combines retrieval and generation. Retrieval searches your knowledge base—including documentation, past tickets, and FAQs—for the most relevant information. Generation gives those results to a large language model, which writes a natural, direct answer grounded in that context. Instead of guessing from general training data, the system consults your company's current product knowledge first." },
      { title: 'Why it matters for support teams', body: 'Grounding answers in one maintained source of truth can improve both customer experience and the way support teams spend their time.', points: ['Faster replies for common questions', 'More customer issues resolved through self-service', 'Lower repetitive ticket volume for support agents', 'Consistent answers drawn from the same approved knowledge', 'A knowledge base that becomes more useful as it improves'] },
      { title: 'How the pipeline works', body: 'A typical support RAG pipeline follows five practical stages:', ordered: true, points: ['Ingest: break help documents, FAQs, and resolved tickets into useful chunks', 'Embed: convert each chunk into a numeric representation and store it in a vector database', 'Retrieve: find the chunks most similar to the customer question', 'Generate: give the retrieved context and question to an LLM to produce a clear answer', 'Respond: show the answer immediately, with a route to a human when needed'] },
      { title: 'Getting started—a practical path', body: 'A useful first version does not require a massive infrastructure investment.', points: ['Prototype retrieval with a lightweight vector store and simple embeddings', 'Move to production-grade embeddings and a live LLM after the pattern proves useful', 'Keep a clear human escalation path when the system is not confident', 'Treat documentation quality as part of the product because better sources produce better answers'] },
      { title: 'The bigger picture', body: 'RAG turns existing documentation into an active, always-available support resource. Customers get faster, grounded answers while the support team spends less time repeating information and more time on problems that genuinely need human judgment.' },
    ],
  },
  {
    slug: 'how-ai-makes-daily-work-easier',
    category: 'Blog',
    date: '27 August 2026',
    title: 'AI Workplace Automation: Practical Uses for Indian Businesses',
    summary: 'A practical look at how our team uses AI to write cleaner code, improve documentation, analyze data, support customers, and spend more time solving meaningful problems.',
    image: '/company/ai-cover-workplace.webp',
    sections: [
      { title: 'AI has become part of the team', body: 'Artificial intelligence is no longer just a buzzword. From writing code to answering customer emails, AI tools now support our day-to-day workflow and help us work faster, smarter, and with less friction.' },
      { title: '1. Faster, cleaner code', body: 'AI coding assistants reduce repetitive development work and leave our engineers with more time for the problems that need real judgment.', points: ['Generate starter code and boilerplate in seconds', 'Suggest fixes for bugs early', 'Review pull requests and flag potential issues', 'Explain unfamiliar codebases during onboarding'] },
      { title: '2. Smarter documentation', body: 'AI helps turn working knowledge into useful documentation without slowing delivery.', points: ['Turn rough notes into clear technical documentation', 'Summarize meeting transcripts into action items', 'Draft README files and API documentation', 'Keep internal wikis current with less manual rewriting'] },
      { title: '3. Data analysis without the headache', body: 'Our team can explore data and communicate useful findings faster, even when the starting point is a large or untidy dataset.', points: ['Spot patterns and anomalies in large datasets', 'Generate reports and visualizations from raw data', 'Automate repetitive data-cleaning work', 'Answer quick data questions in plain language'] },
      { title: '4. Better customer support', body: 'AI supports the first stage of service while our team remains responsible for reviewing and personalizing customer communication.', points: ['Answer common questions quickly', 'Draft first responses for team review', 'Categorize and prioritize incoming requests'] },
      { title: '5. Testing and quality assurance', body: 'AI makes routine quality checks easier to start and helps teams think beyond the most obvious happy path.', points: ['Generate test cases from code changes', 'Identify edge cases that deserve review', 'Run quick sanity checks before release'] },
      { title: '6. More time for real problem-solving', body: 'By handling repetitive and predictable tasks, AI gives our engineers and analysts more time for creative problem-solving, architecture decisions, and building better products for clients.' },
      { title: 'The bottom line', body: 'AI has not replaced our team—it has amplified it. Developers, analysts, and support staff can use AI for repetitive work while keeping people focused on building reliable software and solving real client problems.' },
    ],
  },
  {
    slug: 'easytime-cloud-attendance-benefits',
    category: 'Blog',
    date: '23 August 2024',
    title: 'Biometric Attendance System Cost in India: Cloud Pricing Factors',
    summary: 'Understand the factors that shape biometric attendance system cost in India, including devices, locations, software scope, rollout, and support.',
    image: '/campaign/hero/workforce-desktop-v2.webp',
    sourceUrl: 'https://indianinfotech.org/why-your-company-needs-easytime-the-benefits-of-rent-based-cloud-attendance-management/',
    sections: [
      { title: 'What shapes attendance-system cost?', body: 'There is no responsible one-price answer. Workforce size, device count, authentication method, number of locations, software modules, integrations, installation conditions, training, and support scope all affect the final quote.' },
      { title: 'Why teams reconsider traditional attendance', body: 'Attendance workflows can become difficult to maintain when locations, shifts, approvals, and records are handled separately. A cloud service can centralize that operating view while reducing the infrastructure that each site must maintain.' },
      { title: 'Where a cloud model can help', body: 'The original Indian Infotech article highlights flexible subscription access, centralized reporting, support for distributed teams, and lower local IT overhead as reasons organizations evaluate EasyTime.' },
      { title: 'What to confirm before rollout', body: 'A responsible rollout still starts with attendance policies, shift patterns, device compatibility, user roles, data handling, exception review, and support ownership. These details should be validated for each organization rather than assumed from a generic feature list.' },
    ],
  },
  {
    slug: 'ai-in-production-lines',
    category: 'Blog',
    date: '23 August 2024',
    title: 'AI in Manufacturing: A Practical Guide for Production Teams',
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
