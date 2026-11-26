import { NavigationMenuItemType } from 'roster-shared/types';
import { isDefined } from 'roster-shared/utils';

import { type FlatNavigationMenuItem } from 'src/engine/metadata-modules/flat-navigation-menu-item/types/flat-navigation-menu-item.type';
import { STANDARD_NAVIGATION_MENU_ITEMS } from 'src/engine/workspace-manager/roster-standard-application/constants/standard-navigation-menu-item.constant';

export const buildFavoritesNavigationMenuSectionToCreate = ({
  navigationMenuItems,
  sectionId,
  rosterStandardApplication,
  workspaceId,
  now,
}: {
  navigationMenuItems: Pick<
    FlatNavigationMenuItem,
    | 'universalIdentifier'
    | 'userWorkspaceId'
    | 'parentId'
    | 'builtInSectionKey'
    | 'position'
  >[];
  sectionId: string;
  rosterStandardApplication: { id: string; universalIdentifier: string };
  workspaceId: string;
  now: string;
}): FlatNavigationMenuItem | null => {
  const favoritesSectionDefinition =
    STANDARD_NAVIGATION_MENU_ITEMS.favoritesSection;
  const homeRootItems = navigationMenuItems.filter(
    (item) => !isDefined(item.userWorkspaceId) && !isDefined(item.parentId),
  );

  const isFavoritesSectionAlreadyThere = navigationMenuItems.some(
    (item) =>
      item.universalIdentifier ===
        favoritesSectionDefinition.universalIdentifier ||
      item.builtInSectionKey === favoritesSectionDefinition.builtInSectionKey,
  );

  if (isFavoritesSectionAlreadyThere) {
    return null;
  }

  return {
    id: sectionId,
    universalIdentifier: favoritesSectionDefinition.universalIdentifier,
    type: NavigationMenuItemType.SECTION,
    name: null,
    icon: null,
    color: null,
    link: null,
    nativePageKey: null,
    builtInSectionKey: favoritesSectionDefinition.builtInSectionKey,
    isActive: true,
    overrides: null,
    userWorkspaceId: null,
    parentId: null,
    parentUniversalIdentifier: null,
    targetRecordId: null,
    targetObjectMetadataId: null,
    targetObjectMetadataUniversalIdentifier: null,
    viewId: null,
    viewUniversalIdentifier: null,
    pageLayoutId: null,
    pageLayoutUniversalIdentifier: null,
    agentChatChannelId: null,
    agentChatChannelUniversalIdentifier: null,
    workflowId: null,
    workflowUniversalIdentifier: null,
    agentId: null,
    agentUniversalIdentifier: null,
    position: Math.min(0, ...homeRootItems.map((item) => item.position)) - 1,
    workspaceId,
    applicationId: rosterStandardApplication.id,
    applicationUniversalIdentifier:
      rosterStandardApplication.universalIdentifier,
    createdAt: now,
    updatedAt: now,
  };
};
