import { SettingsNewAccountSection } from '@/settings/accounts/components/SettingsNewAccountSection';
import { useAccountsSettingsBreadcrumbLink } from '@/settings/app-preferences/hooks/useAccountsSettingsBreadcrumbLink';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SettingsPageLayout } from '@/settings/components/layout/SettingsPageLayout';
import { SettingsPath } from 'roster-shared/types';
import { getSettingsPath } from 'roster-shared/utils';
import { useLingui } from '@lingui/react/macro';

export const SettingsNewAccount = () => {
  const { t } = useLingui();
  const accountsBreadcrumbLink = useAccountsSettingsBreadcrumbLink();

  return (
    <SettingsPageLayout
      title={t`New Account`}
      links={[
        {
          children: t`User`,
          href: getSettingsPath(SettingsPath.ProfilePage),
        },
        accountsBreadcrumbLink,
        { children: t`New` },
      ]}
    >
      <SettingsPageContainer>
        <SettingsNewAccountSection />
      </SettingsPageContainer>
    </SettingsPageLayout>
  );
};
