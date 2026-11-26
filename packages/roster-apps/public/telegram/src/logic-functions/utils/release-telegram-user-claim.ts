import { kv } from 'roster-sdk/logic-function';

import { buildTelegramUserKvKey } from 'src/logic-functions/utils/build-telegram-user-kv-key';

export const releaseTelegramUserClaim = async (
  telegramUserId: string,
): Promise<void> => {
  await kv.delete(buildTelegramUserKvKey(telegramUserId), { scope: 'SERVER' });
};
