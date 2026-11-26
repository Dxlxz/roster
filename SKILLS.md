# Agent Skills in this repository

This repository contains several families of Agent Skills. They have different audiences, so pick the one that matches what you are doing. Only the first family is meant to be installed by people building on roster.

## Building a roster app — install these

[`packages/roster-agent-skills`](./packages/roster-agent-skills) is the official, harness-agnostic collection for creating, developing, operating, and publishing roster apps. It works in Claude Code, Codex, Cursor, Pi, and any other harness supported by the `skills` CLI, against any roster instance including self-hosted and localhost.

```bash
npx skills add https://github.com/Dxlxz/roster/tree/agent-skills --list
npx skills add https://github.com/Dxlxz/roster/tree/agent-skills --skill create-app
```

Install from the `agent-skills` branch, which contains only the built app skills and Codex plugin. The source package on `main` keeps references shared and must be built before installation. The branch becomes available after the first successful publish from `main`; until then, use the [local build instructions](./packages/roster-agent-skills#local-development).

| Skill            | Use it for                                                                            |
| ---------------- | ------------------------------------------------------------------------------------- |
| `create-app`     | Scaffold a new roster app.                                                            |
| `develop-app`    | Add or modify objects, fields, logic functions, layouts, front components, workflows. |
| `manage-app`     | Remotes, sync, build, deploy, logs, troubleshooting, CI/CD.                           |
| `publish-app`    | README, marketplace metadata, logos, screenshots, public assets.                      |
| `use-roster-mcp` | Optional: connect an agent to a workspace over MCP and present records readably.      |

## Working inside a roster workspace

[`packages/roster-claude-skills`](./packages/roster-claude-skills) holds skills for using a roster workspace rather than building on it, such as presenting CRM records as readable summaries.

## Contributing to roster itself

[`.claude/skills`](./.claude/skills) holds the skills for agents and contributors working in this checkout: `qa-scout` for browser QA of a pull request, and the `syncable-entity-*` series covering roster's own workspace migration system. They assume a checkout of this repository and are not useful for app development, which the `syncable-entity-*` descriptions state in their first sentence.

These are what a bare-repository listing (`npx skills add Dxlxz/roster --list`) returns. Use the `agent-skills` branch above for app development.

## Shipped inside apps

`packages/roster-apps/**/src/skills` holds skills that a specific roster app ships to its users. They are part of that app, not of this collection.

## Codex plugin

[`packages/roster-agent-skills`](./packages/roster-agent-skills) owns both the canonical skills and the Codex metadata. Its build produces one distribution, published at the root of the `agent-skills` branch, for the `skills` CLI and the Codex plugin named `roster`. Generated copies are not committed to `main`.
