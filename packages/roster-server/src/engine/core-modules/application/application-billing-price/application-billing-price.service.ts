import { Injectable } from '@nestjs/common';

import { isDefined } from 'roster-shared/utils';

import { type ApplicationBillingPriceDTO } from 'src/engine/core-modules/application/dtos/application-billing-price.dto';
import { toApplicationBillingPriceDto } from 'src/engine/core-modules/application/utils/to-application-billing-price-dto.util';
import { collectDeclaredApplicationPrices } from 'src/engine/core-modules/billing/utils/collect-declared-application-prices.util';
import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';
import { WorkspaceCacheService } from 'src/engine/workspace-cache/services/workspace-cache.service';

@Injectable()
export class ApplicationBillingPriceService {
  constructor(
    private readonly rosterConfigService: rosterConfigService,
    private readonly workspaceCacheService: WorkspaceCacheService,
  ) {}

  shouldShowApplicationPrices(): boolean {
    return this.rosterConfigService.isBillingEnabled();
  }

  async findConnectedAccountPrices({
    workspaceId,
    applicationId,
  }: {
    workspaceId: string;
    applicationId: string;
  }): Promise<ApplicationBillingPriceDTO[]> {
    if (!this.shouldShowApplicationPrices()) {
      return [];
    }

    const { flatApplicationMaps } =
      await this.workspaceCacheService.getOrRecompute(workspaceId, [
        'flatApplicationMaps',
      ]);

    const application = flatApplicationMaps.byId[applicationId];

    if (!isDefined(application)) {
      return [];
    }

    return collectDeclaredApplicationPrices({ applications: [application] })
      .filter(({ price }) => price.per === 'CONNECTED_ACCOUNT')
      .map(({ price }) => toApplicationBillingPriceDto(price));
  }
}
