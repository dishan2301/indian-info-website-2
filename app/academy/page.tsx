import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import { TechnicalDestination } from '../_components/technical-destination';
import { destinations } from '../_components/technical-destination-content';

export const metadata: Metadata = createPageMetadata({ title: 'Educational Security Solutions', description: destinations.academy.description, path: '/academy' });
export default function AcademyPage() { return <TechnicalDestination page={destinations.academy} />; }

