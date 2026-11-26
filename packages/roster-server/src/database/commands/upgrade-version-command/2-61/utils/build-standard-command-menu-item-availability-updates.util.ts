import { roster_STANDARD_APPLICATION_UNIVERSAL_IDENTIFIER } from 'roster-shared/application';
import { isDefined } from 'roster-shared/utils';

import { type FlatCommandMenuItem } from 'src/engine/metadata-modules/flat-command-menu-item/types/flat-command-menu-item.type';
import { type FlatCommandMenuItemMaps } from 'src/engine/metadata-modules/flat-command-menu-item/types/flat-command-menu-item-maps.type';
import { STANDARD_COMMAND_MENU_ITEMS } from 'src/engine/workspace-manager/roster-standard-application/constants/standard-command-menu-item.constant';

export const buildStandardCommandMenuItemAvailabilityUpdates = ({
  flatCommandMenuItemMaps,
  now,
}: {
  flatCommandMenuItemMaps: Pick<
    FlatCommandMenuItemMaps,
    'byUniversalIdentifier'
  >;
  now: string;
}): FlatCommandMenuItem[] =>
  Object.values(STANDARD_COMMAND_MENU_ITEMS).flatMap((definition) => {
    const commandMenuItem =
      flatCommandMenuItemMaps.byUniversalIdentifier[
        definition.universalIdentifier
      ];

    const standardExpression =
      definition.conditionalAvailabilityExpression ?? null;

    if (
      !isDefined(commandMenuItem) ||
      commandMenuItem.applicationUniversalIdentifier !==
        roster_STANDARD_APPLICATION_UNIVERSAL_IDENTIFIER ||
      (commandMenuItem.conditionalAvailabilityExpression ?? null) ===
        standardExpression
    ) {
      return [];
    }

    return [
      {
        ...commandMenuItem,
        conditionalAvailabilityExpression: standardExpression,
        updatedAt: now,
      },
    ];
  });
