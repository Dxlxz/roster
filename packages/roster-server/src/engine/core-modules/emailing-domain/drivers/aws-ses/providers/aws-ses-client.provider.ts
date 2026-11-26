import { Injectable } from '@nestjs/common';

import {
  SESv2Client as SESClient,
  type SESv2ClientConfig as SESClientConfig,
} from '@aws-sdk/client-sesv2';

import { ConfigVariablesGroup } from 'src/engine/core-modules/roster-config/enums/config-variables-group.enum';
import { ConfigGroupHashService } from 'src/engine/core-modules/roster-config/services/config-group-hash.service';
import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';
import { buildAwsRequestHandlerOptions } from 'src/utils/aws-request-handler.util';

@Injectable()
export class AwsSesClientProvider {
  private sesClient: SESClient | null = null;
  private sesClientConfigHash: string | null = null;

  constructor(
    private readonly rosterConfigService: rosterConfigService,
    private readonly configGroupHashService: ConfigGroupHashService,
  ) {}

  public getSESClient(): SESClient {
    const configHash = this.configGroupHashService.computeHash(
      ConfigVariablesGroup.AWS_SES_SETTINGS,
    );

    if (!this.sesClient || this.sesClientConfigHash !== configHash) {
      this.sesClient = this.createSESClient();
      this.sesClientConfigHash = configHash;
    }

    return this.sesClient;
  }

  private createSESClient(): SESClient {
    const config: SESClientConfig = {
      region: this.rosterConfigService.get('AWS_SES_REGION'),
      requestHandler: buildAwsRequestHandlerOptions(),
    };

    const accessKeyId = this.rosterConfigService.get('AWS_SES_ACCESS_KEY_ID');
    const secretAccessKey = this.rosterConfigService.get(
      'AWS_SES_SECRET_ACCESS_KEY',
    );
    const sessionToken = this.rosterConfigService.get('AWS_SES_SESSION_TOKEN');

    if (accessKeyId && secretAccessKey) {
      config.credentials = {
        accessKeyId,
        secretAccessKey,
        ...(sessionToken ? { sessionToken } : {}),
      };
    }

    return new SESClient(config);
  }
}
