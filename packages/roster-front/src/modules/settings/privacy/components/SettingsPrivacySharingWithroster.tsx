import { useLingui } from '@lingui/react/macro';
import { Section } from 'roster-ui/components/layout';
import { IconChartLine } from 'roster-ui/icon';
import { Card } from 'roster-ui/primitives/surfaces';

import { getWorkspaceAiDataPolicy } from '@/ai/utils/getWorkspaceAiDataPolicy';
import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';
import { SettingsOptionCardContentSwitch } from '@/settings/components/SettingsOptions/SettingsOptionCardContentSwitch';
import { useIsrosterCloud } from '@/settings/privacy/hooks/useIsrosterCloud';
import { useUpdateWorkspaceAiDataPolicyField } from '@/settings/privacy/hooks/useUpdateWorkspaceAiDataPolicyField';
import { ImpersonationSwitch } from '@/settings/workspace/components/ImpersonationSwitch';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';

export const SettingsPrivacySharingWithroster = () => {
  const { t } = useLingui();
  const isrosterCloud = useIsrosterCloud();
  const currentWorkspace = useAtomStateValue(currentWorkspaceState);
  const { updateWorkspaceAiDataPolicyField } =
    useUpdateWorkspaceAiDataPolicyField();

  return (
    <Section.Root>
      <Section.Header
        title={t`Sharing with roster`}
        description={t`Choose what roster can access to support you and improve the product.`}
      />
      <Card.Root>
        <ImpersonationSwitch divider={isrosterCloud} />
        {isrosterCloud && (
          <SettingsOptionCardContentSwitch
            Icon={IconChartLine}
            title={t`Help improve roster`}
            description={t`Share session replays and AI conversations to help us improve roster`}
            checked={
              getWorkspaceAiDataPolicy(currentWorkspace)
                .isProductImprovementDataSharingEnabled
            }
            onChange={(checked) =>
              updateWorkspaceAiDataPolicyField({
                field: 'isProductImprovementDataSharingEnabled',
                value: checked,
              })
            }
          />
        )}
      </Card.Root>
    </Section.Root>
  );
};
