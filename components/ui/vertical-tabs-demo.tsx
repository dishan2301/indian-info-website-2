import VerticalTabs from '@/components/ui/vertical-tabs';
import { hrmsFeatureTabs } from '@/app/hrms-payroll/feature-tabs-data';

export default function Demo() {
  return <VerticalTabs services={hrmsFeatureTabs} />;
}
