import { Injectable } from '@nestjs/common';

import { ThrottlerService } from 'src/engine/core-modules/throttler/throttler.service';
import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';

// Logic functions and HTTP requests spend one bucket: an HTTP step can do nothing a logic function cannot.
@Injectable()
export class LogicFunctionExecutionThrottleService {
  constructor(
    private readonly throttlerService: ThrottlerService,
    private readonly rosterConfigService: rosterConfigService,
  ) {}

  async consumeToken(workspaceId: string): Promise<boolean> {
    const admittedCount = await this.throttlerService.tokenBucketConsumeUpTo(
      `${workspaceId}-logic-function-execution`,
      1,
      this.rosterConfigService.get('LOGIC_FUNCTION_EXEC_THROTTLE_LIMIT'),
      this.rosterConfigService.get('LOGIC_FUNCTION_EXEC_THROTTLE_TTL'),
    );

    return admittedCount === 1;
  }
}
