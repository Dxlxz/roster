import { PermissionFlagType } from 'roster-shared/constants';
import { ConnectedAccountProvider } from 'roster-shared/types';

export const getConnectedAccountAdministrationPermissionFlag = (
  provider: ConnectedAccountProvider,
): PermissionFlagType =>
  provider === ConnectedAccountProvider.APP
    ? PermissionFlagType.APPLICATIONS
    : PermissionFlagType.WORKSPACE;
