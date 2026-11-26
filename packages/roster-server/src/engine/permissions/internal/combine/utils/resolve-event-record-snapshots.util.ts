/* @license Enterprise */

import {
  type ObjectRecordBaseEvent,
  type ObjectRecordEvent,
} from 'roster-shared/database-events';

import { type RowAccessRecord } from 'src/engine/permissions/internal/combine/types/permissions-access-request.type';

export const resolveEventRecordSnapshots = (
  events: ObjectRecordEvent[],
): RowAccessRecord[] =>
  events.map((event) => {
    const properties = event.properties as ObjectRecordBaseEvent['properties'];

    return {
      ...(properties.after ?? properties.before ?? {}),
      id: event.recordId,
    };
  });
