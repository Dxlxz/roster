import { type IconComponent } from 'roster-ui/icon';
import { Tag } from 'roster-ui/primitives/data-display';
import { type ThemeColor } from 'roster-ui/theme';
import { isDefined } from 'roster-shared/utils';

type SelectDisplayProps = {
  color: ThemeColor | 'transparent';
  label: string;
  Icon?: IconComponent;
};

export const SelectDisplay = ({ color, label, Icon }: SelectDisplayProps) => (
  <Tag
    truncate={false}
    color={color}
    startIcon={isDefined(Icon) ? <Icon /> : undefined}
  >
    {label}
  </Tag>
);
