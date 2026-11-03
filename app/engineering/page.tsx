import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import { TechnicalDestination } from '../_components/technical-destination';
import { destinations } from '../_components/technical-destination-content';

export const metadata: Metadata = createPageMetadata({ title: 'Engineering & Implementation', description: destinations.engineering.description, path: '/engineering' });
export default function EngineeringPage() { return <TechnicalDestination page={destinations.engineering} />; }

