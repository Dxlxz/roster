import { type AvatarShape } from 'roster-ui/primitives/data-display';
import { type IconComponent } from 'roster-ui/icon';

export type SelectableItem<T = object> = T & {
  id: string;
  name: string;
  avatarUrl?: string;
  avatarShape?: AvatarShape;
  AvatarIcon?: IconComponent;
  isSelected: boolean;
  isIconInverted?: boolean;
};
