/* @license Enterprise */

import { type RowLevelRecordsPermissions } from 'roster-shared/types';

export const isFieldUnreadableByRule = ({
  rowLevelRecordsPermissions,
  fieldMetadataId,
}: {
  rowLevelRecordsPermissions: Pick<
    RowLevelRecordsPermissions,
    'unreadableFields'
  >;
  fieldMetadataId: string;
}): boolean =>
  (rowLevelRecordsPermissions.unreadableFields ?? []).includes(fieldMetadataId);
