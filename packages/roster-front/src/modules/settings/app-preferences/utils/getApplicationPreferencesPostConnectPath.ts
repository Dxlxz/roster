import { getSettingsMenuItemTabId } from '@/settings/applications/utils/getSettingsMenuItemTabId';
import { SETTINGS_GENERAL_TAB_ID } from 'roster-shared/application';
import { SettingsPath } from 'roster-shared/types';
import { getSettingsPath, isDefined } from 'roster-shared/utils';
import { type SettingsMenuItem } from '~/generated-metadata/graphql';

export const getApplicationPreferencesPostConnectPath = ({
  applicationId,
  settingsMenuItems,
}: {
  applicationId: string;
  settingsMenuItems: Pick<SettingsMenuItem, 'universalIdentifier' | 'slug'>[];
}): string => {
  const firstSettingsMenuItem = settingsMenuItems.at(0);

  return getSettingsPath(
    SettingsPath.AppPreferencesApp,
    { applicationId },
    undefined,
    isDefined(firstSettingsMenuItem)
      ? getSettingsMenuItemTabId(firstSettingsMenuItem)
      : SETTINGS_GENERAL_TAB_ID,
  );
};
