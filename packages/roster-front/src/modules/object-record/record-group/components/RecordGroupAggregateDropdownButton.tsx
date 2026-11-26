import { isDropdownOpenComponentState } from '@/ui/layout/dropdown/states/isDropdownOpenComponentState';
import { TooltipDelay } from '@/ui/layout/tooltip/constants/TooltipDelay';
import { useAtomComponentStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomComponentStateValue';
import { type Nullable } from 'roster-shared/types';
import { Dropdown } from 'roster-ui/components/navigation';
import { LightButton } from 'roster-ui/components/input';
import { isDefined } from 'roster-shared/utils';
import { Tooltip } from 'roster-ui/primitives/surfaces';

export const RecordGroupAggregateDropdownButton = ({
  dropdownId,
  value,
  tooltip,
}: {
  dropdownId: string;
  value?: Nullable<string | number>;
  tooltip?: Nullable<string>;
}) => {
  const isDropdownOpen = useAtomComponentStateValue(
    isDropdownOpenComponentState,
    dropdownId,
  );

  return (
    <Tooltip
      content={tooltip ?? ''}
      side="right"
      positionMethod="fixed"
      delay={TooltipDelay.mediumDelay}
      disabled={isDropdownOpen}
    >
      <Dropdown.Trigger id={dropdownId} render={<LightButton />}>
        {isDefined(value) ? value.toString() : '-'}
      </Dropdown.Trigger>
    </Tooltip>
  );
};
