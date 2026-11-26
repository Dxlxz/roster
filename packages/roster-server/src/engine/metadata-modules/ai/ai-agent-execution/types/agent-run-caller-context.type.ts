import { type ActorMetadata } from 'roster-shared/types';

import { type WorkspaceAuthContext } from 'src/engine/core-modules/auth/types/workspace-auth-context.type';

export type AgentRunCallerContext = {
  authContext: WorkspaceAuthContext;
  actorMetadata?: ActorMetadata;
};
