import { Injectable } from '@nestjs/common';

import { type Request } from 'express';
import {
  type AuthenticateOptionsGoogle,
  type VerifyCallback,
} from 'passport-google-oauth20';

import { GoogleAPIsOauthCommonStrategy } from 'src/engine/core-modules/auth/strategies/google-apis-oauth-common.auth.strategy';
import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';

export type GoogleApiScopeConfig = {
  isCalendarEnabled?: boolean;
  isMessagingAliasFetchingEnabled?: boolean;
};

@Injectable()
export class GoogleAPIsOauthRequestCodeStrategy extends GoogleAPIsOauthCommonStrategy {
  constructor(rosterConfigService: rosterConfigService) {
    super(rosterConfigService);
  }

  authenticate(req: Request, options: AuthenticateOptionsGoogle) {
    options = {
      ...options,
      accessType: 'offline',
      prompt: 'consent',
      loginHint: req.params.loginHint,
      state: JSON.stringify({
        transientToken: req.params.transientToken,
        redirectLocation: req.params.redirectLocation,
        calendarVisibility: req.params.calendarVisibility,
        messageVisibility: req.params.messageVisibility,
        skipMessageChannelConfiguration:
          req.params.skipMessageChannelConfiguration,
      }),
    };

    return super.authenticate(req, options);
  }

  async validate(
    _request: Express.Request,
    _accessToken: string,
    _refreshToken: string,
    _profile: unknown,
    done: VerifyCallback,
  ): Promise<void> {
    // Only used to request an authorization code
    done(null, {});
  }
}
