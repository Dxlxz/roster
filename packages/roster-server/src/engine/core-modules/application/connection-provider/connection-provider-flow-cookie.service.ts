import { Injectable } from '@nestjs/common';

import { randomUUID } from 'crypto';

import { isNonEmptyString } from '@sniptt/guards';
import { type CookieOptions, type Request, type Response } from 'express';

import {
  CONNECTION_PROVIDER_FLOW_COOKIE_NAME,
  CONNECTION_PROVIDER_FLOW_SECURE_COOKIE_NAME,
} from 'src/engine/core-modules/application/connection-provider/constants/connection-provider-flow-cookie-name.constant';
import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';
import { isSecureCookieDeployment } from 'src/engine/core-modules/user-session/utils/is-secure-cookie-deployment.util';
import { readCookieValue } from 'src/engine/core-modules/user-session/utils/read-cookie-value.util';

const FLOW_COOKIE_MAX_AGE_MS = 10 * 60 * 1000;
const MAX_CONCURRENT_FLOWS = 5;
const NONCE_SEPARATOR = '.';

@Injectable()
export class ConnectionProviderFlowCookieService {
  constructor(private readonly rosterConfigService: rosterConfigService) {}

  attachBrowserNonce({
    request,
    response,
  }: {
    request: Request;
    response: Response;
  }): string {
    const browserNonce = randomUUID();
    const browserNonces = [
      ...this.readBrowserNonces(request),
      browserNonce,
    ].slice(-MAX_CONCURRENT_FLOWS);

    response.cookie(
      this.resolveCookieName(),
      browserNonces.join(NONCE_SEPARATOR),
      { ...this.resolveCookieOptions(), maxAge: FLOW_COOKIE_MAX_AGE_MS },
    );

    return browserNonce;
  }

  readBrowserNonces(request: Request): string[] {
    const cookieHeader = request.headers.cookie;
    const cookieValue = isNonEmptyString(cookieHeader)
      ? readCookieValue({ cookieHeader, cookieName: this.resolveCookieName() })
      : undefined;

    return cookieValue?.split(NONCE_SEPARATOR).filter(Boolean) ?? [];
  }

  private isSecureDeployment(): boolean {
    return isSecureCookieDeployment({
      serverUrl: this.rosterConfigService.get('SERVER_URL'),
      sameSite: this.rosterConfigService.get('AUTH_COOKIE_SAME_SITE'),
    });
  }

  private resolveCookieName(): string {
    return this.isSecureDeployment()
      ? CONNECTION_PROVIDER_FLOW_SECURE_COOKIE_NAME
      : CONNECTION_PROVIDER_FLOW_COOKIE_NAME;
  }

  private resolveCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: this.isSecureDeployment(),
      sameSite: 'lax',
      path: '/',
    };
  }
}
