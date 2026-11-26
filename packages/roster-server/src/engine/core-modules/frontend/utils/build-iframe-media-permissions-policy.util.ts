import { MEDIA_CAPABILITIES } from 'roster-shared/constants';
import { type IframeMediaPermission } from 'roster-shared/types';
import { isDefined, normalizeIframeOrigin } from 'roster-shared/utils';

export const buildIframeMediaPermissionsPolicy = (
  permissions: IframeMediaPermission[],
): string => {
  const mediaDirectives = MEDIA_CAPABILITIES.map((capability) => {
    const origins = permissions
      .filter((permission) => permission[capability])
      .map((permission) =>
        normalizeIframeOrigin(permission.origin, { isHttpsOnly: true }),
      )
      .filter(isDefined);
    const allowedOrigins = [...new Set(origins)].map((origin) => `"${origin}"`);

    return `${capability}=(${['self', ...allowedOrigins].join(' ')})`;
  });

  return [...mediaDirectives, 'geolocation=()'].join(', ');
};
