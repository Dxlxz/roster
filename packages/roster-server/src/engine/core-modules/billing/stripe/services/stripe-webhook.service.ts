/* @license Enterprise */

import { Injectable, Logger } from '@nestjs/common';

import type Stripe from 'stripe';

import { StripeSDKService } from 'src/engine/core-modules/billing/stripe/stripe-sdk/services/stripe-sdk.service';
import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';
@Injectable()
export class StripeWebhookService {
  protected readonly logger = new Logger(StripeWebhookService.name);
  private stripe: Stripe;

  constructor(
    private readonly rosterConfigService: rosterConfigService,
    private readonly stripeSDKService: StripeSDKService,
  ) {
    if (!this.rosterConfigService.get('IS_BILLING_ENABLED')) {
      return;
    }
    this.stripe = this.stripeSDKService.getStripe(
      this.rosterConfigService.get('BILLING_STRIPE_API_KEY'),
    );
  }

  constructEventFromPayload(signature: string, payload: Buffer) {
    const webhookSecret = this.rosterConfigService.get(
      'BILLING_STRIPE_WEBHOOK_SECRET',
    );

    const returnValue = this.stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret,
    );

    return returnValue;
  }
}
