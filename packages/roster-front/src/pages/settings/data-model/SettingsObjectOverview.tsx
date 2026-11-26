import { ReactFlowProvider } from '@xyflow/react';

import { SettingsDataModelOverview } from '@/settings/data-model/graph-overview/components/SettingsDataModelOverview';
import { SettingsPageLayout } from '@/settings/components/layout/SettingsPageLayout';
import { SettingsPath } from 'roster-shared/types';
import { getSettingsPath } from 'roster-shared/utils';
import { useLingui } from '@lingui/react/macro';

export const SettingsObjectOverview = () => {
  const { t } = useLingui();
  return (
    <SettingsPageLayout
      links={[
        {
          children: t`Workspace`,
          href: getSettingsPath(SettingsPath.General),
        },
        { children: t`Objects`, href: getSettingsPath(SettingsPath.Objects) },
        {
          children: t`Overview`,
        },
      ]}
    >
      <ReactFlowProvider>
        <SettingsDataModelOverview />
      </ReactFlowProvider>
    </SettingsPageLayout>
  );
};
