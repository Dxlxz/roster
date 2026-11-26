import {
  IconCalendarMonth,
  IconCalendarRepeat,
  IconCalendarWeek,
  type IconComponent,
  IconSun,
} from 'roster-ui/icon';

import { type UsageLimitPeriodUnit } from '@/settings/billing/types/UsageLimitPeriodUnit';

export const USAGE_LIMIT_PERIOD_ICONS: Partial<
  Record<UsageLimitPeriodUnit, IconComponent>
> = {
  day: IconSun,
  week: IconCalendarWeek,
  month: IconCalendarMonth,
  allowancePeriod: IconCalendarRepeat,
};
