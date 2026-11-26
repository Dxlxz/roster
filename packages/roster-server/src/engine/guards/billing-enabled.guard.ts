import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';

@Injectable()
export class BillingEnabledGuard implements CanActivate {
  constructor(private readonly rosterConfigService: rosterConfigService) {}

  canActivate(_context: ExecutionContext): boolean {
    return this.rosterConfigService.isBillingEnabled();
  }
}
