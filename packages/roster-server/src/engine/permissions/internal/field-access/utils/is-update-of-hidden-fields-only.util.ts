import { isDefined } from 'roster-shared/utils';

import type { ObjectRecordEvent } from 'roster-shared/database-events';

// An update left with no visible field would only reveal that a hidden one changed
export const isUpdateOfHiddenFieldsOnly = (
  event: ObjectRecordEvent,
): boolean => {
  const { updatedFields } = event.properties as { updatedFields?: string[] };

  return isDefined(updatedFields) && updatedFields.length === 0;
};
