import { SidePanelPages } from 'roster-shared/types';
import { isDefined } from 'roster-shared/utils';

import { HeadlessEngineCommandWrapperEffect } from '@/command-menu-item/engine-command/components/HeadlessEngineCommandWrapperEffect';
import { useHeadlessCommandContextApi } from '@/command-menu-item/engine-command/hooks/useHeadlessCommandContextApi';
import { useOpenAiChatParticipantsInSidePanel } from '@/side-panel/hooks/useOpenAiChatParticipantsInSidePanel';

export const ManageAiChatParticipantsCommand = () => {
  const { selectedRecords } = useHeadlessCommandContextApi();
  const { openAiChatParticipantsInSidePanel } =
    useOpenAiChatParticipantsInSidePanel();

  const handleExecute = () => {
    const [thread] = selectedRecords;

    if (isDefined(thread)) {
      openAiChatParticipantsInSidePanel({
        threadId: thread.id,
        page: SidePanelPages.AiChatParticipants,
      });
    }
  };

  return <HeadlessEngineCommandWrapperEffect execute={handleExecute} />;
};
