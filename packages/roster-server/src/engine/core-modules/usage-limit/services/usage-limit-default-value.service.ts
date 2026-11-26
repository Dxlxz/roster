import { Injectable } from '@nestjs/common';

import { isUndefined } from '@sniptt/guards';
import { isDefined } from 'roster-shared/utils';

import { BillingCreditAllowanceService } from 'src/engine/core-modules/billing/services/billing-credit-allowance.service';
import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';
import { type OptionalNumericConfigVariableKey } from 'src/engine/core-modules/roster-config/types/optional-numeric-config-variable-key.type';
import { getPlanLimitDefaultValue } from 'src/engine/core-modules/usage-limit/utils/get-plan-limit-default-value.util';

@Injectable()
export class UsageLimitDefaultValueService {
  constructor(
    private readonly billingCreditAllowanceService: BillingCreditAllowanceService,
    private readonly rosterConfigService: rosterConfigService,
  ) {}

  async findDefaultLimitValue({
    workspaceId,
    limitValueConfigVariable,
  }: {
    workspaceId: string;
    limitValueConfigVariable: OptionalNumericConfigVariableKey;
  }): Promise<number | null> {
    const instanceValue =
      this.rosterConfigService.get(limitValueConfigVariable) ?? null;

    const usageLimitDefaultsByPlan = this.rosterConfigService.get(
      'USAGE_LIMIT_DEFAULTS_BY_PLAN',
    );

    const isSetByAPlan = Object.values(usageLimitDefaultsByPlan).some(
      (planUsageLimitDefaults) =>
        !isUndefined(planUsageLimitDefaults[limitValueConfigVariable]),
    );

    if (!isSetByAPlan) {
      return instanceValue;
    }

    const subscriptionPlan =
      await this.billingCreditAllowanceService.getSubscriptionPlan(workspaceId);

    if (!isDefined(subscriptionPlan)) {
      return instanceValue;
    }

    return getPlanLimitDefaultValue({
      usageLimitDefaultsByPlan,
      planKey: subscriptionPlan.planKey,
      isTrialing: subscriptionPlan.isTrialing,
      limitValueConfigVariable,
      instanceValue,
    });
  }
}
