import { type ValidationRuleFieldDescriptor } from 'roster-shared/types';
import {
  compileValidationRuleExpression,
  isNonEmptyString,
} from 'roster-shared/utils';

import { type ValidationRuleFormValues } from '@/validation-rules/types/ValidationRuleFormValues';

export const isValidationRuleFormSubmittable = ({
  values,
  fields,
}: {
  values: ValidationRuleFormValues;
  fields: ValidationRuleFieldDescriptor[];
}): boolean =>
  isNonEmptyString(values.name.trim()) &&
  isNonEmptyString(values.message.trim()) &&
  compileValidationRuleExpression({ expression: values.expression, fields })
    .isValid;
