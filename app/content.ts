import { companyProfile, companyStats } from '@/lib/company-profile';

export const companyFacts = [
  { value: String(companyProfile.foundedYear), label: 'Founded in Ahmedabad' },
  ...companyStats.map(({ display, label }) => ({ value: display, label })),
] as const;

export const customerOrganizations = [
  { name: 'Torrent Power', logo: '/clients/torrent-hq.png' },
  { name: 'Chiripal Industries Limited', logo: '/clients/client-logo-2.png' },
  { name: 'Aditya Birla Group', logo: '/clients/aditya-birla-hq.jpg' },
  { name: 'Zydus Lifesciences', logo: '/clients/zydus-hq.png' },
  { name: 'AAD Mining Executors Group', logo: '/clients/client-logo-5.png' },
  { name: 'Mylan', logo: '/clients/client-logo-6.png' },
  { name: 'Astral Pipes', logo: '/clients/astral-hq.png' },
  { name: 'Lincoln Pharmaceuticals Limited', logo: '/clients/client-logo-8.png' },
  { name: 'Windsor Machines Limited', logo: '/clients/client-logo-9.png' },
  { name: 'Bayer CropScience', logo: '/clients/bayer-hq.svg' },
  { name: 'RSWM Limited', logo: '/clients/client-logo-11.png' },
  { name: 'Torrent Gas', logo: '/clients/client-logo-12.png' },
  { name: 'Smith Structures India Pvt. Ltd.', logo: '/clients/client-logo-13.png' },
  { name: 'IIT Gandhinagar', logo: '/clients/client-logo-14.png' },
  { name: 'Cadila Pharmaceuticals Limited', logo: '/clients/client-logo-15.png' },
  { name: 'Varuna Group', logo: '/clients/client-logo-16.png' },
  { name: 'Swiss', logo: '/clients/swiss-hq.png' },
  { name: 'Sutlej Textiles and Industries Limited', logo: '/clients/client-logo-18.png' },
  { name: 'Meghmani Group', logo: '/clients/client-logo-19.png' },
  { name: 'Sudiva', logo: '/clients/sudiva-hq.png' },
  { name: 'Haitian International', logo: '/clients/client-logo-21.png' },
] as const;

export const clientQuotes = [
  { company: 'Torrent Power', logo: '/clients/torrent-hq.png', quote: 'A connected view of attendance and access helps our teams keep everyday operations secure, accountable, and moving on time.' },
  { company: 'Aditya Birla Group', logo: '/clients/aditya-birla-hq.jpg', quote: 'Indian Infotech brings practical workforce workflows together with dependable support, giving our people a clearer way to manage daily operations.' },
  { company: 'Astral Pipes', logo: '/clients/astral-hq.png', quote: 'The combination of biometric attendance, access control, and useful reporting gives our sites stronger visibility from entry to shift completion.' },
  { company: 'Bayer CropScience', logo: '/clients/bayer-hq.svg', quote: 'The solution makes workforce records easier to trust and easier to act on, while keeping controlled workplace access at the centre.' },
  { company: 'Swiss', logo: '/clients/swiss-hq.png', quote: 'Reliable identification and straightforward attendance workflows help our teams spend less time chasing records and more time running the workplace.' },
  { company: 'Zydus Lifesciences', logo: '/clients/zydus-hq.png', quote: 'Indian Infotech understands the discipline of regulated environments and supports secure, organized movement across the working day.' },
  { company: 'Sudiva', logo: '/clients/sudiva-hq.png', quote: 'From implementation to ongoing help, the experience is focused, responsive, and built around making workforce administration simpler.' },
] as const;

export type SoftwarePlatform = {
  slug: string;
  name: string;
  category: 'Workforce' | 'Workplace';
  summary: string;
  modules: readonly string[];
  workflow: readonly string[];
  legacyPath: string;
  publishedFacts?: readonly { label: string; value: string }[];
  evidenceSource?: string;
};

export const softwarePlatforms: readonly SoftwarePlatform[] = [
  {
    slug: 'easytime-online',
    name: 'Easytime Online',
    category: 'Workforce',
    summary: 'Centralized workforce software for multiple users, locations, and companies, from attendance punching through payroll processing.',
    modules: ['Attendance', 'Shift operations', 'Leave workflows', 'Overtime review', 'Reports'],
    workflow: ['Capture attendance', 'Review exceptions', 'Apply shift and leave rules', 'Prepare approved records'],
    legacyPath: '/softwares/cost-effective/',
    publishedFacts: [
      { label: 'Face capture distance', value: 'Up to 3 metres' },
      { label: 'Facial template capacity', value: 'Up to 10,000 templates' },
      { label: 'Verification methods', value: 'Face, fingerprint, and RFID' },
      { label: 'Network options', value: 'Wi-Fi, 3G, and 4G' },
      { label: 'Face verification time', value: 'Less than one second' },
      { label: 'Architecture', value: 'Client-server with MS SQL backend' },
      { label: 'Reporting', value: '60+ functional MIS reports and report writer' },
      { label: 'Published integration scope', value: 'ERP, payroll, and SAP' },
    ],
    evidenceSource: 'Indian Infotech company brochure; exact device and configuration must be confirmed',
  },
  {
    slug: 'hrms-payroll',
    name: 'HRMS & Payroll',
    category: 'Workforce',
    summary: 'HRMS and payroll workflows spanning core HR, claims, documents, assets, attendance, employee self-service, performance, training, lifecycle, and recruitment.',
    modules: ['Core HR', 'Payroll', 'Claims and reimbursement', 'Document management', 'Employee assets', 'Leave management', 'Time and attendance', 'Employee self-service', 'Performance management', 'Training and induction', 'Fixed asset', 'Employee onboarding and exit', 'Recruitment'],
    workflow: ['Maintain employee records', 'Manage attendance and leave', 'Review payroll inputs', 'Support employee workflows'],
    legacyPath: '/hrms-payroll/',
  },
  {
    slug: 'visitor-management',
    name: 'Visitor Management System',
    category: 'Workplace',
    summary: 'A visitor workflow for quick, secure check-in, host coordination, visit records, and controlled movement through the workplace.',
    modules: ['Visitor registration', 'Host coordination', 'Check-in records', 'Visit tracking', 'Check-out'],
    workflow: ['Register visitor', 'Coordinate with host', 'Record entry', 'Track visit status', 'Close the visit'],
    legacyPath: '/softwares/scalable-resources/',
  },
  {
    slug: 'canteen-management',
    name: 'Canteen Management System',
    category: 'Workplace',
    summary: 'Biometric canteen management designed to streamline employee identification, meal entitlements, transactions, and service administration.',
    modules: ['Employee identification', 'Meal transactions', 'Entitlement rules', 'Usage records', 'Operational reports'],
    workflow: ['Identify employee', 'Validate entitlement', 'Record transaction', 'Reconcile usage'],
    legacyPath: '/softwares/communication-ease/',
    publishedFacts: [
      { label: 'Transaction modes', value: 'Prepaid and postpaid' },
      { label: 'Operating scope', value: 'Multi-company and multi-location' },
      { label: 'Vendor operation', value: 'Multi-vendor support' },
      { label: 'Employee identification', value: 'Biometric device workflow' },
      { label: 'Published integration scope', value: 'Payroll or ERP deductions' },
      { label: 'Reporting', value: 'Excel reporting and report writer' },
    ],
    evidenceSource: 'Indian Infotech company brochure; exact software version and configuration must be confirmed',
  },
  {
    slug: 'hexin-mediaa-wave',
    name: 'Hexin Mediaa Wave',
    category: 'Workplace',
    summary: 'Cloud-based media management for centrally uploading, scheduling, approving, and monitoring content across multiple displays and locations.',
    modules: ['Multi-user display control', 'Content scheduling', 'Images, video, PDF and live data', 'Permission and approval levels', 'Remote monitoring'],
    workflow: ['Upload approved media', 'Assign displays', 'Schedule content', 'Monitor delivery'],
    legacyPath: '/softwares/',
  },
] as const;

export type HrmsModule = {
  slug: string;
  name: string;
  summary: string;
  legacyPath: string;
  image: string;
  imageAlt: string;
};

export const hrmsModules: readonly HrmsModule[] = [
  { slug: 'recruitment', name: 'Recruitment', summary: 'Plan vacancies, follow candidate progress, and bring interview feedback together to support hiring decisions.', legacyPath: '/recruitment/', image: '/campaign/hero/careers-interview-v5.png', imageAlt: 'Interviewers meeting with a job candidate' },
  { slug: 'leave', name: 'Leave', summary: 'Plan leave with team visibility to coordinate requests, balances, approvals, and availability.', legacyPath: '/leave-management/', image: '/campaign/industries/corporate-desktop-v2.webp', imageAlt: 'Colleagues collaborating in a corporate workplace' },
  { slug: 'pms', name: 'PMS', summary: 'Align goals, review progress, and support employee development through structured performance conversations.', legacyPath: '/performance-management/', image: '/campaign/hero/workforce-desktop-v2.webp', imageAlt: 'Workforce team collaborating on shared goals' },
  { slug: 'performance-linked-benefits', name: 'Performance Linked Benefits', summary: 'Connect production output with piece-rate wages and incentive calculations for a clearer view of earned rewards.', legacyPath: '/performance-linked-benefits/', image: '/campaign/product-moments/contract-workforce-v3.png', imageAlt: 'Production workforce and output tracking' },
  { slug: 'onboarding', name: 'On-Boarding', summary: 'Digital joining kits so new hires can become productive from day one.', legacyPath: '/onboarding/', image: '/campaign/hero/careers-workplace-v1.png', imageAlt: 'New colleagues arriving at a welcoming workplace' },
  { slug: 'attendance', name: 'Attendance', summary: 'Capture attendance through biometric devices or web login, then review records for connected workforce workflows.', legacyPath: '/time-attendance/', image: '/campaign/solutions/attendance-desktop-v2.webp', imageAlt: 'Attendance tracking across a distributed workforce' },
  { slug: 'hr-help-desk', name: 'HR Help Desk', summary: 'Give employee requests a central place to go, with clear routing, ownership, and progress updates.', legacyPath: '/hr-help-desk/', image: '/campaign/core-systems/easytime-desktop-v2.webp', imageAlt: 'Workforce software dashboard supporting employee requests' },
  { slug: 'training-induction', name: 'Training & Induction', summary: 'Organize induction and employee learning, track participation, and connect development with the wider employee journey.', legacyPath: '/training-induction/', image: '/campaign/industries/education-desktop-v2.webp', imageAlt: 'Learning and training environment' },
  { slug: 'core-hris-payroll', name: 'Core HRIS & Payroll', summary: 'Keep employee information, compensation records, and payroll inputs together for more consistent processing.', legacyPath: '/core-hris/', image: '/campaign/core-systems/hrms-payroll-desktop-v2.webp', imageAlt: 'HR team reviewing employee records and payroll workflows' },
  { slug: 'expense', name: 'Expense', summary: 'Submit expenditure with supporting documents and follow review and reimbursement steps from wherever work happens.', legacyPath: '/expense-management/', image: '/campaign/core-systems/workplace-software-poster.png', imageAlt: 'Connected workplace software for employee operations' },
  { slug: 'off-boarding', name: 'Off-Boarding', summary: 'Coordinate clearance, exit interviews, asset returns, and employee handoffs through a defined departure process.', legacyPath: '/offboarding/', image: '/campaign/hero/careers-workplace-v1.png', imageAlt: 'Colleagues coordinating a workplace handoff' },
  { slug: 'timesheet', name: 'Time Sheet', summary: 'Project-wise hours tied to a project master.', legacyPath: '/timesheet/', image: '/campaign/industries/construction-desktop-v2.webp', imageAlt: 'Project team coordinating work at a construction site' },
  { slug: 'ess', name: 'ESS', summary: 'Give employees dashboard access to common HR information, requests, and self-service actions.', legacyPath: '/employee-self-service/', image: '/campaign/core-systems/hrms-payroll-mobile-v2.webp', imageAlt: 'Employee self-service on a mobile device' },
  { slug: 'visitors', name: 'Visitors', summary: 'Support secure visitor check-in with OTP verification, host coordination, and an organized arrival workflow.', legacyPath: '/visitor-management/', image: '/campaign/solutions/visitor-desktop-v2.webp', imageAlt: 'Visitor check-in and workplace entry management' },
] as const;

export const platformPillars = [
  {
    number: '01',
    title: 'Workforce operations',
    description:
      'HRMS, payroll, leave, attendance, employee self-service, and lifecycle workflows for growing teams.',
    tags: ['HRMS & payroll', 'Time & attendance', 'Employee workflows'],
    href: '/platform#workforce',
  },
  {
    number: '02',
    title: 'Workplace security',
    description:
      'Biometric identity, access control, and entrance management for offices, plants, and controlled areas.',
    tags: ['Access control', 'Face & fingerprint', 'Entrance management'],
    href: '/platform#security',
  },
  {
    number: '03',
    title: 'Workplace services',
    description:
      'Visitor, canteen, and supporting operational systems that help facilities run with better records.',
    tags: ['Visitor management', 'Canteen management', 'Operational records'],
    href: '/platform#services',
  },
] as const;

export type Product = {
  slug: string;
  name: string;
  family: 'Access control' | 'Attendance' | 'Entrance management';
  description: string;
  image?: string;
  images?: readonly string[];
  authentication: 'Face' | 'Fingerprint' | 'Biometric' | 'Connected access system' | 'Connected controller' | 'Screening';
  application: 'Personnel access' | 'Attendance & access' | 'Vehicle entry' | 'Pedestrian entry' | 'Security screening';
  connectivity: 'Confirm configuration';
  deployment: 'Site assessment recommended';
  softwareCompatibility: 'Verify during solution design';
  status: 'Published portfolio';
  pdf?: string;
  specifications?: readonly { label: string; value: string }[];
};

export const products: readonly Product[] = [
  {
    slug: 'i-18',
    name: 'I-18',
    family: 'Access control',
    description: 'Fingerprint access control device for streamlined, controlled workplace entry.',
    image: '/products/i-18/product-render-v1.png',
    images: ['/products/i-18.jpg', '/posters/i-18.webp'],
    authentication: 'Fingerprint', application: 'Personnel access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/i-18.pdf',
  },
  {
    slug: 'i-202',
    name: 'I-202',
    family: 'Access control',
    description: 'Biometric access control and time-attendance device designed for secure entry and workforce records.',
    image: '/products/i-202/product-render-v1.png',
    images: ['/products/i-202/main.jpg', '/posters/i-202.webp'],
    authentication: 'Biometric', application: 'Personnel access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/i-202.pdf',
  },
  {
    slug: 'is-500',
    name: 'IS-500',
    family: 'Access control',
    description: 'Fingerprint access control and time-attendance system designed for robust, high-efficiency workplace operation.',
    image: '/products/is-500/product-render-v1.png',
    images: ['/products/is-500/main.png', '/products/is-500/alternate.png', '/posters/is-500.webp'],
    authentication: 'Fingerprint', application: 'Personnel access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/is-500.pdf',
  },
  {
    slug: 'ai-60',
    name: 'AI 60',
    family: 'Attendance',
    description: 'Facial-recognition technology integrating access control and time-attendance applications.',
    image: '/products/ai-60/product-render-v1.png',
    images: ['/products/ai-60/angle.png', '/products/ai-60/detail.png', '/products/ai-60/front.png', '/posters/ai-60.webp'],
    authentication: 'Face', application: 'Attendance & access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/ai-60.pdf',
  },
  {
    slug: 'mini-ai-10',
    name: 'Mini AI-10',
    family: 'Attendance',
    description: 'Compact visible-light facial-recognition device for secure attendance and access workflows.',
    image: '/products/mini-ai-10/product-render-v1.png',
    images: ['/products/mini-ai-10/front.png', '/products/mini-ai-10/angle.png', '/posters/mini-ai-10.webp'],
    authentication: 'Face', application: 'Attendance & access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio',
  },
  {
    slug: 'mini-ai-30',
    name: 'Mini AI-30',
    family: 'Attendance',
    description: 'Face-recognition access and attendance device for efficient workplace authentication.',
    image: '/products/mini-ai-30/product-render-v1.png',
    images: ['/products/mini-ai-30/front.png', '/products/mini-ai-30/angle.png', '/products/mini-ai-30/detail.png', '/posters/mini-ai-30.webp'],
    authentication: 'Face', application: 'Attendance & access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/mini-ai-30.pdf',
  },
  {
    slug: 'cmp-200',
    name: 'CMP 200',
    family: 'Entrance management',
    description: 'Automatic barrier gate with a telescopic boom arm for managed vehicle entry.',
    image: '/products/cmp-200/product-render-v1.png',
    images: ['/products/cmp-200/studio-angle-v1.png', '/posters/cmp-200.webp'],
    authentication: 'Connected controller', application: 'Vehicle entry', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio',
  },
  {
    slug: 'fbl-200',
    name: 'FBL 200',
    family: 'Entrance management',
    description: 'Single-lane flap barrier turnstile for seamless, secure pedestrian entry.',
    image: '/products/fbl-200/product-render-v1.png',
    images: ['/products/fbl-200/main.png', '/posters/fbl-200.webp'],
    authentication: 'Connected access system', application: 'Pedestrian entry', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio',
  },
  {
    slug: 'fbl-300',
    name: 'FBL 300',
    family: 'Entrance management',
    description: 'Single-lane flap barrier turnstile for efficient crowd and pedestrian management.',
    image: '/products/fbl-300/product-render-v1.png',
    images: ['/products/fbl-300/main.png', '/posters/fbl-300.webp'],
    authentication: 'Connected access system', application: 'Pedestrian entry', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio',
  },
  {
    slug: 'fht2300-series',
    name: 'FHT2300 Series',
    family: 'Entrance management',
    description: 'Full-height turnstile series engineered for controlled entry at sensitive access points.',
    image: '/products/fht2300/product-render-v1.png',
    images: ['/products/fht2300/model-l.png', '/products/fht2300/front.png', '/products/fht2300/detail.png', '/posters/fht2300-series.webp'],
    authentication: 'Connected access system', application: 'Pedestrian entry', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/fht2300-series.pdf',
  },
  {
    slug: 'ts200-series',
    name: 'TS200 Series',
    family: 'Entrance management',
    description: 'TS200, TS201, and TS202 tripod turnstile series for orderly, secure pedestrian access.',
    image: '/products/ts200-series/product-render-v1.png',
    images: ['/products/ts200-series/studio-angle-v1.png', '/posters/ts200-series.webp'],
    authentication: 'Connected access system', application: 'Pedestrian entry', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio',
  },
  {
    slug: 'd4330-metal-detector',
    name: 'D4330 Metal Detector',
    family: 'Entrance management',
    description: 'High-performance walk-through metal detector for security screening points.',
    image: '/products/d4330/product-render-v1.png',
    images: ['/products/d4330/front.png', '/products/d4330/angle.png', '/products/d4330/detail.png', '/products/d4330/application.png', '/posters/d4330-metal-detector.webp'],
    authentication: 'Screening', application: 'Security screening', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio',
  },
  { slug: 'ai-35', name: 'AI-35', family: 'Attendance', description: 'Face-recognition terminal for attendance and controlled workplace access.', image: '/products/ai-35/product-render-v1.png', images: ['/products/ai-35/product-render-v1.png'], authentication: 'Face', application: 'Attendance & access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/ai-35.pdf' },
  { slug: 'sf-1000', name: 'SF-1000', family: 'Access control', description: 'Fingerprint and card access-control terminal for secure workplace entry.', image: '/products/sf-1000/product-render-v1.png', images: ['/products/sf-1000/brochure-preview.png'], authentication: 'Fingerprint', application: 'Personnel access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/sf-1000.pdf' },
  { slug: 'ai-15l', name: 'AI-15L', family: 'Attendance', description: 'Face and fingerprint recognition terminal for attendance and access workflows.', image: '/products/ai-15l/product-render-v1.png', images: ['/products/ai-15l/brochure-preview.png'], authentication: 'Face', application: 'Attendance & access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/ai-15l.pdf' },
  { slug: 'ai-70', name: 'AI-70', family: 'Attendance', description: 'AI biometric access-control and time-attendance terminal.', image: '/products/ai-70/product-render-v1.png', images: ['/products/ai-70/brochure-preview.png'], authentication: 'Face', application: 'Attendance & access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/ai-70.pdf' },
  { slug: 'bio-70', name: 'Bio 70', family: 'Attendance', description: 'Biometric terminal for face, fingerprint, and card-based workforce records.', image: '/products/bio-70/product-render-v1.png', images: ['/products/bio-70/brochure-preview.png'], authentication: 'Biometric', application: 'Attendance & access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/bio-70.pdf' },
  { slug: 'f-12-slave', name: 'F-12 Slave', family: 'Access control', description: 'RS485 fingerprint reader for connected biometric access systems.', image: '/products/f-12-slave/product-render-v1.png', images: ['/products/f-12-slave/brochure-preview.png'], authentication: 'Fingerprint', application: 'Personnel access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/f-12-slave.pdf' },
  { slug: '20k-fp', name: '20K FP', family: 'Attendance', description: 'Fingerprint workforce terminal for attendance and access operations.', image: '/products/20k-fp/product-render-v1.png', images: ['/products/20k-fp/brochure-preview.png'], authentication: 'Fingerprint', application: 'Attendance & access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/20k-fp.pdf' },
  { slug: 'fp-padlock', name: 'FP Padlock', family: 'Access control', description: 'Fingerprint-enabled padlock for practical portable access control.', image: '/products/fp-padlock/product-render-v1.png', images: ['/products/fp-padlock/brochure-preview.png'], authentication: 'Fingerprint', application: 'Personnel access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/fp-padlock.pdf' },
  { slug: 'door-interlock-system', name: 'Door Interlock System', family: 'Access control', description: 'Door interlock system for controlled movement between secured areas.', image: '/products/door-interlock-system/product-render-v1.png', images: ['/products/door-interlock-system/brochure-preview.png'], authentication: 'Connected access system', application: 'Personnel access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/door-interlock-system.pdf' },
  { slug: 'door-interlock-card-mb01', name: 'Door Interlock Card MB01', family: 'Access control', description: '12V door-interlock control card for managed access installations.', image: '/products/door-interlock-card-mb01/product-render-v1.png', images: ['/products/door-interlock-card-mb01/brochure-preview.png'], authentication: 'Connected controller', application: 'Personnel access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/door-interlock-card-mb01.pdf' },
  { slug: 'em-lock-600lbs', name: 'EM Lock 600LBS', family: 'Access control', description: 'Electromagnetic lock for controlled door access.', image: '/products/em-lock-600lbs/product-render-v1.png', images: ['/products/em-lock-600lbs/brochure-preview.png'], authentication: 'Connected access system', application: 'Personnel access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/em-lock-600lbs.pdf' },
  { slug: 'ines33-exit-switch', name: 'INES33 Exit Switch', family: 'Access control', description: 'Door-release exit switch for controlled access points.', image: '/products/ines33-exit-switch/product-render-v1.png', images: ['/products/ines33-exit-switch/brochure-preview.png'], authentication: 'Connected access system', application: 'Personnel access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/ines33-exit-switch.pdf' },
  { slug: 'innte33-no-touch-switch', name: 'INNTE33 No Touch Switch', family: 'Access control', description: 'No-touch exit switch for hygienic door-release operation.', image: '/products/innte33-no-touch-switch/product-render-v1.png', images: ['/products/innte33-no-touch-switch/brochure-preview.png'], authentication: 'Connected access system', application: 'Personnel access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/innte33-no-touch-switch.pdf' },
  { slug: 'tripod-barrier-heavy', name: 'Tripod Barrier Heavy', family: 'Entrance management', description: 'Heavy-duty tripod barrier for orderly pedestrian entry.', image: '/products/tripod-barrier-heavy/product-render-v1.png', images: ['/products/tripod-barrier-heavy/brochure-preview.png'], authentication: 'Connected access system', application: 'Pedestrian entry', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/tripod-barrier-heavy.pdf' },
  { slug: 'surface-bolt-lock', name: 'Surface Bolt Lock', family: 'Access control', description: 'Surface electric bolt lock for secure controlled doors.', image: '/products/surface-bolt-lock/product-render-v1.png', images: ['/products/surface-bolt-lock/brochure-preview.png'], authentication: 'Connected access system', application: 'Personnel access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/surface-bolt-lock.pdf' },
  { slug: 'face-ai-80-pro', name: 'Face AI-80 Pro', family: 'Attendance', description: 'High-capacity facial-recognition terminal for access and attendance.', image: '/products/face-ai-80-pro/product-render-v1.png', images: ['/products/face-ai-80-pro/brochure-preview.png'], authentication: 'Face', application: 'Attendance & access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/face-ai-80-pro.pdf' },
  { slug: 'f1000-series-flap-barrier', name: 'IND F1000 Series', family: 'Entrance management', description: 'High-efficiency flap barrier turnstile for high-traffic indoor and outdoor access points.', image: '/products/f1000-series-flap-barrier/product-render-v1.png', images: ['/products/f1000-series-flap-barrier/product-render-v1.png'], authentication: 'Connected access system', application: 'Pedestrian entry', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/f1000-series-flap-barrier.pdf' },
  { slug: 'flp-600lbs-feedback-lock', name: 'FLP 600LBS Feedback Lock', family: 'Access control', description: 'Flame-proof 600LBS feedback lock with door-status contact for demanding access-control environments.', image: '/products/flp-600lbs-feedback-lock/product-render-v1.png', images: ['/products/flp-600lbs-feedback-lock/product-render-v1.png'], authentication: 'Connected access system', application: 'Personnel access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/flp-600lbs-feedback-lock.pdf' },
  { slug: 'flp-gs03', name: 'FLP GS03', family: 'Access control', description: 'Flame-proof glass-touch emergency switch with red-green door-status indication for hazardous-area access control.', image: '/products/flp-gs03/product-render-v1.png', images: ['/products/flp-gs03/product-render-v1.png'], authentication: 'Connected access system', application: 'Personnel access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/flp-gs03.pdf' },
  { slug: 'gs03-go-stop-push-button', name: 'GS03 Go Stop Push Button', family: 'Access control', description: 'Stainless-steel go/stop push button with clear status indication for controlled door operation.', image: '/products/gs03-go-stop-push-button/product-render-v1.png', images: ['/products/gs03-go-stop-push-button/product-render-v1.png'], authentication: 'Connected access system', application: 'Personnel access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/gs03-go-stop-push-button.pdf' },
  { slug: 'ind-300sb', name: 'IND 300SB', family: 'Entrance management', description: 'Single-lane swing barrier turnstile for smooth pedestrian entry after approved card or fingerprint authentication.', image: '/products/ind-300sb/product-render-v1.png', images: ['/products/ind-300sb/product-render-v1.png'], authentication: 'Connected access system', application: 'Pedestrian entry', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/ind-300sb.pdf' },
  { slug: 'stc-100', name: 'STC-100 Control Box', family: 'Access control', description: 'Compact control box for secure stacker-crane access with configurable relay outputs.', image: '/products/stc-100/product-render-v1.png', images: ['/products/stc-100/brochure-preview.png'], authentication: 'Connected controller', application: 'Personnel access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio', pdf: '/product-pdfs/stc-100.pdf' },
] as const;

export type SolutionProfile = {
  slug: string;
  name: string;
  problem: string;
  summary: string;
  workflow: readonly string[];
  hardwareFamilies: readonly Product['family'][];
  softwareSlugs: readonly string[];
};

export const solutionProfiles: readonly SolutionProfile[] = [
  { slug: 'attendance-automation', name: 'Attendance Automation', problem: 'It can be hard to check who arrived, who missed a punch, and which shift they worked when records are collected by hand.', summary: 'Record arrival times and give managers a clear way to review shifts, leave, and missed punches.', workflow: ['Record when a person arrives', 'Check the right shift and leave details', 'Review missed or unusual punches', 'Prepare records for the next approved step'], hardwareFamilies: ['Attendance'], softwareSlugs: ['easytime-online', 'hrms-payroll'] },
  { slug: 'multi-location-attendance', name: 'Multi-location Attendance', problem: 'When each workplace keeps attendance differently, managers can have trouble comparing records.', summary: 'Plan one attendance process for many sites while letting each site keep its local shift rules.', workflow: ['List each workplace and its shifts', 'Choose an attendance device for each site', 'Decide who checks records at each site', 'Set up shared reports and support'], hardwareFamilies: ['Attendance'], softwareSlugs: ['easytime-online'] },
  { slug: 'physical-access-control', name: 'Physical Access Control', problem: 'Without clear rules, people may not know which doors they can use, and managers may find it hard to review entry.', summary: 'Plan who may use each door, when they may enter, and what the team should do if a problem comes up.', workflow: ['List people and doors', 'Decide who may enter each area', 'Choose door readers and entry equipment', 'Test the setup and show teams how to use it'], hardwareFamilies: ['Access control', 'Entrance management'], softwareSlugs: ['visitor-management'] },
  { slug: 'visitor-security', name: 'Visitor Security', problem: 'When check-in, host messages, and visit records are separate, visitors and staff may be unsure what happens next.', summary: 'Plan how visitors share their details, reach their host, enter, and check out.', workflow: ['Collect visitor details', 'Tell the host that a visitor has arrived', 'Follow the site entry steps', 'Record when the visit ends'], hardwareFamilies: ['Access control'], softwareSlugs: ['visitor-management'] },
  { slug: 'entrance-management', name: 'Entrance Management', problem: 'Busy entrances need clear paths for people and vehicles.', summary: 'Plan gates, turnstiles, barriers, or checks around how people and vehicles use the entrance.', workflow: ['Watch how people and vehicles enter', 'Choose the right gates or barriers', 'Decide how entry checks will work', 'Choose who will run and support the entrance'], hardwareFamilies: ['Entrance management', 'Access control'], softwareSlugs: ['visitor-management'] },
  { slug: 'canteen-operations', name: 'Canteen Operations', problem: 'Meal counts can be hard to check when employee details, meal rules, and payments are in different places.', summary: 'Use employee identification and meal rules to record canteen use and help the team check totals.', workflow: ['Identify the employee', 'Check which meal they can use', 'Record the meal', 'Review the canteen totals'], hardwareFamilies: ['Attendance'], softwareSlugs: ['canteen-management'] },
] as const;

export type IndustryProfile = {
  slug: string;
  name: string;
  context: string;
  workflow: readonly string[];
  solutionSlugs: readonly string[];
};

export const industryProfiles: readonly IndustryProfile[] = [
  { slug: 'manufacturing', name: 'Manufacturing', context: 'Plan how workers arrive for each shift, how contractors enter, and which work areas need extra checks.', workflow: ['List work shifts and entrances', 'Decide how staff and contractors enter', 'Choose tools to record time and manage entry', 'Decide who checks records and helps'], solutionSlugs: ['attendance-automation', 'physical-access-control', 'entrance-management'] },
  { slug: 'chemical', name: 'Chemical', context: 'Plan who can enter each area, how workers and contractors are counted, and how people move around the site.', workflow: ['List shifts, contractors, and work areas', 'Decide who can enter each area', 'Choose tools for attendance and entry', 'Plan how teams check problems and records'], solutionSlugs: ['attendance-automation', 'physical-access-control', 'entrance-management'] },
  { slug: 'textile', name: 'Textile', context: 'Help large teams start shifts on time and use the right entrances across the factory.', workflow: ['List shifts and factory entrances', 'Plan routes for staff and contractors', 'Choose attendance and entry tools', 'Decide who checks records at each site'], solutionSlugs: ['attendance-automation', 'multi-location-attendance', 'physical-access-control'] },
  { slug: 'engineering', name: 'Engineering', context: 'Manage worker attendance, welcome visitors, and decide who can enter labs, tool rooms, and project areas.', workflow: ['List teams, visitors, and work areas', 'Decide who can enter each area', 'Choose tools for staff and visitor entry', 'Test the steps and name the support team'], solutionSlugs: ['attendance-automation', 'visitor-security', 'physical-access-control'] },
  { slug: 'food', name: 'Food Processing', context: 'Plan worker attendance and entry around clean areas, shift changes, and the workplace’s own rules.', workflow: ['List clean areas and entry steps', 'Plan shifts, contractors, and work zones', 'Choose attendance and entry tools', 'Decide who checks records and helps'], solutionSlugs: ['attendance-automation', 'physical-access-control', 'canteen-operations'] },
  { slug: 'service-provider', name: 'Service Providers', context: 'Keep track of teams working in different offices and customer sites, and help visitors reach the right person.', workflow: ['List staff and visitor journeys', 'Plan attendance and workplace entry', 'Decide who uses each system at each site', 'Plan how teams learn and get help'], solutionSlugs: ['multi-location-attendance', 'visitor-security', 'physical-access-control'] },
  { slug: 'corporate', name: 'Corporate Offices', context: 'Give workers and visitors a clear way to enter, check in, and find the right team.', workflow: ['List staff and visitor journeys', 'Plan attendance and door access', 'Decide who uses each system and report', 'Help teams learn the daily steps'], solutionSlugs: ['attendance-automation', 'visitor-security', 'physical-access-control'] },
  { slug: 'pharma', name: 'Pharmaceutical & Research', context: 'Plan who can enter controlled rooms, how workers check in, and how visitors move through the site.', workflow: ['List rooms with special entry rules', 'Plan how staff and visitors move', 'Set steps for entry and attendance', 'Plan records and support needs'], solutionSlugs: ['attendance-automation', 'physical-access-control', 'visitor-security'] },
  { slug: 'healthcare', name: 'Healthcare', context: 'Plan staff shifts, visitor entry, and access to important areas across a care facility.', workflow: ['Map how staff and visitors move', 'Plan shift times and entry rules', 'Choose tools that fit the facility', 'Decide who runs each step'], solutionSlugs: ['attendance-automation', 'visitor-security', 'physical-access-control'] },
  { slug: 'education', name: 'Education', context: 'Help schools and campuses manage staff attendance, visitors, and building entrances.', workflow: ['List campus entrances', 'Plan routes for staff and visitors', 'Choose attendance and entry tools', 'Plan support for the school team'], solutionSlugs: ['attendance-automation', 'visitor-security', 'entrance-management'] },
  { slug: 'construction', name: 'Construction', context: 'Keep track of workers and contractors as they move between changing job sites.', workflow: ['List sites and workers', 'Plan contractor and visitor entry', 'Choose attendance and entry tools', 'Plan setup and support at each site'], solutionSlugs: ['multi-location-attendance', 'visitor-security', 'entrance-management'] },
  { slug: 'government', name: 'Government', context: 'Make it clear where staff and visitors can go in public buildings and offices.', workflow: ['List public and staff entrances', 'Mark areas with special entry rules', 'Choose tools for visitor and staff entry', 'Decide who runs the steps and helps'], solutionSlugs: ['visitor-security', 'physical-access-control', 'entrance-management'] },
  { slug: 'banking', name: 'Banking', context: 'Plan staff access, visitor check-in, and attendance across branches and offices.', workflow: ['List branches and office areas', 'Plan door access and visitor check-in', 'Confirm how staff record attendance', 'Decide how teams get help'], solutionSlugs: ['physical-access-control', 'visitor-security', 'attendance-automation'] },
  { slug: 'logistics', name: 'Logistics', context: 'Organize worker and vehicle entry at busy gates and across shifts.', workflow: ['List gates and shift times', 'Plan how workers and vehicles move', 'Choose attendance and entry tools', 'Plan team handovers and support'], solutionSlugs: ['multi-location-attendance', 'entrance-management', 'physical-access-control'] },
  { slug: 'retail', name: 'Retail', context: 'Help store teams track attendance and use a clear process at each location.', workflow: ['List stores and team schedules', 'Plan attendance and staff entry', 'Set the setup order for each store', 'Decide how store teams get help'], solutionSlugs: ['multi-location-attendance', 'attendance-automation'] },
  { slug: 'hospitality', name: 'Hospitality', context: 'Help hotel and venue teams manage staff attendance, welcome guests, and keep staff-only areas clear.', workflow: ['Plan staff and guest routes', 'Mark areas for staff only', 'Choose attendance and visitor steps', 'Decide who runs each step'], solutionSlugs: ['attendance-automation', 'visitor-security', 'physical-access-control'] },
] as const;

type Industry = {
  name: string;
  description: string;
  href: string;
  featured?: boolean;
};

export const industries: readonly Industry[] = [
  {
    name: 'Pharmaceutical & research',
    description: 'Controlled-area access, attendance, visitor, and workforce workflows.',
    href: '/industries/pharma',
    featured: true,
  },
  {
    name: 'Manufacturing',
    description: 'Shift attendance, gate operations, contractor movement, and access.',
    href: '/industries/manufacturing',
  },
  {
    name: 'Chemical',
    description: 'Identity and access workflows for safety-conscious facilities.',
    href: '/industries/chemical',
  },
  {
    name: 'Textiles',
    description: 'Attendance and workforce systems for large, multi-shift teams.',
    href: '/industries/textile',
  },
  {
    name: 'Corporate offices',
    description: 'Visitor, access, attendance, and employee operations.',
    href: '/industries/corporate',
  },
  {
    name: 'Food industries',
    description: 'Canteen, attendance, and controlled-area workflows.',
    href: '/industries/food',
  },
] as const;
