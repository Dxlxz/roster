import { type MessageDescriptor } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import { assertUnreachable } from 'roster-shared/utils';

import { STANDARD_ERROR_MESSAGE } from 'src/engine/constants/standard-error-message.constant';
import {
  DUPLICATE_ENTRY_USER_FRIENDLY_MESSAGE,
  INVALID_INPUT_USER_FRIENDLY_MESSAGE,
  QUERY_READ_TIMEOUT_USER_FRIENDLY_MESSAGE,
  TRANSIENT_DATABASE_ERROR_USER_FRIENDLY_MESSAGE,
} from 'src/engine/workspace-query-executor/constants/postgres-error-messages.constants';
import { CustomException } from 'src/utils/custom-exception';

export enum rosterOrmExceptionCode {
  WORKSPACE_SCHEMA_NOT_FOUND = 'WORKSPACE_SCHEMA_NOT_FOUND',
  ROLES_PERMISSIONS_VERSION_NOT_FOUND = 'ROLES_PERMISSIONS_VERSION_NOT_FOUND',
  FEATURE_FLAG_MAP_VERSION_NOT_FOUND = 'FEATURE_FLAG_MAP_VERSION_NOT_FOUND',
  USER_WORKSPACE_ROLE_MAP_VERSION_NOT_FOUND = 'USER_WORKSPACE_ROLE_MAP_VERSION_NOT_FOUND',
  API_KEY_ROLE_MAP_VERSION_NOT_FOUND = 'API_KEY_ROLE_MAP_VERSION_NOT_FOUND',
  MALFORMED_METADATA = 'MALFORMED_METADATA',
  WORKSPACE_NOT_FOUND = 'WORKSPACE_NOT_FOUND',
  CONNECT_RECORD_NOT_FOUND = 'CONNECT_RECORD_NOT_FOUND',
  CONNECT_NOT_ALLOWED = 'CONNECT_NOT_ALLOWED',
  CONNECT_UNIQUE_CONSTRAINT_ERROR = 'CONNECT_UNIQUE_CONSTRAINT_ERROR',
  MISSING_MAIN_ALIAS_TARGET = 'MISSING_MAIN_ALIAS_TARGET',
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
  ENUM_TYPE_NAME_NOT_FOUND = 'ENUM_TYPE_NAME_NOT_FOUND',
  QUERY_READ_TIMEOUT = 'QUERY_READ_TIMEOUT',
  TRANSIENT_DATABASE_ERROR = 'TRANSIENT_DATABASE_ERROR',
  DUPLICATE_ENTRY_DETECTED = 'DUPLICATE_ENTRY_DETECTED',
  TOO_MANY_RECORDS_TO_UPDATE = 'TOO_MANY_RECORDS_TO_UPDATE',
  INVALID_INPUT = 'INVALID_INPUT',
  ORM_EVENT_DATA_CORRUPTED = 'ORM_EVENT_DATA_CORRUPTED',
  NO_ROLE_FOUND_FOR_USER_WORKSPACE = 'NO_ROLE_FOUND_FOR_USER_WORKSPACE',
  MISSING_PARAMETER = 'MISSING_PARAMETER',
  INVALID_PARAMETER = 'INVALID_PARAMETER',
  MALFORMED_SQL = 'MALFORMED_SQL',
  UNKNOWN_OBJECT = 'UNKNOWN_OBJECT',
  UNKNOWN_COLUMN = 'UNKNOWN_COLUMN',
  UNKNOWN_RELATION = 'UNKNOWN_RELATION',
  UNSUPPORTED_OPERATION = 'UNSUPPORTED_OPERATION',
  MISSING_ALIAS = 'MISSING_ALIAS',
  INVALID_QUERY = 'INVALID_QUERY',
  ENTITY_NOT_FOUND = 'ENTITY_NOT_FOUND',
}

const getrosterOrmExceptionUserFriendlyMessage = (
  code: rosterOrmExceptionCode,
) => {
  switch (code) {
    case rosterOrmExceptionCode.WORKSPACE_SCHEMA_NOT_FOUND:
      return msg`Workspace schema not found.`;
    case rosterOrmExceptionCode.ROLES_PERMISSIONS_VERSION_NOT_FOUND:
      return msg`Roles and permissions configuration not found.`;
    case rosterOrmExceptionCode.FEATURE_FLAG_MAP_VERSION_NOT_FOUND:
      return msg`Feature configuration not found.`;
    case rosterOrmExceptionCode.USER_WORKSPACE_ROLE_MAP_VERSION_NOT_FOUND:
      return msg`User workspace role configuration not found.`;
    case rosterOrmExceptionCode.API_KEY_ROLE_MAP_VERSION_NOT_FOUND:
      return msg`API key role configuration not found.`;
    case rosterOrmExceptionCode.MALFORMED_METADATA:
      return msg`Data structure is invalid.`;
    case rosterOrmExceptionCode.WORKSPACE_NOT_FOUND:
      return msg`Workspace not found.`;
    case rosterOrmExceptionCode.CONNECT_RECORD_NOT_FOUND:
      return msg`Related record not found.`;
    case rosterOrmExceptionCode.CONNECT_NOT_ALLOWED:
      return msg`This connection is not allowed.`;
    case rosterOrmExceptionCode.CONNECT_UNIQUE_CONSTRAINT_ERROR:
      return msg`A record with this relationship already exists.`;
    case rosterOrmExceptionCode.MISSING_MAIN_ALIAS_TARGET:
      return msg`Missing main alias target.`;
    case rosterOrmExceptionCode.METHOD_NOT_ALLOWED:
      return msg`This operation is not allowed.`;
    case rosterOrmExceptionCode.QUERY_READ_TIMEOUT:
      return QUERY_READ_TIMEOUT_USER_FRIENDLY_MESSAGE;
    case rosterOrmExceptionCode.TRANSIENT_DATABASE_ERROR:
      return TRANSIENT_DATABASE_ERROR_USER_FRIENDLY_MESSAGE;
    case rosterOrmExceptionCode.DUPLICATE_ENTRY_DETECTED:
      return DUPLICATE_ENTRY_USER_FRIENDLY_MESSAGE;
    case rosterOrmExceptionCode.TOO_MANY_RECORDS_TO_UPDATE:
      return msg`Too many records to update at once.`;
    case rosterOrmExceptionCode.INVALID_INPUT:
      return INVALID_INPUT_USER_FRIENDLY_MESSAGE;
    case rosterOrmExceptionCode.NO_ROLE_FOUND_FOR_USER_WORKSPACE:
      return msg`No role found for user.`;
    case rosterOrmExceptionCode.ENUM_TYPE_NAME_NOT_FOUND:
    case rosterOrmExceptionCode.ORM_EVENT_DATA_CORRUPTED:
    case rosterOrmExceptionCode.MISSING_PARAMETER:
    case rosterOrmExceptionCode.INVALID_PARAMETER:
    case rosterOrmExceptionCode.MALFORMED_SQL:
    case rosterOrmExceptionCode.UNKNOWN_OBJECT:
    case rosterOrmExceptionCode.UNKNOWN_COLUMN:
    case rosterOrmExceptionCode.UNKNOWN_RELATION:
    case rosterOrmExceptionCode.UNSUPPORTED_OPERATION:
    case rosterOrmExceptionCode.MISSING_ALIAS:
    case rosterOrmExceptionCode.INVALID_QUERY:
    case rosterOrmExceptionCode.ENTITY_NOT_FOUND:
      return STANDARD_ERROR_MESSAGE;
    default:
      assertUnreachable(code);
  }
};

export class rosterOrmException extends CustomException<rosterOrmExceptionCode> {
  constructor(
    message: string,
    code: rosterOrmExceptionCode,
    { userFriendlyMessage }: { userFriendlyMessage?: MessageDescriptor } = {},
  ) {
    super(message, code, {
      userFriendlyMessage:
        userFriendlyMessage ?? getrosterOrmExceptionUserFriendlyMessage(code),
    });
  }
}
