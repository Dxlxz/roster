import { type CommandMenuItemManifest } from 'roster-shared/application';

export type CommandMenuItemConfig = Omit<
  CommandMenuItemManifest,
  'conditionalAvailabilityExpression'
> & {
  conditionalAvailabilityExpression?: boolean | string;
};
