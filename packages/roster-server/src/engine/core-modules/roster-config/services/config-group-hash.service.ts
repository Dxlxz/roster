import { Injectable } from '@nestjs/common';

import { createHash } from 'crypto';

import { ConfigVariables } from 'src/engine/core-modules/roster-config/config-variables';
import { type ConfigVariablesGroup } from 'src/engine/core-modules/roster-config/enums/config-variables-group.enum';
import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';
import { TypedReflect } from 'src/utils/typed-reflect';

@Injectable()
export class ConfigGroupHashService {
  constructor(private readonly rosterConfigService: rosterConfigService) {}

  computeHash(group: ConfigVariablesGroup): string {
    const groupVariables = this.getConfigVariablesByGroup(group);

    const configValues = groupVariables
      .map(
        (key) => `${key}=${JSON.stringify(this.rosterConfigService.get(key))}`,
      )
      .sort()
      .join('|');

    return createHash('sha256')
      .update(configValues)
      .digest('hex')
      .substring(0, 16);
  }

  private getConfigVariablesByGroup(
    group: ConfigVariablesGroup,
  ): Array<keyof ConfigVariables> {
    const metadata =
      TypedReflect.getMetadata('config-variables', ConfigVariables) ?? {};

    return Object.keys(metadata)
      .filter((key) => metadata[key]?.group === group)
      .map((key) => key as keyof ConfigVariables);
  }
}
