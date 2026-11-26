import { isDefined } from 'roster-shared/utils';

export const getIsFirstChatMessageOfDayByIndex = (
  dayKeys: (string | undefined)[],
): boolean[] => {
  let lastDayKey: string | undefined;

  return dayKeys.map((dayKey) => {
    if (!isDefined(dayKey) || dayKey === lastDayKey) {
      return false;
    }

    lastDayKey = dayKey;

    return true;
  });
};
