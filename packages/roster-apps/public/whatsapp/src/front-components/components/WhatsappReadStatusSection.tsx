import { t } from 'roster-sdk/front-component';
import { Section } from 'roster-ui/components/layout';
import { IconCheck } from 'roster-ui/icon';
import { Card } from 'roster-ui/primitives/surfaces';

import { SettingsOptionCardContentSwitch } from 'src/front-components/components/SettingsOptionCardContentSwitch';

type WhatsappReadStatusSectionProps = {
  areChatsMarkedAsRead: boolean;
  onChange: (areChatsMarkedAsRead: boolean) => void;
};

export const WhatsappReadStatusSection = ({
  areChatsMarkedAsRead,
  onChange,
}: WhatsappReadStatusSectionProps) => (
  <Section.Root>
    <Section.Header
      title={t('Read status')}
      description={t('Keep WhatsApp and roster in sync')}
    />
    <Card.Root fullWidth>
      <SettingsOptionCardContentSwitch
        Icon={IconCheck}
        title={t('Mark chats as read on WhatsApp')}
        description={t(
          'Opening a chat in roster marks it as read on WhatsApp, which can show the sender a read receipt',
        )}
        checked={areChatsMarkedAsRead}
        onChange={onChange}
      />
    </Card.Root>
  </Section.Root>
);
