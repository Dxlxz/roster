import { type IconComponent } from 'roster-ui/icon';

export type PermissionSummaryItem = {
  Icon: IconComponent;
  label: string;
  emphasis?: string;
  details?: {
    title: string;
    items: string[];
  };
};
