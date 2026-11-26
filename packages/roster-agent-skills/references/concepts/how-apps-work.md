# How roster Apps Work

Use this reference to understand the roster application development model before creating, developing, or deploying an app. Other references cover specific workflows; this one explains the architecture behind them.

## What Is A roster App

A roster app is a standalone npm package that extends a roster instance. It is not part of the roster server codebase. It lives in its own directory with its own `package.json`, dependencies, and source tree. When installed on a roster instance, it adds objects, fields, views, page layouts, front components, logic functions, skills, agents, and more to that workspace.

The app does not run as a separate server. It is built, published, and installed into a running roster instance. The instance loads the app's entities into its schema and renders the app's front components inside the workspace UI.

## SDK Packages

A roster app depends on two SDK packages:

| Package             | Purpose                                                     | Used in                                                                                                      |
| ------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `roster-sdk`        | Define app entities and access front component runtime APIs | Entity definitions (`roster-sdk/define`), front component hooks and host APIs (`roster-sdk/front-component`) |
| `roster-client-sdk` | Access workspace data from front components                 | Core object queries (`roster-client-sdk/core`), metadata queries (`roster-client-sdk/metadata`)              |

`roster-sdk/define` provides the registration functions: `defineApplication`, `defineObject`, `defineField`, `defineValidationRule`, `defineView`, `definePageLayout`, `defineFrontComponent`, `defineSettingsMenuItem`, `defineNavigationMenuItem`, `defineLogicFunction`, `defineRole`, and others. Every app entity is declared through one of these functions.

`roster-sdk/front-component` provides runtime APIs available inside front components: `navigate`, `enqueueSnackbar`, `openSidePanelPage`, `useSelectedRecordIds`, `getApplicationVariable`, and others.

roster UI components (`Button`, `Chip`, `Tag`, `Status`, `Heading`, `Section`, `ThemeProvider`, icons, `themeCssVariables`) live in the `roster-ui` package. Install `roster-ui` from npm at the same version as `roster-sdk` and `roster-client-sdk` and import from its subpaths (`roster-ui/primitives/input`, `roster-ui/primitives/data-display`, `roster-ui/icon`, `roster-ui/primitives/typography`, `roster-ui/components`, `roster-ui/theme`, and others).

`roster-client-sdk/core` provides `CoreApiClient` for querying and mutating workspace records (companies, people, custom objects). `roster-client-sdk/metadata` provides access to workspace metadata (object definitions, field definitions).

## roster Instances And Remotes

A roster instance is a running roster server — either self-hosted or managed cloud. Each instance hosts one or more workspaces. Apps are installed per workspace.

A "remote" is the local CLI's connection to a roster instance. The standalone CLI stores its server URL and credentials locally. You can configure multiple remotes (e.g. `local`, `staging`, `production`) and switch between them.

The API key authenticates the developer against the target workspace. It determines which workspace the app syncs to, deploys to, and reads data from during development.

## Local Development Environment

Connect to an existing roster workspace with `roster auth login --url <roster-instance-url> --name dev`. This opens browser authentication and saves a remote.

For local development, run `roster local start` to create or start the full roster environment, then authenticate against `http://localhost:2020`. Docker must be installed and running. Use `--test` for a separate instance on port `2021`. The repository's development environment remains an alternative.

## App Lifecycle

The development loop is:

```
create → develop → sync → validate → repeat
```

1. **Create**: `roster app init <app-name>` generates source files. Then install dependencies with `yarn install`, authenticate with `roster auth login`, and explicitly run `roster app apply --create` for the first sync.

2. **Develop**: Add or modify entities in `src/`. Objects go in `src/objects/`, front components in `src/front-components/`, logic functions in `src/logic-functions/`, page layouts in `src/page-layouts/`, and so on. Each entity file exports a `define*` call.

3. **Sync**: `roster app apply` builds, deploys, and installs the app on the active remote in one step. The roster instance updates its schema, registers new objects and fields, mounts front components, and activates logic functions. This is the primary way to get changes onto a roster instance during development. Sync after every meaningful change.

4. **Validate**: `roster app typecheck` checks generated types. `yarn lint` checks local lint rules. Open the workspace in a browser to verify front components render and logic functions execute.

## Sharing An App

Publishing is separate from the development loop. It is used to share an app with other roster instances or the public marketplace:

- `roster app publish` publishes to npm for the public marketplace.
- `roster app publish --private --remote <name>` publishes privately to a specific roster instance's registry.

Each publish requires a strictly higher semver version in `package.json`. See the `publish-app` skill for marketplace metadata and listing guidance.

## Front Component Rendering

Front components do not run as a separate frontend application. The roster workspace renders them inside an isolated Remote DOM container. The SDK mounts the component, provides a `ThemeProvider`, and proxies host APIs (navigation, snackbars, side panels) through `roster-sdk/front-component`.

This means:

- Front components cannot access `document` or `window` globals directly.
- They cannot use React portals or third-party libraries that manipulate the DOM outside their tree.
- They import UI primitives from `roster-ui` (installed from npm), not from external component libraries.
- They fetch workspace data through `roster-client-sdk/core`, not through direct API calls.

For microphone or camera capture, declare `requestedCapabilities: ['microphone']`, `['camera']`, or `['microphone', 'camera']` in `defineApplication()`. These capabilities appear during installation and are separate from role permissions. Approval requires a workspace member who can manage apps and applies to the whole workspace.

Calling `navigator.mediaDevices.getUserMedia()` without a saved grant pauses capture and shows an approval dialog, including for older apps without `requestedCapabilities`. Declining leaves capture blocked before browser permissions are requested. Package updates do not automatically add grants; locally synced development apps receive their declared capabilities. Browser and operating system permissions still apply after workspace approval.

An embedded website such as a phone or video tool needs its exact HTTPS origin declared in `requestedIframeMediaPermissions` in `defineApplication()`, with microphone and camera set separately: `[{ origin: 'https://phone.example.com', microphone: true, camera: false }]`. Declared websites appear during installation for the same workspace-wide approval. Locally synced development apps receive their declared iframe origins automatically. Updates to published apps preserve existing grants and do not automatically grant additional media access. A member who can manage apps can approve new requests from the installed app's **General** tab, under **Embedded website media access** > **Review media access**. This approval uses a native browser confirmation showing the app, website origins, and requested microphone or camera access. After approving, reload open roster tabs to apply the updated permissions. Front-component iframes must request the features (`allow="microphone"` or `allow="microphone; camera"`). App-defined `IFRAME` page layout widgets use the owning app's grants instead of workspace security approvals or other apps' grants. roster delegates only to granted origins, and only after a member selects the embed's **Enable** control and approves a native browser confirmation showing the app, website origin, and requested microphone or camera access. `srcDoc` iframes and embeds at roster's own origin never receive media access.

## App File Structure

A typical roster app after scaffolding:

```
my-app/
  package.json                          # App metadata, version, dependencies
  src/
    application-config.ts               # defineApplication() — app identity and marketplace metadata
    constants/
      universal-identifiers.ts          # Stable UUIDs for all entities
    objects/                            # defineObject, defineField, defineRelation
    validation-rules/                   # defineValidationRule
    views/                              # defineView
    roles/                              # defineRole
    front-components/                   # defineFrontComponent (.tsx)
    settings-menu-items/                      # defineSettingsMenuItem
    page-layouts/                       # definePageLayout
    navigation-menu-items/              # defineNavigationMenuItem
    logic-functions/                    # defineLogicFunction
  public/                               # Static assets (logos, screenshots, images)
  .github/workflows/                    # CI/CD automation (optional)
```

`application-config.ts` is the app's entry point. It calls `defineApplication()` with the app's universal identifier, display name, description, default role, and marketplace metadata. Every entity references stable UUIDs from `constants/universal-identifiers.ts`.

## Key Concepts

- **Universal identifiers**: Stable UUIDs assigned to every entity. They survive renames, version bumps, and resyncs. Never change a universal identifier after first sync.
- **Remotes**: Named connections to roster instances. Stored in `~/.roster/config.json`. Switch with `roster remote use <name>`.
- **Sync**: `roster app apply` builds, deploys, and installs the app on the active remote in one step. This is the standard way to get code changes onto a roster instance.
- **Publish**: `roster app publish` packages the app for distribution to other instances or the marketplace. Requires a strictly higher semver version than the previously published version.
- **Reserved variable names**: `roster_API_URL`, `roster_INTERNAL_API_URL` (only when the operator sets `SERVER_INTERNAL_URL`), `roster_APP_ACCESS_TOKEN`, `roster_APP_APPLICATION_ACCESS_TOKEN`, `roster_API_KEY`, `roster_FUNCTIONS_URL`, `roster_SERVER_ROUTES_URL` and `APPLICATION_ID` are set by roster for every logic function run, and every other name starting with `roster_` is kept for variables roster adds later. A manifest that declares a reserved name as an application or server variable is rejected on sync and publish.
