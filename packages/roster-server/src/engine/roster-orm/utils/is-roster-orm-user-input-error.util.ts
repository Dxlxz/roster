import {
  type rosterOrmException,
  rosterOrmExceptionCode,
} from 'src/engine/roster-orm/exceptions/roster-orm.exception';

// Codes that describe a problem with the caller's input rather than a server
// fault; the API layers surface them as user input errors (400) instead of 500
export const isrosterOrmUserInputError = (
  error: rosterOrmException,
): boolean => {
  switch (error.code) {
    case rosterOrmExceptionCode.INVALID_INPUT:
    case rosterOrmExceptionCode.INVALID_PARAMETER:
    case rosterOrmExceptionCode.UNKNOWN_OBJECT:
    case rosterOrmExceptionCode.UNKNOWN_COLUMN:
    case rosterOrmExceptionCode.UNKNOWN_RELATION:
    case rosterOrmExceptionCode.UNSUPPORTED_OPERATION:
    case rosterOrmExceptionCode.TOO_MANY_RECORDS_TO_UPDATE:
    case rosterOrmExceptionCode.ENTITY_NOT_FOUND:
    case rosterOrmExceptionCode.DUPLICATE_ENTRY_DETECTED:
    case rosterOrmExceptionCode.CONNECT_RECORD_NOT_FOUND:
    case rosterOrmExceptionCode.CONNECT_NOT_ALLOWED:
    case rosterOrmExceptionCode.CONNECT_UNIQUE_CONSTRAINT_ERROR:
      return true;
    default:
      return false;
  }
};
