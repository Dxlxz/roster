import { SettingsPath } from 'roster-shared/types';
import { getSettingsPath } from 'roster-shared/utils';

export const AI_ADMIN_PATH = getSettingsPath(
  SettingsPath.AdminPanel,
  undefined,
  undefined,
  'ai',
);
