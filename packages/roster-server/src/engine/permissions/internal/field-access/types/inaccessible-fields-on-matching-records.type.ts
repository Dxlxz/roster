import { type RecordGqlOperationFilter } from 'roster-shared/types';

export type InaccessibleFieldsOnMatchingRecords = {
  fieldMetadataIds: string[];
  recordFilter: RecordGqlOperationFilter;
};
