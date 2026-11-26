import { PassportStrategy } from '@nestjs/passport';

import { Strategy, type VerifyCallback } from 'passport-google-oauth20';

import { getGoogleApisOauthScopes } from 'src/engine/core-modules/auth/utils/get-google-apis-oauth-scopes';
import { type rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';

export type GoogleApiScopeConfig = {
  isCalendarEnabled?: boolean;
  isMessagingAliasFetchingEnabled?: boolean;
};

export abstract class GoogleAPIsOauthCommonStrategy extends PassportStrategy(
  Strategy,
  'google-apis',
) {
  constructor(rosterConfigService: rosterConfigService) {
    const scopes = getGoogleApisOauthScopes();

    super({
      clientID: rosterConfigService.get('AUTH_GOOGLE_CLIENT_ID'),
      clientSecret: rosterConfigService.get('AUTH_GOOGLE_CLIENT_SECRET'),
      callbackURL: rosterConfigService.get('AUTH_GOOGLE_APIS_CALLBACK_URL'),
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
