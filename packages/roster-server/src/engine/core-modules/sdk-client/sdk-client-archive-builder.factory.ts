import { Injectable } from '@nestjs/common';

import { CacheLockService } from 'src/engine/core-modules/cache-lock/cache-lock.service';
import { InjectCacheStorage } from 'src/engine/core-modules/cache-storage/decorators/cache-storage.decorator';
import { CacheStorageService } from 'src/engine/core-modules/cache-storage/services/cache-storage.service';
import { CacheStorageNamespace } from 'src/engine/core-modules/cache-storage/types/cache-storage-namespace.enum';
import { LambdaAwsClientService } from 'src/engine/core-modules/logic-function/logic-function-drivers/drivers/lambda/services/lambda-aws-client.service';
import { LambdaToolFunctionsService } from 'src/engine/core-modules/logic-function/logic-function-drivers/drivers/lambda/services/lambda-tool-functions.service';
import { getLambdaConnectionOptions } from 'src/engine/core-modules/logic-function/logic-function-drivers/drivers/lambda/utils/get-lambda-connection-options.util';
import { LogicFunctionDriverType } from 'src/engine/core-modules/logic-function/logic-function-drivers/interfaces/logic-function-driver.interface';
import { type SdkClientArchiveBuilder } from 'src/engine/core-modules/sdk-client/types/sdk-client-archive-builder.type';
import { buildSdkClientArchiveInProcess } from 'src/engine/core-modules/sdk-client/utils/build-sdk-client-archive-in-process.util';
import { DriverFactoryBase } from 'src/engine/core-modules/roster-config/dynamic-factory.base';
import { ConfigVariablesGroup } from 'src/engine/core-modules/roster-config/enums/config-variables-group.enum';
import { ConfigGroupHashService } from 'src/engine/core-modules/roster-config/services/config-group-hash.service';
import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';

// Where logic functions run in Lambda, the SDK client is built there too, away
// from the server's environment and files.
@Injectable()
export class SdkClientArchiveBuilderFactory extends DriverFactoryBase<SdkClientArchiveBuilder> {
  constructor(
    rosterConfigService: rosterConfigService,
    configGroupHashService: ConfigGroupHashService,
    private readonly cacheLockService: CacheLockService,
    @InjectCacheStorage(CacheStorageNamespace.ModuleApplications)
    private readonly cacheStorageService: CacheStorageService,
  ) {
    super(rosterConfigService, configGroupHashService);
  }

  protected buildConfigKey(): string {
    return this.isLambdaDriver()
      ? `lambda|${this.configGroupHashService.computeHash(ConfigVariablesGroup.LOGIC_FUNCTION_CONFIG)}`
      : 'in-process';
  }

  protected createDriver(): SdkClientArchiveBuilder {
    if (!this.isLambdaDriver()) {
      return { buildArchive: buildSdkClientArchiveInProcess };
    }

    const lambdaOptions = {
      ...getLambdaConnectionOptions(this.rosterConfigService),
      cacheStorageService: this.cacheStorageService,
    };

    const lambdaToolFunctions = new LambdaToolFunctionsService(
      lambdaOptions,
      new LambdaAwsClientService(lambdaOptions),
      this.cacheLockService,
      new LambdaAwsClientService(lambdaOptions, 1),
    );

    return {
      buildArchive: (params) =>
        lambdaToolFunctions.generateSdkClientArchive(params),
    };
  }

  private isLambdaDriver(): boolean {
    return (
      this.rosterConfigService.get('LOGIC_FUNCTION_TYPE') ===
      LogicFunctionDriverType.LAMBDA
    );
  }
}
