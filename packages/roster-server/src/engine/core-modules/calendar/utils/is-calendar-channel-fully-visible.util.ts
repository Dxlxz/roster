import { CalendarChannelVisibility } from 'roster-shared/types';

export const isCalendarChannelFullyVisible = ({
  visibility,
  isOwnedByCurrentUser,
}: {
  visibility: CalendarChannelVisibility;
  isOwnedByCurrentUser: boolean;
}): boolean =>
  isOwnedByCurrentUser ||
  visibility === CalendarChannelVisibility.SHARE_EVERYTHING;
