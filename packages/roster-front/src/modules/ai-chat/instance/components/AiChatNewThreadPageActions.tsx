import { useLingui } from '@lingui/react/macro';
import { Link, useLocation } from 'react-router-dom';
import { AppPath } from 'roster-shared/types';
import { getAppPath } from 'roster-shared/utils';
import { IconButton } from 'roster-ui/components/input';
import { IconHome } from 'roster-ui/icon';

import { AiChatCloseButton } from '@/ai-chat/components/AiChatCloseButton';
import { useDefaultHomePagePath } from '@/navigation/hooks/useDefaultHomePagePath';
import { SidePanelToggleButton } from '@/side-panel/components/SidePanelToggleButton';
import { isInboxPath } from '~/utils/isInboxPath';

export const AiChatNewThreadPageActions = () => {
  const { t } = useLingui();
  const { pathname } = useLocation();
  const { defaultHomePagePath } = useDefaultHomePagePath();

  return (
    <>
      <IconButton
        size="sm"
        variant="outline"
        aria-label={t`Home`}
        nativeButton={false}
        render={<Link to={defaultHomePagePath} />}
      >
        <IconHome />
      </IconButton>
      <AiChatCloseButton
        destinationPath={
          isInboxPath(pathname)
            ? getAppPath(AppPath.AiChatInbox, { threadId: null })
            : undefined
        }
      />
      <SidePanelToggleButton />
    </>
  );
};
