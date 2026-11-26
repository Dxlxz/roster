import { isNonEmptyString } from '@sniptt/guards';
import { isDefined, isNonEmptyArray } from 'roster-shared/utils';
import { Dropdown } from 'roster-ui/components/navigation';
import { IconPlus } from 'roster-ui/icon';
import { type SelectOption } from 'roster-ui/primitives/input';
import { useLingui } from '@lingui/react/macro';

type AddSelectOptionDropdownSectionProps = {
  searchFilter: string;
  filteredOptions: SelectOption[];
  onAddSelectOption?: (optionName: string) => void;
  isExistingOptionName?: (optionName: string) => boolean;
};

export const AddSelectOptionDropdownSection = ({
  searchFilter,
  filteredOptions,
  onAddSelectOption,
  isExistingOptionName,
}: AddSelectOptionDropdownSectionProps) => {
  const { t } = useLingui();
  const optionName = searchFilter.trim();

  if (
    !isDefined(onAddSelectOption) ||
    !isNonEmptyString(optionName) ||
    isNonEmptyArray(filteredOptions) ||
    isExistingOptionName?.(optionName)
  ) {
    return null;
  }

  return (
    <>
      <Dropdown.Separator />
      <Dropdown.Section>
        <Dropdown.ActionItem
          onClick={() => onAddSelectOption(optionName)}
          closeOnClick={false}
          startIcon={<IconPlus />}
        >
          {t`Add "${optionName}" to options`}
        </Dropdown.ActionItem>
      </Dropdown.Section>
    </>
  );
};
