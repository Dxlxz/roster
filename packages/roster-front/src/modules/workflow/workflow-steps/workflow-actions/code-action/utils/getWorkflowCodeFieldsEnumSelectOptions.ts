import { isNonEmptyArray } from '@sniptt/guards';
import { isDefined } from 'roster-shared/utils';
import { type InputSchemaProperty } from 'roster-shared/workflow';
import { type SelectOption } from 'roster-ui/primitives/input';

export const getWorkflowCodeFieldsEnumSelectOptions = (
  property: InputSchemaProperty | undefined,
): SelectOption[] => {
  if (!isDefined(property) || !isNonEmptyArray(property.enum)) {
    return [];
  }

  return property.enum.map((value) => ({
    value,
    label: value,
  }));
};
