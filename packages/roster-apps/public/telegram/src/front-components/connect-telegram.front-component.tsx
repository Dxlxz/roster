import 'roster-ui/style.css';
import 'roster-ui/theme-dark.css';
import 'roster-ui/theme-light.css';

import { defineFrontComponent } from 'roster-sdk/define';

import { CONNECT_TELEGRAM_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';
import { TelegramConnectSection } from 'src/front-components/components/TelegramConnectSection';

export default defineFrontComponent({
  universalIdentifier: CONNECT_TELEGRAM_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER,
  name: 'connect-telegram',
  description:
    'Gives the current member a one-time link that connects their Telegram account.',
  component: TelegramConnectSection,
});
