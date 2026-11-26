import { type TimelineActivityTypeSnapshot } from 'roster-shared/timeline';

export type TimelineActivityType = TimelineActivityTypeSnapshot & {
  isActive?: boolean;
};
