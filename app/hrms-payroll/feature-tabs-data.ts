import type { VerticalTabService } from '@/components/ui/vertical-tabs';
import { hrmsModules } from '../content';
import { hrmsDetails } from './content';

const order = ['recruitment', 'onboarding', 'core-hris-payroll', 'ess', 'leave', 'attendance', 'expense', 'timesheet', 'pms', 'hr-help-desk', 'off-boarding', 'visitors', 'performance-linked-benefits', 'training-induction'];
export const hrmsFeatureTabs: readonly VerticalTabService[] = order.map((slug, index) => {
  const module = hrmsModules.find(item => item.slug === slug)!;
  return {
    id: slug,
    title: module.name,
    description: module.summary,
    image: module.image,
    fallbackImage: module.image,
    href: `/hrms-payroll/${slug}`,
    points: hrmsDetails[slug].features.slice(0, 3),
  };
});
