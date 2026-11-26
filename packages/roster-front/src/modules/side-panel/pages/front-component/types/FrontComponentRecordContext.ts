import { type RecordGqlOperationFilter } from 'roster-shared/types';

export type FrontComponentRecordContext = {
  objectNameSingular?: string;
  selectedRecordIds?: string[];
  selectedRecordsFilter?: RecordGqlOperationFilter | null;
};
