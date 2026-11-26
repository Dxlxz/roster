import { type IconComponent } from 'roster-ui/icon';

export type RecordGroupAction = {
  id: string;
  label: string;
  icon: IconComponent;
  position: number;
  callback: () => void;
  condition?: boolean;
  closeOnClick?: boolean;
};
