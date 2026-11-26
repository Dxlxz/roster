# My roster App

Describe your app in one or two sentences.

## Features

List the top things your app does, for example:

- Feature one
- Feature two
- Feature three

## Getting started

Setup instructions live in [SETUP.md](SETUP.md).

## Publishing

The `Publish` workflow (`.github/workflows/publish.yml`) publishes to npm with
provenance using
[npm trusted publishing](https://docs.npmjs.com/trusted-publishers).

### One-time setup

On npmjs.com, register this repository as a trusted publisher for the package.
Select `publish.yml` as the workflow.

### Release a version

1. Bump the version in `package.json`.
2. Push the matching version tag, or run `Publish` manually from the Actions
   tab:

   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

Publishing with provenance is also how you prove ownership when claiming your
app in a roster marketplace.

## Changelog

Notable changes are documented in [CHANGELOG.md](CHANGELOG.md).

## Learn more

- [roster Apps documentation](https://docs.roster.dev/developers/extend/apps/getting-started/quick-start)
- [roster CLI reference](https://docs.roster.dev/developers/extend/apps/operations/cli)
- [Discord](https://discord.gg/cx5n4Jzs57)
