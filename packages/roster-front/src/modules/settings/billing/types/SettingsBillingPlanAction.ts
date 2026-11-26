import { type IconComponent } from 'roster-ui/icon';
import {
  type ButtonColor,
  type ButtonVariant,
} from 'roster-ui/primitives/input';

export type SettingsBillingPlanAction = {
  color?: ButtonColor;
  disabled?: boolean;
  Icon?: IconComponent;
  isLoading?: boolean;
  onClick?: () => void;
  title: string;
  variant: ButtonVariant;
};
