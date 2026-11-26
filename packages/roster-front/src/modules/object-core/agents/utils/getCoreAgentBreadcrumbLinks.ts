import { t } from '@lingui/core/macro';
import { AppPath } from 'roster-shared/types';
import { getAppPath } from 'roster-shared/utils';

import { type BreadcrumbProps } from '@/ui/navigation/bread-crumb/types/BreadcrumbProps';

export const getCoreAgentBreadcrumbLinks = (
  links: BreadcrumbProps['links'] = [],
): BreadcrumbProps['links'] => [
  {
    children: t`Agents`,
    href: getAppPath(AppPath.AgentIndexPage),
  },
  ...links,
];
