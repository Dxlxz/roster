import { type AgentRunSummary } from 'roster-shared/ai';
import { isDefined } from 'roster-shared/utils';
import { type WorkflowRunStepLog } from 'roster-shared/workflow';

export const buildAiAgentStepLog = ({
  summary,
  threadId,
}: {
  summary: AgentRunSummary;
  threadId: string | null;
}): WorkflowRunStepLog => ({
  details: {
    type: 'AI_AGENT',
    ...summary,
    ...(isDefined(threadId) ? { threadId } : {}),
  },
  entries: [],
  sizeBytes: 0,
});
