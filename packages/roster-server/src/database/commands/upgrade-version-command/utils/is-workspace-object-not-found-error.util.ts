import { EntityMetadataNotFoundError } from 'typeorm/error/EntityMetadataNotFoundError';

import {
  rosterOrmException,
  rosterOrmExceptionCode,
} from 'src/engine/roster-orm/exceptions/roster-orm.exception';

// A workspace object can be absent when upgrading from a version that predates it.
// The v1 GlobalWorkspaceDataSource throws EntityMetadataNotFoundError, while the v2
// datasource throws rosterOrmException(UNKNOWN_OBJECT). Backfill commands must treat
// both as "object not provisioned yet" and skip rather than fail the upgrade.
export const isWorkspaceObjectNotFoundError = (error: unknown): boolean =>
  error instanceof EntityMetadataNotFoundError ||
  (error instanceof rosterOrmException &&
    error.code === rosterOrmExceptionCode.UNKNOWN_OBJECT);
