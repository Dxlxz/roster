import { type MessageDescriptor } from '@lingui/core';
import { type IconComponent } from 'roster-ui/icon';
import { type ThemeColor } from 'roster-ui/theme';

import { type ApplicationContentColumn } from '@/settings/applications/types/ApplicationContentColumn';
import { type ApplicationContentFilterKey } from '@/settings/applications/types/ApplicationContentFilterKey';

export type ApplicationContentTypeConfig = {
  label: MessageDescriptor;
  description: MessageDescriptor;
  Icon: IconComponent;
  columns: ApplicationContentColumn[];
  filters?: ApplicationContentFilterKey[];
  tags?: Record<string, { label: MessageDescriptor; color: ThemeColor }>;
};
