import { kv } from 'roster-sdk/logic-function';

import { buildTeamsTenantClaimConflictKvKey } from 'src/features/chat/logic-functions/utils/build-teams-tenant-claim-conflict-kv-key';

export const deleteTeamsTenantClaimConflict = async ({
  connectedAccountId,
}: {
  connectedAccountId: string;
}): Promise<void> => {
  await kv.delete(buildTeamsTenantClaimConflictKvKey(connectedAccountId));
};
