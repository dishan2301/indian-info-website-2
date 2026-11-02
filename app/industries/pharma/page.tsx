import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import { industryStudies } from '../research/content';
import { IndustryStudyPage } from '../research/industry-study-page';

const study = industryStudies.pharma;
export const metadata: Metadata = createPageMetadata({ title: 'Pharma Access Control, Door Interlocks & Attendance', description: study.summary, path: '/industries/pharma', image: '/campaign/industries/pharma-desktop-v2.webp' });

export default function PharmaPage() {
  return <IndustryStudyPage study={study} />;
}
