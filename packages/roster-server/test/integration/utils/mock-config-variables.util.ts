import { getAppProviderByClassName } from 'test/integration/utils/get-app-provider-by-class-name.util';

import { type ConfigVariables } from 'src/engine/core-modules/roster-config/config-variables';
import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';

export const mockConfigVariables = (overrides: Partial<ConfigVariables>) => {
  const rosterConfigService = getAppProviderByClassName<rosterConfigService>(
    'rosterConfigService',
  );
  // Reads through the prototype so a second call does not wrap the first mock.
  const readConfig =
    rosterConfigService.prototype.get.bind(rosterConfigService);

  jest
    .spyOn(rosterConfigService, 'get')
    .mockImplementation((key) =>
      key in overrides ? overrides[key] : readConfig(key),
    );
};
