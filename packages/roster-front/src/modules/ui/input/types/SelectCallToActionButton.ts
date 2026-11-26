import { type MouseEvent } from 'react';
import { type IconComponent } from 'roster-ui/icon';
export type SelectCallToActionButton = {
  text: string;
  onClick: (event: MouseEvent<HTMLElement>) => void;
  Icon?: IconComponent;
};
