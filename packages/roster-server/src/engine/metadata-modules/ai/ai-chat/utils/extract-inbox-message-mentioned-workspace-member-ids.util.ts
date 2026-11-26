import { extractRecordReferenceIds } from 'roster-shared/ai';
import { getMarkdownTextChatReferences } from 'roster-shared/markdown';

export const extractInboxMessageMentionedWorkspaceMemberIds = (
  text: string,
): string[] =>
  extractRecordReferenceIds({
    text: getMarkdownTextChatReferences(text)
      .map(({ fullMatch }) => fullMatch)
      .join('\n'),
    objectNameSingular: 'workspaceMember',
  });
