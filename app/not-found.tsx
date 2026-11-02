import NotFoundContent from '@/components/ui/not-found-06';
import { SiteFooter } from './_components/site-footer';
import { SiteHeader } from './_components/site-header';

export default function NotFound() {
  return (
    <main>
      <SiteHeader />
      <NotFoundContent />
      <SiteFooter />
    </main>
  );
}
