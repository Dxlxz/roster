import { type FieldConfiguration } from '@/page-layout/types/FieldConfiguration';
import { type ConditionalEvaluationNode } from 'roster-shared/conditional-evaluation';
import { type Nullable } from 'roster-shared/types';
import {
  type FieldsConfiguration,
  type PageLayoutWidget as PageLayoutWidgetGenerated,
  type WidgetConfiguration,
} from '~/generated-metadata/graphql';

export type PageLayoutWidget = Omit<
  PageLayoutWidgetGenerated,
  'objectMetadataId' | 'configuration' | 'conditionalAvailability'
> & {
  objectMetadataId?: Nullable<string>;
  configuration: WidgetConfiguration | FieldsConfiguration | FieldConfiguration;
  conditionalAvailabilityExpression?: Nullable<string>;
  conditionalAvailability?: ConditionalEvaluationNode | null;
};
