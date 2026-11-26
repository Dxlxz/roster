import { type DynamicModule, Global, Module } from '@nestjs/common';

import { ConfigVariables } from 'src/engine/core-modules/roster-config/config-variables';
import { CONFIG_VARIABLES_INSTANCE_TOKEN } from 'src/engine/core-modules/roster-config/constants/config-variables-instance-tokens.constants';
import { DatabaseConfigModule } from 'src/engine/core-modules/roster-config/drivers/database-config.module';
import { ConfigGroupHashService } from 'src/engine/core-modules/roster-config/services/config-group-hash.service';
import { ConfigurableModuleClass } from 'src/engine/core-modules/roster-config/roster-config.module-definition';
import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';

@Global()
@Module({})
export class rosterConfigModule extends ConfigurableModuleClass {
  static forRoot(): DynamicModule {
    const isConfigVariablesInDbEnabled =
      process.env.IS_CONFIG_VARIABLES_IN_DB_ENABLED !== 'false';

    const imports = isConfigVariablesInDbEnabled
      ? [DatabaseConfigModule.forRoot()]
      : [];

    return {
      module: rosterConfigModule,
      imports,
      providers: [
        rosterConfigService,
        ConfigGroupHashService,
        {
          provide: CONFIG_VARIABLES_INSTANCE_TOKEN,
          useValue: new ConfigVariables(),
        },
      ],
      exports: [rosterConfigService, ConfigGroupHashService],
    };
  }
}
