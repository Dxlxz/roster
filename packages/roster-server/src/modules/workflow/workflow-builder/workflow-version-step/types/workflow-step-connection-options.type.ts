import { type WorkflowActionType } from 'roster-shared/workflow';

type WorkflowIteratorStepConnectionOptions = {
  connectedStepType: WorkflowActionType.ITERATOR;
  settings: {
    isConnectedToLoop: boolean;
  };
};

type WorkflowIfElseStepConnectionOptions = {
  connectedStepType: WorkflowActionType.IF_ELSE;
  settings: {
    branchId: string;
  };
};

export type WorkflowStepConnectionOptions =
  | WorkflowIteratorStepConnectionOptions
  | WorkflowIfElseStepConnectionOptions;
