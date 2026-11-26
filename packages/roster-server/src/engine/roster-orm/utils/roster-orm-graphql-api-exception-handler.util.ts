import { UserInputError } from 'src/engine/core-modules/graphql/utils/graphql-errors.util';
import { type rosterOrmException } from 'src/engine/roster-orm/exceptions/roster-orm.exception';
import { isrosterOrmUserInputError } from 'src/engine/roster-orm/utils/is-roster-orm-user-input-error.util';

export const rosterOrmGraphqlApiExceptionHandler = (
  error: rosterOrmException,
) => {
  if (isrosterOrmUserInputError(error)) {
    throw new UserInputError(error.message, {
      userFriendlyMessage: error.userFriendlyMessage,
    });
  }

  throw error;
};
