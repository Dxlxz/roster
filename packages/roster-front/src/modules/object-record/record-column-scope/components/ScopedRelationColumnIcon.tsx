import { StackIcon } from 'roster-ui/components/data-display';
import { IconStack2, type IconComponent } from 'roster-ui/icon';
import { Avatar } from 'roster-ui/primitives/data-display';
import { useTheme } from 'roster-ui/theme';

type ScopedRelationColumnIconProps = {
  Icon: IconComponent;
};

export const ScopedRelationColumnIcon = ({
  Icon,
}: ScopedRelationColumnIconProps) => {
  const theme = useTheme();

  return (
    <StackIcon
      icon={<Icon size={theme.icon.size.md} stroke={theme.icon.stroke.sm} />}
      stackedIcon={
        <Avatar
          size="xs"
          variant="outline"
          color={theme.font.color.secondary}
          backgroundColor={theme.background.primary}
          borderColor={theme.border.color.medium}
          fallbackProps={{ children: <IconStack2 /> }}
        />
      }
    />
  );
};
