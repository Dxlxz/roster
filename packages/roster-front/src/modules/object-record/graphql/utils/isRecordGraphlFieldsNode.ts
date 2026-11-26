import { type RecordGqlFields } from 'roster-shared/types';
import {
  isDefined,
  isRecordGqlFieldsRelationWithArguments,
} from 'roster-shared/utils';

export const isRecordGqlFieldsNode = (
  recordGql: RecordGqlFields[string] | boolean | undefined,
): recordGql is RecordGqlFields =>
  isDefined(recordGql) &&
  typeof recordGql === 'object' &&
  recordGql !== null &&
  !Array.isArray(recordGql) &&
  !isRecordGqlFieldsRelationWithArguments(recordGql);
