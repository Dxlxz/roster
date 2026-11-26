import { sidePanelWorkflowVersionIdComponentState } from '@/side-panel/pages/workflow/states/sidePanelWorkflowVersionIdComponentState';
import { useAtomComponentStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomComponentStateValue';
import { isDefined } from 'roster-shared/utils';
import { doNotTranslate } from 'roster-shared/i18n';

export const useSidePanelWorkflowVersionIdOrThrow = () => {
  const sidePanelWorkflowVersionId = useAtomComponentStateValue(
    sidePanelWorkflowVersionIdComponentState,
  );
  if (!isDefined(sidePanelWorkflowVersionId)) {
    throw new Error(
      doNotTranslate(
        'Expected sidePanelWorkflowVersionIdComponentState to be defined',
      ),
    );
  }

  return sidePanelWorkflowVersionId;
};
