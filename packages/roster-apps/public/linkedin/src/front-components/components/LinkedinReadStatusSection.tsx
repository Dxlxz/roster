import { t } from 'roster-sdk/front-component';
import { Section } from 'roster-ui/components/layout';
import { IconCheck } from 'roster-ui/icon';

import { SettingsOptionCardContentToggle } from 'src/front-components/components/SettingsOptionCardContentToggle';
import { StyledSettingsCard } from 'src/front-components/components/StyledSettingsCard';

type LinkedinReadStatusSectionProps = {
  areChatsMarkedAsRead: boolean;
  onChange: (areChatsMarkedAsRead: boolean) => void;
};

export const LinkedinReadStatusSection = ({
  areChatsMarkedAsRead,
  onChange,
}: LinkedinReadStatusSectionProps) => (
  <Section.Root>
    <Section.Header
      title={t('Read status')}
      description={t('Keep LinkedIn and roster in sync')}
    />
    <StyledSettingsCard>
      <SettingsOptionCardContentToggle
        Icon={IconCheck}
        title={t('Mark chats as read on LinkedIn')}
        description={t(
          'Opening a chat in roster marks it as read on LinkedIn, which can show the sender a read receipt',
        )}
        checked={areChatsMarkedAsRead}
        onChange={onChange}
      />
    </StyledSettingsCard>
  </Section.Root>
);
