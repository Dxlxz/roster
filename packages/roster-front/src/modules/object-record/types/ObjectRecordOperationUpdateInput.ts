import { type ObjectRecord } from 'roster-shared/types';

export type ObjectRecordOperationUpdateInput = {
  recordId: string;
  updatedFields: Record<string, unknown>[];
  updatedRecord?: ObjectRecord;
};
