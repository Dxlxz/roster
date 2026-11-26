import { type ObjectRecordsPermissions } from 'roster-shared/types';

export type ObjectPermissionsByObjectMetadataId = Record<
  string,
  ObjectRecordsPermissions
>;
