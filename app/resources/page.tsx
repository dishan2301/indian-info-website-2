import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import { TechnicalDestination } from '../_components/technical-destination';
import { destinations } from '../_components/technical-destination-content';

export const metadata: Metadata = createPageMetadata({ title: 'Resources', description: destinations.resources.description, path: '/resources' });
export default function ResourcesPage() { return <TechnicalDestination page={destinations.resources} />; }

