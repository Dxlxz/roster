import uniqBy from 'lodash.uniqby';
import { QUERY_MAX_RECORDS } from 'roster-shared/constants';
import { isDefined } from 'roster-shared/utils';

import { type AiChatThreadTargetRecord } from '@/ai-chat/threads/types/AiChatThreadTargetRecord';
import { sortAiChatThreadsByLastActivityDesc } from '@/ai-chat/threads/utils/sortAiChatThreadsByLastActivityDesc';

export const getAiChatThreadsForRecordPage = ({
  links,
  pageSize,
}: {
  links: AiChatThreadTargetRecord[];
  pageSize: number;
}) => ({
  threads: sortAiChatThreadsByLastActivityDesc(
    uniqBy(links.map(({ thread }) => thread).filter(isDefined), 'id'),
  ),
  refetchLimit: Math.min(Math.max(links.length, pageSize), QUERY_MAX_RECORDS),
});
