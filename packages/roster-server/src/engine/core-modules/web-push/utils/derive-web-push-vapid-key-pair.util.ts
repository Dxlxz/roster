import { createECDH } from 'crypto';

import { deriveInstanceHmacKey } from 'src/engine/core-modules/secret-encryption/utils/derive-instance-hmac-key.util';
import { resolveEncryptionKeysOrThrow } from 'src/engine/core-modules/secret-encryption/utils/resolve-encryption-keys-or-throw.util';
import { type rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';

export const deriveWebPushVapidKeyPair = ({
  rosterConfigService,
}: {
  rosterConfigService: Pick<rosterConfigService, 'get'>;
}): { publicKey: string; privateKey: string } => {
  const { primary } = resolveEncryptionKeysOrThrow({
    environmentConfigDriver: rosterConfigService,
  });
  const serverOrigin = new URL(rosterConfigService.get('SERVER_URL')).origin;
  const privateKey = deriveInstanceHmacKey({
    rawKey: primary,
    purpose: `web-push-vapid:${serverOrigin}`,
  });
  const ecdh = createECDH('prime256v1');

  ecdh.setPrivateKey(privateKey);

  return {
    publicKey: ecdh.getPublicKey('base64url'),
    privateKey: privateKey.toString('base64url'),
  };
};
