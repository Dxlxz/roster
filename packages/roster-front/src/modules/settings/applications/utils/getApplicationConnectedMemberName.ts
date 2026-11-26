import { type SettingsApplicationConnectedMember } from '@/settings/applications/types/SettingsApplicationConnectedMember';
import { t } from '@lingui/core/macro';
import { isDefined } from 'roster-shared/utils';
import { getWorkspaceMemberNameOrEmail } from 'roster-shared/workspace';

export const getApplicationConnectedMemberName = ({
  workspaceMember,
}: Pick<SettingsApplicationConnectedMember, 'workspaceMember'>): string =>
  isDefined(workspaceMember)
    ? getWorkspaceMemberNameOrEmail(workspaceMember)
    : t`Unknown user`;
