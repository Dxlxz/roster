# roster CLI

Work with [roster](https://roster.dev) from your terminal: connect to
workspaces, inspect metadata and records, send API requests, and develop
applications.

## Install

The CLI needs Node.js 24.5 or later. Building apps is officially supported on
Unix systems (macOS and Linux) only; on Windows, work inside WSL 2.

```bash
npm install -g roster
roster --version
```

## Get started

```bash
roster doctor --offline
roster auth login --url https://acme.roster.dev --use
roster metadata object list
roster data list companies --limit 5
roster open
```

Replace the example URL with your workspace's address. `--use` makes this
connection the default, even when another saved connection already is one. Use
`--remote <name>` to select another saved connection and `--json` for a
structured result. Saved connections live in `~/.roster/config.json`.

Browser sign-in is supported on roster 2.42 and later. On older servers, sign in
with an [API key](docs/commands.md#connections-and-authentication) instead.

## Develop an application

App projects pin Yarn 4 in `packageManager`. Run `corepack enable` once so
`yarn` uses that version; if `corepack` is missing, install it with
`npm install -g corepack`. These steps use the default connection;
`roster auth status` shows which one that is:

```bash
roster app init my-app
cd my-app
yarn install
roster app build
roster app apply --create
roster app dev
```

| Command              | What it does                                                                          |
| -------------------- | ------------------------------------------------------------------------------------- |
| `app init`           | Write project files without installing dependencies                                   |
| `app build`          | Check and build the project locally                                                   |
| `app apply --create` | Register and install a new development app, upload its build and synchronize metadata |
| `app plan`           | Inspect changes before applying an already registered app                             |
| `app dev`            | Watch inputs and sync successful builds                                               |

### Review changes before syncing

- Missing definitions imply remote deletions by default. Use `--no-prune` to
  preserve them.
- The workspace custom application deletes missing definitions only with
  `--prune`.
- Object and field deletions require confirmation because they also delete data.
- Pull can overwrite local edits. Read the
  [reconciliation rules](docs/commands.md#local-changes-and-deletions) first.

### Version and authentication requirements

Apps created with `app init` declare the oldest roster version they support in
`engines.roster`. `app exec` runs functions as the signed-in user, so it needs a
browser sign-in and roster 2.46 or later. With a browser sign-in,
`app uninstall` also needs roster 2.46 or later; on earlier versions, use an API
key for it.

## CLI and app dependencies

The CLI is installed globally, separately from each app. Apps keep `roster-sdk`
as a development dependency for authoring and build-time APIs, `typescript` for
checks, and `roster-client-sdk` when they use a generated API client. Neither
apps nor SDK packages need `roster` in their dependencies or devDependencies. In
CI, install a pinned version with `npm install -g roster@<version>`.

The CLI owns builds and filesystem operations. It uses the app's installed SDK
authoring exports and TypeScript compiler. Configuration and project-reference
errors fail builds. See
[build requirements](docs/commands.md#build-and-check-an-app) for supported SDK
exports and compiler configuration.

## Documentation

- [Command reference](docs/commands.md), authentication, flags, output,
  permissions and recovery for each workflow.
- [Contributing](CONTRIBUTING.md), building from source, package structure,
  tests and releases.
- [Application tooling](src/app/README.md), module responsibilities and
  invariants.

Run `roster commands` for the command inventory or `roster <command> --help` for
its arguments and options.
