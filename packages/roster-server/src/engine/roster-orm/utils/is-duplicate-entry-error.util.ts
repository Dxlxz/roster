import {
  rosterOrmException,
  rosterOrmExceptionCode,
} from 'src/engine/roster-orm/exceptions/roster-orm.exception';

export const isDuplicateEntryError = (error: unknown): boolean =>
  error instanceof rosterOrmException &&
  error.code === rosterOrmExceptionCode.DUPLICATE_ENTRY_DETECTED;
