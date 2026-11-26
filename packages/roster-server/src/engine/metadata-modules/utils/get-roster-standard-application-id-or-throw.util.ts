import { roster_STANDARD_APPLICATION_UNIVERSAL_IDENTIFIER } from 'roster-shared/application';
import { isDefined } from 'roster-shared/utils';

import {
  ApplicationException,
  ApplicationExceptionCode,
} from 'src/engine/core-modules/application/application.exception';
import { type FlatApplicationCacheMaps } from 'src/engine/core-modules/application/types/flat-application-cache-maps.type';

export const getrosterStandardApplicationIdOrThrow = (
  flatApplicationMaps: FlatApplicationCacheMaps,
): string => {
  const rosterStandardApplicationId =
    flatApplicationMaps.idByUniversalIdentifier[
      roster_STANDARD_APPLICATION_UNIVERSAL_IDENTIFIER
    ];

  if (!isDefined(rosterStandardApplicationId)) {
    throw new ApplicationException(
      'Could not find the roster-standard application in the workspace cache',
      ApplicationExceptionCode.APPLICATION_NOT_FOUND,
    );
  }

  return rosterStandardApplicationId;
};
