This is a [roster](https://roster.dev) application project developed with the [roster CLI](https://www.npmjs.com/package/roster).

## Getting Started

First, authenticate to your workspace:

```bash
roster auth login --url http://localhost:2020 --name local
```

Then, start development mode to sync your app and watch for changes:

```bash
roster app dev
```

Open your roster instance and go to `/settings/applications` section to see the result.

## Available Commands

Run `roster --help` to list all available commands. Common commands:

```bash
# Remotes & Authentication
roster auth login --url http://localhost:2020 --name local     # Authenticate with roster
roster auth status         # Check auth status
roster remote use            # Set default remote
roster remote list           # List all configured remotes
roster remote remove <name>  # Remove a remote

# Application
roster app dev            # Start dev mode (watch, build, sync, and auto-generate typed client)
roster app add        # Scaffold a new entity (object, field, function, front-component, role, view, navigation-menu-item)
roster app logs    # Stream function logs
roster app exec    # Execute a function with JSON payload
roster app uninstall  # Uninstall app from workspace
```

## Integration Tests

If your project includes the example integration test (`src/__tests__/app-install.integration-test.ts`), you can run it with:

```bash
# Make sure a roster server is running at http://localhost:3000
yarn test
```

The test builds and installs the app, then verifies it appears in the applications list. Test configuration (API URL and API key) is defined in `vitest.config.ts`.

## LLMs instructions

Main docs and pitfalls are available in LLMS.md file.

## Learn More

To learn more about roster applications, take a look at the following resources:

- [roster-sdk](https://www.npmjs.com/package/roster-sdk) - learn about `roster-sdk` tool.
- [roster doc](https://docs.roster.dev/) - roster's documentation.
- Join our [Discord](https://discord.gg/cx5n4Jzs57)

You can check out [the roster GitHub repository](https://github.com/Dxlxz/roster) - your feedback and contributions are welcome!
