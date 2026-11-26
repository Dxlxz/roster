import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';
import { getToastOptionsFromError } from '@/error-handler/utils/getToastOptionsFromError';
import { SettingsOptionCardContentSwitch } from '@/settings/components/SettingsOptions/SettingsOptionCardContentSwitch';
import { useAtomState } from '@/ui/utilities/state/jotai/hooks/useAtomState';
import { useMutation } from '@apollo/client/react';
import { useLingui } from '@lingui/react/macro';
import { isDefined } from 'roster-shared/utils';
import { useToast } from 'roster-ui/components/feedback';
import { Section } from 'roster-ui/components/layout';
import { IconMail } from 'roster-ui/icon';
import { Card } from 'roster-ui/primitives/surfaces';
import { UpdateWorkspaceDocument } from '~/generated-metadata/graphql';

export const SettingsWorkspaceEmailSyncSection = () => {
  const { t } = useLingui();

  const [currentWorkspace, setCurrentWorkspace] = useAtomState(
    currentWorkspaceState,
  );
  const { enqueueToast } = useToast();
  const [updateWorkspace] = useMutation(UpdateWorkspaceDocument);

  const handleSyncInternalEmailsChange = (value: boolean) => {
    if (!isDefined(currentWorkspace)) {
      return;
    }

    if (value === currentWorkspace.isInternalImportEnabled) {
      return;
    }

    setCurrentWorkspace({
      ...currentWorkspace,
      isInternalImportEnabled: value,
    });

    updateWorkspace({
      variables: {
        input: {
          isInternalImportEnabled: value,
        },
      },
    }).catch((error) => {
      enqueueToast(getToastOptionsFromError({ error }));
    });
  };

  return (
    <Section.Root>
      <Section.Header
        title={t`Sync`}
        description={t`Control what the workspace imports from connected mailboxes and calendars`}
      />
      <Card.Root>
        <SettingsOptionCardContentSwitch
          Icon={IconMail}
          title={t`Sync Internal Emails`}
          description={t`Include emails where all participants share the same domain.`}
          checked={currentWorkspace?.isInternalImportEnabled ?? false}
          onChange={handleSyncInternalEmailsChange}
        />
      </Card.Root>
    </Section.Root>
  );
};
