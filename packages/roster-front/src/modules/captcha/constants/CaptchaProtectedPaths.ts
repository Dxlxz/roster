import { AppPath, SettingsPath } from 'roster-shared/types';
import { getSettingsPath } from 'roster-shared/utils';

export const CAPTCHA_PROTECTED_PATHS: string[] = [
  AppPath.SignInUp,
  AppPath.Verify,
  AppPath.VerifyEmail,
  AppPath.ResetPassword,
  AppPath.Invite,
  getSettingsPath(SettingsPath.ProfilePage),
];
