import {
  rosterOrmException,
  rosterOrmExceptionCode,
} from 'src/engine/roster-orm/exceptions/roster-orm.exception';
import {
  WorkspaceQueryExecutorException,
  WorkspaceQueryExecutorExceptionCode,
} from 'src/engine/workspace-query-executor/exceptions/workspace-query-executor.exception';

const roster_ORM_CODE_BY_EXECUTOR_CODE: Record<
  WorkspaceQueryExecutorExceptionCode,
  rosterOrmExceptionCode
> = {
  [WorkspaceQueryExecutorExceptionCode.QUERY_READ_TIMEOUT]:
    rosterOrmExceptionCode.QUERY_READ_TIMEOUT,
  [WorkspaceQueryExecutorExceptionCode.TRANSIENT_DATABASE_ERROR]:
    rosterOrmExceptionCode.TRANSIENT_DATABASE_ERROR,
  [WorkspaceQueryExecutorExceptionCode.DUPLICATE_ENTRY_DETECTED]:
    rosterOrmExceptionCode.DUPLICATE_ENTRY_DETECTED,
  [WorkspaceQueryExecutorExceptionCode.INVALID_INPUT]:
    rosterOrmExceptionCode.INVALID_INPUT,
  [WorkspaceQueryExecutorExceptionCode.MISSING_PARAMETER]:
    rosterOrmExceptionCode.MISSING_PARAMETER,
  [WorkspaceQueryExecutorExceptionCode.INVALID_PARAMETER]:
    rosterOrmExceptionCode.INVALID_PARAMETER,
  [WorkspaceQueryExecutorExceptionCode.MALFORMED_SQL]:
    rosterOrmExceptionCode.MALFORMED_SQL,
  [WorkspaceQueryExecutorExceptionCode.UNSUPPORTED_OPERATION]:
    rosterOrmExceptionCode.UNSUPPORTED_OPERATION,
};

export const torosterOrmException = (error: unknown): unknown => {
  if (!(error instanceof WorkspaceQueryExecutorException)) {
    return error;
  }

  const rosterOrmException = new rosterOrmException(
    error.message,
    roster_ORM_CODE_BY_EXECUTOR_CODE[error.code],
    { userFriendlyMessage: error.userFriendlyMessage },
  );

  return 'cause' in error
    ? Object.assign(rosterOrmException, { cause: error.cause })
    : rosterOrmException;
};
