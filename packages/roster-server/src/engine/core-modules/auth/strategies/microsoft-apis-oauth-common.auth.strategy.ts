import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-microsoft';
import { type VerifyCallback } from 'passport-google-oauth20';

import { getMicrosoftApisOauthScopes } from 'src/engine/core-modules/auth/utils/get-microsoft-apis-oauth-scopes';
import { type rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';

export type MicrosoftApiScopeConfig = {
  isCalendarEnabled?: boolean;
  isMessagingAliasFetchingEnabled?: boolean;
};

export abstract class MicrosoftAPIsOauthCommonStrategy extends PassportStrategy(
  Strategy,
  'microsoft-apis',
) {
  constructor(rosterConfigService: rosterConfigService) {
    const scopes = getMicrosoftApisOauthScopes();

    super({
      clientID: rosterConfigService.get('AUTH_MICROSOFT_CLIENT_ID'),
      clientSecret: rosterConfigService.get('AUTH_MICROSOFT_CLIENT_SECRET'),
      tenant: 'common',
      callbackURL: rosterConfigService.get('AUTH_MICROSOFT_APIS_CALLBACK_URL'),
      scope: scopes,
      passReqToCallback: true,
    });
  }

  abstract validate(
    request: Express.Request,
    accessToken: string,
    refreshToken: string,
    profile: unknown,
    done: VerifyCallback,
  ): Promise<void>;
}
