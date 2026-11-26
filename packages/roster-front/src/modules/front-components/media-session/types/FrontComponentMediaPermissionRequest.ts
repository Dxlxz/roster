import { type ApplicationCapability } from 'roster-shared/application';

export type FrontComponentMediaPermissionRequest = {
  capabilities: ApplicationCapability[];
  abortSignal: AbortSignal;
  resolve: (grantedCapabilities: string[] | null) => void;
};
