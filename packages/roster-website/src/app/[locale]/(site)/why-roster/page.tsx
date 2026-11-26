import { getCommunityStats } from '@/platform/community';
import {
  getRouteI18n,
  type LocaleRouteParams,
} from '@/platform/i18n/get-route-i18n';
import { resolveLocaleParam } from '@/platform/i18n/resolve-locale-param';
import {
  buildBreadcrumbListJsonLd,
  buildRouteMetadata,
  JsonLd,
} from '@/platform/seo';
import { Menu } from '@/sections/menu';
import { WhyrosterEditorials } from '@/sections/why-roster-editorial';
import { WhyrosterHero } from '@/sections/why-roster-hero';
import { WhyrosterMarquee } from '@/sections/why-roster-marquee';
import { WhyrosterSignoff } from '@/sections/why-roster-signoff';

export const generateMetadata = buildRouteMetadata('whyroster');

export default async function WhyrosterPage({
  params,
}: {
  params: Promise<LocaleRouteParams>;
}) {
  const [, communityStats] = await Promise.all([
    getRouteI18n(params),
    getCommunityStats(),
  ]);
  const locale = resolveLocaleParam((await params).locale);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbListJsonLd(
          [
            { name: 'Home', path: '/' },
            { name: 'Why roster', path: '/why-roster' },
          ],
          locale,
        )}
      />
      <Menu communityStats={communityStats} scheme="dark" />
      <main>
        <WhyrosterHero />
        <WhyrosterEditorials />
        <WhyrosterMarquee />
        <WhyrosterSignoff />
      </main>
    </>
  );
}
