import { type ActorMetadata } from 'roster-shared/types';

import { type UserWorkspaceAuthContext } from 'src/engine/core-modules/auth/types/workspace-auth-context.type';

export type RunAsWorkspaceMemberContext = {
  actorMetadata: ActorMetadata;
  authContext: UserWorkspaceAuthContext;
  roleIds: string[];
};
