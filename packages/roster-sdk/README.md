<div align="center">
  <a href="https://roster.dev">
    <picture>
      <img alt="roster logo" src="https://raw.githubusercontent.com/Dxlxz/roster/main/packages/roster-website/public/images/core/logo.svg" height="128">
    </picture>
  </a>
  <h1>roster SDK</h1>

<a href="https://www.npmjs.com/package/roster-sdk"><img alt="NPM version" src="https://img.shields.io/npm/v/roster-sdk.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://github.com/Dxlxz/roster/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/npm/l/next.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://discord.gg/cx5n4Jzs57"><img alt="Join the community on Discord" src="https://img.shields.io/badge/Join%20the%20community-blueviolet.svg?style=for-the-badge&logo=roster&labelColor=000000&logoWidth=20"></a>

</div>

The application authoring and runtime SDK for [roster CRM](https://roster.dev).

Use `roster-sdk/define` to declare app entities, `roster-sdk/front-component` for UI helpers, and `roster-sdk/logic-function` for server-side helpers. The SDK also provides `billing`, `utils`, and renderer integration exports.

## Quick start

Install the standalone CLI separately from your app's SDK:

```bash
npm install -g roster
roster app init my-roster-app
cd my-roster-app
yarn install
roster auth login --url https://your-workspace.roster.dev
roster app dev --create
```

Keep `roster-sdk` installed in each app. The global `roster` package owns scaffolding, builds, authentication, sync, and publishing.

## Documentation

- [CLI reference](https://docs.roster.dev/developers/extend/apps/operations/cli)
- [Testing apps](https://docs.roster.dev/developers/extend/apps/operations/testing)
- [Logic function inputs](./docs/logic-function-inputs.md)

## Contributing

```bash
yarn install
npx nx build roster-sdk
npx nx run roster-sdk:test:unit
```

To work on CLI behavior, use `packages/roster-cli` and `npx nx build roster-cli`.
