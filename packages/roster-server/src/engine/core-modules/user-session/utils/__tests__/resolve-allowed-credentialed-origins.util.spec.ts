import { ConfigVariables } from 'src/engine/core-modules/roster-config/config-variables';
import { NodeEnvironment } from 'src/engine/core-modules/roster-config/interfaces/node-environment.interface';
import { type rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';
import { resolveAllowedCredentialedOrigins } from 'src/engine/core-modules/user-session/utils/resolve-allowed-credentialed-origins.util';

type AllowedOriginsConfigVariables = Pick<
  ConfigVariables,
  'SERVER_URL' | 'FRONTEND_URL' | 'AUTH_COOKIE_ALLOWED_ORIGINS' | 'NODE_ENV'
>;

const PRODUCTION_CONFIG_VARIABLES: AllowedOriginsConfigVariables = {
  SERVER_URL: 'https://api.roster.dev',
  FRONTEND_URL: 'https://app.roster.dev',
  AUTH_COOKIE_ALLOWED_ORIGINS: '',
  NODE_ENV: NodeEnvironment.PRODUCTION,
};

const buildrosterConfigService = (
  allowedOriginsConfigVariables: AllowedOriginsConfigVariables,
): Pick<rosterConfigService, 'get'> => {
  const configVariables = Object.assign(
    new ConfigVariables(),
    allowedOriginsConfigVariables,
  );

  return {
    get: (key) => configVariables[key],
  };
};

describe('resolveAllowedCredentialedOrigins', () => {
  it('should allow the server, frontend and explicit origins', () => {
    const allowedOrigins = resolveAllowedCredentialedOrigins(
      buildrosterConfigService({
        ...PRODUCTION_CONFIG_VARIABLES,
        SERVER_URL: 'https://api.roster.dev/graphql',
        FRONTEND_URL: 'https://App.roster.dev',
        AUTH_COOKIE_ALLOWED_ORIGINS: ' https://other.example , file:///tmp',
      }),
    );

    expect([...allowedOrigins]).toEqual([
      'https://api.roster.dev',
      'https://app.roster.dev',
      'https://other.example',
    ]);
  });

  it('should skip derived loopback origins in production only', () => {
    const loopbackConfigVariables: AllowedOriginsConfigVariables = {
      SERVER_URL: 'http://localhost:3000',
      FRONTEND_URL: 'http://localhost:3001',
      AUTH_COOKIE_ALLOWED_ORIGINS: 'http://localhost:3001',
      NODE_ENV: NodeEnvironment.PRODUCTION,
    };

    const productionAllowedOrigins = resolveAllowedCredentialedOrigins(
      buildrosterConfigService(loopbackConfigVariables),
    );
    const developmentAllowedOrigins = resolveAllowedCredentialedOrigins(
      buildrosterConfigService({
        ...loopbackConfigVariables,
        NODE_ENV: NodeEnvironment.DEVELOPMENT,
      }),
    );

    expect([...productionAllowedOrigins]).toEqual(['http://localhost:3001']);
    expect([...developmentAllowedOrigins]).toEqual([
      'http://localhost:3000',
      'http://localhost:3001',
    ]);
  });

  it('should reuse the resolved origins while the config is unchanged', () => {
    const rosterConfigService = buildrosterConfigService(
      PRODUCTION_CONFIG_VARIABLES,
    );

    expect(resolveAllowedCredentialedOrigins(rosterConfigService)).toBe(
      resolveAllowedCredentialedOrigins(rosterConfigService),
    );
  });

  it('should resolve the origins again when the config changes', () => {
    const allowedOriginsBeforeChange = resolveAllowedCredentialedOrigins(
      buildrosterConfigService(PRODUCTION_CONFIG_VARIABLES),
    );
    const allowedOriginsAfterChange = resolveAllowedCredentialedOrigins(
      buildrosterConfigService({
        ...PRODUCTION_CONFIG_VARIABLES,
        AUTH_COOKIE_ALLOWED_ORIGINS: 'https://other.example',
      }),
    );

    expect(allowedOriginsAfterChange).not.toBe(allowedOriginsBeforeChange);
    expect(allowedOriginsBeforeChange.has('https://other.example')).toBe(false);
    expect(allowedOriginsAfterChange.has('https://other.example')).toBe(true);
  });
});
