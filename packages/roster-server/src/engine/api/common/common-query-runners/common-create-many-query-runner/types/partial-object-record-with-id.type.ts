import { type ObjectRecord } from 'roster-shared/types';

export type PartialObjectRecordWithId = Partial<ObjectRecord> & { id: string };
