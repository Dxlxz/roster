import { Trans, useLingui } from '@lingui/react/macro';

import { type CalendarChannel } from '@/accounts/types/CalendarChannel';
import { type MessageChannel } from '@/accounts/types/MessageChannel';
import { SettingsAccountsCalendarChannelDetails } from '@/settings/accounts/components/SettingsAccountsCalendarChannelDetails';
import { useAccountsSettingsBreadcrumbLink } from '@/settings/app-preferences/hooks/useAccountsSettingsBreadcrumbLink';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SettingsPageLayout } from '@/settings/components/layout/SettingsPageLayout';
import { SettingsPath } from 'roster-shared/types';
import { getSettingsPath, isDefined } from 'roster-shared/utils';
import { IconDeviceFloppy } from 'roster-ui/icon';
import { Button } from 'roster-ui/primitives/input';

type SettingsAccountsConfigurationStepCalendarProps = {
  calendarChannel: CalendarChannel;
  messageChannel?: MessageChannel;
  isSubmitting: boolean;
  onAddAccount: () => void;
};

export const SettingsAccountsConfigurationStepCalendar = ({
  calendarChannel,
  messageChannel,
  isSubmitting,
  onAddAccount,
}: SettingsAccountsConfigurationStepCalendarProps) => {
  const { t } = useLingui();
  const accountsBreadcrumbLink = useAccountsSettingsBreadcrumbLink();

  const stepNumber = isDefined(messageChannel) ? 2 : 1;
  const stepTitle = t`${stepNumber}. Calendar`;

  return (
    <SettingsPageLayout
      title={stepTitle}
      links={[
        {
          children: <Trans>User</Trans>,
          href: getSettingsPath(SettingsPath.ProfilePage),
        },
        accountsBreadcrumbLink,
        {
          children: stepTitle,
        },
      ]}
      actionButton={
        <Button
          startIcon={<IconDeviceFloppy />}
          size="sm"
          onClick={onAddAccount}
          disabled={isSubmitting}
          variant="solid"
          color="accent"
        >{t`Finish Setup`}</Button>
      }
    >
      <SettingsPageContainer>
        <SettingsAccountsCalendarChannelDetails
          calendarChannel={calendarChannel}
        />
      </SettingsPageContainer>
    </SettingsPageLayout>
  );
};
