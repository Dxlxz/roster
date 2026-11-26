import { matchPath } from 'react-router-dom';
import {
  AppPath,
  StandardObjectNameSingular,
  SidePanelPages,
} from 'roster-shared/types';
import { isDefined } from 'roster-shared/utils';

import { type SidePanelNavigationStackItem } from '@/side-panel/states/sidePanelNavigationStackState';

export const isSidePanelItemShowingAiChat = (
  sidePanelItem: SidePanelNavigationStackItem | undefined,
): boolean => {
  if (!isDefined(sidePanelItem)) {
    return false;
  }

  if (sidePanelItem.page === SidePanelPages.AskAI) {
    return true;
  }

  return (
    sidePanelItem.page === SidePanelPages.RoutedPage &&
    matchPath(AppPath.RecordShowPage, sidePanelItem.routedLocation.pathname)
      ?.params.objectNameSingular === StandardObjectNameSingular.AgentChatThread
  );
};
