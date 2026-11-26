import { isDefined } from 'roster-shared/utils';
import { IconHash } from 'roster-ui/icon';
import { useIcons } from 'roster-ui/icon/provider';

export const useAiChatChannelIcon = (icon: string | null | undefined) => {
  const { getIcons } = useIcons();

  return (isDefined(icon) ? getIcons()[icon] : undefined) ?? IconHash;
};
