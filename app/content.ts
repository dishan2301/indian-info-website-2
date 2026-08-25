export const companyFacts = [
  { value: '2011', label: 'Founded in Ahmedabad' },
  { value: '14+', label: 'Years of experience' },
  { value: '2,000+', label: 'Clients served' },
  { value: '7+', label: 'Countries reached' },
  { value: '12+', label: 'Products across the portfolio' },
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
    summary: 'Centralized attendance operations for organizations managing people, shifts, leave, and reporting requirements.',
    modules: ['Attendance', 'Shift operations', 'Leave workflows', 'Overtime review', 'Reports'],
    workflow: ['Capture attendance', 'Review exceptions', 'Apply shift and leave rules', 'Prepare approved records'],
    legacyPath: '/softwares/cost-effective/',
  },
  {
    slug: 'hrms-payroll',
    name: 'HRMS & Payroll',
    category: 'Workforce',
    summary: 'Employee information and people-operation workflows spanning core HR, payroll, leave, claims, assets, and employee self-service.',
    modules: ['Core HR', 'Payroll', 'Leave management', 'Claims and reimbursement', 'Employee assets', 'Documents', 'Employee self-service'],
    workflow: ['Maintain employee records', 'Manage attendance and leave', 'Review payroll inputs', 'Support employee workflows'],
    legacyPath: '/hrms-payroll/',
  },
  {
    slug: 'visitor-management',
    name: 'Visitor Management System',
    category: 'Workplace',
    summary: 'A structured visitor workflow for registration, host coordination, check-in, movement records, and check-out.',
    modules: ['Visitor registration', 'Host coordination', 'Check-in records', 'Visit tracking', 'Check-out'],
    workflow: ['Register visitor', 'Coordinate with host', 'Record entry', 'Track visit status', 'Close the visit'],
    legacyPath: '/softwares/scalable-resources/',
  },
  {
    slug: 'canteen-management',
    name: 'Canteen Management System',
    category: 'Workplace',
    summary: 'Employee meal and canteen workflows designed to improve transaction records and day-to-day service administration.',
    modules: ['Employee identification', 'Meal transactions', 'Entitlement rules', 'Usage records', 'Operational reports'],
    workflow: ['Identify employee', 'Validate entitlement', 'Record transaction', 'Reconcile usage'],
    legacyPath: '/softwares/communication-ease/',
  },
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
};

export const products: readonly Product[] = [
  {
    slug: 'i-18',
    name: 'I-18',
    family: 'Access control',
    description: 'Fingerprint access control terminal for controlled workplace entry.',
    image: '/products/i-18.jpg',
    images: ['/products/i-18.jpg'],
  },
  {
    slug: 'i-202',
    name: 'I-202',
    family: 'Access control',
    description: 'Access control device for workforce and workplace security requirements.',
    image: '/products/i-202/main.jpg',
    images: ['/products/i-202/main.jpg'],
  },
  {
    slug: 'is-500',
    name: 'IS-500',
    family: 'Access control',
    description: 'Access control terminal for busy workplace environments.',
    image: '/products/is-500/main.png',
    images: ['/products/is-500/main.png', '/products/is-500/alternate.png'],
  },
  {
    slug: 'ai-60',
    name: 'AI 60',
    family: 'Attendance',
    description: 'Face-recognition terminal for attendance and access-control applications.',
    image: '/products/ai-60/angle.png',
    images: ['/products/ai-60/angle.png', '/products/ai-60/detail.png', '/products/ai-60/front.png'],
  },
  {
    slug: 'mini-ai-10',
    name: 'Mini AI-10',
    family: 'Attendance',
    description: 'Compact face-recognition attendance device.',
    image: '/products/mini-ai-10/front.png',
    images: ['/products/mini-ai-10/front.png', '/products/mini-ai-10/angle.png'],
  },
  {
    slug: 'mini-ai-30',
    name: 'Mini AI-30',
    family: 'Attendance',
    description: 'Face-recognition attendance device for modern teams.',
    image: '/products/mini-ai-30/front.png',
    images: ['/products/mini-ai-30/front.png', '/products/mini-ai-30/angle.png', '/products/mini-ai-30/detail.png'],
  },
  {
    slug: 'cmp-200',
    name: 'CMP 200',
    family: 'Entrance management',
    description: 'Automatic boom barrier for managed vehicle entry.',
  },
  {
    slug: 'fbl-200',
    name: 'FBL 200',
    family: 'Entrance management',
    description: 'Single-lane flap barrier for managed pedestrian entry.',
    image: '/products/fbl-200/main.png',
    images: ['/products/fbl-200/main.png'],
  },
  {
    slug: 'fbl-300',
    name: 'FBL 300',
    family: 'Entrance management',
    description: 'Flap barrier for controlled, high-traffic entry points.',
    image: '/products/fbl-300/main.png',
    images: ['/products/fbl-300/main.png'],
  },
  {
    slug: 'fht2300-series',
    name: 'FHT2300 Series',
    family: 'Entrance management',
    description: 'Full-height turnstile series for restricted areas.',
    image: '/products/fht2300/model-l.png',
    images: ['/products/fht2300/model-l.png', '/products/fht2300/front.png', '/products/fht2300/detail.png'],
  },
  {
    slug: 'ts200-series',
    name: 'TS200 Series',
    family: 'Entrance management',
    description: 'Tripod turnstile series for orderly pedestrian access.',
  },
  {
    slug: 'd4330-metal-detector',
    name: 'D4330 Metal Detector',
    family: 'Entrance management',
    description: 'Walk-through metal detection for security screening points.',
    image: '/products/d4330/front.png',
    images: ['/products/d4330/front.png', '/products/d4330/angle.png', '/products/d4330/detail.png', '/products/d4330/application.png'],
  },
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
    href: '/platform#industries',
  },
  {
    name: 'Textiles',
    description: 'Attendance and workforce systems for large, multi-shift teams.',
    href: '/platform#industries',
  },
  {
    name: 'Corporate offices',
    description: 'Visitor, access, attendance, and employee operations.',
    href: '/platform#industries',
  },
  {
    name: 'Food industries',
    description: 'Canteen, attendance, and controlled-area workflows.',
    href: '/platform#industries',
  },
] as const;
