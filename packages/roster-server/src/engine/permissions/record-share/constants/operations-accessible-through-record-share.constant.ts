/* @license Enterprise */

import { type ObjectPermissionAction } from 'roster-shared/application';
import { type ObjectRecordsOperationType } from 'roster-shared/types';

export const OPERATIONS_ACCESSIBLE_THROUGH_RECORD_SHARE: {
  operationType: ObjectRecordsOperationType;
  objectPermissionAction: ObjectPermissionAction;
}[] = [
  { operationType: 'read', objectPermissionAction: 'canReadObjectRecords' },
  { operationType: 'update', objectPermissionAction: 'canUpdateObjectRecords' },
  {
    operationType: 'softDelete',
    objectPermissionAction: 'canSoftDeleteObjectRecords',
  },
  {
    operationType: 'destroy',
    objectPermissionAction: 'canDestroyObjectRecords',
  },
];
