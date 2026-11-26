import { AppPath } from 'roster-shared/types';
import { getAppPath } from 'roster-shared/utils';

export const getCoreAgentLink = (agentId: string) =>
  getAppPath(AppPath.AgentShowPage, { agentId });
