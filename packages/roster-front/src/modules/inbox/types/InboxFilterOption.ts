import { type IconComponent } from 'roster-ui/icon';

export type InboxFilterOption = {
  key: string;
  label: string;
  Icon: IconComponent;
  count?: number;
  isSelected: boolean;
  onSelect: () => void;
};
