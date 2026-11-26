import { type ActorMetadata } from 'roster-shared/types';

import { type RecordCrudExecutionContext } from './record-crud-execution-context.type';

export type UpdateRecordExecutionContext = RecordCrudExecutionContext & {
  updatedBy?: ActorMetadata;
};
