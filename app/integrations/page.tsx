import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import { TechnicalDestination } from '../_components/technical-destination';
import { destinations } from '../_components/technical-destination-content';

export const metadata: Metadata = createPageMetadata({ title: 'System Integrations', description: destinations.integrations.description, path: '/integrations' });
export default function IntegrationsPage() { return <TechnicalDestination page={destinations.integrations} />; }

