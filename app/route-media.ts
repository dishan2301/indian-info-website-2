type RouteMedia = {
  desktop: string;
  mobile: string;
  alt: string;
};

export const solutionMedia: Record<string, RouteMedia> = {
  'door-interlock-system': { desktop: '/campaign/core-systems/door-interlock-explained-v3.webp', mobile: '/campaign/core-systems/door-interlock-explained-v3.webp', alt: 'Door A open while Door B remains locked in a two-door interlock' },
  'attendance-automation': {
    desktop: '/generated/routes/solution-attendance.webp',
    mobile: '/generated/routes/solution-attendance.webp',
    alt: 'Factory employees checking in at an attendance terminal at shift change',
  },
  'multi-location-attendance': {
    desktop: '/generated/routes/solution-multi-location-attendance.webp',
    mobile: '/generated/routes/solution-multi-location-attendance.webp',
    alt: 'Operations team reviewing workforce activity across multiple locations',
  },
  'physical-access-control': {
    desktop: '/generated/routes/solution-physical-access-control.webp',
    mobile: '/generated/routes/solution-physical-access-control.webp',
    alt: 'Employee presenting an ID card at a secured workplace turnstile',
  },
  'visitor-management': {
    desktop: '/generated/routes/solution-visitor-security.webp',
    mobile: '/generated/routes/solution-visitor-security.webp',
    alt: 'Guest checking in at a workplace reception while staff verify the visit',
  },
  'entrance-management': {
    desktop: '/generated/routes/solution-entrance-management.webp',
    mobile: '/generated/routes/solution-entrance-management.webp',
    alt: 'Industrial campus entrance coordinating pedestrian and vehicle access',
  },
  'canteen-operations': {
    desktop: '/generated/routes/solution-canteen-operations.webp',
    mobile: '/generated/routes/solution-canteen-operations.webp',
    alt: 'Employee using a meal terminal at a busy workplace canteen',
  },
};

export const industryMedia: Record<string, RouteMedia> = {
  manufacturing: {
    desktop: '/generated/routes/industry-manufacturing.webp',
    mobile: '/generated/routes/industry-manufacturing.webp',
    alt: 'Workers in safety gear operating a modern manufacturing production line',
  },
  chemical: {
    desktop: '/generated/routes/industry-chemical.webp',
    mobile: '/generated/routes/industry-chemical.webp',
    alt: 'Chemical plant operators in protective gear beside process equipment',
  },
  textile: {
    desktop: '/generated/routes/industry-textile.webp',
    mobile: '/generated/routes/industry-textile.webp',
    alt: 'Textile workers monitoring looms and colorful fabric in a mill',
  },
  engineering: {
    desktop: '/generated/routes/industry-engineering.webp',
    mobile: '/generated/routes/industry-engineering.webp',
    alt: 'Engineer inspecting a precision-machined component in a workshop',
  },
  food: {
    desktop: '/generated/routes/industry-food.webp',
    mobile: '/generated/routes/industry-food.webp',
    alt: 'Food production staff handling fresh produce on a processing line',
  },
  'service-provider': {
    desktop: '/generated/routes/industry-service-provider.webp',
    mobile: '/generated/routes/industry-service-provider.webp',
    alt: 'Facilities services supervisor coordinating a uniformed on-site team',
  },
  corporate: {
    desktop: '/generated/routes/industry-corporate.webp',
    mobile: '/generated/routes/industry-corporate.webp',
    alt: 'Employees entering a corporate office through secure lobby turnstiles',
  },
  pharma: {
    desktop: '/generated/routes/industry-pharma.webp',
    mobile: '/generated/routes/industry-pharma.webp',
    alt: 'Pharmaceutical staff working in a clean medicine production room',
  },
  healthcare: {
    desktop: '/generated/routes/industry-healthcare.webp',
    mobile: '/generated/routes/industry-healthcare.webp',
    alt: 'Hospital care team arriving for a shift at a staff-only entrance',
  },
  education: {
    desktop: '/generated/routes/industry-education.webp',
    mobile: '/generated/routes/industry-education.webp',
    alt: 'Students and staff arriving at a gated school campus',
  },
  construction: {
    desktop: '/generated/routes/industry-construction.webp',
    mobile: '/generated/routes/industry-construction.webp',
    alt: 'Construction crew in safety gear checking in at a building site gate',
  },
  government: {
    desktop: '/generated/routes/industry-government.webp',
    mobile: '/generated/routes/industry-government.webp',
    alt: 'Visitors and public employees at a government service reception',
  },
  banking: {
    desktop: '/generated/routes/industry-banking.webp',
    mobile: '/generated/routes/industry-banking.webp',
    alt: 'Bank employees entering a secure staff area in a modern branch',
  },
  logistics: {
    desktop: '/generated/routes/industry-logistics.webp',
    mobile: '/generated/routes/industry-logistics.webp',
    alt: 'Warehouse worker checking in beside loading docks, trucks, and a forklift',
  },
  retail: {
    desktop: '/generated/routes/industry-retail.webp',
    mobile: '/generated/routes/industry-retail.webp',
    alt: 'Retail associates stocking shelves and preparing a supermarket for opening',
  },
  hospitality: {
    desktop: '/generated/routes/industry-hospitality.webp',
    mobile: '/generated/routes/industry-hospitality.webp',
    alt: 'Hotel staff preparing guest services and checking in for a shift',
  },
};

export const softwareMedia: Record<string, { image: string; alt: string }> = {
  'easytime-online': {
    image: '/campaign/solutions/attendance-desktop-v2.webp',
    alt: 'Employee attendance workflow at a workplace',
  },
  'hrms-payroll': {
    image: '/campaign/product-moments/hrms-payroll-v2.png',
    alt: 'People operations team reviewing workforce records',
  },
  'visitor-management': {
    image: '/campaign/solutions/visitor-desktop-v2.webp',
    alt: 'Guest checking in with a workplace host',
  },
  'canteen-management': {
    image: '/campaign/product-moments/canteen-management-v1.png',
    alt: 'Employee using a workplace canteen service',
  },
  'hexin-mediaa-wave': {
    image: '/campaign/product-moments/mediaa-wave-v1.png',
    alt: 'Digital display showing scheduled workplace information',
  },
};
