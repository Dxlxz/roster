import { type ConnectionProviderScope } from 'roster-shared/application';
import { isDefined } from 'roster-shared/utils';

import {
  McpServerException,
  McpServerExceptionCode,
} from 'src/engine/metadata-modules/mcp-server/mcp-server.exception';

export const validateMcpServerSignInInputOrThrow = ({
  connectionProviderId,
  signInScope,
}: {
  connectionProviderId?: string | null;
  signInScope?: ConnectionProviderScope | null;
}): void => {
  if (isDefined(connectionProviderId) && isDefined(signInScope)) {
    throw new McpServerException(
      'signInScope only applies to the sign-in roster sets up; it cannot be combined with connectionProviderId',
      McpServerExceptionCode.INVALID_MCP_SERVER_INPUT,
    );
  }
};
