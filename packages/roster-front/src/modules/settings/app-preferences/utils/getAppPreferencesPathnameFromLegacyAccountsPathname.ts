import { APP_PREFERENCES_PATH_BY_LEGACY_ACCOUNTS_PATH } from '@/settings/app-preferences/constants/AppPreferencesPathByLegacyAccountsPath';
import { generatePath, matchPath } from 'react-router-dom';
import { AppPath, SettingsPath } from 'roster-shared/types';
import {
  getSettingsPath,
  isDefined,
  typedObjectEntries,
} from 'roster-shared/utils';

export const getAppPreferencesPathnameFromLegacyAccountsPathname = (
  legacyAccountsPathname: string,
) => {
  for (const [legacyAccountsPath, appPreferencesPath] of typedObjectEntries(
    APP_PREFERENCES_PATH_BY_LEGACY_ACCOUNTS_PATH,
  )) {
    const legacyAccountsPathMatch = matchPath(
      `/${AppPath.Settings}/${legacyAccountsPath}`,
      legacyAccountsPathname,
    );

    if (isDefined(legacyAccountsPathMatch)) {
      return generatePath(
        getSettingsPath(appPreferencesPath),
        legacyAccountsPathMatch.params,
      );
    }
  }

  return getSettingsPath(SettingsPath.AppPreferences);
};
