import {
  type StepFilter,
  type StepFilterGroup,
  type StepFilterWithPotentiallyDeprecatedOperand,
} from 'roster-shared/types';

export type FilterSettings = {
  stepFilterGroups?: StepFilterGroup[];
  stepFilters?: StepFilter[];
};

export type FilterSettingsWithPotentiallyDeprecatedOperand = {
  stepFilterGroups?: StepFilterGroup[];
  stepFilters?: StepFilterWithPotentiallyDeprecatedOperand[];
};
