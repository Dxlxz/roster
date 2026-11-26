import { type SsoIdentityProviderStatus } from '~/generated-metadata/graphql';
import { type ThemeColor } from 'roster-ui/theme';

export const getColorBySsoIdentityProviderStatus: Record<
  SsoIdentityProviderStatus,
  ThemeColor
> = {
  Active: 'green',
  Inactive: 'gray',
  Error: 'red',
};
