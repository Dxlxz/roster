import {
  type ExtendedUIMessage,
  type ExtendedUIMessagePart,
} from 'roster-shared/ai';

type ThreadTitleDataPart = Extract<
  ExtendedUIMessagePart,
  { type: 'data-thread-title' }
>;

const isThreadTitleDataPart = (
  part: ExtendedUIMessagePart,
): part is ThreadTitleDataPart => part.type === 'data-thread-title';

export const getAiChatMessageThreadTitle = (message: ExtendedUIMessage) =>
  message.parts.find(isThreadTitleDataPart)?.data.title;
