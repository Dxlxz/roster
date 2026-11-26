import { type ReactNode } from 'react';
import { type IconComponent } from 'roster-ui/icon';
import { type Nullable } from 'roster-shared/types';
import { type ShortcutDefinition } from 'roster-ui/primitives/typography';

export type CommandMenuItemProps = {
  label: string;
  description?: string;
  to?: string;
  id: string;
  onClick?: () => void;
  Icon?: IconComponent;
  hotKeys?: Nullable<string[]>;
  shortcut?: ShortcutDefinition;
  LeftComponent?: ReactNode;
  RightComponent?: ReactNode;
  contextualTextPosition?: 'left' | 'right';
  hasSubMenu?: boolean;
  isSubMenuOpened?: boolean;
  disabled?: boolean;
  'aria-controls'?: string;
};
