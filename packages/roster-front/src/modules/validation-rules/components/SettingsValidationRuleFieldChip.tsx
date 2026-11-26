import { getChipLabel } from '@/ui/field/display/utils/getChipLabel';
import { styled } from '@linaria/react';
import { useIcons } from 'roster-ui/icon/provider';
import { Chip } from 'roster-ui/primitives/data-display';
import { themeCssVariables, useTheme } from 'roster-ui/theme';

import { type ValidationRuleFieldNodeAttributes } from '@/validation-rules/types/ValidationRuleFieldNodeAttributes';

const StyledWrapper = styled.span`
  display: inline-block;
  font-family: ${themeCssVariables.font.family};
  padding-inline: ${themeCssVariables.spacing[0.5]};
  vertical-align: middle;
  white-space: nowrap;
`;

type SettingsValidationRuleFieldChipProps = ValidationRuleFieldNodeAttributes;

export const SettingsValidationRuleFieldChip = ({
  path,
  label,
  iconName,
}: SettingsValidationRuleFieldChipProps) => {
  const theme = useTheme();
  const { getIcon } = useIcons();

  const Icon = getIcon(iconName);

  return (
    <StyledWrapper>
      <Chip
        variant="soft"
        title={path}
        startElement={<Icon size={theme.icon.size.sm} />}
      >
        {getChipLabel(label).content}
      </Chip>
    </StyledWrapper>
  );
};
