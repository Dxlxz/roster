import { isNonEmptyString } from '@sniptt/guards';
import { isDefined } from 'roster-shared/utils';

import { isLoopbackHostname } from 'src/engine/core-modules/auth/utils/is-loopback-hostname.util';
import { NodeEnvironment } from 'src/engine/core-modules/roster-config/interfaces/node-environment.interface';
import { type rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';

// Opaque schemes (file:, data:) serialise to "null", which would allowlist every sandboxed document.
const toOrigin = (url: string): string | undefined => {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return undefined;
    }

    return parsedUrl.origin.toLowerCase();
  } catch {
    return undefined;
  }
};

const isLoopbackOrigin = (origin: string): boolean => {
  try {
    return isLoopbackHostname(new URL(origin).hostname);
  } catch {
    return false;
  }
};

type AllowedOriginsSettings = {
  serverUrl: string;
  frontendUrl: string;
  authCookieAllowedOrigins: string;
  nodeEnvironment: NodeEnvironment;
};

let cachedAllowedOriginsSettings: AllowedOriginsSettings | undefined;
let cachedComputedAllowedOrigins: ReadonlySet<string> | undefined;

const isSameAllowedOriginsSettings = (
  allowedOriginsSettings: AllowedOriginsSettings,
  otherAllowedOriginsSettings: AllowedOriginsSettings,
): boolean =>
  allowedOriginsSettings.serverUrl === otherAllowedOriginsSettings.serverUrl &&
  allowedOriginsSettings.frontendUrl ===
    otherAllowedOriginsSettings.frontendUrl &&
  allowedOriginsSettings.authCookieAllowedOrigins ===
    otherAllowedOriginsSettings.authCookieAllowedOrigins &&
  allowedOriginsSettings.nodeEnvironment ===
    otherAllowedOriginsSettings.nodeEnvironment;

const computeAllowedCredentialedOrigins = ({
  serverUrl,
  frontendUrl,
  authCookieAllowedOrigins,
  nodeEnvironment,
}: AllowedOriginsSettings): ReadonlySet<string> => {
  const allowedOrigins = new Set<string>();

  const derivedUrls = [serverUrl, frontendUrl];

  const explicitUrls = authCookieAllowedOrigins
    .split(',')
    .map((allowedOrigin) => allowedOrigin.trim());

  // SERVER_URL defaults to http://localhost:3000, which would hand any local page on that port a credentialed origin.
  const isProduction = nodeEnvironment === NodeEnvironment.PRODUCTION;

  for (const candidateUrl of [...derivedUrls, ...explicitUrls]) {
    if (!isNonEmptyString(candidateUrl)) {
      continue;
    }

    const origin = toOrigin(candidateUrl);

    if (!isNonEmptyString(origin)) {
      continue;
    }

    if (
      isProduction &&
      isLoopbackOrigin(origin) &&
      !explicitUrls.includes(candidateUrl)
    ) {
      continue;
    }

    allowedOrigins.add(origin);
  }

  return allowedOrigins;
};

export const resolveAllowedCredentialedOrigins = (
  rosterConfigService: Pick<rosterConfigService, 'get'>,
): ReadonlySet<string> => {
  const allowedOriginsSettings: AllowedOriginsSettings = {
    serverUrl: rosterConfigService.get('SERVER_URL'),
    frontendUrl: rosterConfigService.get('FRONTEND_URL'),
    authCookieAllowedOrigins: rosterConfigService.get(
      'AUTH_COOKIE_ALLOWED_ORIGINS',
    ),
    nodeEnvironment: rosterConfigService.get('NODE_ENV'),
  };

  if (
    isDefined(cachedAllowedOriginsSettings) &&
    isDefined(cachedComputedAllowedOrigins) &&
    isSameAllowedOriginsSettings(
      cachedAllowedOriginsSettings,
      allowedOriginsSettings,
    )
  ) {
    return cachedComputedAllowedOrigins;
  }

  const allowedOrigins = computeAllowedCredentialedOrigins(
    allowedOriginsSettings,
  );

  cachedAllowedOriginsSettings = allowedOriginsSettings;
  cachedComputedAllowedOrigins = allowedOrigins;

  return allowedOrigins;
};
