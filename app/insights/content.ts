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
      { title: 'The problem with traditional attendance systems', body: 'Traditional attendance systems can require a large upfront investment in devices, servers, installation, maintenance, and upgrades. Manual records and disconnected spreadsheets also create missed punches, inaccurate timesheets, slow approvals, and avoidable payroll disputes.' },
      { title: 'Why teams consider a cloud model', body: 'EasyTime is a rent-based cloud attendance system designed to reduce the infrastructure burden while keeping attendance information available to the people who review it. The practical question is not whether cloud is fashionable; it is whether the operating model makes attendance easier to run across the organization.' },
      { title: '1. Cost and rollout flexibility', body: 'A subscription model can make the first rollout easier to plan than a large capital purchase. Teams can confirm the right device mix, locations, users, and software scope before expanding the system, instead of committing every site to the same configuration on day one.' },
      { title: '2. Easier setup and maintenance', body: 'A cloud platform can reduce the need for local servers and repeated software maintenance. The remaining work still matters: define attendance policies, connect approved devices, assign administrators, test exceptions, and document who owns support at each location.' },
      { title: '3. Anywhere access and real-time reporting', body: 'HR and operations teams can review attendance from a central view across offices, plants, and remote teams. Reports can help surface absenteeism, overtime, shift exceptions, and missing records before they become payroll or compliance problems.', points: ['Review attendance from approved locations', 'Identify missing or unusual punches', 'Track shift and overtime exceptions', 'Prepare validated records for payroll'] },
      { title: '4. Better employee and manager experience', body: 'A clear attendance workflow gives employees a way to see records, submit leave requests, and understand schedules while managers can review exceptions with context. Transparency reduces repetitive questions and makes responsibility easier to assign.' },
      { title: '5. What to confirm before rollout', body: 'The final design should be based on the organization’s real operating model.', points: ['Workforce size, shifts, and locations', 'Device and authentication requirements', 'Leave, overtime, and approval policies', 'Network, offline, and data-handling expectations', 'Payroll or ERP integration scope', 'Training, escalation, and support ownership'] },
      { title: 'Where EasyTime fits', body: 'Manufacturing teams can coordinate multiple shifts, retail groups can review attendance across stores, and distributed or remote teams can use a shared operating view. The right configuration depends on the site assessment and should be confirmed before procurement.' },
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
      { title: '1. What is AI and why does it matter?', body: 'Artificial intelligence enables software and machines to interpret information, identify patterns, and support decisions that would otherwise require constant manual review. On a production line, its value comes from making operational signals easier to act on—not from adding an impressive label to a device.' },
      { title: '2. How AI boosts production efficiency', body: 'AI can monitor equipment and process data to identify patterns before a small issue becomes a stoppage. Predictive maintenance, process optimization, and real-time alerts can help teams reduce downtime and keep production moving at a more consistent pace.' },
      { title: '3. Keeping quality in check', body: 'AI-powered cameras and sensors can inspect products for defects or inconsistencies while work is still in progress. Detecting scratches, assembly errors, or dimensional variation earlier can reduce waste and give quality teams a clearer record of where problems begin.' },
      { title: '4. AI in supply-chain planning', body: 'Production performance depends on materials, inventory, dispatch, and logistics as much as the line itself. AI-assisted forecasting can help estimate demand, plan raw-material requirements, identify bottlenecks, and coordinate finished-goods movement with more evidence.' },
      { title: '5. Connected workforce and access workflows', body: 'The production line is also a people and safety environment. Workforce software can support employee scheduling and performance records, while biometric access control can help ensure that only authorized people enter controlled areas. These workflows should match site roles, safety procedures, and privacy responsibilities.' },
      { title: '6. Where Indian Infotech can help', body: 'Indian Infotech brings together workforce systems, access control, and workplace technology for operating environments that need clearer records. HRMS and attendance workflows can support the workforce; biometric access can support controlled entry; and media systems can distribute approved SOPs, training, or safety content across displays.' },
      { title: '7. Real-world production examples', body: 'Automotive plants use AI-assisted inspection and robotics for repeatable precision. Electronics manufacturers inspect small components for defects. Food and beverage teams use data to improve quality, throughput, and demand planning. The technology varies, but the operating principle is consistent: connect the signal to a decision and assign a person to review the outcome.' },
      { title: '8. What comes next', body: 'Future production environments will connect machines, people, quality systems, and supply-chain signals more closely. A responsible path starts with one measurable bottleneck, reliable data, a defined fallback when the system is uncertain, and a rollout plan that employees can understand.' },
    ],
  },
] as const;
