import {
  LoggerDriverType,
  type LoggerModuleOptions,
} from 'src/engine/core-modules/logger/interfaces';
import { type rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';

export const loggerModuleFactory = async (
  rosterConfigService: rosterConfigService,
): Promise<LoggerModuleOptions> => {
  const driverType = rosterConfigService.get('LOGGER_DRIVER');
  const logLevels = rosterConfigService.get('LOG_LEVELS');

  switch (driverType) {
    case LoggerDriverType.CONSOLE: {
      return {
        type: LoggerDriverType.CONSOLE,
        logLevels: logLevels,
      };
    }
    default:
      throw new Error(
        `Invalid logger driver type (${driverType}), check your .env file`,
      );
  }
};
