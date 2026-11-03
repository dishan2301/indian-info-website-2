import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import { TechnicalDestination } from '../../_components/technical-destination';
import { destinations } from '../../_components/technical-destination-content';

export const metadata: Metadata = createPageMetadata({ title: 'Security Reporting', description: destinations.disclosure.description, path: '/trust/responsible-disclosure' });
export default function ResponsibleDisclosurePage() { return <TechnicalDestination page={destinations.disclosure} />; }

