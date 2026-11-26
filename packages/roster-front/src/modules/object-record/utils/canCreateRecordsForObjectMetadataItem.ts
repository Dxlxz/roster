import { type EnrichedObjectMetadataItem } from '@/object-metadata/types/EnrichedObjectMetadataItem';
import { isObjectMetadataReadOnly } from '@/object-record/read-only/utils/isObjectMetadataReadOnly';
import { type ObjectRecordsPermissions } from 'roster-shared/types';
import {
  canAccessThroughAllRecordsOrRlsPermission,
  isDefined,
} from 'roster-shared/utils';

type CanCreateRecordsForObjectMetadataItemParams = {
  objectPermissions?: ObjectRecordsPermissions;
  objectMetadataItem: Pick<
    EnrichedObjectMetadataItem,
    'isUICreatable' | 'isUIEditable' | 'isRemote'
  >;
};

export const canCreateRecordsForObjectMetadataItem = ({
  objectPermissions,
  objectMetadataItem,
}: CanCreateRecordsForObjectMetadataItemParams): boolean => {
  return (
    objectMetadataItem.isUICreatable &&
    !isObjectMetadataReadOnly({ objectMetadataItem }) &&
    (!isDefined(objectPermissions) ||
      canAccessThroughAllRecordsOrRlsPermission({
        objectRecordsPermissions: objectPermissions,
        operationType: 'create',
      }))
  );
};
