import {
  type WidgetType,
  type PageLayoutWidgetPosition,
} from 'roster-shared/types';
import { type WidgetConfigurationInput } from 'src/engine/metadata-modules/page-layout/tools/types/widget-configuration-input.type';

export type WidgetIdentifiersInput = {
  title: string;
  type: WidgetType;
  position: PageLayoutWidgetPosition;
  objectMetadataId?: string;
  objectName?: string;
  configuration?: WidgetConfigurationInput;
};
