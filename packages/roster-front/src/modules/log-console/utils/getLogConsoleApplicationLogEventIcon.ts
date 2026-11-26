import { isNonEmptyString } from '@sniptt/guards';
import {
  IconApps,
  IconBrandTypescript,
  type IconComponent,
} from 'roster-ui/icon';

export const getLogConsoleApplicationLogEventIcon = (
  event: string,
): IconComponent => (isNonEmptyString(event) ? IconBrandTypescript : IconApps);
