import { type WorkflowClassifyQuestion } from 'roster-shared/workflow';

export type WorkflowClassifyActionInput = {
  state: string;
  questions: WorkflowClassifyQuestion[];
};
