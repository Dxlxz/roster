import { type IconComponent } from 'roster-ui/icon';
import {
  type AvatarProps,
  type AvatarShape,
} from 'roster-ui/primitives/data-display';
import { type Nullable } from 'roster-shared/types';

export type AvatarOrIconProps = Pick<
  AvatarProps,
  'src' | 'name' | 'colorSeed'
> & {
  shape?: Nullable<AvatarShape>;
  Icon?: IconComponent;
  IconColor?: string;
  IconBackgroundColor?: string;
  isIconInverted?: boolean;
  onClick?: () => void;
};
