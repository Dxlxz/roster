import { type ObjectLiteral } from 'typeorm';

import { type ObjectRecord } from 'roster-shared/types';

import { type WorkspaceRepository } from 'src/engine/roster-orm/repository/workspace-repository';
import { type WorkspaceRepositoryOptions } from 'src/engine/roster-orm/types/workspace-repository-options.type';

export type WorkspaceTransactionScope = {
  workspaceId: string;
  getRepository: <T extends ObjectLiteral = ObjectRecord>(
    objectMetadataName: string,
    repositoryOptions?: WorkspaceRepositoryOptions,
  ) => WorkspaceRepository<T>;
  getRepositoryWithoutPermissionChecks: <
    T extends ObjectLiteral = ObjectRecord,
  >(
    objectMetadataName: string,
    repositoryOptions?: WorkspaceRepositoryOptions,
  ) => WorkspaceRepository<T>;
  executeRawQuery: (
    sql: string,
    parameters?: unknown[],
  ) => Promise<Record<string, unknown>[]>;
  afterCommit: (callback: () => void | Promise<void>) => void;
};
