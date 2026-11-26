import { isMultiWorkspaceEnabledState } from '@/client-config/states/isMultiWorkspaceEnabledState';
import { SettingsPrivacyAiDataProcessing } from '@/settings/privacy/components/SettingsPrivacyAiDataProcessing';
import { SettingsPrivacySafeguards } from '@/settings/privacy/components/SettingsPrivacySafeguards';
import { SettingsPrivacySharingWithroster } from '@/settings/privacy/components/SettingsPrivacySharingWithroster';
import { useIsAiDataPolicyConfigurable } from '@/settings/privacy/hooks/useIsAiDataPolicyConfigurable';
import { useIsrosterCloud } from '@/settings/privacy/hooks/useIsrosterCloud';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';

export const SettingsPrivacy = () => {
  const isrosterCloud = useIsrosterCloud();
  const isAiDataPolicyConfigurable = useIsAiDataPolicyConfigurable();
  const isMultiWorkspaceEnabled = useAtomStateValue(
    isMultiWorkspaceEnabledState,
  );

  return (
    <>
      {isrosterCloud && <SettingsPrivacySafeguards />}
      {isAiDataPolicyConfigurable && <SettingsPrivacyAiDataProcessing />}
      {isMultiWorkspaceEnabled && <SettingsPrivacySharingWithroster />}
    </>
  );
};
