import { type rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';
import { deriveWebPushVapidKeyPair } from 'src/engine/core-modules/web-push/utils/derive-web-push-vapid-key-pair.util';

const buildConfig = (
  env: Record<string, string>,
): Pick<rosterConfigService, 'get'> => ({
  get: jest.fn((key: string) => env[key]) as never,
});

const TEST_KEY_PAIR = {
  publicKey:
    'BG2MXvwIb38XX30crfuhdfAoCmhBhBtVrdW2_aAlX6PpZiaivqEeBLeQHFwmprgMkAf2nRjWlvCicXt_MBPxegU',
  privateKey: 'eRgp2mJdQH2QDIUqo8pv3fDia3myWIDqTGWbI7_RraI',
};

describe('deriveWebPushVapidKeyPair', () => {
  it('should derive a stable key pair from ENCRYPTION_KEY and SERVER_URL', () => {
    expect(
      deriveWebPushVapidKeyPair({
        rosterConfigService: buildConfig({
          ENCRYPTION_KEY: 'test-encryption-key',
          APP_SECRET: 'app-secret',
          SERVER_URL: 'https://api.roster.dev/',
        }),
      }),
    ).toEqual(TEST_KEY_PAIR);
  });

  it('should fall back to APP_SECRET on legacy instances', () => {
    expect(
      deriveWebPushVapidKeyPair({
        rosterConfigService: buildConfig({
          APP_SECRET: 'test-encryption-key',
          SERVER_URL: 'https://api.roster.dev',
        }),
      }),
    ).toEqual(TEST_KEY_PAIR);
  });

  it('should derive another key pair for another SERVER_URL sharing the same key', () => {
    expect(
      deriveWebPushVapidKeyPair({
        rosterConfigService: buildConfig({
          ENCRYPTION_KEY: 'test-encryption-key',
          SERVER_URL: 'https://staging.roster.dev',
        }),
      }).publicKey,
    ).not.toEqual(TEST_KEY_PAIR.publicKey);
  });
});
