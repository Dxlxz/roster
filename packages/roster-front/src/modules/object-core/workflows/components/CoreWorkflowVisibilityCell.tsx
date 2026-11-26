import { isDefined } from 'roster-shared/utils';
import { Tag } from 'roster-ui/primitives/data-display';

import { CORE_WORKFLOW_VISIBILITY_OPTIONS } from '@/object-core/workflows/constants/CoreWorkflowVisibilityOptions';
import { useLingui } from '@lingui/react/macro';

type CoreWorkflowVisibilityCellProps = {
  isPrivate: boolean;
};

export const CoreWorkflowVisibilityCell = ({
  isPrivate,
}: CoreWorkflowVisibilityCellProps) => {
  const { t } = useLingui();
  const visibilityOption = CORE_WORKFLOW_VISIBILITY_OPTIONS.find(
    (option) => option.isPrivate === isPrivate,
  );

  if (!isDefined(visibilityOption)) {
    return null;
  }

  return <Tag color="gray">{t(visibilityOption.label)}</Tag>;
};
