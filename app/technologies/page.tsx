import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import { TechnicalDestination } from '../_components/technical-destination';
import { destinations } from '../_components/technical-destination-content';

export const metadata: Metadata = createPageMetadata({ title: 'Technologies', description: destinations.technologies.description, path: '/technologies' });
export default function TechnologiesPage() { return <TechnicalDestination page={destinations.technologies} />; }

