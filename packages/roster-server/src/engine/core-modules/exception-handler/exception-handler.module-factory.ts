import { type HttpAdapterHost } from '@nestjs/core';

import { NodeEnvironment } from 'src/engine/core-modules/roster-config/interfaces/node-environment.interface';

import { type OPTIONS_TYPE } from 'src/engine/core-modules/exception-handler/exception-handler.module-definition';
import { ExceptionHandlerDriver } from 'src/engine/core-modules/exception-handler/interfaces';
import { type rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';

export const exceptionHandlerModuleFactory = async (
  rosterConfigService: rosterConfigService,
  adapterHost: HttpAdapterHost,
): Promise<typeof OPTIONS_TYPE> => {
  const driverType = rosterConfigService.get('EXCEPTION_HANDLER_DRIVER');

  switch (driverType) {
    case ExceptionHandlerDriver.CONSOLE: {
      return {
        type: ExceptionHandlerDriver.CONSOLE,
      };
    }
    case ExceptionHandlerDriver.SENTRY: {
      return {
        type: ExceptionHandlerDriver.SENTRY,
        options: {
          environment: rosterConfigService.get('SENTRY_ENVIRONMENT'),
          release: rosterConfigService.get('APP_VERSION'),
          dsn: rosterConfigService.get('SENTRY_DSN') ?? '',
          serverInstance: adapterHost.httpAdapter?.getInstance(),
          debug:
            rosterConfigService.get('NODE_ENV') === NodeEnvironment.DEVELOPMENT,
        },
      };
    }
    default:
      throw new Error(
        `Invalid exception capturer driver type (${driverType}), check your .env file`,
      );
  }
};
