import { defineApplication } from 'roster-sdk/define';

import { APPLICATION_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineApplication({
  universalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
  displayName: 'Telegram',
  description:
    'Connect Telegram accounts to workspace members so they can use roster from a direct message with the bot.',
  logo: 'public/telegram.svg',
  author: 'roster',
  category: 'Communication',
  websiteUrl:
    'https://github.com/Dxlxz/roster/tree/main/packages/roster-apps/public/telegram',
  termsUrl: 'https://www.roster.dev/terms',
  emailSupport: 'contact@roster.dev',
  issueReportUrl: 'https://github.com/Dxlxz/roster/issues',
  serverVariables: {
    TELEGRAM_BOT_TOKEN: {
      description:
        'Token of the Telegram bot, from @BotFather. One bot serves every workspace of this server.',
      isSecret: true,
      isRequired: false,
    },
    TELEGRAM_WEBHOOK_SECRET: {
      description:
        'Random string of 1 to 256 characters among A-Z, a-z, 0-9, _ and -. Telegram sends it back with every update so forged requests are rejected.',
      isSecret: true,
      isRequired: false,
    },
  },
});
