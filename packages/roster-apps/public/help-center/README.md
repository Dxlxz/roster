# Help Center

Lets roster's AI answer questions about roster itself by searching the [roster documentation](https://docs.roster.dev).

## What it does

The app declares the public roster documentation MCP server (`https://docs.roster.dev/mcp`). Once installed, the workspace's AI gets its tools:

- `mcp__help_center__search_roster_documentation` searches the documentation and returns matching sections with links.
- `mcp__help_center__query_docs_filesystem_roster_documentation` reads full documentation pages.
- `mcp__help_center__submit_feedback` reports a problem with a documentation page to the roster docs team.

The first two tools are read-only. `submit_feedback` sends the page path and the feedback the agent wrote, and runs without asking for approval. The tools send only what the agent passes them to docs.roster.dev and never read or write workspace data.

## Setup

None. The server is public, so there is nothing to sign in to or configure. Workspaces that do not want their AI to reach docs.roster.dev can deactivate the server under Settings > AI or uninstall the app.
