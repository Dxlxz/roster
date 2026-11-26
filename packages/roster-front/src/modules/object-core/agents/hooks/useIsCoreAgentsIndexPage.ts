import { matchPath, useLocation } from 'react-router-dom';
import { AppPath } from 'roster-shared/types';
import { isDefined } from 'roster-shared/utils';

export const useIsCoreAgentsIndexPage = () => {
  const location = useLocation();

  return isDefined(matchPath(AppPath.AgentIndexPage, location.pathname));
};
