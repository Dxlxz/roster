import { type ThemeColor } from 'roster-ui/theme';

export type ApplicationContentFilterOption = {
  universalIdentifier: string;
  label: string;
  icon?: string | null;
  color?: ThemeColor;
};
