import { type DynamicModule, Global } from '@nestjs/common';

import { CodeInterpreterDriverFactory } from 'src/engine/core-modules/code-interpreter/code-interpreter-driver.factory';
import { CodeInterpreterService } from 'src/engine/core-modules/code-interpreter/code-interpreter.service';
import { rosterConfigModule } from 'src/engine/core-modules/roster-config/roster-config.module';

@Global()
export class CodeInterpreterModule {
  static forRoot(): DynamicModule {
    return {
      module: CodeInterpreterModule,
      imports: [rosterConfigModule],
      providers: [CodeInterpreterDriverFactory, CodeInterpreterService],
      exports: [CodeInterpreterService],
    };
  }
}
