import { SettingsCard } from '@/settings/components/SettingsCard';
import { useLingui } from '@lingui/react/macro';
import { SettingsPath } from 'roster-shared/types';
import { getSettingsPath, isDefined } from 'roster-shared/utils';
import { IconLanguage } from 'roster-ui/icon';
import { useTheme } from 'roster-ui/theme';

type SettingsTranslationsCardProps = {
  objectNamePlural: string;
  fieldName?: string;
  disabled?: boolean;
};

export const SettingsTranslationsCard = ({
  objectNamePlural,
  fieldName,
  disabled = false,
}: SettingsTranslationsCardProps) => {
  const { t } = useLingui();
  const theme = useTheme();
  const icon = <IconLanguage size={theme.icon.size.md} />;

  if (disabled) {
    return (
      <SettingsCard
        Icon={icon}
        title={t`Edit translations`}
        description={t`Save your changes first`}
        disabled
      />
    );
  }

  return (
    <SettingsCard
      Icon={icon}
      title={t`Edit translations`}
      to={
        isDefined(fieldName)
          ? getSettingsPath(SettingsPath.ObjectFieldTranslations, {
              objectNamePlural,
              fieldName,
            })
          : getSettingsPath(SettingsPath.ObjectTranslations, {
              objectNamePlural,
            })
      }
    />
  );
};
