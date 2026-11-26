import { type ExecutionContext, Injectable } from '@nestjs/common';

import { CaptchaGuard } from 'src/engine/core-modules/captcha/captcha.guard';
import { CaptchaService } from 'src/engine/core-modules/captcha/captcha.service';
import { MetricsService } from 'src/engine/core-modules/metrics/metrics.service';
import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';

@Injectable()
export class WorkspaceCreationCaptchaGuard extends CaptchaGuard {
  constructor(
    captchaService: CaptchaService,
    metricsService: MetricsService,
    private readonly rosterConfigService: rosterConfigService,
  ) {
    super(captchaService, metricsService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (
      !this.rosterConfigService.get('IS_WORKSPACE_CREATION_CAPTCHA_ENABLED')
    ) {
      return true;
    }

    return super.canActivate(context);
  }
}
