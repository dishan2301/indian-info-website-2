import type { Metadata } from 'next';
import { PageHero } from '../_components/page-hero';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { SolutionBuilderForm } from '../../components/solutions/solution-builder-form';

export const metadata: Metadata = { title: 'Build Your Solution | Indian Infotech', description: 'Share your workforce, access, visitor, and deployment context for a transparent solution-engineering conversation.', alternates: { canonical: '/solution-builder' } };
export default function SolutionBuilderPage() { return <main><SiteHeader /><PageHero eyebrow="Solution builder" title="Give us the context. We will help shape the system." description="Answer a few practical questions about your people, locations, authentication, and deployment preference. The result is a starting brief—not an automated promise." marker="II / BUILDER" /><SolutionBuilderForm /><SiteFooter /></main>; }
