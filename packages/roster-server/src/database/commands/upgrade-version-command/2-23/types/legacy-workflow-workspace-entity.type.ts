import { type BaseWorkspaceEntity } from 'src/engine/roster-orm/base.workspace-entity';

export type LegacyWorkflowWorkspaceEntity = BaseWorkspaceEntity & {
  name: string | null;
  lastPublishedVersionId: string | null;
  coreWorkflowId: string | null;
};
