import { AppPath } from 'roster-shared/types';

import { isMatchingPathname } from '~/utils/isMatchingPathname';

export const isInboxPath = (pathname: string) =>
  isMatchingPathname(pathname, AppPath.AiChatInbox);
