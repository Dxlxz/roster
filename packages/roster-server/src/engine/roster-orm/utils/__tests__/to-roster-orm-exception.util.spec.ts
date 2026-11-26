import {
  rosterOrmException,
  rosterOrmExceptionCode,
} from 'src/engine/roster-orm/exceptions/roster-orm.exception';
import { torosterOrmException } from 'src/engine/roster-orm/utils/to-roster-orm-exception.util';
import {
  WorkspaceQueryExecutorException,
  WorkspaceQueryExecutorExceptionCode,
} from 'src/engine/workspace-query-executor/exceptions/workspace-query-executor.exception';

describe('torosterOrmException', () => {
  it.each(Object.values(WorkspaceQueryExecutorExceptionCode))(
    'keeps the code, message and user friendly message of %s',
    (code) => {
      const error = new WorkspaceQueryExecutorException({
        message: 'message',
        code,
      });

      const result = torosterOrmException(error);

      expect(result).toBeInstanceOf(rosterOrmException);
      expect(result).toMatchObject({
        code: rosterOrmExceptionCode[code],
        message: 'message',
        userFriendlyMessage: error.userFriendlyMessage,
      });
    },
  );

  it('keeps the cause', () => {
    const cause = new Error('pg error');
    const error = Object.assign(
      new WorkspaceQueryExecutorException({
        message: 'message',
        code: WorkspaceQueryExecutorExceptionCode.INVALID_INPUT,
      }),
      { cause },
    );

    expect(torosterOrmException(error)).toHaveProperty('cause', cause);
  });

  it('returns any other error unchanged', () => {
    const error = new Error('other');

    expect(torosterOrmException(error)).toBe(error);
  });
});
