import { useLingui } from '@lingui/react/macro';
import { useId } from 'react';
import { isDefined } from 'roster-shared/utils';
import { IconButton } from 'roster-ui/components/input';
import { Dropdown } from 'roster-ui/components/navigation';
import { IconFilter } from 'roster-ui/icon';

import { type InboxFilterOption } from '@/inbox/types/InboxFilterOption';
import { useNumberFormat } from '@/localization/hooks/useNumberFormat';
import { DropdownContent } from '@/ui/layout/dropdown/components/DropdownContent';
import { DropdownRoot } from '@/ui/layout/dropdown/components/DropdownRoot';

type InboxFilterDropdownProps = {
  options: InboxFilterOption[];
  isFiltered: boolean;
};

export const InboxFilterDropdown = ({
  options,
  isFiltered,
}: InboxFilterDropdownProps) => {
  const { t } = useLingui();
  const instanceId = useId();
  const { formatNumber } = useNumberFormat();

  return (
    <DropdownRoot dropdownId={`ai-chat-inbox-filter-${instanceId}`} type="menu">
      <Dropdown.Trigger
        render={
          <IconButton
            size="sm"
            variant="outline"
            color={isFiltered ? 'accent' : 'neutral'}
            aria-label={t`Filter chats`}
          >
            <IconFilter />
          </IconButton>
        }
      />
      <DropdownContent align="end" aria-label={t`Filter chats`}>
        <Dropdown.Section>
          {options.map(({ key, label, Icon, count, isSelected, onSelect }) => (
            <Dropdown.OptionItem
              key={key}
              startIcon={<Icon />}
              description={
                isDefined(count) && count > 0 ? formatNumber(count) : undefined
              }
              selected={isSelected}
              onSelect={onSelect}
            >
              {label}
            </Dropdown.OptionItem>
          ))}
        </Dropdown.Section>
      </DropdownContent>
    </DropdownRoot>
  );
};
