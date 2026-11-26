import { defineMcpServer } from 'roster-sdk/define';

import { HELP_CENTER_MCP_SERVER_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineMcpServer({
  universalIdentifier: HELP_CENTER_MCP_SERVER_UNIVERSAL_IDENTIFIER,
  name: 'help_center',
  label: 'roster Help Center',
  url: 'https://docs.roster.dev/mcp',
});
