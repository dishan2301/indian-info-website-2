import { companyProfile, companyStats } from '@/lib/company-profile';

export const companyFacts = [
  { value: String(companyProfile.foundedYear), label: 'Founded in Ahmedabad' },
  ...companyStats.map(({ display, label }) => ({ value: display, label })),
] as const;

export const customerOrganizations = [
  { name: 'Torrent Power', logo: '/clients/client-logo-1.png' },
  { name: 'Chiripal Industries Limited', logo: '/clients/client-logo-2.png' },
  { name: 'Aditya Birla Group', logo: '/clients/client-logo-3.png' },
  { name: 'Zydus Lifesciences', logo: '/clients/client-logo-4.png' },
  { name: 'AAD Mining Executors Group', logo: '/clients/client-logo-5.png' },
  { name: 'Mylan', logo: '/clients/client-logo-6.png' },
  { name: 'Astral Pipes', logo: '/clients/client-logo-7.png' },
  { name: 'Lincoln Pharmaceuticals Limited', logo: '/clients/client-logo-8.png' },
  { name: 'Windsor Machines Limited', logo: '/clients/client-logo-9.png' },
  { name: 'Bayer CropScience', logo: '/clients/client-logo-10.png' },
  { name: 'RSWM Limited', logo: '/clients/client-logo-11.png' },
  { name: 'Torrent Gas', logo: '/clients/client-logo-12.png' },
  { name: 'Smith Structures India Pvt. Ltd.', logo: '/clients/client-logo-13.png' },
  { name: 'IIT Gandhinagar', logo: '/clients/client-logo-14.png' },
  { name: 'Cadila Pharmaceuticals Limited', logo: '/clients/client-logo-15.png' },
  { name: 'Varuna Group', logo: '/clients/client-logo-16.png' },
  { name: 'Swiss', logo: '/clients/client-logo-17.png' },
  { name: 'Sutlej Textiles and Industries Limited', logo: '/clients/client-logo-18.png' },
  { name: 'Meghmani Group', logo: '/clients/client-logo-19.png' },
  { name: 'Sudiva', logo: '/clients/client-logo-20.png' },
  { name: 'Haitian International', logo: '/clients/client-logo-21.png' },
] as const;

export type SoftwarePlatform = {
  slug: string;
  name: string;
  category: 'Workforce' | 'Workplace';
  summary: string;
  modules: readonly string[];
  workflow: readonly string[];
  legacyPath: string;
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
};

export const hrmsModules: readonly HrmsModule[] = [
  { slug: 'core-hr-payroll', name: 'Core HR and Payroll', summary: 'A central employee and payroll workflow that needs clear roles, records, policy inputs, and approval ownership.', legacyPath: '/hrms-payroll/' },
  { slug: 'claim-reimbursement', name: 'Claim and Reimbursement', summary: 'Structure claim submission, review, and reimbursement records around the organization’s approved process.', legacyPath: '/hrms-payroll/core-hr-and-payroll/claim-and-reambarcement/' },
  { slug: 'document-management', name: 'Document Management', summary: 'Organize employee documents and lifecycle records with an evidence-led workflow and access ownership.', legacyPath: '/hrms-payroll/core-hr-and-payroll/document-management/' },
  { slug: 'employee-asset', name: 'Employee Asset', summary: 'Track employee asset responsibilities and records as part of the broader people-operations workflow.', legacyPath: '/hrms-payroll/core-hr-and-payroll/employee-asset/' },
  { slug: 'hris-payroll', name: 'HRIS Payroll', summary: 'Connect approved employee and attendance inputs to a payroll review process that can be validated with the customer.', legacyPath: '/hrms-payroll/core-hr-and-payroll/hris-payroll/' },
  { slug: 'leave-management', name: 'Leave Management', summary: 'Make leave requests, policy decisions, approvals, and attendance context visible to the right teams.', legacyPath: '/hrms-payroll/core-hr-and-payroll/leave-management/' },
  { slug: 'time-attendance', name: 'Time and Attendance', summary: 'Bring attendance events, shifts, exceptions, and review responsibilities into one operating conversation.', legacyPath: '/hrms-payroll/core-hr-and-payroll/time-and-attendance/' },
  { slug: 'employee-self-service', name: 'Employee Self Service', summary: 'Give employees a clear route to manage approved personal and professional information without constant HR intervention.', legacyPath: '/hrms-payroll/employee-self-services/' },
  { slug: 'performance-management', name: 'Performance Management System', summary: 'Support performance and appraisal workflows with defined roles, review cycles, and approved records.', legacyPath: '/hrms-payroll/performace-management-system/' },
  { slug: 'training-induction', name: 'Training and Induction', summary: 'Organize induction and training information as part of the employee lifecycle and workforce workflow.', legacyPath: '/hrms-payroll/training-and-induction/' },
  { slug: 'fixed-asset', name: 'Fixed Asset', summary: 'Track fixed-asset records and responsibility alongside employee and operational information.', legacyPath: '/hrms-payroll/fixed-asset/' },
  { slug: 'employee-onboarding', name: 'Employee Onboard', summary: 'Create a more structured onboarding path for documents, employee records, induction, and ownership.', legacyPath: '/hrms-payroll/employee-lifecycle/employee-onboard/' },
  { slug: 'exit-process', name: 'Exit Process Simplified', summary: 'Bring exit tasks, approvals, documents, and handoffs into a defined employee-lifecycle process.', legacyPath: '/hrms-payroll/employee-lifecycle/exit-process-simplified/' },
  { slug: 'recruitment', name: 'Recruitment', summary: 'Map vacancy, candidate, interview, selection, and reporting steps around the organization’s hiring workflow.', legacyPath: '/hrms-payroll/recruitment/' },
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
};

export const products: readonly Product[] = [
  {
    slug: 'i-18',
    name: 'I-18',
    family: 'Access control',
    description: 'Fingerprint access control device for streamlined, controlled workplace entry.',
    image: '/products/i-18.jpg',
    images: ['/products/i-18.jpg', '/products/i-18-source.jpg'],
    authentication: 'Fingerprint', application: 'Personnel access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio',
  },
  {
    slug: 'i-202',
    name: 'I-202',
    family: 'Access control',
    description: 'Biometric access control and time-attendance device designed for secure entry and workforce records.',
    image: '/products/i-202/main.jpg',
    images: ['/products/i-202/main.jpg', '/products/i-202/source.jpg'],
    authentication: 'Biometric', application: 'Personnel access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio',
  },
  {
    slug: 'is-500',
    name: 'IS-500',
    family: 'Access control',
    description: 'Fingerprint access control and time-attendance system designed for robust, high-efficiency workplace operation.',
    image: '/products/is-500/main.png',
    images: ['/products/is-500/main.png', '/products/is-500/alternate.png', '/products/is-500/source.png', '/products/is-500/source-angle.png'],
    authentication: 'Fingerprint', application: 'Personnel access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio',
  },
  {
    slug: 'ai-60',
    name: 'AI 60',
    family: 'Attendance',
    description: 'Facial-recognition technology integrating access control and time-attendance applications.',
    image: '/products/ai-60/angle.png',
    images: ['/products/ai-60/angle.png', '/products/ai-60/detail.png', '/products/ai-60/front.png', '/products/ai-60/source-angle.png', '/products/ai-60/source-detail.png', '/products/ai-60/source-front.png'],
    authentication: 'Face', application: 'Attendance & access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio',
  },
  {
    slug: 'mini-ai-10',
    name: 'Mini AI-10',
    family: 'Attendance',
    description: 'Compact visible-light facial-recognition device for secure attendance and access workflows.',
    image: '/products/mini-ai-10/front.png',
    images: ['/products/mini-ai-10/front.png', '/products/mini-ai-10/angle.png', '/products/mini-ai-10/source-front.png', '/products/mini-ai-10/source-angle.png'],
    authentication: 'Face', application: 'Attendance & access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio',
  },
  {
    slug: 'mini-ai-30',
    name: 'Mini AI-30',
    family: 'Attendance',
    description: 'Face-recognition access and attendance device for efficient workplace authentication.',
    image: '/products/mini-ai-30/front.png',
    images: ['/products/mini-ai-30/front.png', '/products/mini-ai-30/angle.png', '/products/mini-ai-30/detail.png', '/products/mini-ai-30/source-wide.png', '/products/mini-ai-30/source-angle.png', '/products/mini-ai-30/source-detail.png'],
    authentication: 'Face', application: 'Attendance & access', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio',
  },
  {
    slug: 'cmp-200',
    name: 'CMP 200',
    family: 'Entrance management',
    description: 'Automatic barrier gate with a telescopic boom arm for managed vehicle entry.',
    authentication: 'Connected controller', application: 'Vehicle entry', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio',
  },
  {
    slug: 'fbl-200',
    name: 'FBL 200',
    family: 'Entrance management',
    description: 'Single-lane flap barrier turnstile for seamless, secure pedestrian entry.',
    image: '/products/fbl-200/main.png',
    images: ['/products/fbl-200/main.png', '/products/fbl-200/source.png'],
    authentication: 'Connected access system', application: 'Pedestrian entry', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio',
  },
  {
    slug: 'fbl-300',
    name: 'FBL 300',
    family: 'Entrance management',
    description: 'Single-lane flap barrier turnstile for efficient crowd and pedestrian management.',
    image: '/products/fbl-300/main.png',
    images: ['/products/fbl-300/main.png', '/products/fbl-300/source.png'],
    authentication: 'Connected access system', application: 'Pedestrian entry', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio',
  },
  {
    slug: 'fht2300-series',
    name: 'FHT2300 Series',
    family: 'Entrance management',
    description: 'Full-height turnstile series engineered for controlled entry at sensitive access points.',
    image: '/products/fht2300/model-l.png',
    images: ['/products/fht2300/model-l.png', '/products/fht2300/front.png', '/products/fht2300/detail.png', '/products/fht2300/source-l.png', '/products/fht2300/source.png', '/products/fht2300/source-angle.png'],
    authentication: 'Connected access system', application: 'Pedestrian entry', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio',
  },
  {
    slug: 'ts200-series',
    name: 'TS200 Series',
    family: 'Entrance management',
    description: 'TS200, TS201, and TS202 tripod turnstile series for orderly, secure pedestrian access.',
    authentication: 'Connected access system', application: 'Pedestrian entry', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio',
  },
  {
    slug: 'd4330-metal-detector',
    name: 'D4330 Metal Detector',
    family: 'Entrance management',
    description: 'High-performance walk-through metal detector for security screening points.',
    image: '/products/d4330/front.png',
    images: ['/products/d4330/front.png', '/products/d4330/angle.png', '/products/d4330/detail.png', '/products/d4330/application.png', '/products/d4330/source-front.png', '/products/d4330/source-angle.png'],
    authentication: 'Screening', application: 'Security screening', connectivity: 'Confirm configuration', deployment: 'Site assessment recommended', softwareCompatibility: 'Verify during solution design', status: 'Published portfolio',
  },
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
  { slug: 'attendance-automation', name: 'Attendance Automation', problem: 'Manual attendance collection and exception handling can make shift operations harder to review.', summary: 'Connect attendance devices and operational software around the policies, locations, shifts, and review flow that matter to the organization.', workflow: ['Capture attendance event', 'Apply the approved shift and leave context', 'Review exceptions with responsible teams', 'Prepare records for approved downstream use'], hardwareFamilies: ['Attendance'], softwareSlugs: ['easytime-online', 'hrms-payroll'] },
  { slug: 'multi-location-attendance', name: 'Multi-location Attendance', problem: 'Distributed sites need a consistent way to understand attendance without losing local operating context.', summary: 'Plan attendance capture, review responsibilities, and rollout sequencing across locations with configuration confirmed for each site.', workflow: ['Map locations and operating patterns', 'Select appropriate attendance endpoints', 'Define review ownership by site', 'Confirm reporting and support routines'], hardwareFamilies: ['Attendance'], softwareSlugs: ['easytime-online'] },
  { slug: 'physical-access-control', name: 'Physical Access Control', problem: 'Workplaces need clear, auditable control over who can enter defined areas and when.', summary: 'Combine access-control terminals, entrance hardware, workflows, and operating roles around the site’s real entry conditions.', workflow: ['Map people and entry points', 'Define access rules and exceptions', 'Select terminals and entrance controls', 'Test, train, and support the operating process'], hardwareFamilies: ['Access control', 'Entrance management'], softwareSlugs: ['visitor-management'] },
  { slug: 'visitor-security', name: 'Visitor Security', problem: 'Visitor entry can become inconsistent when registration, host coordination, and records are disconnected.', summary: 'Structure visitor registration, host coordination, entry records, movement decisions, and check-out around local security requirements.', workflow: ['Register visitor details', 'Coordinate with the host', 'Apply site entry process', 'Record visit completion and exceptions'], hardwareFamilies: ['Access control'], softwareSlugs: ['visitor-management'] },
  { slug: 'entrance-management', name: 'Entrance Management', problem: 'Busy pedestrian and vehicle entry points require a deliberate mix of access logic, physical equipment, and operating ownership.', summary: 'Choose barriers, turnstiles, boom barriers, screening, and connected access equipment around entry flow and local site conditions.', workflow: ['Assess pedestrian and vehicle flow', 'Select physical entrance equipment', 'Confirm access or screening logic', 'Establish operating and support ownership'], hardwareFamilies: ['Entrance management', 'Access control'], softwareSlugs: ['visitor-management'] },
  { slug: 'canteen-operations', name: 'Canteen Operations', problem: 'Meal-service records and employee entitlement handling can become difficult to reconcile across a busy workplace.', summary: 'Structure employee identification, entitlement rules, transaction records, and operational reporting around the canteen workflow.', workflow: ['Identify employee', 'Validate approved entitlement', 'Record the transaction', 'Review operational usage records'], hardwareFamilies: ['Attendance'], softwareSlugs: ['canteen-management'] },
] as const;

export type IndustryProfile = {
  slug: string;
  name: string;
  context: string;
  workflow: readonly string[];
  solutionSlugs: readonly string[];
};

export const industryProfiles: readonly IndustryProfile[] = [
  { slug: 'manufacturing', name: 'Manufacturing', context: 'Shift patterns, site entry, contractors, and controlled operating zones often need to work together.', workflow: ['Map shifts and entry points', 'Define workforce and contractor roles', 'Select attendance and entrance systems', 'Confirm reporting and support routine'], solutionSlugs: ['attendance-automation', 'physical-access-control', 'entrance-management'] },
  { slug: 'chemical', name: 'Chemical', context: 'Safety-conscious chemical facilities need coordinated identity, contractor attendance, and controlled movement around processing and restricted areas.', workflow: ['Map shifts, contractors, and safety zones', 'Define identity and access responsibilities', 'Select suitable attendance and entrance systems', 'Confirm exception, reporting, and support routines'], solutionSlugs: ['attendance-automation', 'physical-access-control', 'entrance-management'] },
  { slug: 'textile', name: 'Textile', context: 'Large textile workforces, rotating shifts, production lines, and multiple entry points benefit from a consistent attendance and access workflow.', workflow: ['Map shifts and production entry points', 'Identify permanent and contract workforce journeys', 'Plan attendance capture and controlled access', 'Confirm location reporting and support'], solutionSlugs: ['attendance-automation', 'multi-location-attendance', 'physical-access-control'] },
  { slug: 'engineering', name: 'Engineering', context: 'Engineering workplaces may need to coordinate employee attendance, visitor movement, and access to design, prototype, tool, or project areas.', workflow: ['Map teams, visitors, and project zones', 'Define attendance and restricted-area rules', 'Select access and workforce systems', 'Test handoffs and establish support ownership'], solutionSlugs: ['attendance-automation', 'visitor-security', 'physical-access-control'] },
  { slug: 'food', name: 'Food Processing', context: 'Food facilities need practical workforce attendance and controlled production entry that fit hygiene checkpoints, shift changes, and site policy.', workflow: ['Map hygiene and workforce entry steps', 'Define shift, contractor, and zone requirements', 'Select attendance and access workflows', 'Confirm exceptions, records, and support'], solutionSlugs: ['attendance-automation', 'physical-access-control', 'canteen-operations'] },
  { slug: 'service-provider', name: 'Service Providers', context: 'Service-led organizations need straightforward employee attendance, visitor coordination, and workplace access across offices and customer-facing locations.', workflow: ['Map employee and visitor journeys', 'Define attendance and workplace access needs', 'Plan software roles across locations', 'Confirm adoption and support ownership'], solutionSlugs: ['multi-location-attendance', 'visitor-security', 'physical-access-control'] },
  { slug: 'corporate', name: 'Corporate Offices', context: 'Visitor coordination, employee entry, attendance, and people operations need a clear daily workflow.', workflow: ['Map employee and visitor journeys', 'Define access and attendance requirements', 'Confirm software roles and reporting', 'Support adoption and review'], solutionSlugs: ['attendance-automation', 'visitor-security', 'physical-access-control'] },
  { slug: 'pharma', name: 'Pharmaceutical & Research', context: 'Controlled areas, workforce records, visitors, and entry conditions need deliberate operating design.', workflow: ['Understand controlled areas', 'Map workforce and visitor movement', 'Define entry and attendance workflow', 'Confirm documentation and support needs'], solutionSlugs: ['attendance-automation', 'physical-access-control', 'visitor-security'] },
  { slug: 'healthcare', name: 'Healthcare', context: 'People movement, shifts, visitors, and sensitive operating areas require careful site-specific planning.', workflow: ['Map staff and visitor movement', 'Define shift and entry requirements', 'Select appropriate systems', 'Confirm operating ownership'], solutionSlugs: ['attendance-automation', 'visitor-security', 'physical-access-control'] },
  { slug: 'education', name: 'Education', context: 'Campuses and institutions may need reliable attendance, visitor coordination, and entry management.', workflow: ['Identify campus entry points', 'Map staff and visitor flow', 'Confirm attendance and access needs', 'Plan support and governance'], solutionSlugs: ['attendance-automation', 'visitor-security', 'entrance-management'] },
  { slug: 'construction', name: 'Construction', context: 'Changing sites, workforce movement, contractors, and perimeter conditions require practical operating controls.', workflow: ['Assess site and workforce context', 'Map contractor and visitor flow', 'Plan attendance and entry control', 'Review deployment and support routine'], solutionSlugs: ['multi-location-attendance', 'visitor-security', 'entrance-management'] },
  { slug: 'government', name: 'Government', context: 'Public-facing locations and administrative facilities may require clear visitor, entry, and workforce processes.', workflow: ['Map public and staff journeys', 'Define controlled areas', 'Select suitable workflows', 'Establish ownership and support'], solutionSlugs: ['visitor-security', 'physical-access-control', 'entrance-management'] },
  { slug: 'banking', name: 'Banking', context: 'Branch and office operations may require controlled entry, employee attendance, and visitor workflows.', workflow: ['Assess branch and office context', 'Map access and visitor needs', 'Confirm attendance requirements', 'Review support and escalation paths'], solutionSlugs: ['physical-access-control', 'visitor-security', 'attendance-automation'] },
  { slug: 'logistics', name: 'Logistics', context: 'Shift operations, gates, vehicles, and workforce movement can create complex operational entry conditions.', workflow: ['Map gates and operating shifts', 'Identify workforce and vehicle flow', 'Select entry and attendance systems', 'Confirm handover and support'], solutionSlugs: ['multi-location-attendance', 'entrance-management', 'physical-access-control'] },
  { slug: 'retail', name: 'Retail', context: 'Distributed stores need practical attendance, employee entry, and operating support that fits local conditions.', workflow: ['Map store and workforce pattern', 'Confirm attendance and access needs', 'Plan rollout by location', 'Establish support routine'], solutionSlugs: ['multi-location-attendance', 'attendance-automation'] },
  { slug: 'hospitality', name: 'Hospitality', context: 'Guest-facing facilities may need coordinated employee attendance, visitor flow, and controlled staff areas.', workflow: ['Map staff and guest movement', 'Define staff-area access needs', 'Select attendance and visitor workflow', 'Confirm operating ownership'], solutionSlugs: ['attendance-automation', 'visitor-security', 'physical-access-control'] },
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
    href: '/platform#industries',
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
    href: '/platform#industries',
  },
  {
    name: 'Food industries',
    description: 'Canteen, attendance, and controlled-area workflows.',
    href: '/industries/food',
  },
] as const;
