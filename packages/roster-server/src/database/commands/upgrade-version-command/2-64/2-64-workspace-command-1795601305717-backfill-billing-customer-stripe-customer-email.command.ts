/* @license Enterprise */

import { InjectDataSource } from '@nestjs/typeorm';

import { isNonEmptyString } from '@sniptt/guards';
import { Command } from 'nest-commander';
import { isDefined } from 'roster-shared/utils';
import { DataSource } from 'typeorm';

import { ProvisionedWorkspaceCommandRunner } from 'src/database/commands/command-runners/provisioned-workspace.command-runner';
import { WorkspaceIteratorService } from 'src/database/commands/command-runners/workspace-iterator.service';
import { type RunOnWorkspaceArgs } from 'src/database/commands/command-runners/workspace.command-runner';
import { StripeCustomerService } from 'src/engine/core-modules/billing/stripe/services/stripe-customer.service';
import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';
import { RegisteredWorkspaceCommand } from 'src/engine/core-modules/upgrade/decorators/registered-workspace-command.decorator';

@RegisteredWorkspaceCommand('2.64.0', 1795601305717)
@Command({
  name: 'upgrade:2-64:backfill-billing-customer-stripe-customer-email',
  description:
    'Backfill billingCustomer.stripeCustomerEmail from the Stripe customer email',
})
export class BackfillBillingCustomerStripeCustomerEmailCommand extends ProvisionedWorkspaceCommandRunner {
  constructor(
    protected readonly workspaceIteratorService: WorkspaceIteratorService,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly stripeCustomerService: StripeCustomerService,
    private readonly rosterConfigService: rosterConfigService,
  ) {
    super(workspaceIteratorService);
  }

  override async runOnWorkspace({
    workspaceId,
    options,
  }: RunOnWorkspaceArgs): Promise<void> {
    if (!this.rosterConfigService.isBillingEnabled()) {
      return;
    }

    const [billingCustomer]: { stripeCustomerId: string }[] =
      await this.dataSource.query(
        `SELECT "stripeCustomerId" FROM "core"."billingCustomer"
         WHERE "workspaceId" = $1
           AND "stripeCustomerEmail" IS NULL`,
        [workspaceId],
      );

    if (!isDefined(billingCustomer)) {
      return;
    }

    const { email } =
      await this.stripeCustomerService.getCustomerPartnerAndEmail(
        billingCustomer.stripeCustomerId,
      );

    if (!isNonEmptyString(email)) {
      this.logger.log(
        `No Stripe customer email for workspace ${workspaceId}, skipping`,
      );

      return;
    }

    this.logger.log(
      `${options.dryRun ? '[DRY RUN] Would backfill' : 'Backfilling'} stripeCustomerEmail of workspace ${workspaceId}`,
    );

    if (options.dryRun) {
      return;
    }

    await this.dataSource.query(
      `UPDATE "core"."billingCustomer"
       SET "stripeCustomerEmail" = $2
       WHERE "workspaceId" = $1
         AND "stripeCustomerEmail" IS NULL`,
      [workspaceId, email],
    );
  }
}
