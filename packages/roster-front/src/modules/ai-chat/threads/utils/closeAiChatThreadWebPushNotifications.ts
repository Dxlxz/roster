import { getAgentChatWebPushNotificationTag } from 'roster-shared/ai';
import { isDefined } from 'roster-shared/utils';

export const closeAiChatThreadWebPushNotifications = async (
  threadIds: string[],
) => {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  const registration = await navigator.serviceWorker.getRegistration();

  if (!isDefined(registration)) {
    return;
  }

  const notifications = await Promise.all(
    threadIds.map((threadId) =>
      registration.getNotifications({
        tag: getAgentChatWebPushNotificationTag(threadId),
      }),
    ),
  );

  notifications.flat().forEach((notification) => notification.close());
};
