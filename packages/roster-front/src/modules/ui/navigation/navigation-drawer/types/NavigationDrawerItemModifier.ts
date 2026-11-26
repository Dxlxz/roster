import { type ShortcutDefinition } from 'roster-ui/primitives/typography';

export type NavigationDrawerItemModifier =
  | 'soon'
  | 'new'
  | { keyboard: ShortcutDefinition };
