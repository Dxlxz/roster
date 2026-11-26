import { type LogLevel } from '@nestjs/common';

export type rosterLogLevel = LogLevel | 'performance';

export enum LoggerDriverType {
  CONSOLE = 'CONSOLE',
}

export interface ConsoleDriverFactoryOptions {
  type: LoggerDriverType.CONSOLE;
  logLevels?: rosterLogLevel[];
}

export type LoggerModuleOptions = ConsoleDriverFactoryOptions;
