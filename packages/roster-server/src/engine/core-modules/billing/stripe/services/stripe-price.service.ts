/* @license Enterprise */

import { Injectable, Logger } from '@nestjs/common';

import type Stripe from 'stripe';

import { StripeSDKService } from 'src/engine/core-modules/billing/stripe/stripe-sdk/services/stripe-sdk.service';
import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';

@Injectable()
export class StripePriceService {
  protected readonly logger = new Logger(StripePriceService.name);
  private readonly stripe: Stripe;

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

  async getPriceByPriceId(priceId: string) {
    return await this.stripe.prices.retrieve(priceId, {
      expand: ['currency_options', 'tiers'],
    });
  }

  // Paginates fully: superseded prices stay on the product forever
  async getPricesByProductId(productId: string) {
    const prices: Stripe.Price[] = [];

    for await (const price of this.stripe.prices.list({
      product: productId,
      type: 'recurring',
      limit: 100,
      expand: ['data.currency_options', 'data.tiers'],
    })) {
      prices.push(price);
    }

    return prices;
  }

  async createPrice(params: Stripe.PriceCreateParams): Promise<Stripe.Price> {
    return await this.stripe.prices.create(params);
  }
}
