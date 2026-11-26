import { type IframeMediaPermission } from 'roster-shared/types';
import { createRequiredContext } from '~/utils/createRequiredContext';

type SettingsSecurityIframeMediaPermissionsContextType = {
  savePermission: (permission: IframeMediaPermission) => Promise<boolean>;
};

export const [
  SettingsSecurityIframeMediaPermissionsProvider,
  useSettingsSecurityIframeMediaPermissionsOrThrow,
] = createRequiredContext<SettingsSecurityIframeMediaPermissionsContextType>(
  'SettingsSecurityIframeMediaPermissions',
);
