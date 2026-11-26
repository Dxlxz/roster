# Setup

Use Node.js from `.nvmrc` and Yarn 4. Install the standalone CLI globally:

```bash
npm install -g roster
yarn install
```

Connect to your existing roster workspace, or start a server using the [local-server guide](https://docs.roster.dev/developers/extend/apps/getting-started/local-server):

```bash
roster auth login --url https://your-workspace.roster.dev --name dev
roster app apply --create
roster app dev
```

The first apply registers and installs your app. Dev watches and syncs later source changes. `roster app init` does not authenticate, start containers, or install the app.

## Validation

- `yarn lint`, lint the project.
- `yarn typecheck`, check source and test types.
- `yarn test:unit`, run unit tests.
- `yarn test`, run integration tests against a disposable workspace configured with `roster_API_URL` and `roster_API_KEY`.

Integration tests install and uninstall the app. Install the CLI globally or set `roster_CLI` to a local executable path.
