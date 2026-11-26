import { Injectable } from '@nestjs/common';

import { buildUrlWithPathnameAndSearchParams } from 'src/engine/core-modules/domain/domain-server-config/utils/build-url-with-pathname-and-search-params.util';
import { getSubdomainAndCustomDomainFromHostname } from 'src/engine/core-modules/domain/domain-server-config/utils/get-subdomain-and-custom-domain-from-hostname.util';
import { getHostnameFromUrlOrUndefined } from 'src/engine/core-modules/domain/domain-server-config/utils/public-function-domain.util';
import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';

@Injectable()
export class DomainServerConfigService {
  constructor(private readonly rosterConfigService: rosterConfigService) {}

  getFrontUrl() {
    return new URL(
      this.rosterConfigService.get('FRONTEND_URL') ??
        this.rosterConfigService.get('SERVER_URL'),
    );
  }

  getBaseUrl(): URL {
    const baseUrl = this.getFrontUrl();

    if (
      this.rosterConfigService.get('IS_MULTIWORKSPACE_ENABLED') &&
      this.rosterConfigService.get('DEFAULT_SUBDOMAIN')
    ) {
      baseUrl.hostname = `${this.rosterConfigService.get('DEFAULT_SUBDOMAIN')}.${baseUrl.hostname}`;
    }

    return baseUrl;
  }

  getPublicDomainUrl(): URL {
    return new URL(this.rosterConfigService.get('PUBLIC_DOMAIN_URL'));
  }

  getPublicBaseHostnameOrUndefined(): string | undefined {
    return getHostnameFromUrlOrUndefined(
      this.rosterConfigService.get('PUBLIC_DOMAIN_URL'),
    );
  }

  buildBaseUrl({
    pathname,
    searchParams,
    hash,
  }: {
    pathname?: string;
    searchParams?: Record<string, string | number>;
    hash?: string;
  }) {
    return buildUrlWithPathnameAndSearchParams({
      baseUrl: this.getBaseUrl(),
      pathname,
      searchParams,
      hash,
    });
  }

  getSubdomainAndCustomDomainFromUrl = (url: string) =>
    getSubdomainAndCustomDomainFromHostname({
      hostname: new URL(url).hostname,
      frontDomain: this.getFrontUrl().hostname,
      publicBaseDomain: this.getPublicBaseHostnameOrUndefined(),
      defaultSubdomain: this.rosterConfigService.get('DEFAULT_SUBDOMAIN'),
    });
}
