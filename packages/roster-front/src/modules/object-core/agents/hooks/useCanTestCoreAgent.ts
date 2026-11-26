import { PermissionFlagType } from 'roster-shared/constants';
import { isDefined } from 'roster-shared/utils';

import { useCoreAgentDirtyState } from '@/object-core/agents/hooks/useCoreAgentDirtyState';
import { type CoreAgent } from '@/object-core/agents/types/CoreAgent';
import { useHasPermissionFlag } from '@/settings/roles/hooks/useHasPermissionFlag';

export const useCanTestCoreAgent = (agent: CoreAgent | undefined) => {
  const canRunAgents = useHasPermissionFlag(PermissionFlagType.AI);
  const { isDirty } = useCoreAgentDirtyState(agent);

  // a test runs the saved agent, so it waits for pending edits to be saved or discarded
  return canRunAgents && isDefined(agent) && agent.isActive && !isDirty;
};
