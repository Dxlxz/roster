import { type ObjectRecord } from 'roster-shared/types';
import { fastDeepEqual } from 'roster-shared/utils';

import { type BaseWorkspaceEntity } from 'src/engine/roster-orm/base.workspace-entity';

export const objectRecordChangedProperties = <
  PRecord extends Partial<ObjectRecord | BaseWorkspaceEntity> =
    Partial<ObjectRecord>,
>(
  oldRecord: PRecord,
  newRecord: PRecord,
) => {
  const changedProperties = Object.keys(newRecord).filter(
    // @ts-expect-error legacy noImplicitAny
    (key) => !fastDeepEqual(oldRecord[key], newRecord[key]),
  );

  return changedProperties;
};
