import { getChipLabel } from '@/ui/field/display/utils/getChipLabel';
import { LinkChip } from '@/ui/navigation/link/components/LinkChip/LinkChip';
import { SettingsPath } from 'roster-shared/types';
import { getSettingsPath } from 'roster-shared/utils';
import { useIcons } from 'roster-ui/icon/provider';
import { useTheme } from 'roster-ui/theme';

import { DEFAULT_SKILL_ICON } from '@/skill-suggestion/constants/DefaultSkillIcon';

type SkillReferenceChipProps = {
  skillId: string;
  label: string;
  icon: string | null;
};

export const SkillReferenceChip = ({
  skillId,
  label,
  icon,
}: SkillReferenceChipProps) => {
  const theme = useTheme();
  const { getIcon } = useIcons();
  const Icon = getIcon(icon ?? DEFAULT_SKILL_ICON);

  return (
    <LinkChip
      to={getSettingsPath(SettingsPath.AiSkillDetail, { skillId })}
      variant="soft"
      startElement={
        <Icon size={theme.icon.size.sm} stroke={theme.icon.stroke.sm} />
      }
    >
      {getChipLabel(label).content}
    </LinkChip>
  );
};
