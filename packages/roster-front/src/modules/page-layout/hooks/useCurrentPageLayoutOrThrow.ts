import { useCurrentPageLayout } from '@/page-layout/hooks/useCurrentPageLayout';
import { isDefined } from 'roster-shared/utils';
import { doNotTranslate } from 'roster-shared/i18n';

export const useCurrentPageLayoutOrThrow = () => {
  const { currentPageLayout } = useCurrentPageLayout();

  if (!isDefined(currentPageLayout)) {
    throw new Error(doNotTranslate('No current page layout found'));
  }

  return { currentPageLayout };
};
