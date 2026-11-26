import {
  type WorkflowRunState,
  type WorkflowRunStepStatus,
} from '@/workflow/types/Workflow';
import { isDefined } from 'roster-shared/utils';
import { StepStatus } from 'roster-shared/workflow';

export const getWorkflowRunStepExecutionStatus = ({
  workflowRunState,
  stepId,
}: {
  workflowRunState: WorkflowRunState | null;
  stepId: string;
}): WorkflowRunStepStatus => {
  const stepOutput = workflowRunState?.stepInfos?.[stepId];

  if (isDefined(stepOutput)) {
    return stepOutput.status;
  }

  return StepStatus.NOT_STARTED;
};
