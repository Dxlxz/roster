#!/usr/bin/env node

console.error(`create-roster-app has been retired. Use the standalone roster CLI:

  npm install -g roster
  roster app init my-app
  cd my-app
  yarn install
  roster auth login --url https://your-workspace.roster.dev
  roster app apply --create

For an existing app, run roster app dev from its directory.
Keep roster-sdk installed for application definitions and runtime helpers.`);
process.exitCode = 1;
