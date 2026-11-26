import { type StepFilter, type StepFilterGroup } from 'roster-shared/types';
import { type StepIfElseBranch } from 'roster-shared/workflow';

import { type BaseWorkflowActionSettings } from 'src/modules/workflow/workflow-executor/workflow-actions/types/workflow-action-settings.type';

export type WorkflowIfElseActionSettings = BaseWorkflowActionSettings & {
  input: {
    stepFilterGroups: StepFilterGroup[];
    stepFilters: StepFilter[];
    branches: StepIfElseBranch[];
  };
};
