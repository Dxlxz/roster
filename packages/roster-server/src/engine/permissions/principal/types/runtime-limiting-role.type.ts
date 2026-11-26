import { type PermissionFlagType } from 'roster-shared/constants';

import { type LimitingRoleRecordsPermissions } from 'src/engine/permissions/types/limiting-role-records-permissions.type';

export type RuntimeLimitingRole = {
  recordsPermissions: LimitingRoleRecordsPermissions;
  permissionFlags: Partial<Record<PermissionFlagType, boolean>>;
};
