import { NavigationMenuItemType } from 'roster-shared/types';
import { isDefined } from 'roster-shared/utils';

import { type NavigationMenuItem } from '~/generated-metadata/graphql';

export const isNavigationMenuItemBuiltInSection = (
  item: Pick<NavigationMenuItem, 'type' | 'builtInSectionKey'>,
) =>
  item.type === NavigationMenuItemType.SECTION &&
  isDefined(item.builtInSectionKey);
