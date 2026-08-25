export const companyFacts = [
  { value: '2011', label: 'Founded in Ahmedabad' },
  { value: '14+', label: 'Years of experience' },
  { value: '2,000+', label: 'Clients served' },
  { value: '7+', label: 'Countries reached' },
  { value: '12+', label: 'Products across the portfolio' },
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

type Product = {
  name: string;
  family: 'Access control' | 'Attendance' | 'Entrance management';
  description: string;
  image?: string;
};

export const products: readonly Product[] = [
  {
    name: 'I-18',
    family: 'Access control',
    description: 'Fingerprint access control terminal for controlled workplace entry.',
    image: '/products/i-18.jpg',
  },
  {
    name: 'I-202',
    family: 'Access control',
    description: 'Access control device for workforce and workplace security requirements.',
  },
  {
    name: 'IS-500',
    family: 'Access control',
    description: 'Access control terminal for busy workplace environments.',
  },
  {
    name: 'AI 60',
    family: 'Attendance',
    description: 'Face-recognition terminal for attendance and access-control applications.',
    image: '/products/ai-60.png',
  },
  {
    name: 'Mini AI-10',
    family: 'Attendance',
    description: 'Compact face-recognition attendance device.',
  },
  {
    name: 'Mini AI-30',
    family: 'Attendance',
    description: 'Face-recognition attendance device for modern teams.',
  },
  {
    name: 'CMP 200',
    family: 'Entrance management',
    description: 'Automatic boom barrier for managed vehicle entry.',
  },
  {
    name: 'FBL 200',
    family: 'Entrance management',
    description: 'Single-lane flap barrier for managed pedestrian entry.',
    image: '/products/fbl-200.png',
  },
  {
    name: 'FBL 300',
    family: 'Entrance management',
    description: 'Flap barrier for controlled, high-traffic entry points.',
  },
  {
    name: 'FHT2300 Series',
    family: 'Entrance management',
    description: 'Full-height turnstile series for restricted areas.',
  },
  {
    name: 'TS200 Series',
    family: 'Entrance management',
    description: 'Tripod turnstile series for orderly pedestrian access.',
  },
  {
    name: 'D4330 Metal Detector',
    family: 'Entrance management',
    description: 'Walk-through metal detection for security screening points.',
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
