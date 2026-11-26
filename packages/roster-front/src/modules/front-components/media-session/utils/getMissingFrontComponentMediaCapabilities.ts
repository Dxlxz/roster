import { type MediaSessionMediaType } from 'roster-front-component-renderer';
import { type ApplicationCapability } from 'roster-shared/application';

export const getMissingFrontComponentMediaCapabilities = ({
  grantedCapabilities,
  mediaTypes,
}: {
  grantedCapabilities: string[];
  mediaTypes: MediaSessionMediaType[];
}): ApplicationCapability[] => {
  const requestedCapabilities: ApplicationCapability[] = [];

  if (mediaTypes.includes('audio')) {
    requestedCapabilities.push('microphone');
  }

  if (mediaTypes.includes('video')) {
    requestedCapabilities.push('camera');
  }

  return requestedCapabilities.filter(
    (capability) => !grantedCapabilities.includes(capability),
  );
};
