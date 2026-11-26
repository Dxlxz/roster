import {
  type ProposeToolCallToolResult,
  type ProposedToolCall,
} from 'roster-shared/ai';
import { isDefined } from 'roster-shared/utils';

export const buildRejectedToolCallOutput = ({
  proposal,
  feedback,
}: {
  proposal: ProposedToolCall;
  feedback?: string;
}) => ({
  success: true,
  result: {
    status: 'rejected',
    proposal,
    ...(isDefined(feedback) ? { feedback } : {}),
  } satisfies ProposeToolCallToolResult,
});
